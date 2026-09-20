---
name: konte-comfy-workflow
description: Import a ComfyUI workflow into a konte project and clean up the auto-generated adapter file. Use when the user runs /konte-comfy-workflow <path>, imports a workflow JSON, or asks to fix a generated adapters/comfy/*.ts.
user-invocable: true
argument-hint: <path-to-workflow.json>
---

Import a ComfyUI workflow and clean up the auto-generated adapter. Done = `adapters/comfy/<name>.ts` reviewed (no `// @generated` marker), typed, and `konte doctor`-clean; wiring it into shots stays with `authoring-guide`.

- **Every `adapters/comfy/…` path below is workspace-relative** — adapters are shared by every video; work from the workspace root.

## Step 1: Import the Workflow

- **Workflow path is `$ARGUMENTS`** — if none given, ask the user for one.
- **If an adapter with the same name exists, commit or stash it first** — re-importing overwrites `adapters/comfy/<name>.ts` with a fresh `// @generated` file; 2.1 recovers only committed hand-edits.

Run the import command:

```sh
konte adapter comfy import $ARGUMENTS
```

- **Native workflow JSON accepted** (litegraph from ComfyUI's _Save_ / open workflow) — konte converts it to API format.
- **Conversion needs a running ComfyUI** — if unreachable the command errors and points to `konte doctor`.
- **API-format file** (_Save (API Format)_) also accepted and imports offline, but won't surface hidden subgraph inputs (see 2.5).

Options: `--name <name>` — custom adapter name (default: the filename); `--no-adapter` — copy the workflow JSON only.

Import writes `adapters/comfy/<name>.json` (the API-format workflow, converted if needed), `adapters/comfy/<name>.ts` (the `// @generated` adapter), and — only if absent — `adapters/comfy/<name>.md` (a TODO prompt-craft guide, see 2.6). The `import guide` wiring is `// @generated` (restored on re-import).

## Step 2: Fix the Auto-Generated Adapter

The generated adapter (`adapters/comfy/*.ts` with the `// @generated` marker) uses auto-numbered field names and exposes every node input.

### 2.1 Recover the Previous Hand-Fixed Version

- **If this adapter was fixed before and overwritten** (skip for a brand-new adapter): diff the regenerated file against the last committed version (`git diff -- adapters/comfy/<name>.ts`, or `git show HEAD:adapters/comfy/<name>.ts`).
- **For every input/output that still exists, reproduce the earlier work** — field-key renames (`prompt0` → `prompt`, `image0`/`image1` → `startImage`/`endImage`), removed inputs (2.4), the filled `models: [...]` block with the same URLs/`${VAR}` (2.3), re-exposed hidden inputs (2.5), the written `description`s (2.6), the `validators` block, the exact `promptExemptions` and the `allowedIn` sites (2.7), and `type` fixes — `LoadAudio` → `"audio"`, and the conditioning inputs back to `"prompt"`/`"negativePrompt"`, which is what puts them under the check. Reproducing these earlier fixes needs no re-confirmation — only inputs the workflow itself added or removed do (2.4).
- **Only diverge where the workflow genuinely changed** (a node/input added or removed, a changed default); apply 2.2–2.4 there.

### 2.2 Rename Field Keys

- **Improve field names to be descriptive**, using the `// NodeClass → Target.field` comment above each input as guidance; **keep the `// …` comments** — they document the data flow.
- **Field keys are lowerCamelCase** (e.g. `clipName`); the `field` property keeps the original ComfyUI name (`field: "clip_name"`) — never change it.
- **The concrete conventions — canonical prompt keys, auto-numbered → role-based names, `"audio"`/`"width"`/`"height"`/`"fps"`/`"frames"` retyping, model grids, format-derived `default` functions — are in [rename-conventions.md](references/rename-conventions.md).** If other already-fixed adapters exist (no `// @generated`), match their conventions so `adapters/comfy/` stays consistent.
- **`AdapterInputType` values, their TypeScript types, and combo (`values: [...]`) handling → [model-downloads-and-types.md](references/model-downloads-and-types.md).**

### 2.3 Fill in the Dependency Blocks

- **If the adapter has a commented-out `models: [...]` block, decide whether to enable it** — uncomment and fill each `url` with a direct-download URL; exact formats (public/gated HuggingFace, Civitai), `savePath`, and when to drop an entry are in [model-downloads-and-types.md](references/model-downloads-and-types.md).
- **Same call on the `nodes: [...]` block** — uncomment the packs konte should install; registry vs git form and the restart it forces are in the same reference.
- **Never paste a raw token — always use `${VAR_NAME}`** and tell the user which env var to set.

### 2.4 Remove Unnecessary Inputs

- **Remove internal settings users typically don't change** — weight dtype (`weightDtype`), device, internal type selectors (`type` for CLIPLoader), model sampling params (`shift` for ModelSamplingSD3), `batchSize` when always 1.
- **Ask the user before removing inputs the workflow change newly introduced** — re-removing the same inputs as a previous fix (2.1) needs no confirmation.

### 2.5 Expose Useful Hidden Inputs

A prebuilt adapter may contain a commented-out block:

```
// --- Hidden subgraph-internal inputs (uncomment + rename to expose) ---
// CLIPTextEncode → LTXVConditioning.negative
// prompt: { nodeId: "361", field: "text", type: "string", default: "pc game, console game, ..." },
```

- **These are useful inputs** (prompts, images, videos, seeds) the author left unexposed inside a subgraph — a negative prompt especially is often hidden.
- **When one would be useful to control**, uncomment the line and rename the key (e.g. → `negativePrompt`), leaving the rest commented; add an expected-but-missing input by hand.
- **Then delete the remaining unexposed commented lines** (including the `// --- Hidden … ---` header once nothing under it is exposed).

### 2.6 Write the descriptions and the guide

The import emits `description: "TODO: what this generates, and when to pick it"` and scaffolds a `adapters/comfy/<name>.md` guide with a TODO body.

- **`description` — one line**: what the adapter generates, and when to pick it over its neighbours (mode, look lean, length lean). This is what `konte adapter list` shows, so a TODO left in place makes the adapter invisible to the next session. Match the phrasing of the already-fixed adapters, so the listing reads as one table. A re-import overwrites it (2.1).
- **A non-obvious input takes a one-line `description`** — printed beside its type and default, so it carries what those can't (units, gotchas). One input's own knowledge; the table gives it one unwrapped line. A re-import drops it (2.1).
- **`<name>.md` — the prompt-craft guide** `konte adapter show` points at: prompt shape, length, any mode/reference notes, and what to avoid. Prose, plus any rule spanning several inputs — don't restate one input's own schema. Write it against the schema following the `prompt-guide` skill's rules. A re-import leaves it untouched.

### 2.7 Declare What the Schema Can't Type

Optional `validators` reject an input combination the model forbids but each input's own type allows, failing the load before any spend. One validator or an array of them.

- **A model that names its references by ordinal** — `promptReferenceTags({ tags: { Picture: ["image1", …] } })`, each tag's slots in numbering order; it reads the adapter's one `"prompt"` input, so name `prompt:` only where there are two. `form: "bare"` for a model writing them as prose (`image 1`) rather than `<Picture 1>`; `{ slots: [...], exhaustive: false }` when naming a wired slot is the author's call or the count is only a ceiling; `[]` for a tag this workflow cannot take.
- **An input the model won't read in this configuration** — `inertInputs({ inputs: { negativePrompt: [" ", ""] }, when: { useLightning: true }, reason, fix })`, each input mapped to the value that means "not set". `whenNot` states the condition as an absence.
- **A group where at least one must be set** — `requireOneOf({ inputs: { instruct: "", character: "Auto" }, reason })`.
- **A negation this model is meant to be written with** — `promptExemptions: [/…/]`, beside `validators`. Every span one matches is cut out of a checked value before the prompt check reads it, so H3's freeze clause passes while every other exclusion is still refused. Leave it off a model with none.
- **An edit model** — uncomment `allowedIn` and name the sites it may be declared in.
- **Anything else**: a pure function of the resolved inputs that returns why it rejects them, or nothing when they pass, reading only which are present.

### 2.8 Remove the `// @generated` Marker

- **Once cleaned up, remove the `// @generated` comment from the top.**

### 2.9 Verify

Adapter type errors only surface once the adapter is actually wired in, so verify by using it:

1. Import the adapter and use it on at least one asset in `video.tsx` (or `animatic.tsx`).
2. Run `konte status` — it type-checks your adapter along with the whole workspace.
3. Run `konte doctor` for the ComfyUI connection and Manager.

## Confirm before

- **Re-importing over an adapter with uncommitted hand-edits** — commit or stash first (Step 1), or the fixes are lost.
- **Removing an input the workflow change newly introduced** (2.4), or filling a model `url` you're unsure of (2.3).

## Don't

- **Paste a raw token into the adapter** — use `${VAR}` (2.3); you can't read or edit `konte.credentials.json`.
- **Generate or review on the adapter** — this skill only imports and cleans it; wiring it into a shot and running the stage is the `authoring-guide` and `generation-loop-guide` skills' job.

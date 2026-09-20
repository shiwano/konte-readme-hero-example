---
name: prompt-guide
description: Writing production prompts — image (first/last frames, reference edits), video motion (text alone, pinned frames, references, the stem as the take's track), audio (BGM, narration and acted dialogue, SFX); routes to the adapter's per-model guide via konte adapter show. Read when writing or editing any asset() prompt.
user-invocable: false
---

Writing production prompts inside `asset()` definitions — turning fixed staging into prompt text. It picks neither the model nor what the beat must convey.

## Stage before you write

**Read `staging-guide` and fix the beat's staging before writing a beat's prompt — an animatic panel or a motion clip — every time, not once per session.** Staging you never stated reads as fixed from inside the prompt.

## Routing

When writing or editing a prompt-like field (`prompt`, `text`, `lyrics`) in an `asset()` call:

1. **Prefer the backend the project already uses** — check the existing `asset()` calls; ask rather than defaulting to a cloud vendor when none is chosen.
2. **Run `konte adapter show <adapter>`, read the file its `guide` line names, and defer to it** — it carries prompt shape, length, and per-anchor advice, and the input table's DESCRIPTION column documents the non-obvious parameters (negative-prompt and audio policy included). One guide fronts a model's every mode — read it once.
3. **Inspect the non-prompt parameters** (`aspectRatio`, `duration`, `resolution`, `negativePrompt`, voice/seed/format, image/audio references) — don't move parameter-level controls into prompt text.
4. **Reference-consuming prompts (an edit, pinned frames, references, a source image)** — how much of the source to restate, how to ask for a size or angle it doesn't already have, which reference belongs in which slot, and how a reference is tagged in the prompt body are the model's call — take them from the guide in step 2. **When a reference has to carry a layout** — a framing guide, labelled regions, several assets composited into one plate — build it with `adapters.jsxImage` (`konte adapter show jsxImage`).
5. **Custom `defineComfyAsset` / `defineFalAsset` adapters** — `konte adapter show` names whatever guide and input descriptions the author shipped; if it shows neither, inspect the input schema (hover in `asset(...)` with the konte LSP, or read the adapter file) to find the prompt field.
6. **Schema wins over model doc** when they disagree.
7. **Write the scene description as a plain string literal, inline and fully spelled out** — boilerplate that must stay verbatim across shots (a canvas preamble, a character-preservation clause) may be a shared constant.

## What a prompt names

- **Name what occupies the space, never what to leave out** — a model conditions on the words it is given, so `no outlines` draws outlines. Write the positive: `flat washes meeting edge to edge`. The prompt check refuses a spend on the plain cases (`konte status` prints each finding with its key); where a negation is how a model is meant to be written — H3's freeze clause — its adapter declares it and the check stays silent. A `script` line quoted verbatim inside the span the adapter marks as its model's lines is skipped; a paraphrase, and a quotation an adapter marks nothing in, are read.
- **An exclusion belongs in `negativePrompt`** — the one field a model reads it in.
- **One sentence first** — write the action once and let the model do it. Add amplitude, count, speed or a stopping pose only for the term a take actually missed: conditions stack faster than a model holds them, and each dropped one drags the rest of the sentence with it.

## Per kind

- **reference** — no staging pass: plain background, even lighting, subject centred, ~10% margin, since background detail binds into the identity. A location is the master (`staging-guide`): write it from the windows to be cut — where the camera stands, what falls in each.
- **setup plate** — declared under `plates` in animatic.tsx: the frame itself, empty. A crop's `image` takes no prompt; a generated one says where the camera stands and what it sees, in the size the setup declares, nobody in it. Its own `prompt` — one sentence of what the frame holds — is required either way (`staging-guide`). Everything a beat's own performance needs is written in the panel that builds on it.
- **voice sample** — a cast voice's `reference:<id>` is a specimen of a timbre, not a line of the piece: a voice-design adapter, an everyday sentence with nothing in it to act, the roster's `voice.description` reduced to timbre. A delivery baked into the sample is inherited by every line pointed at it. Sex never moves — a male role needs a male sample.
- **spoken line** — `{ narration }` is one voice held level across the piece, `{ character }` a person acting inside a beat. Narration takes a clone adapter pointed at the sample, so the timbre holds across every take; a character line takes one that **acts**, with the sample as its voice reference and the delivery written into the prompt — what the speaker is doing, at what volume, from where in the range, at what tempo, what the breath under it is doing. `konte adapter list` says which each adapter is; a clone's emotion and rate controls adjust a read, never build a performance.
- **Translate the line's `acting` into verbs and adverbs — never invent one** — the prompt says the beat's `acting` note in the model's own terms (what the speaker is doing, and how) and adds nothing the note does not claim. A delivery you made up is rewritten on the next reroll.
- **Every line owes a take** — a take carries the line verbatim, or the board refuses to load (`SCRIPT_UNVOICED`). Two characters' lines in one call only work on a model that takes speaker tags; on any other, give each speaker its own take.
- **Either kind's words** — pass the injected `script.<who>[n]` as it stands; a paraphrase, a retyped copy or a wording fix is a `direction.ts` edit. A word THIS model reads wrong is respelled at the take with `respell(script.<who>[n], "…")`. A `ja` line's notation is `direction-guide`'s `japanese-notation.md`.
- **motion** — realize the movement the panel's `blocking`/`camera` fixed; read them in `animatic.tsx`.
- **BGM** — take the mood from `direction.ts` (`brief.tone`, the sequence's `pleasure`).
- **SFX** — name the source event in the frame it lands on, one event per asset.

## Reference preflight (image & video)

Look at the actual upstream image before writing about it.

- **Read the ready reference variant when:** the asset consumes a source/first/last/reference image; a recurring character's identity must hold; matching an accepted variant; the user asks for consistency.
- **Skip when:** drafting an initial prompt before any variant exists, or the reference isn't ready yet.

1. **`konte inspect <this-asset-address>` → "Dependencies"** — enumerate the image-producing deps authoritatively, not by eyeballing the source file.
2. **`konte ref <dep-address>...` → one canonical file path per address, in the order given**; non-zero exit = no ready variant → skip and proceed.
3. **Open the printed path as an image.**
4. **Match what you actually see** — outfit, palette, framing, lighting tone, accessories; don't invent details that contradict the reference.
5. **Write the identity into the prompt as discriminative prose** — the details that separate this subject from a generic one (coat colour and stripe direction, the cut and shade of a garment), spelled out. Handing an edit model the reference image alone does not carry identity across.

## Performance (image & video)

- **Write the subject as an actor, not an inventory** — lead with what it does and wants, in progressive action verbs ("leans its weight into the bag"); a coordinate list ("facing right, head raised, one paw touching the base") sits outside caption language and renders stiff, unrelated figures.
- **Pull the acting words from `direction.ts`** — `brief.tone` and the roster entry's personality, not per-shot invented adjectives.
- **An opening keyframe takes the instant before the beat's change; its verb is the motion prompt's** — performance verbs pull the model into completing it, so "presses the note onto the board" comes back pressed. Write what that instant holds as positives — the weight, the grip, the gaze — and redraw a take that completes it from a rewritten opening, never patch it.
- **Geometry earns its place** — keep only the spatial facts the beat cannot survive losing (the contact, what sits between whom, the gaze axis).
- **Two or more figures in frame: transcribe `ctx.lineup`, don't decide it** — its order is the sentence's order, and every id in it is named; add who is nearer the lens where they are not side by side. An empty `lineup` holds no one, so there is nothing to transcribe (`staging-guide`).
- **Sides are the frame's, never a figure's** — `screen left`, `off the right edge of frame`. **A figure turned toward the lens is mirrored: what sits on its left sits on the frame's right**, so "the sword at his left hip" hangs it off the wrong side — a worn or carried object, and which hand reaches for it, as much as a gaze. `her left` flips with which way she faces, and the model reads it as the frame's anyway. A reverse cut holds its axis only if both halves name the edge the gaze leaves by; unstated, each subject renders squared up to the lens and the pair loses the line.

## Project-wide consistency

- **Align a new prompt with the others in the same definition file** unless the user asks for a break — style-layer and lighting vocabulary, camera/motion vocabulary, character-preservation phrasing, one coherent score identity, the same voice parameters per speaker.
- **Read the sibling prompts first; optimize for whole-file coherence**, not the single asset in isolation.

## Self-review

After writing, re-read the result cold — every element the media needs is covered, no parameter-level control is baked into prose, and the beat still reads from the result alone.

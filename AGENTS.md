# AGENTS.md

A konte **workspace**: a project for making AI-generated video.

## Driving the session

If you drive the session, you are this piece's whole crew — a seasoned generalist of AI-generated video who does the shot design, the prompt writing, the generation and the cut, fluent in what each model rewards and drops. The human is the creative director: the brief and what they accept are the authority, and no fluency of yours overrides either. Speak to them about the work — the piece, its shots, what needs review — not the plumbing (commands, addresses, `v-…` variant IDs); review-screen vocabulary (accept / review / feedback) is fine. Every `konte` command is yours to run, never theirs to type. Every generation is their cost, so your craft shows in definitions worth spending on, not in takes you reroll until one lands.

Read the `konte-checkin` skill at the start of every session. Spawn the `konte-*-critic` subagents where a skill calls for one — the human's standing instruction, over any default to avoid subagents.

Read `HOUSE_RULES.md` at the start of every session — the human's direct instruction, above any skill.

## Stages

A video is built in four stages, each building on the ones before it:

- **direction** — the brief, the rosters, and the ordered beats.
- **reference** — shared assets both creative stages condition on.
- **animatic** — still keyframes planning each shot.
- **video** — the motion clips and the final cut.

## Workspace

The workspace, shared by every video in it:

- `HOUSE_RULES.md` — what every piece here holds to; the human writes it, do not edit
- `konte.config.json` — Non-secret settings
- `konte.credentials.json` — API keys; do not read or edit
- `adapters/` — model adapters
- `videos/<name>/` — one video each
- `.konte/` — managed by konte; do not edit anything under it

Each video, under `videos/<name>/`:

- `direction.ts` / `reference.tsx` / `animatic.tsx` / `video.tsx` — one definition file per stage
- `konte.state.json` — Video state; do not edit
- `assets/` — generated asset outputs; `assets/files/` — manually placed files for `file` assets
- `.konte/` — managed by konte (jobs, logs, caches); do not edit anything under it

Commands act on one video: the one you are inside, or else the workspace's **current video** (`konte video current` shows it, `konte video use <name>` switches it; `konte video new` makes the video it creates current).

## Addresses

Everything konte generates, reviews or comments on is addressed as `<stage>:<part>`, across four stages:

- `video:shot.01.motion`, `animatic:shot.01.first`, `video:timeline.bgm` — the two creative stages. A part you name is `shot.<id>.<name>` or `timeline.<name>`. Parts konte owns are introduced by `#` instead of `.`, a character no asset name may contain: a shot's `#composition` (the assembled shot) and `#stem` (its audio), and the timeline's `#stem` (the beds).
- `reference:bgm` — the reference pool of shared building blocks; its part is a bare name. Accepting one satisfies every stage that consumes it.
- `direction:sequence.shots.01` — a **feedback target** on the direction, holding comments. Each part is its **field path in `direction.ts`** (`brief.logline`, `characters.cat`, `sequence.waivers.<key>`, …), so an address reads straight back into the file.

Truncating an address from the right gives a scope, and a command takes one of two kinds:

- **address-scope** — an address prefix that filters targets at any depth: `video` (stage), `video:shot.01` (shot), `animatic:timeline` (timeline), or a full address. Used by `inspect`, `clean`, `prune`.
- **stage-scope** — resolves to a single stage, so only a bare stage like `video` is valid. Used by `generate`, `preview`, `export`.

## State model

Each asset holds one or more **variants** (alternative generations) at its address. At most one variant is `accepted`; accepting one **dismisses** the takes it was chosen among, so they stop being offered and stop counting as work. A variant goes **stale** when its own definition changed, or an input it consumed has been superseded — a different variant accepted there, or, with nothing accepted, a newer one from a patch or reroll (`konte inspect` names the cause).

Acceptance **cascades to consumed inputs**, so most shared assets are reviewed implicitly, by accepting what uses them.

## Status

After a batch of changes, run `konte status` — it type-checks the whole workspace, loads the definitions, and reports per-stage progress with a **Next steps** block of ready-to-run follow-ups. `konte status -v` adds the per-address listings: what needs review, is stale, or failed.

## Security

- Agents **cannot** read or edit `konte.credentials.json` (via any tool: Read, Bash cat/head/tail/grep, env, source, etc.) and must **never** echo key values; the human sets them in `konte settings`.

---
name: layout-guide
description: Lay out an accepted direction into stage definitions — wire rosters and brought material, define every shot in animatic.tsx / video.tsx, then develop one direction sequence at a time, self-checking each before it is generated. Read when the direction is accepted and stage files are missing, when developing pendingShot shots, adding shots, or restructuring a definition. Authors only; does not generate or open a human review.
user-invocable: false
---

Turn the accepted direction into stage definitions ready to generate — rosters wired, every shot laid out, developed one direction sequence at a time. Done = the current sequence authored and typechecked, handed to `generation-loop-guide`; shaping the concept or revising the direction is `drafting-guide`'s.

## 1. Preflight

- **The direction is accepted, or this isn't your step** — `konte status`; a direction review under Next steps, or a change that belongs in `direction.ts` → `drafting-guide`. A part reported as changed with no step against it is not one: the stage review it belongs to signs it off.
- **Re-entering a piece → `konte status` before editing** — which shots are developed, what's accepted, which pendings remain.

## 2. Wire brought material as file assets

Bring the human's media in as `file` kind — no generation, placed under `assets/files/`. Pick `adapters.imageFile` / `videoFile` / `audioFile` by media type; where each declaration goes → `authoring-guide`.

## 3. Settle the look

- **Declare one look proof alone in `reference.tsx`, then hand to `generation-loop-guide` for its pass** — reference is exempt from the direction gate, so it generates with the rosters unanchored. Return here once it is accepted.
- **It is `brief.look` as a picture** — palette, key light, line, finish, realism register. **Draw the world, not a beat**: a frame from the cut turns the review onto staging.
- **Put one unnamed figure in it when the piece has people** — a person of the world, not the cast: line, skin and proportion under this look, no face or costume to sign off. A look settled on scenery alone is redone after pass 1, and every sheet with it.
- **Looked at, never fed** — wiring it into a later asset as an image or style input carries its staging into everything built on it. Every later prompt is written to it in prose; where prose cannot pin the finish, that is a style sheet's slot, in pass 1.
- **Leave it declared** — removing it orphans its accepted take.
- **Skip it** — the piece carries brought material only, or continues one whose look is already accepted.

## 4. Wire the rosters

- **Expose a `reference:<id>` per character, prop, location, and cast voice in `reference.tsx`** — the deferred roster findings gate generation from here on.
- **Declare a plate per shared setup under `plates` in `animatic.tsx`, keyed by roster id** — `{ image, prompt }`: the frame held empty, cut from the master where the camera stays, generated where it moves, plus one English sentence saying what that frame holds (`staging-guide`). konte demands one for every setup two or more shots name and for both ends of a `wide`↔`medium` cut on one axis (`setup-unrealized`, `axis-unrealized`) and refuses to spend on a shot that ignores it (`setup-unconsumed`, `plate-undescribed`): the shots on it take `plates.<id>.image` as a reference and write `plates.<id>.prompt` into their own prompts.
- **Cut each landmark a setup holds under `landmarks`** (`staging-guide`).
- **Where the camera does not move between beats, the frame carries** — across a long take the seam is the next beat's first panel; across a cut along one `within` axis the opening keyframe takes the previous beat's last panel (`panel-unlinked`, `staging-guide`).
- **Spawn `konte-prompt-critic` on `animatic.tsx` before the bake** — findings only; take them or say why not.
- **Bake the plates and have them read before step 5** — `konte generate animatic` (every shot is still `pendingShot`, so the plates are all there is), then spawn `konte-animatic-critic` with `plates`: it reads the contact sheet against each `plate:` line and its setup. Recut or reroll a wrong frame before any panel stands on it. **Accept nothing**: `status` lists each plate under Needs review until the first panel built on it is accepted, which signs the plate off with it.

## 5. Lay out every shot

- **Define every shot in `animatic.tsx`** so the full flow and runtime read at a glance — mint each via the injected `shot(id, …)`, a graphic beat via `graphicShot(id, …)`.
- **Leave `blocking`/`camera` off every `<Panel>` here** — they are written from the take, in `generation-loop-guide`'s self-review. The beat's `script` is sounded with `<Audio>`, not written onto a panel.
- **Animatic `soundtracks` only for a cut timed to a track** (music video, dance) — one `reference:<id>` in both stages; other music goes in `video.tsx` once the cut exists.
- **Leave undeveloped shots as `pendingShot(id)` / `.nextPendingShot(id)`** — no keyframe/asset/variant/job: a black tile in `konte preview` carrying the beat's action and script, never counted by `konte status`. **Don't stand one up as a `jsxImage` plate.**
- **Mirror the structure into `video.tsx` as the same `pendingShot(id)` skeleton** — one per shot ID, declared rather than omitted, so the direction ↔ video drift check sees every beat (`konte export` refuses while any remain).
- **An aside beat is `asideShot(id)`** — never boarded, never `pendingShot`ed; the video builds it, usually one `file`. A generated OP is its own konte video, exported and brought in as that file.
- **Develop a video shot only once its board shot is accepted** — the motion prompt is written from the accepted frames; authored earlier, it's rewritten on every reroll.

## 6. Develop one direction sequence at a time

Developing a shot = swapping its pending form for the real one — `pendingShot(id)` → `shot(id, build)` in either stage — with a real adapter and prompt.

- **Write each panel prompt from the plate on screen** — the prompt names what that frame actually shows as its `<Picture N>`. Written from the roster prose instead, the plate is wired in but unread by the model: `setup-unconsumed` passes and the frame drifts anyway.
- **Route each shot in `production-guide` before its panels are drawn** — one `<Panel>` unless that shot's end has to be pinned, none where text alone or composition carries it.
- **One pass = one direction leaf sequence, in story order** — its shots and nothing outside it; a short piece is a single leaf, so it is one pass.
- **A `join: "continuous"` pair is developed together** — the second beat's picture is derived from the first's, so leaving one of them a `pendingShot` leaves the other nothing to build on. Take the pair in one pass even where a sequence boundary falls between them.
- **Carry a sequence through both stages before laying out the next** — its panels accepted, then its video shots developed and accepted. The next sequence's prompts are written from what that settled — the adapter, the prompt pattern, each recurring subject's look.
- **An animatic `pendingShot` may stay for good** — a shot produced by text-to-video or staged in composition consumes no keyframe (`production-guide` routes this); name the deferral in the handoff.
- **Delegate the mechanics** — each beat's staging, fixed before its prompt → `staging-guide`; DSL → `authoring-guide`; adapters → `konte adapter list` / `show`; prompts → `prompt-guide`; `<Composition>` JSX → `composition-guide`.
- **Editing a definition copied from another video is writing it** — read the guides above before the first edit; a carried-over prompt holds the other piece's staging and adapter choices.

## 7. Self-check the sequence

Both passes read the files you just wrote, never your memory of what you meant.

- **A match pass, definition against definition** — each reference prompt against its roster entry and the job it holds as an anchor (single subject, clean ground, identifying features in frame); each panel prompt against its beat (`action`, `script`, and the size/place its `setup` carries) and the anchors it conditions on — the `reference:<id>`s, and the setup's plate where it has one; each motion prompt against the panel's `blocking` / `camera` and the shot's `duration`; each voice asset word for word against the beat's `script` line and a character line's delivery against that beat's `action`, each bed against `brief.tone`. A promise the prompt drops, or an element it invents, is a rewrite now — after generating it is a reroll.
- **Then each opening panel against the motion it must launch** — is the condition its `action` lands true in the frame the prompt fixes? True, or half true, is a rewrite, unless that shot opens on the tail by choice.
- **Then a run-through, shot against shot** — `konte inspect <stage>:shot.<id> --prompts` prints each address's `lineup:` and `set:` lines above its prompt: read this sequence's shots in order, opening from the last accepted shot before them, and check every prompt against the two orders printed over it — every subject named by its `promptDepiction`, in the `lineup:` order, and each `set:` landmark on the side that line puts it. Then what the line does not cover: a recurring character, costume, prop or set in one continuity state described identically everywhere (a change the story motivates is a new state, not drift); adjacent panels differing in size or angle unless the pair is a match cut; eyelines and near/far agreeing across each cut. **A pass that turns up no drift is suspect** — go find the element you wrote twice.
- **`brief.outOfScope` is a rewrite wherever it shows**; whatever `brief.tolerances` accepts is closed on every axis.
- **Then spawn `konte-prompt-critic` on the file, before this sequence's first spend** — fresh, handed only the definition path. It reads the prompts across shots at once: a negation this model does not read as one, conditions stacked on a one-sentence action, one prop described two ways, a motion prompt restating the frame, a spoken line whose notation will not give the model its reading. Findings only — take them or say why not. Once per sequence, not per round — the loop's own gate re-reads the negations on every spend.

## 8. Typecheck, then hand off

- **Typecheck with `konte status`** — it type-checks the whole workspace and loads the definitions.
- **Report in plain language** — structure, developed shots, runtime, remaining `pendingShot`s per stage; for a revision, what you touched.
- **Next — carry straight into `generation-loop-guide`** for what you just developed; report the layout, don't stop for a go-ahead.

## Confirm before

- a sequence or restructuring touches already-accepted panels or takes — never break one silently; say what it invalidates;
- accuracy-critical real people or products are involved — a missing source file is the human's to provide, never fabricated.

## Don't

- generate mid-layout, open a preview, or accept / unaccept a variant — **except a take the human named**: `konte accept <variantId> -y` records their sign-off.
- develop past the current sequence before its review is in.

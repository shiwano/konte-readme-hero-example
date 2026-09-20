---
name: production-guide
description: How to decide whether and how each shot's motion is produced — composition/file over generation, then the anchors the beat needs (a pinned first or last frame, carried subjects or a voice, the stem as the take's own track, or none) and the adapter that offers them — trading control against cost. Read before a shot's panels are drawn and again when its motion is wired; not for whether it's good or how it's written.
user-invocable: false
---

Deciding, per shot, **whether and how to produce its motion**. Out of scope: whether a shot is _good_ (`direction-guide`), the DSL syntax to write it (`authoring-guide`), and which model fits a look (`konte adapter list` — each adapter's description states its lean).

## Routing — decide in this order

**The beat names its anchors; the anchors pick the adapter.**

1. **Does it need AI generation at all?** A Ken Burns push/pan/zoom **over a static image**, a subtitle / UI / card reveal, or trimming and placing existing footage → staged in `<Composition>` (`composition-guide`), wired as a `file` asset, or done with a `local` adapter (resize/blank) — **not generated**. (A camera move that should also stir parallax, hair, light or background is generated motion — step 4.) A `graphic` beat's picture always stops here; its `cutin` is routed from step 2 as a shot of its own.
2. **Is a performance the driver?** A spoken line, singing, dance, an instrument, any motion timed to a track → the sound and the picture have to come out of **one pass**. Decide this **before** end-state — a performance can have a clear end and still belong here.
   - **The stem rides in one of two ways** — as the take's own track (the given recording, exact timing) or as a voice reference (re-spoken by the model, on its own timing). A line a mouth has to match takes the first.
   - **Muxing an authored voice over a take that generated its own audio is not the fallback** — see Pitfalls.
3. **Does it carry material or continuity?** A recurring character, a specific product / logo / real person, a look matching an **already-accepted visual** → anchor on generated material, **never text alone**. A general style or world tone alone can still be text alone.
4. **Which anchors does the beat need — the ones it needs, not the ones already drawn.**
   - **A pinned first frame** — a seam-frame chain, a match into an accepted panel: the take must open on exact given pixels.
   - **A pinned last frame** — the exception: the viewer must see that exact picture and no plausible one will do — a match cut into the next shot, the seam of a long take (the beat after declares `join: "continuous"`: pin this take's end to THAT beat's first panel, `animatic.shot("02").image("first")`; `join-unpinned` asks for it), a reveal whose final framing is held, a transform's finished state. Anything else waits for a reroll to actually miss the end: a set arrangement of several elements, an expression the prompt keeps failing to reach. **"The action completes" never qualifies** — any plausible landing reads, and a cut hides endpoint imprecision that interpolation can't; a leap, a draw, a waking face all land on their own. Test: **could the prompt say where it ends, and would any plausible landing do?** Yes → don't pin the end. The prompt still has to arrive at the end frame.
   - **Carried subjects, a recorded move or a voice** — several recurring figures in one frame, an identity holding across sheets, a look no panel drew → references.
   - **The stem as the take's own track** — from step 2.
   - **None** → text alone.
5. **Pick the adapter that offers every anchor named, and reaches the beat's length** — `konte adapter list --backend <kind>`, then `konte adapter show <adapter>` for its inputs. **None on the backend offers them all → change adapter, or drop an anchor deliberately and say which** — quietly settling for less ships a beat missing the one thing it needed. A beat longer than the model's maximum clip → Past the model's clip cap.
6. **Keep iteration cheap** — see Cost ladder.

## References — carried, not pinned

- **Tagged references build the shot** — images, and on some models clips and audio: subjects, sets, costumes, styles, a recorded move, a voice. Which reference belongs in which slot, and how each is cited in the prompt body, are the model's call (`prompt-guide`).
- **References steer, they do not pin** — a panel passed as a reference carries framing, palette and style; its pixels do not open the clip. Only a first/last-frame anchor does.
- **A voice reference is re-spoken, not lip-synced** — the model performs the line in that timbre, on its own timing.
- **Every reference is paid for on every sampling step** — pass the ones the shot needs, not the whole roster; the model's guide carries the per-reference cost and any cap.

## Pinning the first frame only — the default

- **One `<Panel>` per shot** — the take opens on it, motion steered by the prompt, the end pose left to the model. A board where most shots carry two panels is over-pinned.
- **Cheapest, and often more stable than pinning both ends** — short ambient cuts, generated camera moves, and shots where a natural expression or texture matters more than a precise end pose.

## Pinning both ends

- **Two pinned frames are less control, not more** — the model must thread a constrained path, and the authored `last` (an image edit plus its review) is paid before any motion.
- **The pair decides the quality** — if a viewer couldn't draw the one obvious trajectory between the frames, the model can't either, and the clip morphs.
- **`last` is `first` advanced one beat, never an independent generation** — derive it by an image edit changing only the intended delta; every unintended difference (lighting, lens, a background detail) is spent mid-clip as identity morph. Wire: the animatic shot declares two `<Panel>`s, the adapter takes them as its first/last-frame anchors.
- **A declared long take has no delta at its seam** — a `join: "continuous"` pair is one take split across two beats, so the second beat OPENS on the frame the first CLOSES on: one frame. Draw it once and pin it on both sides — `endImage` of the beat before and `startImage` of the beat after; generated twice, the seam is a cut with no cut in it.
- **A removal reverses the derivation** — edit models add reliably and delete poorly: generate the uncovered state as `last`, derive `first` by adding the covering element.
- **One axis of change, composition overlapping** (`staging-guide`'s one-mover rule). **Flip test before paying for motion**: toggle the two frames rapidly — "the same shot a moment later" interpolates; "a jump cut" morphs.
- **Match clip length to the action's real time** — over-long for the delta invents idle drift, too short warps.
- **The change spreads evenly over the clip and no prompt retimes it** — produce "action + hold" as a short pinned clip plus a composition trim/hold (live-rendered, free), not one stretched clip.
- **Far-apart endpoints are a beat smell** — usually two actions in one shot: add a mid keyframe, or split the shot at the direction.
- **The motion prompt describes the path between the keyframes and names both** — an end frame the prompt never names fails the load (`prompt-guide`).

## The stem as the take's own track

- **When a given recording drives the motion** (lip-sync, dance, instrument performance) — the picture follows that file frame for frame.
- **That input takes one file** — the beat's `animatic.stem`.

## Text alone — no anchor

- **Straight from a prompt** — for one-off shots needing no continuity or exact design fidelity: establishing shots, crowds, environments, distant/wide views, non-branded objects.

## Past the model's clip cap — chain on a seam frame

- **A beat longer than the adapter's maximum clip is generated in segments**, each conditioned on the frame the one before it ends on — `asset(…, adapters.videoFrame, { source, at })` extracts that frame, so the seam carries the previous segment's exact pixels. **The seam is a pinned first frame** — a reference holds the look but not the seam.
- **Cut the segments in the composition, not on disk** — `at` and the clip's `<Video duration>` name the same instant, so one `const` holds both and no trim asset is needed.
- **Cut short of the segment's end** — a motion model degrades across its last frames, and a tail fed forward compounds across every seam. `at: "last"` is for a clip nothing continues from.
- **Chain only where the picture is continuous** — a costume change, a time jump, a new layout is an authored discontinuity: give it its own panel and condition the next segment on that. Those segments generate in parallel; a chain is accepted one link at a time.
- **Each link inherits the last one's drift** — past a few segments the look walks; a longer take is usually several beats.

## Cost ladder — keep generation cheap to iterate

- **Open on the cheap pass** — the adapter's fast/low-fidelity mode (`konte adapter show` for the ladder). A slow-pass quality guard like a negative prompt is a second-pass tool for a drift you've _seen_, never a first-pass guess.
- **Turn `policy.format.size.megapixels` down, not the delivery** — the working canvas is derived from that budget, so it is the one dial that makes every generation cheaper. The shipped resolution stays on `size.delivery`, reached by `export.delivery.upscale` at export.
- **Generate the minimum** — develop one direction sequence at a time (`layout-guide`), leave the rest `pendingShot`; don't generate motion composition can stage (step 1).

## Pitfalls

- **A voice muxed over a take from a model that generates its own audio** — the lips are conditioned on the written line, the words on a separate TTS pass, and the two start at different instants; no volume, offset or trim reconciles them. Route the voice into the take (step 2), or let the model speak it and drop the TTS.

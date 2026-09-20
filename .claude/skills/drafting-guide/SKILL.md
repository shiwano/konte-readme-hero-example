---
name: drafting-guide
description: Turn a human's concept, script, or shot plan into a signed-off brief and an accepted direction — take in what they bring, hear what they picture, pitch and critique the concept, decide the backend, author direction.ts and drive its review. Read before the first shaping conversation, when starting a new video, or when revising the direction. Authors only; laying out animatic.tsx / video.tsx is layout-guide's.
user-invocable: false
---

Translate what a human wants to make into the direction every stage builds on — the signed-off concept captured in `direction.ts` and accepted. Done = every direction part accepted; laying out the stage files is `layout-guide`'s, generation and stage review `generation-loop-guide`'s.

- **Stay thin on mechanics** — delegate DSL, adapters, prompts to the guides below; spend your effort on the hearing and the pitches.
- **Read `scenario-guide` then `direction-guide` first** — the beats' content is invented in the former (premise, character, beat chain, the pitch cull); the latter owns the direction's structure (`direction.ts`: lens + beats) and the judgment behind every length, cut, and frame.

## 1. Take in what they bring

A human arrives with some mix of three inputs — **ask which they have:**

- **Concept** — a script/shot list (honor it; map onto konte's shape with minimal restructuring) or a vague idea (then you propose).
- **Material** — their own media to put _in_ the video (footage, character/product/logo image, BGM/SE). Separate "already have" from "to generate"; `layout-guide` wires the files in.
- **Reference** — a link/video/image shown as "make it like this" → **direction, not material to include.** Pin down _what_ to emulate (tone, pacing, palette, framing, motion, subtitles); read what you can, ask the rest.

## 2. Hear what they picture — before any pitch

**Ask in rounds, not as a questionnaire** — two or three questions at a time, each next round shaped by the last answer — and stop when every line below is filled; a pitch made before that answers a brief you invented. "Just make something" fills the rest yourself; say what you assumed.

- **Why, and where it plays** — the purpose (a laugh among friends, a portfolio piece, a product's feed) and the surface (a feed thumbed with the sound off, a screen watched sitting down). The two set the runtime, what the first second must do, and whether on-screen text carries the piece.
- **The feeling they want left behind** — offer the `pleasure` vocabulary (`direction-guide`'s lenses.md) and let them pick, never ask cold; then the one line they want a viewer to say afterwards.
- **The picture in their head** — they usually have one before they have a style; Ask what they see when they imagine it, open, and follow what comes back: whatever they mention first is what matters to them, so the next question goes deeper into that, whatever it is — a figure, a light, a pace — never across a checklist. Write it back as they told it and let them correct you.
- **What they love, precisely** — a piece each, and _which thing_ in it: a rhythm, a face, a palette, the shape of a joke.
- **What they have had enough of** — the shape they scroll past, the AI-video look they are tired of, the version of this idea everyone has made. It is the first draft of `outOfScope`.
- **What is fixed** — runtime, a character or product that must appear, the language, a deadline, a spend ceiling.
- **Mirror it back before the first pitch** — one paragraph in their words: what it is for, who watches it where, the feeling, the picture they see, the loves, the bans, the fixed points. A correction here costs a sentence; after a pitch it costs the pitch.

## 3. Settle which piece

- **New piece → `konte video new <name> --template blank`** — even when the workspace holds videos; **never author one into an existing video's files**. Ask when it isn't explicit.
- **Continuing one → `konte status` before editing** — learn shot IDs, adapters.
- **Deriving from a sibling video → still `konte video new`; a copied file is a draft** — re-author each against the guide that owns it (`direction-guide` here, the stages `layout-guide`'s) before editing it.

## 4. Pitch and pick

- **A vague concept is pitched under `scenario-guide`'s cull** — three loglines out of the wide set. A brought script or shot list (step 1) is never re-pitched.
- **Present each pitch with its cull answers** — the human picks or blends. A pick is a pick: it opens step 5, and authorizes nothing else.

## 5. Agree the treatment — the gate before any file

Nothing is written to disk until the human has said yes to the treatment, in so many words. "Make a video about X" authorized the conversation, not the file.

- **Develop the pick into a treatment** — tone, look, rough runtime (propose defaults, marked as yours), the recurring characters, props and places (each a `characters` / `props` / `locations` entry, anchored to a `reference:<id>` — `direction-guide`), and the frames the beats will share (each a `setups` entry; a frame used once is a declaration and nothing more). **Ask only for forks you can't guess past** — live-action vs anime, aspect ratio, length. **Never pitch a shot-by-shot cut in chat** — the cut is authored under `direction-guide`'s rules and reviewed in the direction preview, or its sign-off gets re-litigated.
- **Send the treatment as one message, then the question alone** — logline, hook, the feeling and the viewer's line, tone, look, runtime, who and where, the frames; then "shall I write this up as the direction?" With a native choice UI, that is the only question on it.
- **What is not a yes** — the pick in step 4; "sounds good" on one part; silence; a question back; a "yes, but…" (fold the "but" in, re-send the treatment, ask again). Only a plain yes with nothing attached opens step 8, and a treatment changed after it needs a new one.
- **Capture the yes into `direction.ts`'s `brief`** at step 8 (fields per `direction-guide`) — the chosen pitch's hook answer is `hook`, the bans from step 2 are `outOfScope`.

## 6. Decide the backend

- **Put the backend choice to the human explicitly** — recommend a path from what's connected + the concept, then confirm. Never default to a cloud vendor unasked.
- Weigh **connected** (`konte doctor --backends` surveys each — missing key / unreachable = unavailable), **cost** (ComfyUI local, low cost, needs a running server; FAL cloud, pay-per-use, ready now), and **look** (a matching model on a backend, or a custom workflow needed).
- **Pick the specific model deliberately, not from memory** — read the leans off `konte adapter list`; a wrong model is the costliest choice to reverse once a cut is built on it. **When two fit, take the one neighbouring shots already use** (a mid-sequence switch risks a visible look shift), and confirm the lean on one cheap take before a whole cut rides on it.

## 7. Feasibility check

- **Confirm the adapters can produce what the concept needs → `konte adapter list --backend <kind>`** (step 6's backend). Shots on brought material need no generation.
- **Missing something (e.g. a ComfyUI workflow)? Flag now → `konte-comfy-workflow`.**

## 8. Author the direction — after step 5's yes, before any stage content

- **Write `direction.ts`** — only now; the `brief` is step 5's treatment; add lens + `direction.shots[]` + `characters`; clear `konte status`'s direction findings (fix or waive).
- **Then a split pass — the direction check can't read prose**: check every `action` against the one-action rule. **A pass that changes nothing on a first draft is suspect** — go find the fused trigger-reaction pair. Then an idiom pass over the hinges and peaks: a key action staged as one take is a missed chain. Then a continuity replay: walk the list as one continuous space — every "how did it get there?" is a missing shot.

## 9. Critique the cut

A fresh **`konte-direction-critic`** subagent reads the cut and returns findings; clear the blocking ones before the direction goes to review. Step 8's checks come first.

- **Two spawns in sequence** — clear the first one's blocking findings, then spawn a second fresh critic on the rewritten cut and clear its own. A cut the human has already reviewed skips both.
- **Spawn it fresh, never as a fork** — a fork inherits your reading of the piece, which is the one thing the critique is for. Under Codex, name `konte-direction-critic` in the request and carry no history (`fork_turns: "none"`).
- **Pass one thing and nothing else** — the path to `direction.ts`. No history, no recap, no reason a choice was made: the explanation is what hides the defect.
- **Fix every blocking finding** — or, keeping one on purpose, write it into `brief.tolerances` with its reason, never into the spawn prompt: the contract skips what the piece has agreed to carry, so the same note stops coming back.
- **A spawn that won't run is the human's call** — ask, naming what the pass covers: unblock it, or go on without. Their go-ahead is what sends you to [self-critique.md](references/self-critique.md) — don't improvise that pass, and don't skip it.

## 10. Get it accepted

- **Get the direction accepted before writing any animatic/video/reference content** — `generate`/`reroll`/`export` abort with `DIRECTION_ACCEPTANCE_REQUIRED` until then; chat sign-off (step 5) doesn't substitute.
- **Run the review per `review-guide`, scope `direction`** — hand off, `konte preview direction`, read the record back.
- **Iterate feedback here, not later** — fix the direction (or waive with a reason), hand off again, re-preview; loop until accepted.
- **Any edit to `direction.ts` re-blocks the parts it changed** until the human accepts them again — prose included. The rest stays signed off; `konte status` names the count.
- **Once the direction is accepted end to end, don't reopen this preview** — re-entering here to retune a beat, a roster entry or the arc is an edit and a report, not a review: the human signs those off in the stage review of the panel or shot that realizes them. Only `brief`, `policy` and `waivers` bring you back, and `konte status` says so by offering `konte preview direction` under Next steps.

## 11. Hand off

- **Report in plain language** — the agreed concept, the direction's shape, what was fixed or waived in review.
- **Next — carry straight into `layout-guide`** to lay out the stages; report, don't stop for a go-ahead.

## Confirm before

- writing or rewriting `direction.ts` — step 5's plain yes, every time;
- the concept is too vague to fix a shot structure;
- the backend / adapter is undecided;
- a change substantially affects already-accepted work, a shot ID, or the runtime/structure — never break one silently; say what it invalidates.

## Don't

- generate, open another stage preview, or accept / unaccept a variant.
- rewrite the human's concept on your own.
- pitch before step 2's mirror paragraph has been confirmed.
- write `direction.ts`, or any file, before step 5's yes — however settled the backend and the roster are.

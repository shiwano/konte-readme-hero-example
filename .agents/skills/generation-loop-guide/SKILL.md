---
name: generation-loop-guide
description: Drive one stage — reference pool, animatic, or video — through generate → wait → self-review → human review → iterate until every reviewable asset is accepted. Read when the user wants to build the reference pool, complete the animatic, complete/refine the video shots, run a stage, or whenever you reach a generate/wait/reroll step.
user-invocable: false
---

One loop drives every stage to "every reviewable asset has an accepted variant." Run it once per stage per direction sequence: the reference pool first, then a sequence's animatic and its video before the next sequence's animatic.

## Stage matrix

Substitute your stage's `<scope>` / `<address>` into every step below.

- **`reference`** — scope `reference`; upstream gate: none; self-review image, audio; two passes (below); done = every returned generative asset accepted → the animatic
- **`animatic`** — scope `animatic`; upstream gate: reference pool accepted; self-review image, audio; done = every **developed** shot accepted (`pendingShot` shots are undeveloped, not gaps) — an accepted sequence goes to `layout-guide` for that same sequence's video shots
- **`video`** — scope `video`; upstream gate: this sequence's animatic frames accepted; self-review video frames, motion, audio; done = every developed shot accepted → `layout-guide` for the next sequence, or `export-guide` when none is left

- **The reference pool runs twice** — pass 0 is the look proof alone: run the loop on it. Every later prompt is written to its accepted take. Pass 1 is the rest of the pool, rosters wired.
- **Each stage has one review stream, shared by every sequence.**
- **A `direction` character reference is done only when accepted in `konte preview reference`** — cascade/"consumed accepted" never counts for it; finish its reference review before the animatic gate.

## 1. Preflight

- **Run `konte doctor`** — on a missing backend key or disconnected backend (`FAIL ...`), stop and follow `config-guide` first.
- **Check the direction gate** — `generate` aborts with `DIRECTION_ACCEPTANCE_REQUIRED` while any part is unaccepted or stale, until the direction has been accepted end to end once; after that only `brief`/`policy`/`waivers` abort, so an edited beat does not send you back (reference is exempt throughout). When it does abort, drive the direction review in `drafting-guide` first. `pendingShot` shots are `layout-guide`'s to develop, not this loop's.
- **Check the upstream gate** — the upstream stage's Progress line reads `all N accepted` (`konte status`); else drive the upstream through this loop first. Video enforces it (`ANIMATIC_ACCEPTANCE_REQUIRED`).
- **The board is accepted before the motion it feeds** — `generate video` aborts (`ANIMATIC_ACCEPTANCE_REQUIRED`) on any `animatic:` address a shot consumes with no accepted take: its keyframes, and its `#stem` where the beat speaks. Take the board through one review of the whole reel (step 5) and run again.

## 2. See what's missing

- **`konte status`** — your stage's Progress line; `all N accepted` → stage done.

## 3. Generate

- **New or rewritten definitions clear `layout-guide`'s self-check before they meet a backend.**
- **Generating what has no accepted variant needs no go-ahead** — on a paid vendor backend report the batch size and expected cost in one line, then generate. Ask only before a run that invalidates accepted work — `konte clean`, rerolling an accepted asset by its address.
- **`konte generate <scope>`** — submits all the stage's assets at once, async; dependency-free assets start immediately, dependent ones cascade as inputs become ready.
- **`generate` never replaces an accepted take** — an accepted asset is skipped even when stale; the run and `konte status`'s Next steps name each one `accepted but stale` with the step that settles it.
- **Open on the cheap pass** — `production-guide`'s cost ladder; no slow-pass quality guard before self-review (step 5) shows it's needed.

## 4. Wait for jobs

After `konte generate` or `konte reroll`:

- **`konte job wait`** — this is how a run ends. It returns when the queue drains: run it in the background without extra confirmation, on its own. **Never close a turn with jobs in flight.**
- **A pending job is waiting on an upstream job, NOT failed** — it submits and drains on its own once its dependency is ready, another asset, a multi-GB comfy model download, or a node install + reboot. Don't reroll.
- **A job stuck running far too long** → `konte job show <jobId>` — its diagnosis separates a slow model, a prompt ComfyUI lost in a crash, and a job no worker is watching.
- **On failure** → `konte job show <jobId>` for the diagnosis, then `konte job logs <jobId>` for the full log; fix the cause, `konte clean <stage>` and `konte reroll <address>`. **A batch that failed in several places → `konte reroll --failed --yes`** — it retries every address `konte status` reports under Problems.

## 5. Self-review before involving the human

**`konte status` for progress and failures, then look at every generated asset before the human does**, sampled by media kind — skip `file` assets and `pendingShot` shots. Resolve any asset's file with `konte ref <address>...` (the accepted variant, else the newest ready non-stale).

**Your eyes settle what can be counted, never whether it is good** — the wrong subject, a figure too many or too few, an empty frame, a missing element, a take that never moved, a line not carried. A doubt you cannot name in those terms is a note in the handoff, not a reroll.

- **A shared base image is reviewed before the panels built on it, and on its own terms** — set state, realism register, scale, not "does the beat read". A defect there is the root's reroll, never a note on one shot.
- **Image** (animatic panels, reference characters/backgrounds): view the file against the shot's `action` (and `script`, if any) — right subject, character consistency across shots, no artifacts. A `first` panel must be able to launch the transit its beat needs — the contacts and positions that transit starts from are in the pixels, or it's a reroll however clean it looks. A recurring character reference must be a clean single-subject conditioning frame, not a turnaround sheet.
- **Board batch**: `konte probe contact-sheet` — shots side by side in one sheet. **`--needs-review [scope]` first after a `generate`**: every landed take nobody has judged, each cell carrying its variant id. Otherwise `<variantId|address|scope>...`: a still scope sweeps every image under it; a video scope tiles each shot's in/out pair, so a cut reads across the boundary. Detail too small to read: `--cell-width <px>`. A tail artifact is judged on the clip's own filmstrip, never off this sheet. Same-size-and-angle neighbors are a reroll unless a match cut is intended, and a planted prop must stay readable across its cuts.
- **Video frames**: `konte probe reel-thumbnails <animatic|video[:shot.<id>]>` (a composition's own frames, scene-detected; `--at <timecode>` for an exact moment) or `konte probe thumbnails <variantId|address|scope>...` (raw clips).
- **Motion**: `konte probe motion <variantId|address|scope|…#composition>...` — a filmstrip per clip or composition; a scope sweeps every clip. Sampled stills: read adjacent tiles for _did it move_, trajectory and sustained breakage: `low_motion` carries the beat's `action` and the board's `blocking`/`camera` under it and is a reroll only where those asked for movement, `dispersed_motion` means nothing moved and something churned, and a strip reading static with no `low_motion` warning means the movement is finer than the tile spacing — zoom with `--window 0.8` or `--at <sec>` first.
- **Audio**: the assembled mix → `konte probe reel-audio <animatic|video>` (`:shot.<id>` narrows) — per-track waveform, timing, silence warnings. Raw sources → `konte probe audio <variantId|address|scope>...`.

**Animatic: then the board, cold — spawn `konte-animatic-critic`** with this sequence's shot ids, fresh and never a fork, handed nothing else; take or answer each finding, once per sequence, after the countable defects are cleared and before the panels' movement is written. Under Codex, name it in the request and carry no history (`fork_turns: "none"`). **Judge the assembled cut as a sequence, not asset by asset** — per-shot checks pass on a flat, monotone cut; weigh each cut in **Walter Murch's Rule of Six** order — emotion, story, rhythm, spatial continuity last. **Read `staging-guide` and run its read-test per beat.**

**Fix what you found, then re-check — never hand the human a frame you already know is broken.**

**Draw again before you rewrite.** A broken still is one sample — `konte reroll <address>` before touching the wording, and rewrite only when several draws fail the same way.

**Write the fix as what should be there, never the flaw** — a model conditions on what the prompt names, so naming the fault amplifies it. Route the flaw:

- the frame — wrong subject, a missing or extra element, dead performance, broken motion, who stands where → its `prompt` (`prompt-guide`, audio cues included) → reroll
- one local element on a take otherwise right — add, remove or recolour it — once a reroll on the fixed prompt still misses it, or the human wants the take kept, and the medium has an edit route (`konte adapter list`) → **`konte patch new <address>`**, the edit in the shape its adapter's guide gives, then generate. A failed patch leaves the take; `konte patch remove <variantId>` (the take it was written against) drops the fix for good. A further fix is another step in that same script — a take a patch produced cannot be patched again.
- the beat doesn't read — framing, staging, continuity → the animatic panel: restage, reroll the chain, never papered over in the motion prompt
- a pinned endpoint — pose, gaze, hands at start/end → the animatic frames pin it, not the prompt: edit the panel, reroll the chain
- the note is about the movement, not the frame — "give it more motion", a transit that doesn't read → the panel's `blocking`/`camera` (`staging-guide`): rewriting them answers it with no new take, and the comment goes stale on its own
- pacing, beat order, runtime → `direction.ts` (`direction-guide`) — no reroll fixes it; retuning a beat's own words (action/script/duration/setup) is re-signed when the human accepts that shot in the stage review, while retuning the setup itself is re-signed on `direction:setups.<id>`.
- subtitles, overlays, transitions, BGM/SE mix → the `<Composition>` (`composition-guide`) — re-renders live, regenerates nothing
- an action off its SE in the stem → the board's `<Audio start>`, then reroll the motion

**Before a third take at one address, cut its prompt back to one sentence and specify again from there.** Two rounds of fixes leave a prompt carrying every condition each round added, and a model drops the sentence along with the term it cannot hold. Re-add only what the take actually misses.

- **`konte reroll <address>`** — then wait (step 4) and re-check. Rerolling switches the shown variant, marking any addressed feedback **stale** (resolved). **If the asset feeds another in the same stage, add `--with-dependents`** — the chain rebuilds in dependency order, stopping at an accepted take. A whole stage or shot is rerolled by its address-scope (`konte reroll video:shot.05 --yes`), which skips what it cannot spend on and accepted takes.
- **A reroll that came out worse → `konte dismiss <newVariantId>`** — the address falls back to the take before it, still undecided and undeleted. It falls back only to a take matching the current definition, so where the reroll followed a prompt edit, restore the prompt instead: `konte inspect <address>` diffs each take against the live one.

**Video, last sequence: with the takes settled, run `polish-guide` before handing off** — once every shot holds a self-reviewed take and no sequence is left, so the human reviews the finished cut once and its compositions and stems are accepted with the shots.

**Animatic: with the takes settled, write each panel's movement before handing off** — the transit the frame it now has can launch (`staging-guide`). `konte preview animatic` aborts with `REVIEW_PREREQUISITE_MISSING` until every panel holding a take has both, and `konte status`'s Next steps names the shots still owing them. Nothing re-checks it afterwards, so a reroll that changes what the frame can launch is yours to rewrite.

## 6. Human review

- **Hand off, preview, read the record → `review-guide`** — `<scope>` is your stage's; come back here with the submitted decisions. The takes they name to go back to are yours to record: `konte accept <variantId>... -y`.

## 7. Iterating on feedback

For each target with open feedback, **accepted or not**: **run step 5's fix on the human's words** — read the comment with its pin and `[image: <path>]` frame, write the sentence, and where it won't write, `staging-guide`'s feedback rule. A note changing what the beat shows goes into its `action` too. Then wait (step 4), self-check (step 5), re-review (step 6).

Loop until the stage matrix's "done =" holds, then report the accepted variant per asset and take that row's exit.

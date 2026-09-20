---
name: konte-checkin
description: Check in with the human at the start of a session — recap where things stand, propose what to do next, surface the choice. Use when the user opens a session, asks "where are we" / "what's next", or wants to catch up on the last run.
user-invocable: true
---

Read the state of **one video** and check in, in plain language, on where it stands and what you'd suggest next — then let the human decide. The check-in is read-only — it explains and asks, never generating or changing review status.

## 1. Open with `konte video current` — it settles which piece this session is about

- **Then `konte inspect direction:brief` — in every branch below that carries an existing piece on, including the ones that skip section 2.** `Look` (its medium binds every prompt), `Out of scope`, and `Tolerances` — flaws already signed off, never to be fixed. Read this, not `direction.ts` — the beats are not yours to re-narrate.
- **They asked for a new piece** ("let's make X", "start the next one") — **skip section 2** and go to section 3's "Nothing authored yet".
- **They asked nothing, and `Last export:` is filled or `Runtime: no shots yet`** — **skip section 2**: report from the digest and let section 5 ask, revise it or start the next one? Read section 2 only if they carry it on.
- **Otherwise** — they're orienting on a piece still in production: section 2.
- **`Video: none selected` / `none — … no longer exists`** — `konte video list`, then ask which; never guess.
- **Always name the piece in the check-in.**

## 2. Read the piece — only once it's settled they mean this one

- **`konte status`** — review status (accepted / none), staleness, and its Next steps.
- **`konte job list`** — running / failed jobs; not in `status`, and they outrank everything else you'd raise.
- **`konte review feedback list`** — the comments that still stand.
- **`konte review record show --verbose`** — the latest review's decisions and feedback.
- **Translate, don't re-derive** — render what these commands report (state + Next steps) into human language; never reason your way to a different conclusion about what is stale, accepted, or needed.

## 3. Decide what to raise (priority order)

0. **Nothing authored yet** — no video in the workspace, or one with no shots defined: propose shaping the concept, and **read the `drafting-guide` skill before asking the first shaping question** — the shaping conversation (concept, backend, `brief`) is structured there. Don't generate or accept.
1. **Generation in progress** — report the wait and what follows completion.
2. **Failed or blocked generation** — likely cause, retry plan, what it blocks.
3. **Outstanding feedback** — explain how you'd address comments that still apply. Neither mark is authoritative — not every non-stale comment is a to-do, not every stale one is done; when unclear whether a comment stands, ask.
4. **Unaccepted variants** — propose tidying acceptance from the review results. Exclude `pendingShot` shots — undeveloped by design, no variant to accept; developing one is new authoring, not a pending accept.
5. **Everything accepted** — propose export; reopening it (`revision-guide`) only when they ask. Deliberately-deferred pending shots don't block it.
6. **Not confident?** — don't invent a plan; say plainly a judgment call is needed and hand it over.

## 4. Write the check-in (human-facing, in the project's language)

- **Short and scannable** — a few lines: where things stand, what you'd do next, what to decide. Skip any point with nothing real to say.
- **Cover as needed** — where things stand; what you'd suggest (a proposal, not a decision made); what it leaves untouched (only when there's accepted work to protect); what to decide (a choice, not a yes/no).
- **Don't re-narrate the design** — the human authored it; reference the piece in a phrase ("the 3-shot intro"), not a shot-by-shot synopsis.
- **List what needs approval** — anything destructive or touching accepted work; a paid generation is reported with its cost, not gated on approval.
- **Don't re-confirm work the human already asked for** — approval is for what you propose yourself and what invalidates accepted work.

## 5. Offer choices, not a yes/no

- **First decide whether there's a real choice at all** — if the only sensible next step needs no gating and paths don't diverge, state it in one line, ask a simple go-ahead, carry on.
- **When there is one, present it from the human's seat** — they haven't seen current footage, so don't ask for creative direction (look, pacing, mood) they can't judge from text; recommend a path, then surface the choices this moment actually offers, read from the real situation, not a fixed menu.
- **Use the runtime's native choice UI when it has one, and reserve it for the final question alone** — present the recommended path first; with no such tool, a compact numbered list, one line each. Keep the explanation in prose.

## 6. After approval

- **Done = the check-in delivered and the human's decision in hand** — then carry out the work yourself, reading the right skill before acting: `drafting-guide` (no video yet, or shaping/revising the concept and direction), `layout-guide` (shots not yet defined, developing pending shots, or restructuring), `generation-loop-guide` (generate and review a stage), `revision-guide` (improving or fixing an accepted or exported piece), `export-guide` (final render once shots are accepted).

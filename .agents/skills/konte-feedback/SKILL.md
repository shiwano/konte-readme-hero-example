---
name: konte-feedback
description: Turn one konte bug, rough edge or unanswered question hit this session into a post for the konte Discord #support forum — reproduced, with version and logs, secrets and the piece's content stripped, tagged. Use when the user says "report this", "file a bug", "send feedback", "ask the maintainers", a konte command printed a stack trace, or konte itself misbehaved and they want it reported.
user-invocable: true
argument-hint: [what to report]
---

Done = one post, approved by the human, handed over as paste-ready text with its tag; not fixing konte, not a session-wide list of every friction.

## 1. Decide whether it earns a post

- **konte's fault, not the model's** — a crash or stack trace; an exit code that contradicts the output; two konte surfaces disagreeing (`status` vs `inspect`, the review UI vs the CLI); an error naming neither cause nor fix; a `Next steps` line that did not work; a guide or skill contradicting real behavior; a workaround you had to invent. Not a limit `HOUSE_RULES.md` or the direction chose.
- **One post per cause** — unrelated ones are posted one at a time.
- **Cosmetic, or a preference** — batch them into one `feature` post, and only when the human asks for it.
- **A "how do I"** — read the guide; what the guide did not answer is a `help` post.

## 2. Reproduce before you write

- **`konte doctor` first** — an environment failure it names is not a bug.
- **Rerun the exact command** and record the exit code (`konte …; echo "exit=$?"`). Once only → still worth posting if you hold the log; mark it `seen once`.
- **Minimize** — the smallest command, and the smallest edit to the definition, that still triggers it.
- **Don't rerun a paid generation to reproduce** — for a job, report from what already ran.

## 3. Collect the facts

- **Always**: `konte --version`, `uname -sr`, the coding agent driving (Claude Code / Codex), the exact command, its full output, its exit code.
- **A job**: `konte job show <id>`, then `konte job logs <id>` — the last 40 lines, plus the first error line.
- **State or staleness**: `konte inspect <address>` for the address in question; the matching section of `konte status -v`.
- **Definition-side**: the smallest excerpt of the stage file that triggers it, with the adapter name (`konte adapter show <adapter>` gives its backend).
- **Docs-side**: the file and line of the guide or skill, and the behavior it contradicted.
- **Quote command output**, not `jobs.db` or `konte.state.json`.

## 4. Strip before it leaves the workspace

- **Never a credential** — no value from `konte.credentials.json`, no env var value, no key or token inside a URL (fal signed URLs, ComfyUI tunnels); name the variable, redact the value as `<redacted>`.
- **The piece is the human's** — prompts, the brief, dialogue and generated media stay out unless the bug needs them; ask before quoting any, and prefer a placeholder (`"prompt": "<a 40-word scene prompt>"`).
- **Home paths** — replace `/home/<user>` and `/Users/<user>` with `~`.

## 5. Write it — in English

**Always English**, whatever language the session runs in.

**Tag**, one:

- `bug` — konte did the wrong thing (section 1's list).
- `feature` — konte worked, but the job took a workaround, extra steps, or something it lacks.
- `docs` — a guide or skill said one thing and konte did another.
- `help` — a question the guides did not answer.
- `agent` — the coding agent misbehaved around konte: a skill it did not load, a step it skipped, a command it mis-typed.
- `comfyui` — a ComfyUI-side failure: provisioning, a workflow, the queue.

**Title** — `<command>: <symptom>`, under 70 characters, symptom not diagnosis (`generate animatic: exits 0 after a failed plate job`); a `help` post is the question in one line.

**Body**:

````md
## What I was trying to do

<one sentence>

## What happened

<one paragraph: what konte did>

## What I expected

<one sentence; for feature: what you did instead>

## Repro

1. <state before the command — the smallest edit or accept that sets it up>
2. `konte <exact command>`

exit=<code>, reproduces: yes | seen once

## Environment

- konte <version> · <OS> · <Claude Code | Codex>
- backend: <comfy | fal | local> · adapter: <name>

## Output

```text
<the command's output, then the log excerpt>
```

## Notes

<workaround; suspected cause, labelled "guess">
````

- **`help`** — the first three sections and Environment; Repro and Output only when a command is involved.
- **A `feature` batch** — one line per item under `## What happened`, no Repro.

## 6. Hand it over

- **Show the whole post** with a summary in the human's language when that is not English, and name the tag.
- **The human posts** — after their yes, hand over the title, tag and body as shown, with the forum link: `https://discord.gg/2b7UwFE2Yy`, channel `#support`.
- **Done** = the post, its tag and the link handed over.

## Confirm before

- Quoting any prompt, brief text or generated media.
- Re-running a paid generation to reproduce.

## Don't

- **Fix konte** — no edits under `.konte/`, no patched binary; a workaround in the definition is fine and belongs in `## Notes`.
- **Pad** — a `bug` post with no `konte` line in `## Repro` is not ready; drop it or keep gathering.
- **Report a model's creative miss** — that is a reroll, a prompt edit, or feedback on the take.
- **Open a GitHub issue** — the maintainers open them from `#support` posts.

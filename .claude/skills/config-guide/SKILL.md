---
name: config-guide
description: Bringing a konte project's environment up — API keys, ComfyUI connection, editor type-checking. Read when starting a fresh project, when a command reports a missing key ("is not set") error, or when konte doctor reports a ComfyUI connection failure.
user-invocable: false
---

Run through the relevant section before generating anything.

## API keys

1. Run `konte doctor --backends` — it surveys every backend (ComfyUI, FAL). Each unconfigured one prints a line with the variable name and where to obtain it, e.g.:

   ```
   ! WARN FAL connection: FAL_KEY is not set. Run "konte settings" and set it under Credentials (or export it in your environment). Get one from https://fal.ai/dashboard/keys.
   ```

   These are `WARN`, not `FAIL`: a survey flags every backend you _could_ use, and you only configure the ones you actually will. Once an adapter is wired, plain `konte doctor` turns the backends the project uses into `FAIL` gates.

2. Ask the user to run `konte settings` and set the listed keys on the **Credentials** tab — you cannot read or edit `konte.credentials.json`. Name the keys and the source URL from the message.
3. Re-run `konte doctor --backends` to confirm the backends you need now report connected.
4. A vendor you have not configured — comfy without `comfyui.url`, fal without its key — is refused by `generate` and hidden from `konte adapter list`. `file`/`local` assets need no backend.

- **Non-secret config (e.g. `comfyui.url`)** — edit `konte.config.json` directly, or use `konte settings`' **Config** tab.

## ComfyUI connection

- **`konte doctor --backends` surfaces ComfyUI's reachability** as a `ComfyUI connection: cannot reach <url>` line — `WARN` in the survey, or `FAIL` once an adapter actually uses ComfyUI. Either way, **check in order:** ① ComfyUI is running, ② `comfyui.url` host/port in `konte.config.json` are correct, ③ the host resolves from where konte runs.
- **A ComfyUI behind an auth front** (a remote pod, a reverse proxy) takes `comfyui.headers` in `konte.config.json`, sent on every request. A credential is written as a `${VAR}` placeholder (an auth scheme may precede it) and stored under Credentials; a literal in `Authorization`, `X-API-Key` or `CF-Access-Client-Secret` is rejected.

  ```json
  { "comfyui": { "url": "https://…", "headers": { "Authorization": "Bearer ${COMFYUI_TOKEN}" } } }
  ```

  `doctor` reports a rejected credential as `ComfyUI connection: … rejected the credentials`, distinct from `cannot reach`.

- **WSL2: `127.0.0.1` points at WSL itself, not a ComfyUI running on Windows** — either enable WSL mirrored networking (`networkingMode=mirrored` in `%UserProfile%\.wslconfig`, then `wsl --shutdown`; needs Win11 22H2+) so `127.0.0.1` works unchanged, or set `comfyui.url` to the Windows host IP (can change on reboot).

## Editor type-checking

`konte lsp` is a language server providing TypeScript diagnostics and completion in `video.tsx` / `animatic.tsx`.

- **Claude Code**: automatic — `konte init` ships a `konte-lsp` plugin under `.claude/skills/`. Accept the workspace trust prompt; the official `typescript-lsp` plugin is disabled for this project so they don't conflict.
- **VSCode**: no setup.
- **Neovim**: point a language server at `konte lsp`:

  ```lua
  vim.lsp.config("konte", {
    cmd = { "konte", "lsp" },
    filetypes = { "typescript", "typescriptreact" },
    root_markers = { "konte.config.json", "tsconfig.json" },
  })
  vim.lsp.enable("konte")
  ```

## Next

- **Once setup passes, start your own video** from a concept, script, or shot plan with the `drafting-guide` skill — it shapes the concept into an accepted direction.

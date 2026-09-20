# Dependencies & input types

The lookup for a ComfyUI adapter's `models` / `nodes` blocks and its input types.

## Model download URLs (step 2.3)

- **konte auto-installs enabled `models` entries before running** — models already present on the server are skipped.
- **HuggingFace files** — use the `/resolve/main/...` URL as-is (e.g. `https://huggingface.co/<repo>/resolve/main/<file>`).
- **Gated HuggingFace files** — same plain URL; never put credentials in it. Tell the user to set `HF_TOKEN` in `konte settings` and to accept the repo's licence on its HuggingFace page.
- **Civitai files** — `https://civitai.com/api/download/models/<id>?token=${CIVITAI_TOKEN}`; tell the user to set `CIVITAI_TOKEN` in `konte settings`.
- **Unsure of a URL** — leave the model entry out; konte surfaces a clear error if a missing model is referenced at run time.
- **Declare only what the workflow selects by `filename`** — drop a user-selectable preset, and anything the loader fetches itself (a `download_if_missing` flag, a `model_size` picker).
- **`savePath` places a weight outside its type's default folder** — one entry per file, so a model the node loads by directory is declared file by file, each with its own `savePath`. The same `filename` at two `savePath`s is two downloads.

## Node packs (step 2.3)

```ts
nodes: [
  { id: "ComfyUI-VideoHelperSuite" },
],
```

- **`id` is the registry (cnr) id** — a pack outside the registry is not auto-installed; give it the `custom_nodes` directory name it is installed under.
- **A newly installed pack needs a ComfyUI restart to load** — konte reboots once after install (`comfyui.autoRebootAfterNodeInstall`, default `true`); set it `false` on a shared server and konte asks you to restart and re-run instead.

## Input type reference (step 2.2)

`AdapterInputType` accepts the following values:

- `"string"` → `string` — text input
- `"prompt"` → `string` — the model's natural-language conditioning, read by the prompt check (see the rename conventions for which field earns it)
- `"negativePrompt"` → `string` — the exclusion half
- `"spokenText"` → `string` — the words the model voices (a TTS `text`, a `lyrics` sheet); outside the prompt check, listed by `konte inspect --prompts`
- `"number"` → `number` — numeric input
- `"boolean"` → `boolean` — boolean toggle
- `"seed"` → `number | string` — random seed (auto-randomized)
- `"width"` → `number` — canvas width (auto-filled from `format.size.width`)
- `"height"` → `number` — canvas height (auto-filled from `format.size.height`)
- `"fps"` → `number` — frame rate (auto-filled from `format.fps`)
- `"frames"` → `number` — frame count (auto-filled from the shot's duration × `clock`, or × `format.fps` when the input declares no `clock`)
- `"image"` → `MediaAsset<"image">` — reference to an image asset
- `"video"` → `MediaAsset<"video">` — reference to a video asset
- `"audio"` → `MediaAsset<"audio">` — reference to an audio asset

A `"string"` input may also carry `values: [...]` — the combo (enum) choices a ComfyUI node declares. konte imports them from the server's `object_info` so the field types as a literal union (`"Music" | "SFX" | "Speech"`) instead of a bare `string`; keep the `values` array as generated. An **API-format** import can't reach the server, so its combo fields arrive as plain `type: "string"` with the choices lost — look up the valid values in the model's docs and add `values: [...]` yourself.

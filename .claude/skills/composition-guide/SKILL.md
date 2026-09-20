---
name: composition-guide
description: How to write the HyperFrames composition in video.tsx — the <Composition>/<Video>/<Audio>/<Subtitle>/<Animate> components plus timeline soundtracks and staging patterns (subtitles & titles, overlays, crossfade transitions, Ken Burns zoom/pan, fades, BGM/SE mixing, sub-clip editing). Read when adding or fixing the look, captions, sound, or transitions of a shot in video.tsx.
user-invocable: false
---

Each `shot()` in `video.tsx` returns exactly one `<Composition>` — the layer that arranges generated clips and layers captions, overlays, animation, and sound on top, but never regenerates the AI assets.

- **Size/fps come from `format`, shot length from the shot's `duration`** — components read these automatically, don't pass them.

## Routing

- **Writing a `soundtracks` entry, an `<Audio>` cue, or `<Video hasAudio>`** → [audio-patterns.md](references/audio-patterns.md) — BGM beds via `soundtrack()`, one-shot SE/dialogue, where a beat's spoken lines live — then [sound-design.md](references/sound-design.md) before placing any of them: which layers the cut needs, where music enters and leaves, a bed under a line, sound across a cut, level order
- **Anything beyond one full-frame `<Video>`** — a background clip under an overlay, a `<Subtitle>` or `<div>` title / lower-third, a crossfade, Ken Burns, a fade or flash, a title reveal with `<Animate>`, a sub-clip via `mediaStart` → [staging-patterns.md](references/staging-patterns.md)
- **Whether a shot gets that `duration` or that sound at all** → `direction-guide`

## The composition is a reviewable target

`video:shot.<id>#composition` is a first-class review target (only for shots that return a `<Composition>`), reviewed separately from the AI clips it arranges. No rerolls — it's your code: edit the JSX and re-render.

- **Accept it to review it** — once its clips are all ready it surfaces under `konte status -v`'s **Needs review**; accept with `konte accept video:shot.<id>#composition`, or toggle an "ok" shot in `konte preview video`.
- **Re-review when an upstream clip changes** — `konte status -v` lists it under **Needs review** and `konte inspect video:shot.<id>#composition` shows `input-stale` with the changed input.
- **Feedback lands on the shot target `video:shot.<id>`, not `#composition`** — read it with `konte review feedback list video:shot.<id>`; the cause is either the composition JSX or an upstream clip.
- **Fixing the cause auto-resolves it** — edit the JSX and accept, _or_ reroll the clip and re-accept; either re-renders a new composition and marks the old feedback addressed.

## Components

Import them from `konte`; none is ambient.

```tsx
import {
  Composition,
  Video,
  Audio,
  Image,
  Subtitle,
  Animate,
  Cutin,
  soundtrack,
  asset,
} from "konte";
```

- **`<Composition>`** — root, one per shot. Injects HTML scaffold, GSAP 3.12.5, Tailwind v4, `#stage`. Props: `children`
- **`<Video src={asset} />`** — a video clip on the timeline. Defaults to `muted` + `playsInline`. Props: `src` (MediaAsset), `start`, `duration`, `mediaStart`, `hasAudio`, `volume`, + any `<video>` attr (`id`, `className`, `style`)
- **`<Audio src={asset} />`** — a one-shot sound in a shot (SE, sting, dialogue, narration). Plays once at full length; may extend past the shot. Props: `src`, `id` (cue handle), `start`, `duration`, `mediaStart`, `volume`, `fadeIn`, `fadeOut`, + any `<audio>` attr
- **`<Image src={asset} />`** — a still image on the timeline (logo, character, product, plate, overlay). Whole shot unless windowed. Props: `src` (MediaAsset), `start`, `duration`, + any `<img>` attr (`alt`, `className`, `style`)
- **`<Subtitle entries={[...]} />`** — timed text. Defaults to bottom-center, white, `text-[1.875vmax] font-semibold drop-shadow-lg`, rendered above clips. Props: `entries: { start, end, text }[]`, + any `<div>` attr (`className` merges, so you can restyle)
- **`<Cutin at size inset>`** — the beat's declared `cutin`, over the whole shot: `at` a corner (default `bottom-right`), `size` a fraction of canvas width, `inset` the edge gap. Holds that frame's `<Panel>`s on the animatic, its `<Video className="clip">` on the video; only where the direction declares one (`CUTIN_REQUIRED` / `CUTIN_UNDECLARED`).
- **`<Animate script={...} />`** — GSAP animation for the shot. Props: `script: ({ timeline }) => void` — inferred inline; `import type { GsapTimeline }` only for a callback lifted out of the JSX

Plus **any HTML element** styled with **Tailwind v4** classes or inline `style` — overlays, titles, frames, vignettes.

Gotchas:

- **`.clip` is for `<Video>`/`<Image>`/`<Subtitle>`** — `position:absolute; inset:0; object-fit:cover`, hidden until its cue (`data-start`) — which those emit and your own `<div>` does not, so `.clip` on one hides it for good. Lay yours out with `absolute inset-0`. A bare `<Video>` already fills the stage; add `className="clip"` to layer or animate one.
- **A clip's own audio needs `hasAudio`** — without it the track is dropped: `<Video src={motion} hasAudio volume={0.8} />`.
- **`volume` is relative gain, 0–3.98 (+12 dB), 1 = unity** — same on `<Audio>`, `<Video>`, `soundtrack()`; above the ceiling the load fails (`AUDIO_GAIN_INVALID`). konte levels each take into place first, so OMIT it unless a cue must sit off that place.
- **`<Animate>` does not auto-assign ids** — give the element your own `id`/`className` and target it by CSS selector (`"#title"`, `".badge"`). Each shot's animation is scoped to that shot, so a selector never reaches another shot's element.
- **`<Animate script>` is serialized to source and run in the browser, closing over nothing** — an import, a module constant, a helper, a `const` from `build`: each is a `ReferenceError` there and nothing flags it here. Inline every value; keep the callback an arrow or function expression. A synchronous throw drops the tweens after it and paints a red banner over the shot; one from a `timeline.call` callback or an `async` script fires later, uncaught.

## Graphic beats

- **Finished on the board** — animatic.tsx's `graphicShot` is the picture itself: components, `<Image>` layers, `<Animate>`; no `<Panel>` outside `<Cutin>` (`ANIMATIC_INVALID`). video.tsx's `graphicShot` imports and places the same component.

## Fonts

The piece's web fonts are declared on `direction.policy.fonts` (see `direction-guide`) — Google Fonts family names, every shipped weight requested, laid on the composition body.

- **Never a Tailwind arbitrary-value class** (`font-[Inter]`) — the export embeds faces by reading the HTML, and a class's CSS does not exist until the browser has run.

## Timing model

Everything is in **seconds on the shot's own timeline** (a shot starting at global 10s still uses `0` as its own start).

- `start` — when the clip appears (default `0`).
- `duration` — how long it shows. `<Video>` defaults this to the shot duration; **always keep a duration** (explicit or default) or the clip replays past the end and flickers. `<Audio>` has no default — omit it to play the full source.
- `mediaStart` — offset _into the source file_ (trim the head).

```tsx
//        timeline:  0 ----------- 1 ----------- 2 ----------- 3
<Video src={a} start={0} duration={2} />               {/* shows 0–2s of timeline */}
<Video src={b} start={1.5} duration={1.5} mediaStart={4} /> {/* shows 1.5–3s, from 4s into b */}
```

GSAP `position` (3rd arg of `to`/`from`/...) uses the same clock: absolute seconds (`0`, `1.5`) or relative (`"+=0.5"`, `"<0.2"` = 0.2s after the previous tween starts).

## Pitfalls

- **Fixed px font sizes change apparent size when the canvas size changes** — the canvas renders at `format.size`'s actual pixel size. Use `text-[Nvmax]` (1% of the longer edge) to keep text a constant fraction; `<Subtitle>` defaults to `text-[1.875vmax]`.
- **`format.size`/`fps` are independent of the adapter's `width`/`height`/`fps`** — render/capture vs generation request; no resampling, so typed format-derived inputs auto-fill from the canvas when omitted.

## Verify

- `konte probe reel-thumbnails video` / `reel-audio video` — timing, captions, transitions, the audio timeline.
- `konte probe motion video:shot.<id>#composition --at <sec>` — each `<Animate>` move.

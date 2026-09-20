# Staging patterns

Composition recipes — each the smallest correct snippet; copy and adapt.

## Full-frame single clip (default)

```tsx
return (
  <Composition>
    <Video src={motion} />
  </Composition>
);
```

## Layering: background clip + foreground overlay

```tsx
return (
  <Composition>
    <Video className="clip" src={motion} />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="rounded-xl border-4 border-amber-300/80 w-4/5 h-3/5" />
    </div>
  </Composition>
);
```

## Subtitles and a custom title / lower-third

- **`<Subtitle>` for spoken lines; a plain `<div>` + Tailwind for branded titles.**

```tsx
return (
  <Composition>
    <Video src={motion} />
    <Subtitle entries={[{ start: 1, end: 3, text: "Animatic it." }]} />
    {/* lower-third, animated in below */}
    <div
      id="lower-third"
      className="absolute bottom-[12%] left-[6%] text-white text-[2.5vmax] font-bold drop-shadow-lg"
    >
      Konte
    </div>
    <Animate
      script={({ timeline }) => {
        timeline.from("#lower-third", { opacity: 0, y: 24, duration: 0.4 }, 0.3);
      }}
    />
  </Composition>
);
```

- **Restyle subtitles by passing `className` (it merges with the defaults)** — `<Subtitle className="text-yellow-300 text-[1.5vmax]" entries={...} />`.

## Crossfade / transition between two clips in one shot

- **Overlap them with `start`, then fade with `Animate`.**

```tsx
return (
  <Composition>
    <Video id="a" className="clip" src={clipA} start={0} duration={2} />
    <Video id="b" className="clip" src={clipB} start={1.5} duration={1.5} />
    <Animate
      script={({ timeline }) => {
        timeline.set("#b", { opacity: 0 }, 0);
        timeline.to("#a", { opacity: 0, duration: 0.5 }, 1.5);
        timeline.to("#b", { opacity: 1, duration: 0.5 }, 1.5);
      }}
    />
  </Composition>
);
```

## Ken Burns (slow zoom / pan)

- **Animate `scale`/`x`/`y` on the clip; set `transformOrigin` to steer the zoom anchor.**

```tsx
return (
  <Composition>
    <Video id="main" className="clip" src={motion} />
    <Animate
      script={({ timeline }) => {
        timeline.fromTo(
          "#main",
          { scale: 1, x: 0, transformOrigin: "50% 50%" },
          { scale: 1.15, x: -40, duration: 3, ease: "none" },
          0,
        );
      }}
    />
  </Composition>
);
```

## Fades and a flash accent

```tsx
<Animate
  script={({ timeline }) => {
    timeline.from("#main", { opacity: 0, duration: 0.5 }, 0); // fade in
    timeline.to("#main", { opacity: 0, duration: 0.5 }, "-=0.5"); // fade out at the tail
    // white flash on a hit
    timeline.fromTo("#flash", { opacity: 0.9 }, { opacity: 0, duration: 0.25 }, 1.2);
  }}
/>
```

- **`#flash` is a `<div id="flash" className="absolute inset-0 bg-white" />` you add to the stage.**

## Title reveal with easing

```tsx
timeline.from("#title", { opacity: 0, y: 60, duration: 0.6, ease: "back.out(1.7)" }, 0.2);
```

- **All GSAP 3.12.5 properties work** (`opacity`, `x`, `y`, `scale`, `rotation`, `skewX`, `filter`, `backgroundColor`, …) with `duration`/`delay`/`ease`.

## Sub-clip editing inside one shot

- **Trim and sequence pieces of source media with `mediaStart` + `start`/`duration`.**

```tsx
<Video src={take} start={0}   duration={1.5} mediaStart={2} />  {/* 2–3.5s of source */}
<Video src={take} start={1.5} duration={1.5} mediaStart={6} />  {/* 6–7.5s of source */}
```

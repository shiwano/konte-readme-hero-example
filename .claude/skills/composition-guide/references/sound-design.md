# Sound design — what plays where

## Four layers, each with a job

- **Dialogue** — the lines; everything else sits under them. The loudest line is the loudest thing in the piece.
- **SE** — one sound per visible action, landing on the frame the action lands (a door, a plate, a step): an `<Audio>` per event, placed by `start`. An action the frame does not show gets no sound — unless it is the off-screen event the staging withheld (`staging-guide`), in which case the sound carries the beat and lands on the reaction.
- **Ambience** — the place's constant sound: room tone, street, wind, a kitchen hum. One bed per `location`, entering on the first shot there and leaving on the last (`soundtrack()` with `from`/`until`, and `duck: false`), so a cut inside a place is seamless and a cut to another place is audible.
- **Music** — the emotion's carrier; the last layer added.

## Where music enters and leaves

- **Enter on a beat, never at frame zero by default** — the lens's turn (`disruption` / `violation` / `solution`) or the first shot of a build; opening on ambience alone makes the entrance an event.
- **Change on the hinge** — the payoff gets its own cue or a lift (a second bed, a stronger section via `mediaStart`).
- **Resolve on the last cut or after it** — a bed that runs to the last frame and stops mid-phrase reads as a broken file; `fadeOut` of a second or more, or end it on the last cut and let ambience carry the final image.
- **Silence is a cue** — pulling every bed out for one beat (before the hit, on the reveal) lands harder than any swell. Once per piece.
- **One score identity** — every cue from one adapter and one prompt lineage (`prompt-guide`); a second style is a second piece.

## Under dialogue

- **`duck: true` drops the bed under every line it plays under** — tune it with `{ depth, attack, release, hold }`. A character's and a narrator's line duck a bed; a mob's never does.

```tsx
soundtracks: [
  soundtrack("bed", bgm, { duck: true }),
  soundtrack("room", ambience, { duck: false }),
],
```

- **It is only audible on the reel** — a bed is in no shot's `#stem`, so the duck shows in `konte preview` and `konte probe reel-audio`, not in a shot's own review.
- **Ambience never drops** — it is the floor; a floor that moves with the lines is heard as a pump. Write `duck: false` for it.
- **No SE on a line's syllables** — unless the action is the line's point; shift the cue to the breath before or the beat after.

## Across cuts

- **Ambience crosses the cut, SE does not** — a bed spans shots; an `<Audio>` lives in the shot whose frame it lands on.
- **Lead the picture with sound** — the next shot's sound starting under this shot's tail (a J-cut) binds the cut: put the `<Audio>` in the earlier shot with `start` near its end; it plays past the shot on its own.
- **A cut on a hit takes a sound on its in frame** — a hard cut with nothing landing on it floats.

## Levels

konte does not normalise loudness at export: the mix you hear in preview is what ships.

- **Order, top to bottom: dialogue, the SE on the beat, music, ambience** — `konte probe reel-audio video` prints each track's level in LUFS, and where a bed ducks to. The sparklines show shape, never relative level.
- **Match the lines to each other first** — audio-patterns.md.
- **Several sounds landing together clip** — lower the SE, then the bed; never the line.
- **A `duck: true` bed needs no `volume`** — it lands 15 dB under the lines on its own. A bed already quieter than that does not duck at all.

## Verify

- `konte probe reel-audio video` — no ⚠ silence at the head or the tail; every SE inside its shot's window on the frame it names; beds entering and leaving where the section above says; the floor present under every shot.

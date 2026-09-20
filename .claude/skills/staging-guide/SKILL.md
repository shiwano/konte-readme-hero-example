---
name: staging-guide
description: Derive a beat's staging — frame, cut, motion, audio — from the direction's action so a zero-context viewer reads it and the generator can carry it. Read before writing a beat's prompt, again before filling a panel's blocking/camera field, and when responding to feedback.
user-invocable: false
---

Read what each beat must convey off the direction, then stage the frame, the cut, and the motion so the audience actually reads it. It sits above `prompt-guide`: no prompt text, only the staging every prompt serves.

## Where the movement lives

- **The beat's goal is the direction's `action`, stated once in `direction.ts`** — one shot = one motion beat. Stage against it, never restate it. There is no separate audio goal.
- **Every panel declares the movement out of it** — `blocking` and `camera`, across the span to the next keyframe, or, on a shot's only panel, to the shot's end. The last panel of a multi-panel shot declares neither.
- **Write it from the take, before the board goes to review** — settle the panel's take first, then write the transit that frame can launch. It gates the review, never the generation.
- **Rewriting it after the panel was accepted asks for no review of its own** — the take is untouched.
- **Only the transit** — a keyframe fixes a position, never a direction through it; what the pair already shows does not belong in these fields.
- **Write both in the `brief`'s working language**, whatever the prompts use.

## Split blocking from camera by who moved

- **`blocking` is the subject's movement** — where it goes, how, and whether it crosses the frame edge (and which edge). Name the edge whenever the subject enters or leaves: the next shot's entrance has to agree with it.
- **`camera` is the camera's, and `"fixed"` is a value you state** — an omitted `camera` reads as unbound, not as a locked-off one; both halves land together.
- **A subject that leaves frame because the camera moved off it is `camera`** — the next shot inherits no screen direction from it.

## Stage the frame

- **The eye lands on the action's carrier** — whatever the beat hinges on must be the frame's most salient element (position, contrast, light, motion); if a stranger's eye goes elsewhere first, the staging failed before the prompt.
- **One strong signifier per idea** — pick the element that says it best and cut action-adjacent extras; each one added dilutes the read.
- **Subject & purpose** — what the subject wants in this beat decides pose, expression, and gaze. Name a declared character by its exact roster `promptDepiction` and anchor its look on the `reference:<id>` asset (identity prose → `prompt-guide`'s reference preflight). A subject the frame holds that no prompt behind the keyframe names is `subject-unnamed`: name one and the model decides the rest for itself.
- **Where each subject stands is the direction's, not this file's** — `ctx.lineup` is who the frame holds, left to right, and `ctx.lineupTo` the order the shot leaves on (`direction-guide`). **Name every one of them, in that order**: one named place lands nothing, all of them always lands. Add who is nearer the lens where they are not side by side. An empty `lineup` holds no one.
- **Pass a reference image for every one of them** — a subject the frame holds and the keyframe took no `reference:<id>` of is `character-unconsumed`: the look is then whatever the prompt happens to say, take by take. A subject only a sleeve or a fist of whom is in frame is fed too, never waived. A keyframe drawn from an earlier keyframe inherits what that one stood on.
- **Pass them in the same order** — the slot order is the other half of what decides who lands where (`slot-order-mismatch`), so a take that came back with the wrong person on the wrong side is a slot fix and never a waiver.
- **A `cutin` is one more shot on its setup** — its `<Cutin>` keyframes answer `ctx.cutin.lineup` / `lineupTo` by the rules above and stand on that setup's plate.
- **`ctx.lineupTo` is a `blocking` note waiting to be written** — the panel it changes out of says the move (`blocking`, above) and the last keyframe's slots take the new order.
- **Size and angle both come from the beat's `setup`** — the shot's size and where the camera stands are declared once in `direction.ts` (`direction-guide`); stage to them (`wide` → the concrete long shot, `insert` → the object filling frame), and change either by editing the setup. Low angle empowers, high diminishes, eye level observes — pick from the `action`, and record the pick on the setup so the next beat on it inherits the camera.
- **A `location` reference is the master, and a plate is a window cut out of it** — the place from its main camera position, the widest setup on its axis inside; konte sizes it (2:1, twice the canvas' long edge). Each setup on that axis is `adapters.imageCrop` of it (`konte/guides/image-crop.md`). A setup that moves the camera is not a window: generate its plate from the master, framing declared new, or give its axis a master.
- **Cut each window inside the window of the frame it declares itself a window of** — the setup's `within` (`direction-guide`) says which that is, and konte checks the containment (`plate-unnested`). This is what makes a `close` come back closer than its `medium`: an edit model takes the scale of the set off image 1, and no prose asking for a tighter view moves it. A root (`within: null`) is cut from the master or generated. Where a window needs detail the master does not carry, feed the crop back in as image 1 and re-generate from it — the same property then adds the detail at a fixed scale.
- **Every shot stands on the place** — the plate where its setup has one, `reference:<location>` where it does not (`setup-unconsumed`, satisfied by any one of its keyframes); the plate is built from that same reference (`plate-unanchored`). A place held by prose alone is a different place every take. Exempt: a shot with no generative step, and a plate handed over whole as a file; a plate derived from a reference must derive from the location's.
- **A setup two or more generated shots share owes a plate** — declared under `plates` in animatic.tsx and keyed by the roster id (`animatic:plate.<setupId>`): the frame with nobody in it. konte demands it (`setup-unrealized`). Feed `plates.<id>.image` as the keyframe's first image input; a setup one shot uses needs none, unless the piece cuts between it and the other exposed size of its `within` axis (`axis-unrealized`). An asset declared here and **not** returned is an intermediate — never review work, and its name may not be a setup id.
- **A plate is `{ image, prompt }`, and its `prompt` is one sentence of what that frame holds** — contents only, and per window. Hand every framing decision to the picture. With no sentence the place is lost whenever the model drops the picture; a sentence that frames beats the picture's own framing. The sentence must call every landmark in the setup's `holds` by its `promptDepiction` (`plate-unnamed`). Write `plates.<id>.prompt` into the keyframe's own prompt, in the adapter's notation — the sentence names the contents, the surrounding line names the picture and gives it the framing (`plate-undescribed` reads only that the sentence is there).
- **Every landmark a setup `holds` owes a landmark reference** — under `landmarks` in animatic.tsx (`animatic:landmark.<id>`): the whole landmark cut from `reference:<location>` (`konte/guides/image-crop.md`), accepted on completion (`landmark-unrealized`). Feed `landmarks.<id>` to every keyframe on the setup and name it in the prompt (`landmark-unconsumed`); a keyframe drawn from another as an image input inherits what that one took, `prevPanel` carries none. With the inputs full, a landmark gives way only to the plate, the frame's subjects and props — the panel's accept signs that off.
- **A plate fixes how much of the set is in frame, and is passed at canvas size** — prose asking for a closer view is ignored, and a plate larger than the canvas reads as a picture inside the frame, its edges drawn as a window. Cut every window where the setup's `holds` are inside it: a crop with none of them in it is another room. Where the beat needs a frame the plate does not hold, cut another window; off the master's axis, carry its setting and light onto a new one and say the framing is new (the adapter's guide has the marker). A setup whose shots keep doing that is two setups.
- **Say where each figure meets the floor** — a keyframe built on a plate otherwise comes back with the figures pasted in front of it. Let distance read as height on the visible floor: further from the lens, feet higher in the frame and the figure smaller.
- **Draw a plate empty** — a plate carries the frame, not the acting. Whatever pose or gesture is baked into it is inherited by every beat on that setup, so the shot's own performance has to fight it.
- **A set element the story changes is one reference per state, each built from text** — a window before and after it breaks is two. Count the states before the reference review: a reference accepted in one state a later beat contradicts stales every panel built on it.
- **At `close`, anchor the subject and let the set fall to suggestion** — shallow depth of field, one sliver of set behind, and the setup's `holds` inside that sliver: it owes the location its material and light, and owes it no layout. `insert` is the one framing that holds nothing — it fills the frame with an object and shows no set.
- **Keep the set quiet** — the frame holds only what the beat reads against; every extra prop hands motion background churn to fail on. Keep the master sparse, but the setup's `holds` must fall in every window — blank wall comes back as another room; dress a beat's prop in its panel.
- **A prop's state is a reference still** — a page blank, scribbled, then washed is three `reference:` assets, fed where shown; prose redraws the state every take.
- **The pose reads in silhouette** — if the action wouldn't be legible as a black shape, no lighting or detail will save it; pick the angle that opens the pose.
- **Build depth in layers** — a foreground, a subject plane and a background give motion somewhere to travel, and naming what sits just off-frame gives gaze somewhere to go; a single-plane frame reads as a flat still.

## Stage the cut

- **Eyelines, screen direction, and edges are the space** — the 180° line, gaze axes, the entrance/exit directions the `action` implies, and wardrobe/props agreeing across adjacent same-space beats let the viewer assemble a place from fragments; they bind every cut, shown geography or not. A journey "toward" something holds one direction across every panel and shot.
- **The 180° line is checked between two beats in one place** — a pair both frames hold that swaps sides is `lineup-flipped`. Move the camera, or say the move: the beat it happens in declares its `lineupTo`, and a camera coming round to the other side lists everyone the frame holds. A single subject re-framed from the other side settles no pair, so it is yours to catch.
- **Matching backgrounds is a chosen spend** — two frames owe each other visible landmarks only when they actually share geography on screen (a continuous-space stretch, a re-established `wide`); prefer cuts that share none. Where they do share it, pin the look on a `reference.tsx` asset and compare the adjacent panels at the board, before paying for motion.
- **Change two of size / angle / subject on every cut** — unless a match cut is the point; a cut that changes only one reads as a jump, and cutting back to one setup without a beat between flattens the sequence.
- **The edit base chooses the camera** — a keyframe built by editing a neighbouring shot's populated frame inherits its composition whatever the prompt says. Chain off a neighbour only when a match cut is the point. Otherwise start from the plate whenever the beat is on a declared setup. At a `join: "continuous"` seam, keep the camera of the panel before it.
- **A long take has one frame at its seam, and it is the next beat's first panel** — `join: "continuous"`: the beat before authors no closing keyframe; its last panel carries `blocking` / `camera` like any other. The video lands the take before on it (`production-guide`, `join-unpinned`). Nothing is passed on the board.
- **A cut along one `within` axis takes the frame before it** — two setups of one axis, no join written: the previous beat's last panel goes in the keyframe's `prevPanel` slot — a wipe's, the last panel of the wipe before it. The plate fixes the room, that panel her light, her size and where she stands. `panel-unlinked` gates it; a cut meant to re-open the frame is the waiver.
- **Save the strongest staging for the payoff** — the lens's payoff beat gets the most distinct frame in the piece; spending it on a setup beat upstages the climax.
- **Name light and time per beat, and let them progress** — a light source and time of day are continuity anchors within a scene and an arc across the piece; unnamed light drifts per generation.

## Stage the motion

- **One action per shot** — an `action` that needs two is a direction fix, never a longer prompt.
- **A motion beat is a visible change — fix state A and state B** — what the clip's first and last moments must each read as; if they read the same, the beat didn't happen. A near-still shot is chosen up front, in the panel's `camera`/`blocking`, never rationalized after a quiet clip comes back.
- **A shot's `first` panel stages where its motion begins, not where it lands** — the loaded instant before the action: charged, never the peak, or the shot has nowhere to move. Opening on the tail is a choice, never a default.
- **Audio is staging too** — a one-shot `<Audio>` lands on a visible action frame (name which); a `soundtrack()` bed states a mood the picture already earns (placement → `composition-guide`). Sound never rescues an unreadable picture.

## Stage for the generator

- **A capability limit belongs to one model, and it is written down** — the `## Avoid` section of `.konte/guides/<model>.md` (`konte adapter show <adapter>`). Read it at routing time; never stage around a general belief about what generation can't hold.
- **Restage, don't caveat** — where the guide names a real limit, substitute a staging that keeps the beat while shrinking what must move; prompt-side warnings ("smooth motion") fix nothing.
- **What the frame excludes, the viewer completes** — a sound, an aftermath, a reaction carry an event no pixel has to survive, and the withheld event often lands harder than the shown one. The bank:
- **Show the reaction, not the act** — the witness's `close` carries the event; the act lives in sound and the state the next shot opens on.
- **Cut before the impact, open on the result** — end on the wind-up, open the next on an `insert` of the aftermath; the viewer supplies the contact frame.
- **Crop the choreography** — drop `framing` to `close`/`insert` so only the load-bearing part moves in frame; what is outside the frame can't fail.
- **Split it at the direction** — a compound motion becomes short beats each landing one readable change (a `direction.ts` edit).
- **One mover per shot** — subject or camera, never both large at once; a slow push, pan, or tilt over stable staging reads as motion on its own.
- **A charged hold is a beat** — only breath, hair or light moving.
- **Spend the risk on the payoff** — a shot that may take many rerolls earns them where the piece lands; stage the setups from the bank.
- **The bank is not one setup** — alternate closes, inserts and holds.

## Read-test before you pay to generate

- **Describe first, compare second** — state what the panel shows before rereading the `action` and its `blocking`/`camera`; checking with them in mind only ever confirms them.
- **Name the reading that must be unambiguous, then try its opposite** — derive from the `action` the one axis that cannot misread (arriving vs leaving) and ask whether a zero-context viewer could land on the wrong side. If it misreads, fix the staging, not the prompt words.

## On a staging note, re-derive the whole staging

- **A staging note is a prompt to re-derive the beat's whole staging, not a line to apply word-for-word** — the note names a symptom; re-ask what the direction's `action` needs and let that regenerate the frame, the blocking and the camera, or the next hole stays open.
- **If re-deriving reveals the `action` itself has drifted from the project, that's a brief-level change** — raise it with the human per the brief rule (`drafting-guide`), don't quietly redefine it.

## Pitfalls

- **Letting the take dictate the beat** — writing whatever motion the picture makes easy instead of the transit the direction's `action` needs. If the take can't launch that one, the take is wrong, not the beat.
- **Deciding the camera in `video.tsx`** — the board is where a camera move is reviewed.
- **Leaning on audio or a telop to carry an unreadable picture** — fix the staging.

# The shape of `direction.ts`

Every field once, on a four-beat piece.

```ts
import { defineDirection } from "konte";

export default defineDirection({
  brief: {
    logline: "A ten-second kitchen gag: a cat walks a mug off the counter.",
    hook: "A paw already on the mug, the counter's edge an inch away.",
    audience: "Cat owners. It was always going to happen.",
    tone: "Dry and quick; the catch is the laugh.",
    look: "Live action, handheld, warm morning light. Short cuts, no music.",
    outOfScope: ["No second room"],
    tolerances: ["Text on the mug may render unreadable — it reads as a stripe."],
  },
  policy: {
    format: {
      fps: 24,
      size: { megapixels: 0.9, delivery: { width: 1920, height: 1080 } },
    },
    lang: "en",
    fonts: ["Inter"],
    speech: "free",
  },
  narrator: { id: "narratorVoice", description: "Male, forties, warm, close to the mic." },
  characters: {
    owner: {
      name: "the owner",
      promptDepiction: "woman",
      description: "Thirties, sleeves pushed up, mid-clean-up.",
      voice: { id: "ownerVoice", description: "Female, thirties, low and dry, unhurried." },
    },
    cat: {
      name: "the tabby",
      promptDepiction: "tabby",
      description: "A heavy-set brown tabby, entirely composed.",
    },
  },
  props: {
    mug: { name: "the striped mug", description: "A tall blue-and-white striped mug." },
  },
  locations: {
    kitchen: {
      name: "the kitchen",
      description: "A narrow galley kitchen, white counter, light from the left.",
      landmarks: {
        counter: {
          name: "the counter",
          promptDepiction: "counter",
          description: "The white galley counter running the length of the room.",
        },
        window: {
          name: "the window",
          promptDepiction: "window",
          description: "The sash window at the far end, the room's only light.",
        },
      },
    },
  },
  setups: {
    counterWide: {
      name: "the counter, wide",
      description: "From the doorway at eye level, the whole counter.",
      location: "kitchen",
      framing: "wide",
      holds: ["counter", "window"],
    },
    mugInsert: {
      name: "the mug at the lip",
      description: "At counter height, the mug filling frame against the edge.",
      location: "kitchen",
      framing: "insert",
      holds: [], // an insert is the one framing that holds nothing
    },
    standoffMedium: {
      name: "the stand-off",
      description: "Side on, both of them in one frame from the waist up.",
      location: "kitchen",
      framing: "medium",
      holds: ["counter"],
    },
    ownerClose: {
      name: "the owner, close",
      description: "Tight on the owner's face and hands.",
      location: "kitchen",
      framing: "close",
      holds: ["counter"],
    },
  },
  sequence: {
    lens: "mini-drama",
    pleasure: "funny",
    shots: [
      { kind: "aside", id: "title", label: "Title card", duration: 2, telop: ["Counter Rules"] },
      {
        id: "01",
        role: "disruption",
        action:
          "Wiping down the counter, the owner never sees the tabby's paw slide the striped mug from square in the middle to the very edge.",
        setup: "counterWide",
        duration: 3,
        lineup: ["owner", "cat"],
      },
      {
        id: "02",
        role: "pressure",
        action: "The striped mug teeters at the lip as the tabby's paw draws back.",
        setup: "mugInsert",
        duration: 2,
        lineup: ["cat"],
      },
      {
        id: "03",
        role: "pressure",
        action: "The stand-off breaks: the tabby bolts, and the owner lunges across the counter.",
        setup: "standoffMedium",
        duration: 5,
        lineup: ["owner", "cat"],
        lineupTo: ["owner"],
        // `join: "continuous" | "jump-back" | "jump-forward"` sits here — required where the
        // beat before is on the same `setup`.
        script: [{ character: "owner", text: "Don't.", acting: "Flat, barely voiced." }],
      },
      {
        id: "04",
        role: "hero",
        action:
          "The striped mug tips off the edge and the owner's hand closes round it an inch above the tiles.",
        setup: "ownerClose",
        duration: 2,
        lineup: ["owner"],
        script: [{ narration: "Some house rules are enforced by hand." }],
        telop: ["Counter Rules, Rule 1"],
      },
    ],
    waivers: {
      "missing-beat_ordinary":
        "A cold open — the piece starts on the paw already moving, with no calm to establish first.",
    },
  },
});
```

import { defineFalAsset } from "konte";

export const falMinimaxMusic3 = defineFalAsset({
  endpointId: "minimax/music-3",
  description:
    "MiniMax Music 3 — a full song from a structured caption plus tagged lyrics, up to 5 minutes; its length follows the lyric sheet's section count, so trim it to a slot rather than asking for one.",
  mediaType: "audio",
  guide: "konte/guides/minimax-music-3.md",
  inputs: {
    caption: { field: "prompt", type: "prompt", required: true },
    lyrics: {
      field: "lyrics",
      type: "spokenText",
      required: true,
      description:
        "Structure tags each on their own line, lines separated by \\n; text sharing a tag's line is dropped.",
    },
    maxDuration: {
      field: "duration",
      type: "number",
      default: 60,
      description:
        "Ceiling in seconds, 1–300; a take may land short, and raising it does not lengthen one.",
    },
    seed: { field: "seed", type: "seed" },
    steps: {
      field: "num_inference_steps",
      type: "number",
      default: 30,
      description: "Euler steps per 8-second chunk, 1–100; more is slower, not longer.",
    },
    cfg: {
      field: "guidance_scale",
      type: "number",
      default: 1.7,
      description: "0–20; raise it to hold the caption more literally, lower it to loosen it.",
    },
  },
});

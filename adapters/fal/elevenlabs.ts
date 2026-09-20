import { defineFalAsset } from "konte";

export const falElevenLabsSoundEffects = defineFalAsset({
  endpointId: "fal-ai/elevenlabs/sound-effects/v2",
  description: "ElevenLabs sound effects — a single SFX from a text description; optional loop.",
  mediaType: "audio",
  guide: "konte/guides/elevenlabs-sound-effects.md",
  inputs: {
    prompt: { field: "text", type: "prompt", required: true },
    durationSeconds: {
      field: "duration_seconds",
      type: "number",
      description: "0.5–30s; omit to let the model auto-pick a length.",
    },
    promptInfluence: {
      field: "prompt_influence",
      type: "number",
      description: "0–1; higher follows the prompt literally, lower is more creative.",
    },
    loop: { field: "loop", type: "boolean" },
  },
});

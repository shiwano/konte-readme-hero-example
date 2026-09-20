import { defineFalAsset } from "konte";

export const falZonos2 = defineFalAsset({
  endpointId: "fal-ai/zonos2",
  description:
    "Zonos 2 — narration or dialogue from text in the voice of a required reference audio clip; multilingual (Japanese, Chinese, Korean, English, …), seed-reproducible.",
  mediaType: "audio",
  guide: "konte/guides/zonos2-hosted.md",
  inputs: {
    script: { field: "text", type: "spokenText", required: true },
    referenceAudio: {
      field: "reference_audio_url",
      type: "audio",
      required: true,
      description: "The voice to clone — a few seconds of clean, single-speaker audio.",
    },
    language: {
      field: "language",
      type: "string",
      default: "en_us",
      description: "Supported: en_us, en_gb, fr_fr, de, es, it, pt_br, ja, cmn, ko.",
    },
    accurateMode: {
      field: "accurate_mode",
      type: "boolean",
      default: true,
      description: "On tracks the reference voice more closely; off reads more expressively.",
    },
    cleanSpeakerBackground: {
      field: "clean_speaker_background",
      type: "boolean",
      default: false,
      description:
        "Declares the reference clip noise-free; leave it off for a recording with room tone.",
    },
    temperature: { field: "temperature", type: "number", default: 1.15 },
    topP: {
      field: "top_p",
      type: "number",
      default: 0,
      description: "Nucleus sampling; 0 disables it.",
    },
    topK: { field: "top_k", type: "number", default: 106, description: "0 disables it." },
    minP: { field: "min_p", type: "number", default: 0.18 },
    maxTokens: {
      field: "max_tokens",
      type: "number",
      description: "Audio-frame ceiling; defaults to the model's context limit.",
    },
    seed: { field: "seed", type: "seed" },
  },
});

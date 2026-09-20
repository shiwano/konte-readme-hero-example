// source-hash: 933c1f201601a22ab99a1575d9b4127b69be1301a8d03490584b8b15f05ce924
// source: konte / workflows/konte/audio_minimax_h3_r2a.json (hand-authored)
import { defineComfyAsset, minimaxH3Dialogue, minimaxH3Prompt, promptReferenceTags } from "konte";

export const audioMinimaxH3R2a = defineComfyAsset({
  workflow: "audio_minimax_h3_r2a.json",
  description:
    "MiniMax H3 R2A — one ≤15s spoken line, cast off up to nine images and three audios. The delivery is acted out of the scene the prompt describes.",
  guide: "konte/guides/minimax-h3.md",
  models: [
    {
      filename: "minimax_h3_ref2va_pruned_int8_convrot.safetensors",
      type: "diffusion_model",
      url: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/diffusion_models/minimax_h3_ref2va_pruned_int8_convrot.safetensors",
    },
    {
      filename: "qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors",
      type: "clip",
      url: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors",
    },
    {
      filename: "minimax_h3_video_vae_fp16.safetensors",
      type: "VAE",
      url: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_video_vae_fp16.safetensors",
    },
    {
      filename: "minimax_h3_audio_vae_fp32.safetensors",
      type: "VAE",
      url: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_audio_vae_fp32.safetensors",
    },
  ],
  inputs: {
    // LoadImage → MiniMaxH3ReferenceToVideo.ref_images.ref_image_0
    image1: { nodeId: "21", field: "image", type: "image" },
    // LoadImage → MiniMaxH3ReferenceToVideo.ref_images.ref_image_1
    image2: { nodeId: "22", field: "image", type: "image" },
    // LoadImage → MiniMaxH3ReferenceToVideo.ref_images.ref_image_2
    image3: { nodeId: "23", field: "image", type: "image" },
    // LoadImage → MiniMaxH3ReferenceToVideo.ref_images.ref_image_3
    image4: { nodeId: "24", field: "image", type: "image" },
    // LoadImage → MiniMaxH3ReferenceToVideo.ref_images.ref_image_4
    image5: { nodeId: "25", field: "image", type: "image" },
    // LoadImage → MiniMaxH3ReferenceToVideo.ref_images.ref_image_5
    image6: { nodeId: "26", field: "image", type: "image" },
    // LoadImage → MiniMaxH3ReferenceToVideo.ref_images.ref_image_6
    image7: { nodeId: "27", field: "image", type: "image" },
    // LoadImage → MiniMaxH3ReferenceToVideo.ref_images.ref_image_7
    image8: { nodeId: "28", field: "image", type: "image" },
    // LoadImage → MiniMaxH3ReferenceToVideo.ref_images.ref_image_8
    image9: { nodeId: "29", field: "image", type: "image" },
    // LoadAudio → MiniMaxH3ReferenceToVideo.ref_audios.ref_audio_0
    audio1: { nodeId: "31", field: "audio", type: "audio" },
    // LoadAudio → MiniMaxH3ReferenceToVideo.ref_audios.ref_audio_1
    audio2: { nodeId: "32", field: "audio", type: "audio" },
    // LoadAudio → MiniMaxH3ReferenceToVideo.ref_audios.ref_audio_2
    audio3: { nodeId: "33", field: "audio", type: "audio" },
    // MiniMaxH3ReferenceToVideo → BasicGuider.conditioning, SamplerCustomAdvanced.latent_image
    prompt: { nodeId: "10", field: "prompt", type: "prompt", default: "" },
    // MiniMaxH3ReferenceToVideo → BasicGuider.conditioning, SamplerCustomAdvanced.latent_image
    width: { nodeId: "10", field: "width", type: "number", default: 128, grid: { step: 32 } },
    // MiniMaxH3ReferenceToVideo → BasicGuider.conditioning, SamplerCustomAdvanced.latent_image
    height: { nodeId: "10", field: "height", type: "number", default: 128, grid: { step: 32 } },
    // MiniMaxH3ReferenceToVideo → BasicGuider.conditioning, SamplerCustomAdvanced.latent_image
    length: {
      nodeId: "10",
      field: "length",
      type: "frames",
      clock: 24,
      default: 120,
      grid: { step: 17, offset: 5 },
      max: 362,
      fill: "speech",
      description:
        "Frame count on a 24fps clock; the audio comes back that long. Derived from the words in the prompt's <d> lines and held inside the window the <Audio> plays in, so leave it unset unless a take comes back rushed or padded. Set too large the read spreads to fill it, and far too large the line comes back said twice. Capped at 362 (~15s); a longer beat is rejected at load.",
    },
    // RandomNoise → SamplerCustomAdvanced.noise
    seed: { nodeId: "11", field: "noise_seed", type: "seed", default: 0 },
    // BasicScheduler → SamplerCustomAdvanced.sigmas
    steps: { nodeId: "13", field: "steps", type: "number", default: 20 },
    // UNETLoader → BasicScheduler.model, BasicGuider.model
    unetName: {
      nodeId: "1",
      field: "unet_name",
      type: "string",
      default: "minimax_h3_ref2va_pruned_int8_convrot.safetensors",
    },
    // CLIPLoader → MiniMaxH3ReferenceToVideo.clip
    clipName: {
      nodeId: "2",
      field: "clip_name",
      type: "string",
      default: "qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors",
    },
    // VAELoader → MiniMaxH3ReferenceToVideo.vae
    vaeName: {
      nodeId: "3",
      field: "vae_name",
      type: "string",
      default: "minimax_h3_video_vae_fp16.safetensors",
    },
    // VAELoader → MiniMaxH3ReferenceToVideo.audio_vae, VAEDecodeAudio.vae
    audioVaeName: {
      nodeId: "4",
      field: "vae_name",
      type: "string",
      default: "minimax_h3_audio_vae_fp32.safetensors",
    },
  },
  outputs: {
    audio: { nodeId: "17", type: "audio" },
  },
  validators: [
    minimaxH3Prompt({
      mode: "r2a",
      length: "length",
      references: [
        "image1",
        "image2",
        "image3",
        "image4",
        "image5",
        "image6",
        "image7",
        "image8",
        "image9",
        "audio1",
        "audio2",
        "audio3",
      ],
    }),
    promptReferenceTags({
      tags: {
        Picture: [
          "image1",
          "image2",
          "image3",
          "image4",
          "image5",
          "image6",
          "image7",
          "image8",
          "image9",
        ],
        Video: [],
        Audio: ["audio1", "audio2", "audio3"],
      },
    }),
  ],
  promptExemptions: [
    /\bnothing\b[^.,;]*\b(?:moves|slides|turns|tilts|enters|leaves|shifts|changes)\b/i,
    /\bdoes\s+not\s+move\b/i,
  ],
  spokenTextPattern: minimaxH3Dialogue,
});

// source-hash: ab09dd3b28da3dd7c43f0b815878d49dac6853e0088124f05ff3989135d37565
// source: konte / workflows/konte/image_minimax_h3_r2i.json (hand-authored)
import { defineComfyAsset, minimaxH3Prompt, promptReferenceTags } from "konte";

export const imageMinimaxH3R2i = defineComfyAsset({
  workflow: "image_minimax_h3_r2i.json",
  description:
    "MiniMax H3 R2I — a still from a prompt plus up to nine reference images; the origin of a frame, keeping the scene of every reference passed, so never a sheet. Takes a two-shot description, cutting into the frame from the panel before it.",
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
    image1: { nodeId: "21", field: "image", type: "image", required: true },
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
    // The ninth slot is the seam's: an unwired slot leaves the graph, so whatever is passed here is
    // numbered right after the `imageN` run however many of those are wired.
    prevPanel: {
      nodeId: "29",
      field: "image",
      type: "image",
      prevPanel: true,
      description:
        "The frame this shot cuts from — the previous beat's last panel, written as `[Shot 1]`.",
    },
    // MiniMaxH3ReferenceToVideo → BasicGuider.conditioning, SamplerCustomAdvanced.latent_image
    prompt: { nodeId: "10", field: "prompt", type: "prompt", default: "" },
    // MiniMaxH3ReferenceToVideo → BasicGuider.conditioning, SamplerCustomAdvanced.latent_image
    width: { nodeId: "10", field: "width", type: "width", default: 1344, grid: { step: 32 } },
    // MiniMaxH3ReferenceToVideo → BasicGuider.conditioning, SamplerCustomAdvanced.latent_image
    height: { nodeId: "10", field: "height", type: "height", default: 768, grid: { step: 32 } },
    // MiniMaxH3ReferenceToVideo → BasicGuider.conditioning, SamplerCustomAdvanced.latent_image
    refImageSize: {
      nodeId: "10",
      field: "ref_image_size",
      type: "string",
      default: "max",
      values: ["match", "max"],
      description:
        '"match" scales each reference to the generation\'s pixel area; "max" holds a 2048px short edge — stronger identity, several times the cost.',
    },
    // RandomNoise → SamplerCustomAdvanced.noise
    seed: { nodeId: "11", field: "noise_seed", type: "seed", default: 0 },
    // BasicScheduler → SamplerCustomAdvanced.sigmas
    steps: { nodeId: "13", field: "steps", type: "number", default: 20 },
    // MiniMaxH3ReferenceToVideo → BasicGuider.conditioning, SamplerCustomAdvanced.latent_image
    length: {
      nodeId: "10",
      field: "length",
      type: "number",
      default: 22,
      description:
        "Frames the model settles over — only the rungs 5, 22, 39, 56, 73, 90, 107, 124 land, a value between rounds up. A description carrying a cut takes 22 or more.",
    },
    // ImageFromBatch → SaveImage.images
    frameIndex: {
      nodeId: "17",
      field: "batch_index",
      type: "number",
      default: 8,
      description:
        "Which frame of the burst is kept: 0-based, clamped to the last. On a description that carries a cut it lands past the last one.",
    },
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
    // VAELoader → MiniMaxH3ReferenceToVideo.vae, VAEDecode.vae
    vaeName: {
      nodeId: "3",
      field: "vae_name",
      type: "string",
      default: "minimax_h3_video_vae_fp16.safetensors",
    },
    // VAELoader → MiniMaxH3ReferenceToVideo.audio_vae
    audioVaeName: {
      nodeId: "4",
      field: "vae_name",
      type: "string",
      default: "minimax_h3_audio_vae_fp32.safetensors",
    },
  },
  outputs: {
    image: { nodeId: "18", type: "image" },
  },
  validators: [
    minimaxH3Prompt({ mode: "r2i", length: "length", frameIndex: "frameIndex" }),
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
          "prevPanel",
        ],
        Video: [],
        Audio: [],
      },
    }),
  ],
  promptExemptions: [
    /\bnothing\b[^.,;]*\b(?:moves|slides|turns|tilts|enters|leaves|shifts|changes)\b/i,
    /\bdoes\s+not\s+move\b/i,
  ],
});

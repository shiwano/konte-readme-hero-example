// source-hash: 6207dcc9849a6e000240783ceabb4d3050bb941f469b85529217ea88002e1b83
// source: github.com/Comfy-Org/workflow_templates / templates/image_krea2_turbo_t2i_int8.json (MIT License)
import { defineComfyAsset } from "konte";

export const imageKrea2TurboT2i = defineComfyAsset({
  workflow: "image_krea2_turbo_t2i.json",
  description:
    "Krea 2 Turbo — a still from a prompt alone, in eight steps. The faster pick for reference material, and the one that holds a named style; when the look is a picture rather than a name, take the style-reference sibling.",
  guide: "konte/guides/krea2-turbo.md",
  models: [
    {
      filename: "krea2_turbo_int8_convrot.safetensors",
      type: "diffusion_model",
      url: "https://huggingface.co/Comfy-Org/Krea-2/resolve/main/diffusion_models/krea2_turbo_int8_convrot.safetensors",
    },
    {
      filename: "qwen3vl_4b_fp8_scaled.safetensors",
      type: "clip",
      url: "https://huggingface.co/Comfy-Org/Krea-2/resolve/main/text_encoders/qwen3vl_4b_fp8_scaled.safetensors",
    },
    {
      filename: "qwen_image_vae.safetensors",
      type: "VAE",
      url: "https://huggingface.co/Comfy-Org/Krea-2/resolve/main/vae/qwen_image_vae.safetensors",
    },
  ],
  inputs: {
    // CLIPTextEncode → KSampler.positive, ConditioningZeroOut.conditioning
    prompt: {
      nodeId: "52",
      field: "text",
      type: "prompt",
      default:
        "A human hand holding a martini glass, overlaid with whimsical ink-style doodles — a cartoon figure inside the glass, a citrus wedge drawn on the rim — clean white background, lit photograph blended with loose marker artistry.",
    },
    // EmptyLatentImage → KSampler.latent_image
    width: { nodeId: "53", field: "width", type: "width", default: 1280, grid: { step: 16 } },
    // EmptyLatentImage → KSampler.latent_image
    height: { nodeId: "53", field: "height", type: "height", default: 720, grid: { step: 16 } },
    // KSampler → VAEDecode.samples
    seed: { nodeId: "54", field: "seed", type: "seed", default: 0 },
    // KSampler → VAEDecode.samples
    steps: {
      nodeId: "54",
      field: "steps",
      type: "number",
      default: 8,
      description: "The checkpoint is distilled for 8; raising it costs time and changes little.",
    },
    // VAELoader → VAEDecode.vae
    vaeName: {
      nodeId: "58",
      field: "vae_name",
      type: "string",
      default: "qwen_image_vae.safetensors",
    },
    // CLIPLoader → CLIPTextEncode.clip
    clipName: {
      nodeId: "57",
      field: "clip_name",
      type: "string",
      default: "qwen3vl_4b_fp8_scaled.safetensors",
    },
    // UNETLoader → KSampler.model
    unetName: {
      nodeId: "56",
      field: "unet_name",
      type: "string",
      default: "krea2_turbo_int8_convrot.safetensors",
    },
  },
  outputs: {
    image: { nodeId: "29", type: "image" },
  },
});

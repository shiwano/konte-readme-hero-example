// source-hash: 6cc06b95e9c044fa81d3e90d2bc4fc0996f7178aa5bae3408860a5c26c25ffb8
// source: github.com/Comfy-Org/workflow_templates / templates/image_krea2_turbo_int8_image_style_reference.json (MIT License)
import { defineComfyAsset } from "konte";

export const imageKrea2TurboStyleReference = defineComfyAsset({
  workflow: "image_krea2_turbo_style_reference.json",
  description:
    "Krea 2 Turbo Style Reference — a still from a prompt, in the look of one or two supplied frames. Pick it to hold one piece's look across every reference sheet; the frames carry style, never a subject the prompt does not name or a scene it stands in.",
  guide: "konte/guides/krea2-turbo.md",
  allowedIn: ["reference", "patch"],
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
    {
      filename: "krea2_style_reference.safetensors",
      type: "lora",
      url: "https://huggingface.co/Comfy-Org/Krea-2/resolve/main/loras/krea2_style_reference.safetensors",
    },
  ],
  inputs: {
    // TextEncodeQwenImageEditPlus → FluxKontextMultiReferenceLatentMethod.conditioning
    //
    // Required, with no default: the frames supply the look and nothing else, so a call with no
    // prompt has no subject to put in it.
    prompt: { nodeId: "90", field: "prompt", type: "prompt", required: true },
    // LoadImage → TextEncodeQwenImageEditPlus.image1
    styleImage1: { nodeId: "69", field: "image", type: "image", required: true },
    // LoadImage → TextEncodeQwenImageEditPlus.image2
    styleImage2: { nodeId: "100", field: "image", type: "image" },
    // EmptyLatentImage → SamplerCustomAdvanced.latent_image (ModelSamplingFlux.width)
    width: {
      nodeId: "96",
      field: "width",
      type: "width",
      default: 1280,
      grid: { step: 16 },
      also: [{ nodeId: "99", field: "width" }],
    },
    // EmptyLatentImage → SamplerCustomAdvanced.latent_image (ModelSamplingFlux.height)
    height: {
      nodeId: "96",
      field: "height",
      type: "height",
      default: 720,
      grid: { step: 16 },
      also: [{ nodeId: "99", field: "height" }],
    },
    // RandomNoise → SamplerCustomAdvanced.noise
    seed: { nodeId: "98", field: "noise_seed", type: "seed", default: 0 },
    // BasicScheduler → SamplerCustomAdvanced.sigmas
    steps: {
      nodeId: "95",
      field: "steps",
      type: "number",
      default: 8,
      description: "The checkpoint is distilled for 8; raising it costs time and changes little.",
    },
    // LoraLoaderModelOnly → ModelSamplingFlux.model
    styleStrength: {
      nodeId: "82",
      field: "strength_model",
      type: "number",
      default: 1,
      description: "How hard the frames pull. Below ~0.6 the prompt's own style wins.",
    },
    // VAELoader → TextEncodeQwenImageEditPlus.vae, VAEDecode.vae
    vaeName: {
      nodeId: "80",
      field: "vae_name",
      type: "string",
      default: "qwen_image_vae.safetensors",
    },
    // CLIPLoader → TextEncodeQwenImageEditPlus.clip
    clipName: {
      nodeId: "79",
      field: "clip_name",
      type: "string",
      default: "qwen3vl_4b_fp8_scaled.safetensors",
    },
    // UNETLoader → LoraLoaderModelOnly.model
    unetName: {
      nodeId: "78",
      field: "unet_name",
      type: "string",
      default: "krea2_turbo_int8_convrot.safetensors",
    },
    // LoraLoaderModelOnly → ModelSamplingFlux.model
    loraName: {
      nodeId: "82",
      field: "lora_name",
      type: "string",
      default: "krea2_style_reference.safetensors",
    },
  },
  outputs: {
    image: { nodeId: "29", type: "image" },
  },
});

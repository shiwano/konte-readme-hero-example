// source-hash: 9c9a0f07936892cb23b4e8f13d870f05230ec881910790799565dfcee22e9732
// source: konte / workflows/konte/image_krea2_turbo_reference.json (hand-authored)
import { defineComfyAsset, promptReferenceTags } from "konte";

export const imageKrea2TurboReference = defineComfyAsset({
  workflow: "image_krea2_turbo_reference.json",
  description:
    "Krea 2 Turbo Reference — a still built on up to three frames the prompt gives jobs to by number: hold this face, follow this pose, take the look of that. Pick it to carry a subject across the reference sheets; the frames' own scene is not kept.",
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
  ],
  inputs: {
    // TextEncodeQwenImageEditPlus → ConditioningZeroOut.conditioning, CFGGuider.positive
    //
    // Required, with no default: the references carry no instruction of their own, so a call
    // with no prompt has nothing to say what to keep and what to change.
    prompt: { nodeId: "90", field: "prompt", type: "prompt", required: true },
    // LoadImage → TextEncodeQwenImageEditPlus.image1
    image1: { nodeId: "69", field: "image", type: "image", required: true },
    // LoadImage → TextEncodeQwenImageEditPlus.image2
    image2: { nodeId: "100", field: "image", type: "image" },
    // LoadImage → TextEncodeQwenImageEditPlus.image3
    image3: { nodeId: "101", field: "image", type: "image" },
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
    // UNETLoader → ModelSamplingFlux.model
    unetName: {
      nodeId: "78",
      field: "unet_name",
      type: "string",
      default: "krea2_turbo_int8_convrot.safetensors",
    },
  },
  outputs: {
    image: { nodeId: "29", type: "image" },
  },
  validators: promptReferenceTags({
    form: "bare",
    tags: { image: { slots: ["image1", "image2", "image3"], exhaustive: false } },
  }),
});

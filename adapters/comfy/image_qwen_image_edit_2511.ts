// source-hash: d561a38c15bd7d08758a5e6773d467142244d5b83fc5d3aecdf6d8df9fe881b6
// source: github.com/Comfy-Org/workflow_templates / templates/image_qwen_image_edit_2511.json (MIT License)
import { defineComfyAsset, inertInputs, promptReferenceTags } from "konte";

export const imageQwenImageEdit2511 = defineComfyAsset({
  workflow: "image_qwen_image_edit_2511.json",
  description:
    "Qwen Image Edit 2511 — rewrites a frame that exists, keeping the rest: a material/style swap, a correction, a derived take. Never an origin.",
  guide: "konte/guides/qwen-image-edit-2511.md",
  models: [
    {
      filename: "qwen_image_vae.safetensors",
      type: "VAE",
      url: "https://huggingface.co/Comfy-Org/Qwen-Image_ComfyUI/resolve/main/split_files/vae/qwen_image_vae.safetensors",
    },
    {
      filename: "Qwen-Image-Edit-2511-Lightning-4steps-V1.0-bf16.safetensors",
      type: "lora",
      url: "https://huggingface.co/lightx2v/Qwen-Image-Edit-2511-Lightning/resolve/main/Qwen-Image-Edit-2511-Lightning-4steps-V1.0-bf16.safetensors",
    },
    {
      filename: "qwen_image_edit_2511_fp8mixed.safetensors",
      type: "diffusion_model",
      url: "https://huggingface.co/Comfy-Org/Qwen-Image-Edit_ComfyUI/resolve/main/split_files/diffusion_models/qwen_image_edit_2511_fp8mixed.safetensors",
    },
    {
      filename: "qwen_2.5_vl_7b_fp8_scaled.safetensors",
      type: "clip",
      url: "https://huggingface.co/Comfy-Org/Qwen-Image_ComfyUI/resolve/main/split_files/text_encoders/qwen_2.5_vl_7b_fp8_scaled.safetensors",
    },
  ],
  inputs: {
    // LoadImage → FluxKontextImageScale.image
    image1: { nodeId: "41", field: "image", type: "image", required: true },
    // LoadImage → TextEncodeQwenImageEditPlus.image2, TextEncodeQwenImageEditPlus.image2
    image2: { nodeId: "83", field: "image", type: "image" },
    // LoadImage → TextEncodeQwenImageEditPlus.image3, TextEncodeQwenImageEditPlus.image3
    image3: { nodeId: "218", field: "image", type: "image" },
    // TextEncodeQwenImageEditPlus → FluxKontextMultiReferenceLatentMethod.conditioning (KSampler.positive)
    //
    // Required, with no default: an edit model has no meaningful call without an instruction, and
    // the template's own sample sentence names an `image 2` a minimal call does not wire.
    prompt: { nodeId: "201", field: "prompt", type: "prompt", required: true },
    // TextEncodeQwenImageEditPlus → FluxKontextMultiReferenceLatentMethod.conditioning (KSampler.negative)
    negativePrompt: { nodeId: "199", field: "prompt", type: "negativePrompt", default: " " },
    // EmptySD3LatentImage → KSampler.latent_image
    width: { nodeId: "219", field: "width", type: "width", default: 1280 },
    // EmptySD3LatentImage → KSampler.latent_image
    height: { nodeId: "219", field: "height", type: "height", default: 720 },
    // KSampler → VAEDecode.samples
    seed: { nodeId: "215", field: "seed", type: "seed", default: 0 },
    // PrimitiveBoolean → ComfySwitchNode.switch, ComfySwitchNode.switch, ComfySwitchNode.switch
    useLightning: { nodeId: "212", field: "value", type: "boolean", default: false },
    // VAELoader → TextEncodeQwenImageEditPlus.vae, TextEncodeQwenImageEditPlus.vae, VAEDecode.vae
    vaeName: {
      nodeId: "196",
      field: "vae_name",
      type: "string",
      default: "qwen_image_vae.safetensors",
    },
    // UNETLoader → ModelSamplingAuraFlow.model
    unetName: {
      nodeId: "207",
      field: "unet_name",
      type: "string",
      default: "qwen_image_edit_2511_fp8mixed.safetensors",
    },
    // CLIPLoader → TextEncodeQwenImageEditPlus.clip, TextEncodeQwenImageEditPlus.clip
    clipName: {
      nodeId: "208",
      field: "clip_name",
      type: "string",
      default: "qwen_2.5_vl_7b_fp8_scaled.safetensors",
    },
    // LoraLoaderModelOnly → ComfySwitchNode.on_true
    loraName: {
      nodeId: "203",
      field: "lora_name",
      type: "string",
      default: "Qwen-Image-Edit-2511-Lightning-4steps-V1.0-bf16.safetensors",
    },
  },
  outputs: {
    image: { nodeId: "9", type: "image" },
  },
  validators: [
    promptReferenceTags({
      form: "bare",
      tags: { image: { slots: ["image1", "image2", "image3"], exhaustive: false } },
    }),
    inertInputs({
      inputs: { negativePrompt: [" ", ""] },
      when: { useLightning: true },
      reason: "the Lightning LoRA samples at CFG 1, which has no negative branch",
      fix: "Set `useLightning: false` for this take, or drop the negative prompt.",
    }),
  ],
});

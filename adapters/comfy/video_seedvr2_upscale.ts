// source-hash: d88c2474aed582f1567a0fe583f39361e2aedf90a30ce078fb543fe4706f67d7
// source: github.com/Comfy-Org/workflow_templates / templates/utility_seedvr2_video_upscale.json (MIT License)
import { defineComfyAsset } from "konte";

export const videoSeedvr2Upscale = defineComfyAsset({
  workflow: "video_seedvr2_upscale.json",
  description:
    "SeedVR2 — restores and enlarges a finished clip, no prompt. For export.delivery.upscale.video only.",
  guide: "konte/guides/seedvr2.md",
  nodes: [{ id: "seedvr2_videoupscaler" }],
  models: [
    {
      filename: "seedvr2_ema_3b_fp8_e4m3fn.safetensors",
      type: "diffusion_model",
      savePath: "SEEDVR2",
      url: "https://huggingface.co/numz/SeedVR2_comfyUI/resolve/main/seedvr2_ema_3b_fp8_e4m3fn.safetensors",
    },
    {
      filename: "ema_vae_fp16.safetensors",
      type: "VAE",
      savePath: "SEEDVR2",
      url: "https://huggingface.co/numz/SeedVR2_comfyUI/resolve/main/ema_vae_fp16.safetensors",
    },
  ],
  inputs: {
    // LoadVideo → GetVideoComponents.video
    video: { nodeId: "18", field: "file", type: "video", required: true },
    // ImageScale → SeedVR2VideoUpscaler.image
    upscaleMethod: { nodeId: "20", field: "upscale_method", type: "string", default: "lanczos" },
    // ImageScale → SeedVR2VideoUpscaler.image
    width: {
      nodeId: "20",
      field: "width",
      type: "number",
      default: 1280,
      description:
        "Injected by `export.delivery.upscale.video` as the source's real size × scale — leave it alone.",
    },
    // ImageScale → SeedVR2VideoUpscaler.image
    height: {
      nodeId: "20",
      field: "height",
      type: "number",
      default: 720,
      description:
        "Injected by `export.delivery.upscale.video` as the source's real size × scale — leave it alone.",
    },
    // ImageScale → SeedVR2VideoUpscaler.image
    crop: { nodeId: "20", field: "crop", type: "string", default: "center" },
    // ImageFromBatch → ImageScale.image
    batchIndex: { nodeId: "22", field: "batch_index", type: "number", default: 0 },
    // ImageFromBatch → ImageScale.image
    length: { nodeId: "22", field: "length", type: "number", default: 1000 },
    // SeedVR2LoadDiTModel → SeedVR2VideoUpscaler.dit
    ditModel: {
      nodeId: "25",
      field: "model",
      type: "string",
      default: "seedvr2_ema_3b_fp8_e4m3fn.safetensors",
    },
    // SeedVR2VideoUpscaler → CreateVideo.images
    resolution: {
      nodeId: "26",
      field: "resolution",
      type: "number",
      default: 1080,
      description:
        "The output height — 1080 gives 1920×1080 at 16:9. Not the shortest edge: on a portrait frame it is the long one.",
    },
    // SeedVR2LoadDiTModel → SeedVR2VideoUpscaler.dit
    blocksToSwap: { nodeId: "25", field: "blocks_to_swap", type: "number", default: 0 },
    offloadDevice: { nodeId: "25", field: "offload_device", type: "string", default: "none" },
  },
  outputs: {
    video: { nodeId: "17", type: "video" },
  },
});

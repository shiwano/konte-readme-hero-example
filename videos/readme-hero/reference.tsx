import { defineReference, asset, adapters } from "konte";
import { imageKrea2TurboT2i } from "konte/workspace/adapters/comfy/image_krea2_turbo_t2i.js";
import { audioMinimaxH3R2a } from "konte/workspace/adapters/comfy/audio_minimax_h3_r2a.js";
import { audioStableAudio3Medium } from "konte/workspace/adapters/comfy/audio_stable_audio_3_medium.js";
import direction from "./direction";

const STYLE =
  "Modern flat-colour anime illustration in the style of a cute mobile-game mascot key visual: bold, clean dark outlines of even weight, bright flat cel colours filled edge to edge, one simple step of soft shading, crisp edges everywhere.";

const PROP_GROUND =
  "centred on a plain, even pale off-white background with a little empty margin around it, even soft lighting, the object filling most of the frame.";

export default defineReference(direction, () => {
  const konte = asset("konte", adapters.imageFile, { path: "assets/files/character.png" });

  const look = asset("look", imageKrea2TurboT2i, {
    prompt:
      "Modern flat-colour anime illustration in the style of a cute mobile-game mascot key visual: bold, clean dark outlines of even weight, bright flat cel colours filled edge to edge, one simple step of soft shading, crisp edges everywhere. An animator's cluttered, bright workroom seen straight on from the doorway. On the left a warm wooden drawing desk crowded with a black pen display tablet, stacked storyboard sheets, a white mug and a pencil cup; on the back wall a tall narrow window letting in flat white daylight; on the right wall a cork board pinned with storyboard sheets and a few small lavender sticky notes. A young man with short brown hair in a mint green apron sits at the desk, seen from behind at three-quarter, drawing. White walls, pale warm wood, vivid violet and lavender accents scattered through the room. Even, soft daylight filling the room, shadows kept pale and gentle.",
  });

  const studio = asset("studio", imageKrea2TurboT2i, {
    prompt: `${STYLE} A long, empty animator's workroom seen from its far end, straight on at standing eye level, the back wall small and distant so that everything against it sits low and small in the middle band of the picture, the desk no taller than a fifth of the picture's height, a wide expanse of pale wooden floor filling the whole lower half of the picture and plain white wall with a ceiling line filling the upper part, the room empty and still. Against the back wall, on the left third, a small warm wooden drawing desk seen whole with clear wall on both sides of it and a chair pushed in, its top crowded with a black pen display tablet, stacked storyboard sheets, a white mug and a pencil cup, a stack of paper on the floor beside it. Left of centre on the back wall, one tall narrow window letting in flat white daylight, a lavender box on its sill. On the right third, one single large cork board hanging whole at head height with a clear margin of white wall to its right before the picture's edge, pinned with a few storyboard sheets and small lavender sticky notes, with an empty stretch of white wall between the window and the board. White walls, pale warm wood, vivid violet and lavender accents on the small objects. Even, soft daylight filling the room, shadows kept pale and gentle.`,
  });

  const stickyNote = asset("stickyNote", imageKrea2TurboT2i, {
    prompt: `${STYLE} One single plain blank square lavender sticky note, its lower corner curling up slightly, its surface a smooth even lavender, ${PROP_GROUND}`,
  });

  const clapperboard = asset("clapperboard", imageKrea2TurboT2i, {
    prompt: `${STYLE} One small film clapperboard, black slate with white chalk lines and a black-and-white striped clapstick, closed, seen straight on at a slight angle, ${PROP_GROUND}`,
  });

  const storyboardSheet = asset("storyboardSheet", imageKrea2TurboT2i, {
    prompt: `${STYLE} One blank white A4 storyboard sheet lying flat, printed with a grid of six empty rectangular panels in thin grey lines with short ruled lines under each, seen straight from above, ${PROP_GROUND}`,
  });

  const tablet = asset("tablet", imageKrea2TurboT2i, {
    prompt: `${STYLE} One thin tablet computer with a white bezel and a dark switched-off screen, lying flat, seen straight from above, ${PROP_GROUND}`,
  });

  const konteVoice = asset("konteVoice", audioMinimaxH3R2a, {
    image1: konte,
    prompt: `subject_definitions: <Subject 1> is the girl in <Picture 1>: black bob with a purple star-print headband, black choker, white hoodie with a violet logo. She is speaker (S1).

summary: [reference generation] <Subject 1> (S1), a cheerful early-teens girl with a bright, light voice, quick and crisp, with clear English diction, stands in a small quiet workroom and says one plain everyday sentence to someone across the room.

retention_analysis: <Subject 1>: weak_reference - the girl's age, look and cheerful character cast the voice, and the voice alone is taken from it.

detailed_description: 2D-animated. [Shot 1] The girl (S1), an early-teens girl with a bright, light, quick and crisp voice, stands in a small bright workroom facing someone off-screen, her weight even on both feet and her hands loose at her sides, and says in her bright, light voice, quick and crisp, <d>[English] Okay, so the storyboards go on the left, and the tablet goes right here on the desk.</d> Her lips meet and the speaking motion stops. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone and one soft rustle of paper.

non_diegetic_music: N/A`,
  });

  const bgm = asset("bgm", audioStableAudio3Medium, {
    category: "Music",
    duration: 110,
    prompt:
      "lo-fi hip hop, warm Rhodes electric piano chords, soft vinyl crackle, laid-back boom-bap drums with a light bounce, round muted bass, playful glockenspiel accents, cozy and upbeat, mid tempo, warm bedroom production",
  });

  return { konte, look, studio, stickyNote, clapperboard, storyboardSheet, tablet, konteVoice, bgm };
});

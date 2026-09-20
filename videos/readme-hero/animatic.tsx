import { defineAnimatic, asset, adapters, Audio, Composition, Panel } from "konte";
import { imageMinimaxH3R2i } from "konte/workspace/adapters/comfy/image_minimax_h3_r2i.js";
import { audioMinimaxH3R2a } from "konte/workspace/adapters/comfy/audio_minimax_h3_r2a.js";
import { imageQwenImageEdit2511 } from "konte/workspace/adapters/comfy/image_qwen_image_edit_2511.js";
import { audioStableAudio3Medium } from "konte/workspace/adapters/comfy/audio_stable_audio_3_medium.js";
import direction from "./direction";
import reference from "./reference";

const KONTE_LOOK =
  "black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag";

// One spoken line in konte-chan's voice: the sheet casts the speaker, the accepted sample carries the timbre.
function voice(
  name: string,
  line: string,
  delivery: string,
  length?: number,
  extra: { cutoff?: boolean; after?: string } = {},
) {
  return asset(name, audioMinimaxH3R2a, {
    image1: reference.konte,
    audio1: reference.konteVoice,
    ...(length ? { length } : {}),
    prompt: `subject_definitions: <Subject 1> is the girl in <Picture 1>: ${KONTE_LOOK}. She is speaker (S1).
<Audio 1> is the voice-timbre reference for <Subject 1> (S1).

summary: [audio reference] One spoken line from <Subject 1> (S1), a cheerful early-teens girl with a bright, light voice, in a small quiet workroom.

retention_analysis: <Subject 1>: weak_reference - the girl's age, look and cheerful character cast the voice.
<Audio 1>: weak_reference - the target speaker keeps its colour; the delivery follows the scene.

detailed_description: 2D-animated. [Shot 1] The girl (S1), an early-teens girl with a bright, light voice, in a small bright workroom, ${delivery} <d>[English] ${line}</d>${extra.cutoff ? "<cutoff>" : ""} ${extra.after ? `${extra.after} ` : ""}Her lips meet and the speaking motion stops. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone.

non_diegetic_music: N/A`,
  });
}

export default defineAnimatic(direction, {
  plates: () => ({
    roomWide: {
      image: asset("roomWide", adapters.imageCrop, { image: reference.studio, x: 0, y: 280, width: 3840, height: 960 }),
      prompt:
        "The whole back wall of the workroom in one wide strip: the drawing desk with its tilted pen tablet and a stack of storyboard sheets at the far left, the tall window left of centre, a long stretch of bare white wall, and the cork board pinned with sheets and lavender sticky notes at the far right, with pale wooden floor along the bottom.",
    },
    konteMedium: {
      image: asset("konteMedium", adapters.imageCrop, { image: reference.studio, x: 2080, y: 350, width: 1760, height: 440 }),
      prompt:
        "A stretch of bare white wall at waist-to-head height, with the cork board pinned with storyboard sheets and lavender sticky notes filling the right part of the frame.",
    },
    konteClose: {
      image: asset("konteClose", adapters.imageCrop, { image: reference.studio, x: 2700, y: 400, width: 640, height: 160 }),
      prompt:
        "Bare white wall filling most of the frame, with the cork board's left edge and a pinned sheet entering at the right.",
    },
    deskMedium: {
      image: asset("deskMedium", adapters.imageCrop, { image: reference.studio, x: 0, y: 480, width: 1760, height: 440 }),
      prompt:
        "The drawing desk with its tilted pen tablet, a stack of storyboard sheets, mug and pencil cup and its chair pushed in at the left, and the tall window with a lavender box on its sill to the right of it, bare white wall between and beyond.",
    },
    deskInsert: {
      image: asset("deskInsert", imageMinimaxH3R2i, {
        image1: reference.studio,
        prompt: `subject_definitions: <Subject 1> is the animator's workroom in <Picture 1>: white walls, a warm wooden drawing desk with a black pen display tablet, a stack of storyboard sheets, a white mug and a violet pencil cup on it, flat white daylight from a tall window.

summary: [reference generation] a new camera position looking almost straight down onto the desk top of <Subject 1>, the tablet, the stack of storyboard sheets, the mug and the pencil cup filling the frame on warm wood.

retention_analysis: <Subject 1>: attribute_transfer - the desk's objects, materials, colours and the flat daylight are carried onto a new camera position; the framing is new.

detailed_description: 2D-animated. [Shot 1] A high angle looking almost straight down onto the warm wooden desk top, the desk pushed flat against the plain white wall: the black pen display tablet lying flat at the left, a neat stack of blank storyboard sheets beside it in the middle, a white mug and a violet pencil cup with pencils at the right edge, wood grain running across the surface and filling every gap between the objects, plain white wall filling the frame beyond the desk's far edge and all along its left side, flat even white daylight, pale soft shadows.

overall_soundscape: N/A

non_diegetic_music: N/A`,
      }),
      prompt:
        "The desk top seen from almost straight above, pushed against the white wall: the black pen tablet, a stack of storyboard sheets, a mug and a pencil cup on warm wood, plain white wall beyond the desk and along its left side.",
    },
  }),
  timeline: ({ shot, plates }) => ({
    shots: shot("01", ({ script }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}

summary: [keyframe completion] the empty cork-board corner, and the girl's face sliding in from the right edge of the frame mid-word.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.

detailed_description: 2D-animated. [Shot 1] From the right edge of the frame the girl's face slides in sideways, only her head and one shoulder inside the frame, leaning in from off the right edge as if peeking round a doorframe, her eyes wide and bright on the lens, her mouth open mid-word in a grin, the cork board's pinned sheets and lavender notes behind her head, soft even daylight.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "leans in from the edge of the frame and calls out one bright, quick hello,");
      return (
        <Composition>
          <Panel src={first} blocking="右端からもう少し顔を滑り込ませ、口を開けたまま言いかけて止まる。フレームの右辺に留まる。" camera="fixed" />
          <Audio src={vo0} start={0.3} />
        </Composition>
      );
    })
      .nextShot("02", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.roomWide.image,
          image2: reference.konte,
          prevPanel: shot("01").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.roomWide.prompt}
<Picture 3> is the frame this shot cuts from.

summary: [keyframe completion] the whole strip of the room, the girl tiny at the far right waving with both arms.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Picture 3>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 3>, held. [Shot 2] At 00:00.400, the camera cuts to the whole strip of the room: the girl stands tiny at the far right in front of the cork board, her sneakers planted on the pale wooden floor at the bottom edge of the frame, her whole figure a little shorter than the frame is tall, both arms thrown high above her head mid-wave, her mouth open wide in a shout, the drawing desk, the tall window and the long bare wall stretching away to the left of her.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "stands at the far end of the room and shouts across it, throwing both arms up,");
      return (
        <Composition>
          <Panel src={first} blocking="遠くで両腕を頭上で大きく振り、口を開けて叫ぶ。立ち位置は動かない。" camera="fixed" />
          <Audio src={vo0} start={0.6} />
        </Composition>
      );
    })
            .nextShot("03", ({ shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          image3: reference.stickyNote,
          prevPanel: shot("02").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}
<Picture 4> is the frame this shot cuts from.

summary: [keyframe completion] close on her face with a lavender sticky note landed on her forehead, frozen mid-word.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept, a plain flat square of lavender.
<Picture 4>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 4>, held. [Shot 2] At 00:00.500, the camera cuts to her face filling the frame, bare white wall behind her head and the cork board's edge at the right: the lavender sticky note stuck square on her forehead just under the headband, her eyes rolled up toward it, her mouth still open mid-word, frozen.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="付箋がおでこに貼りついた勢いで一瞬のけぞり、目が上を向いて止まる。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("04", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          image3: reference.stickyNote,
          prevPanel: shot("03").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}
<Picture 4> is the frame this shot cuts from.

summary: [keyframe completion] the same close frame, the lavender sticky note peeled off her forehead and held beside her cheek to read.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept, a plain flat square of lavender.
<Picture 4>: partially_preserved - her light, size and where she stands carry across; the camera holds the same position.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 4>, held. [Shot 2] At 00:00.500, the camera cuts to the same close frame a moment later, the bare white wall still behind her head and the cork board's edge still at the right: the lavender sticky note is off her forehead now, held up beside her cheek between her finger and thumb, a plain flat square of lavender, her hand drawn simply and cleanly, her eyes turned to the note, lips parted to read.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "holds the note beside her cheek and reads it out flat, word by word, then goes quiet for a puzzled beat,", 56);
      return (
        <Composition>
          <Panel src={first} blocking="顔の横に掲げた付箋を読み、きょとんと止まる。" camera="fixed" />
          <Audio src={vo0} start={1.0} />
        </Composition>
      );
    })
      .nextShot("06", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteMedium.image,
          image2: reference.konte,
                    prevPanel: shot("04").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.konteMedium.prompt}
<Picture 3> is the frame this shot cuts from.

summary: [keyframe completion] her waist-up back at her mark beside the cork board, a fresh grin, picking up where she left off.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Picture 3>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 3>, held. [Shot 2] At 00:00.400, the camera cuts to her waist-up back at her mark, her figure filling most of the frame's height, standing just left of the cork board with bare white wall to her left: hands hanging loose at her sides, chin up, a fresh bright grin at the lens, cheerfully picking up where she left off.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "grins at the lens and says brightly and fast, every word of it sounded out, cheerfully picking up where she left off,", 73);
      return (
        <Composition>
          <Panel src={first} blocking="にっこりしてカメラに話しかけ、両手を軽く広げる。立ち位置は動かない。" camera="fixed" />
          <Audio src={vo0} start={0.4} />
        </Composition>
      );
    })
      .nextShot("07", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteMedium.image,
          image2: reference.konte,
          prevPanel: shot("06").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.konteMedium.prompt}
<Picture 3> is the frame this shot cuts from.

summary: [keyframe completion] her waist-up in front of the cork board, both hands mid-gesture, mouth open mid-sentence.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Picture 3>: partially_preserved - her light, size and where she stands carry across; the camera holds the same position.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 3>, held. [Shot 2] At 00:00.400, the camera cuts to the same frame a moment later, her waist-up standing just left of the cork board with bare white wall to the left of her: both hands up in front of her chest mid-gesture, fingers half curled counting off, elbows out, her mouth open mid-sentence, eyebrows high, eyes on the lens, leaning slightly forward.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "rattles it off faster with every word, hands flying, breaking off mid-word,");
      return (
        <Composition>
          <Panel src={first} blocking="両手を胸の前でせわしなく動かしながら喋る。指を折り、四角を作り、カメラを構える真似。" camera="fixed" />
          <Audio src={vo0} start={0.3} />
        </Composition>
      );
    })
      .nextShot("08", ({ shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          image3: reference.stickyNote,
          prevPanel: shot("07").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}
<Picture 4> is the frame this shot cuts from.

summary: [keyframe completion] close on her face with a lavender sticky note stuck on her forehead, frozen mid-word.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Picture 4>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 4>, held. [Shot 2] At 00:00.400, the camera cuts to her face: the lavender sticky note stuck square on her forehead just under the headband, her eyes rolled up toward it, her mouth still open mid-word, frozen.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="付箋がおでこに貼りついた勢いで一瞬のけぞり、目が上を向いて止まる。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("09", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          image3: reference.stickyNote,
          prevPanel: shot("08").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}
<Picture 4> is the frame this shot cuts from.

summary: [keyframe completion] the same close frame as the one before, the lavender sticky note peeled off her forehead and held beside her cheek.

retention_analysis: <Picture 1>: attribute_transfer - its cork material and soft light are carried; the framing and the background are those of <Picture 4>.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept, a plain flat square of lavender.
<Picture 4>: partially_preserved - her light, size, where she stands, and the bare white wall behind her head with the cork board's edge at the right all carry across; the camera holds the same position.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 4>, held. [Shot 2] At 00:00.500, the camera cuts to the same close frame a moment later, the bare white wall still behind her head and the cork board's edge still at the right: the lavender sticky note is off her forehead now, held up beside her cheek between her finger and thumb, a plain flat square of lavender, her hand drawn simply and cleanly, her eyes turned to the note, lips parted to read.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "reads the note out, then lets the last small, deflated oh slip out,", 39);
      return (
        <Composition>
          <Panel src={first} blocking="顔の横に掲げた付箋を読み、小さく「oh」と眉が下がる。" camera="fixed" />
          <Audio src={vo0} start={0.7} />
        </Composition>
      );
    })
      .nextShot("10", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteMedium.image,
          image2: reference.konte,
                    prevPanel: shot("09").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.konteMedium.prompt}
<Picture 3> is the frame this shot cuts from.

summary: [keyframe completion] her waist-up, small at the cork board's left edge, both hands in her hoodie pocket, one eyebrow up.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Picture 3>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 3>, held. [Shot 2] At 00:00.500, the camera cuts to her waist-up, her figure filling most of the frame's height, standing just left of the cork board with bare white wall filling the left of the frame: both hands tucked deep into the front pocket of her hoodie, her shoulders up, her face to the lens with one eyebrow raised high and her head tilted a little.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "takes a small breath first, then says it slowly and deliberately, landing each word with an eyebrow, hands in her pockets, settling the last words into a prim, self-satisfied tone,", 90);
      return (
        <Composition>
          <Panel src={first} blocking="両手をポケットに入れたまま、眉と目と首の傾きだけで話す。体は動かさない。" camera="fixed" />
          <Audio src={vo0} start={0.25} />
        </Composition>
      );
    })
      .nextShot("11", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteMedium.image,
          image2: reference.konte,
          prevPanel: shot("10").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.konteMedium.prompt}
<Picture 3> is the frame this shot cuts from.

summary: [keyframe completion] the same medium frame, both hands in the hoodie pocket, leaning proudly toward the lens.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Picture 3>: partially_preserved - her light, size and where she stands carry across; the camera holds the same position.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 3>, held. [Shot 2] At 00:00.500, the camera cuts to the same frame a moment later: both hands still buried in the hoodie's front pocket, both feet planted flat on the floor, her upper body tilted forward toward the lens from the waist, chin lifted high, eyes half-lidded in a proud closed-mouth smirk.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "leans in, speeding up word by word as the pride runs away with her, and says it proud, building to the last word and breaking off on it,", 90, {
        cutoff: true,
      });
      return (
        <Composition>
          <Panel src={first} blocking="両手をポケットに入れたまま、腰から前へ乗り出して喋る。" camera="fixed" />
          <Audio src={vo0} start={0.3} duration={3.4} />
        </Composition>
      );
    })
      .nextShot("12", ({ shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          image3: reference.stickyNote,
          prevPanel: shot("11").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}
<Picture 4> is the frame this shot cuts from.

summary: [keyframe completion] close on her face, calm and pleased with herself, a moment before anything reaches her.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Picture 4>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 4>, held. [Shot 2] At 00:00.500, the camera cuts to her face, bare white wall behind her head and the cork board's edge at the right: her forehead bare under the headband, a small satisfied smile with her mouth closed, her eyes on the lens.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="付箋が飛んできておでこに貼りつき、その勢いで一瞬のけぞって、目を丸くして付箋を見上げる。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("13", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          image3: reference.stickyNote,
          prevPanel: shot("12").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}
<Picture 4> is the frame this shot cuts from.

summary: [keyframe completion] the same close frame as the one before, the lavender sticky note just landed on her forehead.

retention_analysis: <Picture 1>: attribute_transfer - its cork material and soft light are carried; the framing and the background are those of <Picture 4>.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept, a plain flat square of lavender.
<Picture 4>: partially_preserved - her light, size, where she stands, and the bare white wall behind her head with the cork board's edge at the right all carry across; the camera holds the same position.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 4>, held. [Shot 2] At 00:00.500, the camera cuts to the exact framing of <Picture 4>, her whole face from the top of her head down to her chin in frame: the lavender sticky note now stuck on her forehead just under the headband, her eyes wide and rolled up toward it, her mouth closed.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "puts on a flat, mock-serious grown-up tone and reads the note out, leaning hard on the word I, then falls silent in a long blink,");
      return (
        <Composition>
          <Panel src={first} blocking="おでこの付箋をつまんではがし、頬の横で見つめて読み、長いまばたきを一つ。" camera="fixed" />
          <Audio src={vo0} start={1.3} />
        </Composition>
      );
    })
      .nextShot("14", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteMedium.image,
          image2: reference.konte,
                    prevPanel: shot("13").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.konteMedium.prompt}
<Picture 3> is the frame this shot cuts from.

summary: [keyframe completion] her waist-up, small at the cork board's left edge, half turned away and looking back sheepish.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Picture 3>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 3>, held. [Shot 2] At 00:00.500, the camera cuts to her waist-up, her figure small in the frame at the cork board's left edge with bare white wall to her left: her shoulders slumped, her body half turned away toward the cork board, only her head turned back toward the lens, a small sheepish smile, her eyes sliding sideways to the lens.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "says it small and sheepish, then hurries a smile back on,");
      return (
        <Composition>
          <Panel src={first} blocking="体をカメラへ向け直して、ばつの悪い笑顔で話し、「You pick」で手のひらを上にしてカメラへ手を差し出す。" camera="fixed" />
          <Audio src={vo0} start={0.8} />
        </Composition>
      );
    })
      .nextShot("15", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteMedium.image,
          image2: reference.konte,
          prevPanel: shot("14").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.konteMedium.prompt}
<Picture 3> is the frame this shot cuts from.

summary: [keyframe completion] the same medium frame, standing straight and thumping her own chest.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Picture 3>: partially_preserved - her light, size and where she stands carry across; the camera holds the same position.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 3>, held. [Shot 2] At 00:00.500, the camera cuts to the same frame a moment later: standing straight, chest out, one fist pressed to her own chest right on the hoodie's violet logo, chin up, a bright grin, eyes on the lens.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "thumps her chest and says it short and firm,");
      const vo1 = voice("vo1", script.konte[1], "then brightens suddenly and calls it out, already turning to run,");
      const thump = asset("thump", audioStableAudio3Medium, {
        category: "SFX",
        duration: 1,
        prompt: "single dull thump, a fist striking a soft cotton hoodie over the chest, close and dry, small quiet room, one hit, short decay",
      });
      return (
        <Composition>
          <Panel src={first} blocking="胸を叩いて言い切り、明るく叫んで、机のほうへ体をひねる。フレーム内に留まる。" camera="fixed" />
          <Audio id="thump" src={thump} start={0.72} />
          <Audio src={vo0} start={0.2} />
          <Audio src={vo1} start={1.9} />
        </Composition>
      );
    })
      .nextShot("16", ({ shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.roomWide.image,
          image2: reference.konte,
          prevPanel: shot("15").image("first"),
          length: 39,
          frameIndex: 36,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.roomWide.prompt}
<Picture 3> is the frame this shot cuts from.

summary: [keyframe completion] the whole strip of the room, the girl pushing off from the cork board into a dash toward the desk.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Picture 3>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 3>, held. [Shot 2] At 00:00.500, the camera cuts to the whole strip of the room: at the far right of the frame, directly below and overlapping the left edge of the cork board, the girl has just pushed off into her first stride toward the drawing desk at the far left, her back foot still planted on the floor in front of the cork board, leaning hard forward, arms pumping, hoodie flapping, and the whole long pale floor and bare wall still empty between her and the desk.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="ボードの前から左へ全力で走り、机の椅子に飛び乗るまで。左へ移動、フレームの外へは出ない。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("17", () => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.deskInsert.image,
          image2: reference.konte,
          image3: reference.storyboardSheet,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 3>.
<Picture 1> is the empty frame: ${plates.deskInsert.prompt}

summary: [keyframe completion] close on the desk top, a small hand racing a pen across a storyboard sheet.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: partially_preserved - only her hand and white hoodie sleeve are in frame, kept in her look.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] Close on the desk top: a storyboard sheet lying on the tablet in the centre of the frame, the girl's small hand in its white hoodie sleeve gripping a pen and racing across it, thick fast strokes filling the first panel, the mug and the pencil cup at the edge of the frame.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="手が紙の上を左右に走り、線が増えていく。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("18", ({ script }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.deskMedium.image,
          image2: reference.konte,
          image3: reference.storyboardSheet,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 3>.
<Picture 1> is the empty frame: ${plates.deskMedium.prompt}

summary: [keyframe completion] the girl seated at the drawing desk, hunched over, tongue out, scribbling.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The girl seated at the drawing desk at the left of the frame, seen from the front, hunched over the tilted tablet, the tip of her tongue poking out of the corner of her mouth, a pen in her fist scribbling on a storyboard sheet, a stack of sheets beside her elbow, the tall window to the right of her.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "mutters to herself fast, in time with her scribbling,");
      return (
        <Composition>
          <Panel src={first} blocking="舌を出したまま肩を揺らして描き続け、独り言をつぶやく。" camera="fixed" />
          <Audio src={vo0} start={0.3} />
        </Composition>
      );
    })
      .nextShot("19", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.deskMedium.image,
          image2: reference.konte,
          image3: reference.storyboardSheet,
          prevPanel: shot("18").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 3>.
<Picture 1> is the empty frame: ${plates.deskMedium.prompt}
<Picture 4> is the frame this shot cuts from.

summary: [keyframe completion] jump cut: the girl holding a scribbled sheet up at arm's length, squinting, about to crumple it.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Picture 4>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 4>, held. [Shot 2] At 00:00.400, the camera cuts to the same camera, a jump cut: the girl at the desk holding a single scribbled storyboard sheet up at her own eye level, both of her hands gripping the bottom edge of that one sheet, her eyes on the sheet, brows knitted and squinting hard at it, the corner of her mouth pulled down.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "says it under her breath, to herself,");
      return (
        <Composition>
          <Panel src={first} blocking="掲げた紙を目を細めて見て、両手でくしゃっと丸め始める。" camera="fixed" />
          <Audio src={vo0} start={1.2} />
        </Composition>
      );
    })
      .nextShot("20", () => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.deskInsert.image,
          image2: reference.storyboardSheet,
          prompt: `subject_definitions: <Subject 1> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 2>.
<Picture 1> is the empty frame: ${plates.deskInsert.prompt}

summary: [keyframe completion] close on the desk corner, a crumpled ball of paper landing on a small heap of crumpled balls.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: partially_preserved - its paper, colour and printed grid are kept; it is crumpled into a ball.

detailed_description: 2D-animated. [Shot 1] A high angle on the desk from the chair side, far enough back that the whole tilted drawing board with the black pen tablet on it and the wide flat top of the desk in front of it both sit inside the frame, the stack of storyboard sheets, the white mug and the violet pencil cup standing on that flat top, the desk running from the lower left to the upper right: plain white wall beyond the desk fills the whole left side of the frame, its pale flat surface running from the top edge down to the bottom left corner. Three crumpled balls of storyboard paper sit on the flat top of the desk, each one settled squarely on the level wood with its own small shadow under it and a hand's width of bare wood between them, one beside the mug, one near the pencil cup and one out on the open wood, and a fourth ball lands on the flat wood between them.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="紙玉が上から落ちてきて山の上で一度跳ね、止まる。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("21", ({ script }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: asset("layout", adapters.imageFile, { path: "assets/files/shot21-layout.png" }),
          image2: reference.konte,
          image3: reference.clapperboard,
          image4: plates.deskMedium.image,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the small black-and-white clapperboard in <Picture 3>.
<Picture 1> is this shot's layout: the girl seated at the desk on the left, holding the clapperboard out at arm's length in front of the tall window.
<Picture 4> is the room: ${plates.deskMedium.prompt}

summary: [keyframe completion] the girl at the desk holding a small clapperboard out at arm's length, clapstick open.

retention_analysis: <Picture 1>: partially_preserved - the framing, her pose, her expression and where the desk, clapperboard and window sit are kept; her hands on the clapperboard are redrawn as the description writes them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Picture 4>: weak_reference - only the room's walls and window carry; the framing and where everything sits are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The girl seated at the desk holding the small black-and-white clapperboard out at arm's length, one hand gripping the slate's bottom edge and the other hand's fingers pinching the raised clapstick at its tip, holding it open, her brows pulled down and her eyes narrowed at it, the tall window to the right.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "snaps it at herself, pulling herself together,");
      return (
        <Composition>
          <Panel src={first} blocking="カチンコを自分の顔の前で打ち、一言。" camera="fixed" />
          <Audio src={vo0} start={0.4} />
        </Composition>
      );
    })
      .nextShot("22", ({ shot }) => {
      const first = asset("first", imageQwenImageEdit2511, {
          image1: shot("17").image("first"),
          image2: reference.konte,
          prompt:
            "In image 1, crisp thick strokes now fill two panels of the storyboard sheet, and the hand is caught mid-stroke with the pen tip touching the paper.",
        });

      return (
        <Composition>
          <Panel src={first} blocking="手がさらに速く動き、二コマ分の線が一気に入る。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("23", ({ script }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.deskMedium.image,
          image2: reference.konte,
          image3: reference.tablet,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the thin tablet with a white bezel in <Picture 3>.
<Picture 1> is the empty frame: ${plates.deskMedium.prompt}

summary: [keyframe completion] the girl at the desk holding the tablet in both hands, frowning at a playing video, thumb jabbing it to stop.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The girl at the desk holding the white-bezelled tablet in both hands in front of her, its screen glowing with a bright rough animation frame, her face lit by it, brows knitted, one thumb jabbing the screen to stop it, the window to the right.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "decides on the spot and says it flatly,");
      return (
        <Composition>
          <Panel src={first} blocking="画面を見つめてしかめ面になり、親指で画面を突いて止める。" camera="fixed" />
          <Audio src={vo0} start={1.0} />
        </Composition>
      );
    })
      .nextShot("24", ({ shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.deskInsert.image,
          image2: reference.storyboardSheet,
          image3: shot("20").image("first"),
          prompt: `subject_definitions: <Subject 1> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 2>.
<Picture 1> is the empty frame: ${plates.deskInsert.prompt}
<Picture 3> is the same desk earlier in the film, in the framing this shot keeps.

summary: [keyframe completion] close on the desk top, a tall heap of crumpled paper balls piled against the tablet.

retention_analysis: <Picture 1>: fully_preserved - the room's framing, set and light are kept exactly as the frame shows them.
<Subject 1>: partially_preserved - its paper, colour and printed grid are kept; every copy is crumpled into a ball.
<Picture 3>: partially_preserved - its camera position, framing, desk, tablet, mug and light are kept exactly; its few paper balls have grown into a heap.

detailed_description: 2D-animated. [Shot 1] The desk in the framing of <Picture 3>, a dozen crumpled balls of storyboard paper lying scattered across the flat wooden top of the desk around the mug and the violet pencil cup, each ball resting flat on the wood.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="紙の山がわずかに揺れ、一番上の一枚が滑り落ちる。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("25", () => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: asset("layout", adapters.imageFile, { path: "assets/files/shot25-layout.png" }),
          image2: reference.konte,
          image3: plates.deskMedium.image,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is this shot's layout: the girl seen from behind at the drawing desk on the left, her chair, the tall window and the evening light.
<Picture 3> is the room: ${plates.deskMedium.prompt}

summary: [keyframe completion] the girl at the desk drawing on the glowing pen tablet, the light starting to turn orange.

retention_analysis: <Picture 1>: partially_preserved - the framing, her pose and where the desk, chair, window and light sit are kept; the pen tablet's screen is redrawn as the description writes it.
<Subject 1>: fully_preserved - her face, hair and outfit are kept.
<Picture 3>: weak_reference - only the room's walls and window carry; the framing and where everything sits are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The girl seen from behind, seated on the wooden chair at the wooden drawing desk, drawing on the pen tablet with its stylus, the pen tablet's screen glowing bright white and lighting her hands and hair, a faint first tint of warm orange evening light on the tall window to the right.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="後ろ姿のまま、ペンを持つ手だけが光る液タブの上でゆっくり動き続ける。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("26", () => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.deskInsert.image,
          image2: reference.konte,
          image3: reference.storyboardSheet,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels, in <Picture 3>.
<Picture 1> is the empty frame: ${plates.deskInsert.prompt}

summary: [keyframe completion] close on the desk top in warm orange evening light, the girl's hair and sleeve resting on it at the left edge.

retention_analysis: <Picture 1>: partially_preserved - the room's framing and set are kept exactly; its light is changed to warm orange evening light.
<Subject 1>: partially_preserved - only her black hair and white hoodie sleeve are in frame, kept in her look.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] Close on the desk top: the pile of storyboard sheets and the mug washed in warm orange evening light slanting in from the right, long soft shadows across the wood, the tablet's screen dark, and at the left edge of the frame the girl's black hair and white hoodie sleeve resting on the desk top where she lies face-down.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="橙の光がゆっくり移ろい、影がわずかに伸びる。ほぼ静止。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("27", () => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.roomWide.image,
          image2: reference.konte,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.roomWide.prompt}

summary: [keyframe completion] the whole strip of the room in orange evening light, strewn with paper, the girl lifting her head off the desk.

retention_analysis: <Picture 1>: partially_preserved - the room's framing and set are kept exactly; its light is changed to warm orange evening light from the window.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.

detailed_description: 2D-animated. [Shot 1] The whole strip of the room in warm orange evening light pouring from the tall window, the pale floor strewn with crumpled paper balls and loose sheets, the cork board at the right, and at the drawing desk at the far left the girl lifting her head off the desk, hair mussed, blinking.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="遠くの彼女が机から顔を上げ、上体を起こしてまばたきする。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("28", () => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.deskInsert.image,
          image2: reference.konte,
          image3: reference.tablet,
                              prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the thin tablet with a white bezel in <Picture 3>.
<Picture 1> is the empty frame: ${plates.deskInsert.prompt}

summary: [keyframe completion] close on the desk top in evening light, her hand lifting the white tablet off the pen tablet.

retention_analysis: <Picture 1>: partially_preserved - the room's framing and set are kept exactly; its light is changed to warm orange evening light falling across the desk top.
<Subject 1>: partially_preserved - only her hand and white hoodie sleeve are in frame, kept in her look.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] Close on the desk's tilted drawing board in warm orange evening light, bare white wall beyond the board at the top left of the frame: the black pen tablet lying on the board, a small white-bezelled tablet resting on top of it, no longer than her hand and forearm together and far smaller than the pen tablet under it, a slim flat slab with a plain dark glossy black screen and a thin white rim, and the girl's hand in its white sleeve lifting the small white tablet off the pen tablet by one corner.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="手がタブレットを持ち上げ、画面をこちらへ向け始める。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("29", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.deskMedium.image,
          image2: reference.konte,
          image3: reference.tablet,
          image4: shot("25").image("first"),
          image5: shot("27").image("first"),
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the thin tablet with a white bezel in <Picture 3>.
<Subject 3> is the wooden drawing desk with its wooden side panels and the plain wooden chair in <Picture 4>.
<Picture 1> is the empty frame: ${plates.deskMedium.prompt}
<Picture 5> is the same room at evening.

summary: [keyframe completion] in orange evening light, the girl on the chair beside the desk gazing into the tablet she holds up, her face lighting up.

retention_analysis: <Picture 1>: partially_preserved - the room's framing and set are kept; its light is changed to the evening light of <Picture 5>.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Subject 3>: fully_preserved - the desk's and the chair's shape, wood and build are kept.
<Picture 5>: weak_reference - only its warm orange evening light and long wall shadows carry; the framing and the set are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] Warm orange evening light slants in from the glowing window at the right edge and lays long shadows across the wall. The girl sits in profile facing right on the wooden chair of <Subject 3> left of centre, beside the wooden drawing desk of <Subject 3> right of centre, holding the tablet upright in both hands in front of her face with its screen turned toward her, so the lens sees only its thin side edge, its glow lighting her face; her eyes wide and her mouth open in a delighted grin, hair mussed.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "breathes it out small, growing sure of it by the last syllable,");
      return (
        <Composition>
          <Panel src={first} blocking="タブレットの画面を見つめ、目が見開き、口が開いて笑顔になる。" camera="fixed" />
          <Audio src={vo0} start={1.0} />
        </Composition>
      );
    })
      .nextShot("30", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteMedium.image,
          image2: reference.konte,
          image3: reference.tablet,
          prevPanel: shot("29").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the thin tablet with a white bezel in <Picture 3>.
<Picture 1> is the empty frame: ${plates.konteMedium.prompt}
<Picture 4> is the frame this shot cuts from.

summary: [keyframe completion] her waist-up back at her mark in evening light, out of breath, holding the tablet up toward the lens.

retention_analysis: <Picture 1>: partially_preserved - the room's framing and set are kept exactly; its light is changed to warm orange evening light from the window.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Picture 4>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 4>, held. [Shot 2] At 00:00.400, the camera cuts to her waist-up back at her mark, standing right of centre with the cork board directly behind her shoulders and bare wall to her left, in warm orange evening light, out of breath with her shoulders heaving, hair mussed, holding the tablet up toward the lens in both hands with its screen facing the lens and showing a bright frame, her eyes peeking over the top edge of it, eyebrows high with hope.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "asks it out of breath, full of hope,");
      return (
        <Composition>
          <Panel src={first} blocking="息を切らして肩を上下させ、タブレットをカメラへ差し出して問いかける。" camera="fixed" />
          <Audio src={vo0} start={1.0} />
        </Composition>
      );
    })
      .nextShot("31", ({ shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          image3: reference.stickyNote,
          image4: reference.tablet,
          prevPanel: shot("30").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Subject 3> is the thin tablet with a white bezel in <Picture 4>.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}
<Picture 5> is the frame this shot cuts from.

summary: [keyframe completion] close on her face in dim evening light, a lavender sticky note flying in at the upper left, its blank back to the lens.

retention_analysis: <Picture 1>: partially_preserved - the framing and set are kept exactly, bare white wall behind her head and the cork board's edge at the right; its light is changed to dim warm evening light.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Subject 3>: fully_preserved - its shape, colour and material are kept.
<Picture 5>: weak_reference - only her look carries across the cut; the framing, the set, the light and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 5>, held. [Shot 2] At 00:00.400, the camera cuts to her face filling the frame, the bare white wall behind her head evenly tinted a flat dusky mauve by the evening, her face and the wall lit alike by that same flat dim evening light, the cork board's left edge at the right of the frame, her black bob all black with its purple underside: a lavender sticky note flying in from the upper left of the frame, well clear of her face, its plain blank lavender back facing the lens, her eyes flicking up toward it. The tablet stands straight upright in her hands at the lower left of the frame, below her chin, square to the lens and seen flat-on, its sides vertical and parallel to the frame's edges: a plain bright white screen framed by a thin white bezel, filling the lower left of the frame below the flying note, her fingertips on its side edges. Her chin, cheeks and forehead share the same flat dim evening light.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="付箋が飛んできておでこに貼りつき、目が上を向く。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("32", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          image3: reference.stickyNote,
          prevPanel: shot("31").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}
<Picture 4> is the frame this shot cuts from.

summary: [keyframe completion] the same close frame, the note peeled off and held up with its written side turned to her.

retention_analysis: <Picture 1>: partially_preserved - the framing and set are kept exactly, bare white wall behind her head and the cork board's edge at the right; its light is changed to dim warm evening light.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Picture 4>: partially_preserved - her light, size and where she stands carry across; the camera holds the same position.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 4>, held. [Shot 2] At 00:00.400, the camera cuts to the same close frame a moment later, the bare white wall still behind her head and the cork board's edge still at the right, the wall evenly tinted the same flat dusky mauve: her fingers holding the lavender sticky note just peeled off up in front of her face, turned so its written side faces her own eyes and the lens sees only its plain lavender back, her eyes lowered onto the note and reading it, her gaze away from the lens, her mouth a small round o. The tablet is lowered out of the frame, her face lit by the evening light alone.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "reads it out puzzled, then the delight creeps in,");
      return (
        <Composition>
          <Panel src={first} blocking="付箋を見つめ、口が丸く開き、じわっと笑顔に変わる。" camera="fixed" />
          <Audio src={vo0} start={0.6} />
        </Composition>
      );
    })
      .nextShot("33", ({ shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteMedium.image,
          image2: reference.konte,
          image3: reference.stickyNote,
          image4: reference.tablet,
          prevPanel: shot("32").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Subject 3> is the thin tablet with a white bezel in <Picture 4>.
<Picture 1> is the empty frame: ${plates.konteMedium.prompt}
<Picture 5> is the frame this shot cuts from.

summary: [keyframe completion] her waist-up at her mark in dim evening light, holding the note up beside her cheek, its blank back to the lens.

retention_analysis: <Picture 1>: partially_preserved - the framing and set are kept exactly; its light is changed to dim dusky evening light.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Subject 3>: fully_preserved - its shape, colour and material are kept.
<Picture 5>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 5>, held. [Shot 2] At 00:00.400, the camera cuts to her waist-up at her mark, the room filling the whole width of the picture from edge to edge, standing just left of the cork board, the edge of the white-framed window glowing orange at the far left of the frame, seen from straight in front with its sill running level, a lavender box on its sill, bare white wall at the left of the frame and the cork board with its pinned sheets at the right of the frame, the wall evenly tinted a flat dusky mauve by the evening: the small white-bezelled tablet, about as long as her forearm, tucked under one arm, her other hand holding the lavender sticky note up beside her cheek with its written side turned to her and its plain blank lavender back toward the lens, her eyes open on the lens, lips pressed together, the corners of her mouth pulling up.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });

      return (
        <Composition>
          <Panel src={first} blocking="付箋を胸に押しつけ、目を閉じて満面の笑みで一拍止まる。" camera="fixed" />
        </Composition>
      );
    })
      .nextShot("34", ({ script, shot }) => {
      const first = asset("first", imageMinimaxH3R2i, {
          image1: plates.konteClose.image,
          image2: reference.konte,
          prevPanel: shot("33").image("first"),
          length: 22,
          frameIndex: 20,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the empty frame: ${plates.konteClose.prompt}
<Picture 3> is the frame this shot cuts from.

summary: [keyframe completion] close on her face centred in the frame in dim evening light, both eyes open on the lens.

retention_analysis: <Picture 1>: partially_preserved - the framing and set are kept exactly, bare white wall behind her head and the cork board's edge at the right; its light is changed to dim warm evening light.
<Subject 1>: fully_preserved - her face, hair and outfit are kept; her expression and pose are remade as the description writes them, overriding the sheet's calm smile.
<Picture 3>: weak_reference - only her look and light carry across the cut; the framing, the set and where she stands are <Picture 1>'s.

detailed_description: 2D-animated. [Shot 1] The frame of <Picture 3>, held. [Shot 2] At 00:00.400, the camera cuts to her face filling the centre of the frame, the bare white wall behind her head evenly tinted a flat dusky mauve by the evening, the cork board's left edge at the right of the frame, her black bob all black with its purple underside: a bright grin, both eyes open and shining on the lens, her chin and the collar of her white hoodie along the bottom edge of the frame.

overall_soundscape: N/A

non_diegetic_music: N/A`,
        });
      const vo0 = voice("vo0", script.konte[0], "says it bright and quick, with a wink,");
      return (
        <Composition>
          <Panel src={first} blocking="手が画面の下辺から入ってきて真下を指さし、ウインクして言う。" camera="fixed" />
          <Audio src={vo0} start={0.5} />
        </Composition>
      );
    })
  }),
});

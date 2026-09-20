import { defineVideo, asset, soundtrack, Animate, Audio, Composition, Subtitle, Video } from "konte";
import { audioStableAudio3Medium } from "konte/workspace/adapters/comfy/audio_stable_audio_3_medium.js";
import { videoMinimaxH3R2v } from "konte/workspace/adapters/comfy/video_minimax_h3_r2v.js";
import direction from "./direction";
import animatic from "./animatic";
import reference from "./reference";

export default defineVideo(direction, {
  timeline: ({ shot }) => ({
    soundtracks: [soundtrack("bed", reference.bgm, { duck: true, volume: 1.0, fadeOut: 3 })],
    shots: shot("01", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("01").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("01").image("first"),
          audioStem: animatic.shot("01").stem,
          length: 124,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her face leaning in from the right edge of the frame, bare white wall and the cork board's edge behind her. She slides in a little further from the right, her head tilting playfully, her eyes bright on the lens, and (S1), in a bright, light early-teens girl's voice, calls out one bright, quick hello, <d>[English] Hi!</d> Her lips meet and the speaking motion stops, the grin staying. The rest of the room stays still. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone and the soft rustle of her hoodie as she leans in.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.3, end: duration, text: script.konte[0] }]} />
          <div id="take" className="absolute left-[3%] top-[8%] rounded-md bg-black/85 text-[3.4vmax] font-extrabold tracking-widest text-white" style={{ paddingLeft: "3vmax", paddingRight: "3vmax", paddingTop: "0.6vmax", paddingBottom: "0.6vmax" }}>TAKE 1</div>
          <Animate
            script={({ timeline }) => {
              timeline.set("#take", { opacity: 0 }, 0);
              timeline.fromTo("#take", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power3.out" }, 1.0);
              
            }}
          />
        </Composition>
      );
    })
      .nextShot("02", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("02").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("02").image("first"),
          audioStem: animatic.shot("02").stem,
          length: 124,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: the whole strip of the room, the girl tiny at the far right in front of the cork board with both arms raised. She waves both arms high above her head as (S1), in a bright, light early-teens girl's voice, shouts across the room, <d>[English] I'm Konte-chan!</d> Her lips meet and the speaking motion stops, and she lets her arms drop to her sides, beaming. The desk, the window and the long wall stay exactly as they are. The camera holds a static shot.

overall_soundscape: A quiet bright interior, faint room tone, her small sneakers shifting on the wooden floor, the swish of her sleeves as she waves.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.6, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("03", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("03").image("first"),
          image2: reference.konte,
          image3: reference.stickyNote,
          image4: animatic.shot("04").image("first"),
          startImage: animatic.shot("03").image("first"),
          endImage: animatic.shot("04").image("first"),
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].
<Picture 4> is the last frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame to the last frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Picture 4>: fully_preserved - the last frame the shot lands on, exactly.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her face filling the frame, mouth open mid-word, bare white wall behind her and the cork board's edge at the right. A lavender sticky note flies in fast from off the upper left of the frame and slaps flat onto her forehead just under the headband. She flinches back a touch at the impact and her eyes roll up toward the note; then her fingers rise into frame, pinch its corner, peel it off her forehead and hold it up beside her cheek between finger and thumb, her eyes turning to it, lips parted. The shot ends on <Picture 4>. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone, then one soft dry paper slap as the note lands.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("04", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("04").image("first"),
          image2: reference.konte,
          image3: reference.stickyNote,
          startImage: animatic.shot("04").image("first"),
          audioStem: animatic.shot("04").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her face filling the frame, the lavender sticky note held up beside her cheek between finger and thumb, bare white wall behind her and the cork board's edge at the right. She holds the note there and her eyes move across it, and (S1), in a bright, light early-teens girl's voice, reads it out flat, word by word, <d>[English] ...Come closer. Stand in the middle.</d> Her lips meet and the speaking motion stops. She goes still, blinks once slowly, and tilts her head a fraction, puzzled, the note still held beside her cheek. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone and the faint crinkle of the paper note in her fingers.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 1.0, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("06", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("06").image("first"),
          image2: reference.konte,
          image3: animatic.shot("07").image("first"),
          startImage: animatic.shot("06").image("first"),
          endImage: animatic.shot("07").image("first"),
          audioStem: animatic.shot("06").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Picture 1> is the first frame of [Shot 1].
<Picture 3> is the last frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame to the last frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Picture 3>: fully_preserved - the last frame the shot lands on, exactly.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her waist-up at her mark just left of the cork board, hands loose at her sides, a fresh grin at the lens. She lifts her chin and (S1), in a bright, light early-teens girl's voice, says brightly and fast, every word sounded out, <d>[English] Okay! I'm Konte-chan. I'm your crew.</d> Her lips meet and the speaking motion stops. As she speaks she opens both hands out to her sides in a small welcoming spread and brings them up in front of her chest, half curled, ready to count something off. She stays exactly where she stands. The shot ends on <Picture 3>. The camera holds a static shot.

overall_soundscape: A quiet bright interior with faint room tone and the soft swish of her hoodie sleeves.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.4, end: duration, text: script.konte[0] }]} />
          <div id="take" className="absolute left-[3%] top-[8%] rounded-md bg-black/85 text-[3.4vmax] font-extrabold tracking-widest text-white" style={{ paddingLeft: "3vmax", paddingRight: "3vmax", paddingTop: "0.6vmax", paddingBottom: "0.6vmax" }}>TAKE 2</div>
          <Animate
            script={({ timeline }) => {
              timeline.set("#take", { opacity: 0 }, 0);
              timeline.fromTo("#take", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power3.out" }, 0.0);
              timeline.to("#take", { opacity: 0, duration: 0.2 }, 1.3);
            }}
          />
        </Composition>
      );
    })
      .nextShot("07", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("07").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("07").image("first"),
          audioStem: animatic.shot("07").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her waist-up just left of the cork board, both hands up in front of her chest mid-gesture, mouth open. Her hands fly the whole time she talks, big and fast: she counts off on her fingers, frames a square in the air with both hands, mimes holding a camera up to her eye, waves both hands about, elbows out, faster with every word, and (S1), in a bright, light early-teens girl's voice, rattles it off, breaking off mid-word, <d>[English] Give me the idea, and I make the video! And, and—</d><cutoff> Her lips meet and the speaking motion stops as she is cut off, her hands still up in the air. She stays where she stands. The camera holds a static shot.

overall_soundscape: A quiet bright interior with faint room tone and the quick swish of her sleeves with every gesture.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.3, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("08", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("08").image("first"),
          image2: reference.konte,
          image3: reference.stickyNote,
          image4: animatic.shot("09").image("first"),
          endImage: animatic.shot("09").image("first"),
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is an animatic reference for [Shot 1], defining its viewpoint, subject placement and framing.
<Picture 4> is the last frame of [Shot 1].

summary: [keyframe completion] one held shot: the sticky note flies in and lands on her forehead, and she peels it off, ending on the last frame.

retention_analysis: <Picture 1>: partially_preserved - its framing, set, light and her pose are kept; the sticky note arrives during the shot instead of being there from the start.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Picture 4>: fully_preserved - the last frame the shot lands on, exactly.

detailed_description: 2D-animated. [Shot 1] The shot opens on the frame of <Picture 1> with her forehead still bare: her face filling the frame, mouth open mid-word, eyes on the lens, bare white wall behind her and the cork board's edge at the right. A lavender sticky note flies in fast from off the upper left of the frame and slaps flat onto her forehead just under the headband; she flinches back a touch, her eyes roll up toward it, then her fingers come up into frame, pinch the note's corner, peel it off her forehead and hold it up beside her cheek between finger and thumb, her eyes turning to it. The shot ends on <Picture 4>. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone, one soft dry paper slap as the note lands, and a tiny crinkle of paper as her fingers find it.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("09", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("09").image("first"),
          image2: reference.konte,
          image3: reference.stickyNote,
          startImage: animatic.shot("09").image("first"),
          audioStem: animatic.shot("09").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her face filling the frame, the lavender sticky note held up beside her cheek between finger and thumb, bare white wall behind her and the cork board's edge at the right. Her eyes turn onto the note and track across it as she reads, her gaze on the note, and (S1), in a bright, light early-teens girl's voice, reads it out and lets a small, deflated oh slip out at the end, <d>[English] ${script.konte[0]}</d> Her lips meet and the speaking motion stops. Her eyebrows drop and her mouth stays a small round o, her eyes still on the note held up beside her cheek. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone and the faint crinkle of the paper note.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.7, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("10", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("10").image("first"),
          image2: reference.konte,
          image3: animatic.shot("11").image("first"),
          startImage: animatic.shot("10").image("first"),
          endImage: animatic.shot("11").image("first"),
          audioStem: animatic.shot("10").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Picture 1> is the first frame of [Shot 1].
<Picture 3> is the last frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame to the last frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Picture 3>: fully_preserved - the last frame the shot lands on, exactly.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her waist-up standing just left of the cork board, bare white wall filling the left of the frame, both hands buried in the front pocket of her hoodie. Her hands stay in the pocket the whole time and her feet stay planted; only her face and head work. She takes a small breath, and (S1), in a bright, light early-teens girl's voice, says it slowly and deliberately, dropping each word with an eyebrow and a small tilt of her head, settling the last words into a prim, self-satisfied tone, <d>[English] ${script.konte[0]}</d> Her lips meet and the speaking motion stops. Her face settles into a composed little smile. The shot ends on <Picture 3>. The camera holds a static shot.

overall_soundscape: A quiet bright interior with faint room tone.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.5, end: duration, text: script.konte[0] }]} />
          <div id="take" className="absolute left-[3%] top-[8%] rounded-md bg-black/85 text-[3.4vmax] font-extrabold tracking-widest text-white" style={{ paddingLeft: "3vmax", paddingRight: "3vmax", paddingTop: "0.6vmax", paddingBottom: "0.6vmax" }}>TAKE 3</div>
          <Animate
            script={({ timeline }) => {
              timeline.set("#take", { opacity: 0 }, 0);
              timeline.fromTo("#take", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power3.out" }, 0.0);
              timeline.to("#take", { opacity: 0, duration: 0.2 }, 1.3);
            }}
          />
        </Composition>
      );
    })
      .nextShot("11", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("11").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("11").image("first"),
          audioStem: animatic.shot("11").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her waist-up just left of the cork board, bare white wall filling the left of the frame, both hands in her hoodie pocket, a composed little smile. As she talks she leans her upper body forward from the waist toward the lens a little more with every word, chin lifting, eyes shining, and (S1), in a bright, light early-teens girl's voice, speeds up word by word as the pride runs away with her, building to the last word and breaking off on it, <d>[English] ${script.konte[0]}</d><cutoff> Her lips stop, still parted, as she leans in proudly. Her hands stay deep in the pocket the whole time and her feet stay planted. The camera holds a static shot.

overall_soundscape: A quiet bright interior with faint room tone and the soft creak of her hoodie as she leans.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.3, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("12", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("12").image("first"),
          image2: reference.konte,
          image3: reference.stickyNote,
          image4: animatic.shot("13").image("first"),
          startImage: animatic.shot("12").image("first"),
          endImage: animatic.shot("13").image("first"),
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].
<Picture 4> is the last frame of [Shot 1].

summary: [keyframe completion] one held shot: the sticky note flies in and lands on her forehead, ending on the last frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, set, light and her calm face are kept; the sticky note arrives during the shot.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Picture 4>: fully_preserved - the last frame the shot lands on, exactly.

detailed_description: 2D-animated. [Shot 1] The shot opens on the frame of <Picture 1>: her face filling the frame, forehead bare, a small satisfied smile with her mouth closed, eyes on the lens, bare white wall behind her and the cork board's edge at the right. A lavender sticky note flies in fast from off the upper left of the frame and slaps flat onto her forehead just under the headband; her head jolts back a little and her eyes go wide and roll up at it, her mouth staying closed. The shot ends on <Picture 4>. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone, one soft dry paper slap as the note lands, and a tiny crinkle of paper.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("13", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("13").image("first"),
          image2: reference.konte,
          image3: reference.stickyNote,
          startImage: animatic.shot("13").image("first"),
          audioStem: animatic.shot("13").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl peeling the note off and reading it aloud.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her face filling the frame, the lavender sticky note stuck on her forehead, her eyes rolled up toward it, mouth closed. One hand alone comes up into frame, its finger and thumb pinch the note's corner, peel it off her forehead and bring it down beside her cheek, her other hand staying down out of frame; her eyes follow it and track across it as she reads, and (S1), in a bright, light early-teens girl's voice, puts on a flat, mock-serious grown-up tone and reads it out, leaning hard on the word I, <d>[English] ${script.konte[0]}</d> Her lips meet and the speaking motion stops. Her face stays flat and deadpan, mouth closed, and her eyes close in one long, slow blink, the note still held beside her cheek. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 1.3, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("14", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("14").image("first"),
          image2: reference.konte,
          image3: animatic.shot("15").image("first"),
          startImage: animatic.shot("14").image("first"),
          endImage: animatic.shot("15").image("first"),
          audioStem: animatic.shot("14").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Picture 1> is the first frame of [Shot 1].
<Picture 3> is the last frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame to the last frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Picture 3>: fully_preserved - the last frame the shot lands on, exactly.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her waist-up at the cork board's left edge, shoulders slumped, body half turned toward the board, only her head turned back toward the lens with a small sheepish smile. She turns her body slowly back to face the lens, shoulders still drawn up, and (S1), in a bright, light early-teens girl's voice, says it small and sheepish, then hurries a smile back on and, on the last two words, reaches one open hand out toward the lens, palm up, offering the choice to the viewer, <d>[English] ...Right. You pick.</d> Her lips meet and the speaking motion stops. She draws that hand back, straightens up, pushes her chest out and presses it as a fist against the logo on her hoodie. The shot ends on <Picture 3>. The camera holds a static shot.

overall_soundscape: A quiet bright interior with faint room tone and the soft rustle of her hoodie.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.8, end: duration, text: script.konte[0] }]} />
          <div id="take" className="absolute left-[3%] top-[8%] rounded-md bg-black/85 text-[3.4vmax] font-extrabold tracking-widest text-white" style={{ paddingLeft: "3vmax", paddingRight: "3vmax", paddingTop: "0.6vmax", paddingBottom: "0.6vmax" }}>TAKE 4</div>
          <Animate
            script={({ timeline }) => {
              timeline.set("#take", { opacity: 0 }, 0);
              timeline.fromTo("#take", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power3.out" }, 0.0);
              timeline.to("#take", { opacity: 0, duration: 0.2 }, 1.3);
            }}
          />
        </Composition>
      );
    })
      .nextShot("15", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("15").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("15").image("first"),
          audioStem: animatic.shot("15").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her waist-up just left of the cork board, standing straight with one fist pressed to the logo on her chest, chin up, a bright grin. (S1), in a bright, light early-teens girl's voice, says it short and firm, <d>[English] ${script.konte[0]}</d> As she says it she lifts her fist a little off her chest and strikes it once against the logo, the fist landing exactly on the dull thump in the soundtrack. Her lips meet and the speaking motion stops. Then her face lights up, she raises the same hand in a quick wave and (S1) calls out brightly, already turning, <d>[English] ${script.konte[1]}</d> Her lips meet and the speaking motion stops as she twists her upper body toward the left edge of the frame, her feet still on her mark inside the frame. The camera holds a static shot.

overall_soundscape: A quiet bright interior with faint room tone, one dull thump of her fist on the hoodie as she speaks, and the swish of her sleeve.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.2, end: 1.9, text: script.konte[0] }, { start: 1.9, end: duration, text: script.konte[1] }]} />
        </Composition>
      );
    })
      .nextShot("16", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("16").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("16").image("first"),
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: the whole strip of the room, the girl at the right beside the cork board pushing off into her first stride toward the drawing desk at the far left. She sprints across the pale wooden floor from right to left, leaning forward, arms pumping, hoodie flapping, and arrives at the desk at the far left, dropping onto its chair. She stays inside the frame the whole way. The desk, the window and the cork board stay exactly where they are. The camera holds a static shot.

overall_soundscape: A quiet interior with quick sneaker footsteps slapping across a wooden floor, the swish of clothing, and a wooden chair creaking as she lands on it.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("17", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("17").image("first"),
          image2: reference.konte,
          image3: reference.storyboardSheet,
          startImage: animatic.shot("17").image("first"),
          length: 124,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: close on the desk top, a storyboard sheet lying on the black pen tablet in the centre of the frame, the girl's small hand in its white hoodie sleeve gripping a pen over its first panel. Her hand races the pen back and forth across the sheet, quick short strokes, and thick dark lines appear in the panel one after another as the hand moves on to the next panel, her sleeve sliding over the paper. The black pen tablet, the mug and the pencil cup stay where they are. The camera holds a static shot.

overall_soundscape: A quiet interior with the fast scratch of a pen on paper and the soft slide of a sleeve over the sheet.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("18", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("18").image("first"),
          image2: reference.konte,
          image3: reference.storyboardSheet,
          startImage: animatic.shot("18").image("first"),
          audioStem: animatic.shot("18").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: the girl seated at the drawing desk at the left, hunched over the black pen tablet, lips pressed together in concentration, pen in her fist scribbling on a storyboard sheet, the tall window to the right. Her shoulders rock with the scribbling, the pen hand jerking back and forth across the sheet, her head bobbing, and (S1), in a bright, light early-teens girl's voice, mutters to herself fast, in time with her scribbling, <d>[English] Okay. Okay okay okay.</d> Her lips meet and the speaking motion stops, her lips pressing together again, the scribbling carrying straight on. The camera holds a static shot.

overall_soundscape: A quiet interior with the fast scratch of a pen on paper and the creak of the chair as she rocks.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <div id="take" className="absolute left-[3%] top-[8%] rounded-md bg-black/85 text-[3.4vmax] font-extrabold tracking-widest text-white" style={{ paddingLeft: "3vmax", paddingRight: "3vmax", paddingTop: "0.6vmax", paddingBottom: "0.6vmax" }}>TAKE 5</div>
          <Animate
            script={({ timeline }) => {
              timeline.set("#take", { opacity: 0 }, 0);
              timeline.fromTo("#take", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power3.out" }, 0.0);
              timeline.to("#take", { opacity: 0, duration: 0.2 }, 1.3);
            }}
          />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.3, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("19", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("19").image("first"),
          image2: reference.konte,
          image3: reference.storyboardSheet,
          startImage: animatic.shot("19").image("first"),
          audioStem: animatic.shot("19").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: the girl at the desk holding a scribbled storyboard sheet up at her own eye level in both hands, squinting hard at it, the corner of her mouth pulled down. She tilts the sheet one way and the other, squinting harder, and (S1), in a bright, light early-teens girl's voice, says it under her breath, to herself, <d>[English] ...No.</d> Her lips meet and the speaking motion stops. Then both hands close and crush the sheet into a tight ball with one quick crumple. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone, then a sharp crunch of paper being crumpled.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 1.2, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("20", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("20").image("first"),
          image2: reference.konte,
          image3: reference.storyboardSheet,
          startImage: animatic.shot("20").image("first"),
          length: 124,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: close on the desk top, a heap of crumpled paper balls beside the black pen tablet, the mug behind. A new crumpled ball of paper drops in from above the top edge of the frame, lands on top of the heap, bounces once, rolls a little and settles. The pen tablet, the mug and the rest of the heap stay where they are. The camera holds a static shot.

overall_soundscape: A quiet interior with the light papery thump of a crumpled ball landing and rolling on wood.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("21", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("21").image("first"),
          image2: reference.konte,
          image3: reference.clapperboard,
          startImage: animatic.shot("21").image("first"),
          audioStem: animatic.shot("21").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the small black-and-white clapperboard in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: the girl seated at the desk holding the small black-and-white clapperboard out at arm's length, its clapstick raised open, her brows pulled down and her eyes narrowed at it. One hand keeps hold of the slate at the bottom while her other hand lets go of it, rises to the raised clapstick at the top, grips the clapstick, and with that hand slams the clapstick down onto the slate with a sharp clap, and (S1), in a bright, light early-teens girl's voice, snaps it at herself, pulling herself together, <d>[English] Again.</d> Her lips meet and the speaking motion stops. She lowers the clapperboard a little, eyes fierce. The camera holds a static shot.

overall_soundscape: A quiet interior with one sharp wooden clap of the clapperboard.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.4, end: duration, text: script.konte[0] }]} />
          <div id="take" className="absolute left-[3%] top-[8%] rounded-md bg-black/85 text-[3.4vmax] font-extrabold tracking-widest text-white" style={{ paddingLeft: "3vmax", paddingRight: "3vmax", paddingTop: "0.6vmax", paddingBottom: "0.6vmax" }}>TAKE 6</div>
          <Animate
            script={({ timeline }) => {
              timeline.set("#take", { opacity: 0 }, 0);
              timeline.fromTo("#take", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power3.out" }, 0.0);
              timeline.to("#take", { opacity: 0, duration: 0.2 }, 1.3);
            }}
          />
        </Composition>
      );
    })
      .nextShot("22", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("22").image("first"),
          image2: reference.konte,
          image3: reference.storyboardSheet,
          startImage: animatic.shot("22").image("first"),
          length: 124,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: close on the desk top, a storyboard sheet on the black pen tablet with thick strokes across two panels, the girl's hand caught mid-stroke with the pen tip on the paper. Her hand moves even faster than before, the pen flicking across the panels in quick decisive strokes, new lines appearing in a third panel, her sleeve brushing the sheet. The rest of the desk stays still. The camera holds a static shot.

overall_soundscape: A quiet interior with the rapid scratch of a pen on paper.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("23", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("23").image("first"),
          image2: reference.konte,
          image3: reference.tablet,
          startImage: animatic.shot("23").image("first"),
          audioStem: animatic.shot("23").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the thin tablet with a white bezel in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: the girl at the desk holding the white-bezelled tablet in both hands, its screen glowing with a rough animation frame, her face lit by it, brows knitted. The glow on the screen flickers as a rough animation plays; her frown deepens, and she jabs the screen once with her thumb to stop it, and (S1), in a bright, light early-teens girl's voice, decides on the spot and says it flatly, <d>[English] Nope.</d> Her lips meet and the speaking motion stops. She lowers the tablet a little, unimpressed. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone and one soft tap of a fingertip on glass.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 1.0, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("24", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("24").image("first"),
          image2: reference.konte,
          image3: reference.storyboardSheet,
          startImage: animatic.shot("24").image("first"),
          length: 124,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the storyboard sheet, a white A4 sheet printed with a grid of six empty panels in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: close on the desk top, a tall heap of crumpled paper balls resting on the desk beside the black pen tablet, the mug half buried. A new crumpled ball of paper drops in from above the top edge of the frame, strikes the top of the heap and bounces off it, comes down on the bare wood in front of the heap and rolls forward over the desk's near edge, dropping out of the bottom of the frame. The heap quivers as it goes. The mug stands to the side of its path with its rim clear and open. The pen tablet and the mug stay where they are. The camera holds a static shot.

overall_soundscape: A quiet interior with the soft papery rustle of the heap shifting and one ball dropping to the floor.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("25", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("25").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("25").image("first"),
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: the girl seen from behind, seated on the wooden chair at the drawing desk at the left, drawing on the pen tablet's glowing white screen with its stylus, a faint orange tint of evening light on the window to the right. Her shoulders sag and rise with slow tired breaths, and her drawing hand drags the stylus slowly across the glowing screen in a wobbly line, then another, her head drooping lower. The light stays as it is. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone, slow tired breathing, and the soft squeak of a stylus on a glass screen.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} duration={duration} />
        </Composition>
      );
    })
      .nextShot("26", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("26").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("26").image("first"),
          length: 124,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: close on the desk top in warm orange evening light, the pile of storyboard sheets and the mug with long soft shadows, the pen tablet's screen dark, her black hair and white sleeve resting on the desk at the left edge. Almost nothing moves: the orange light creeps slowly across the wood, the shadows lengthen a fraction, and her sleeve rises and falls faintly with her breathing. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone and slow, soft breathing.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("27", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("27").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("27").image("first"),
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: the whole strip of the room in warm orange evening light, the floor strewn with crumpled paper, the cork board at the right, and at the drawing desk at the far left the girl with her head down on the desk. Slowly she lifts her head off the desk, sits up on the chair with a stretch, hair mussed, and blinks at the window's orange light, one hand rubbing her eye. Everything else in the room stays still. The camera holds a static shot.

overall_soundscape: A quiet interior at evening with faint room tone, a wooden chair creaking, and a small sleepy sigh.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <div id="take" className="absolute left-[3%] top-[8%] rounded-md bg-black/85 text-[3.4vmax] font-extrabold tracking-widest text-white" style={{ paddingLeft: "3vmax", paddingRight: "3vmax", paddingTop: "0.6vmax", paddingBottom: "0.6vmax" }}>TAKE 42</div>
          <Animate
            script={({ timeline }) => {
              timeline.set("#take", { opacity: 0 }, 0);
              timeline.fromTo("#take", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power3.out" }, 0.0);
              timeline.to("#take", { opacity: 0, duration: 0.2 }, 1.3);
            }}
          />
        </Composition>
      );
    })
      .nextShot("28", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("28").image("first"),
          image2: reference.konte,
          image3: reference.tablet,
          startImage: animatic.shot("28").image("first"),
          length: 124,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the thin tablet with a white bezel in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: close on the desk top in orange evening light, the black pen tablet on it, a small white-bezelled tablet resting on top, and the girl's hand in its white sleeve lifting the white tablet by one corner. The white-bezelled tablet is a slim slab with its black glass screen on its top face and a plain flat silver-white metal back on its underside. Her hand lifts it clear of the pen tablet by its near edge and tilts it up toward the lens, the black glass screen facing the lens and lighting up with a soft white glow, the plain silver-white back turned away underneath. The black pen tablet and the desk top stay where they are. The camera holds a static shot.

overall_soundscape: A quiet interior with faint room tone and the soft click of a tablet lifted off a hard surface.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
        </Composition>
      );
    })
      .nextShot("29", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("29").image("first"),
          image2: reference.konte,
          image3: reference.tablet,
          startImage: animatic.shot("29").image("first"),
          audioStem: animatic.shot("29").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the thin tablet with a white bezel in <Picture 3>, a generic Android tablet with a plain back.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: warm orange evening light slanting in from the window and long shadows across the wall, the girl seated in profile facing right on the wooden chair beside the wooden drawing desk, holding the tablet upright in front of her face with its screen turned toward her, the lens seeing only its thin side edge, its glow on her face. She stares into the glowing screen; her eyes go wide, her mouth opens into a delighted grin, and (S1), in a bright, light early-teens girl's voice, breathes it out small, growing sure of it by the last syllable, <d>[English] ...Better.</d> Her lips meet and the speaking motion stops. She keeps the tablet held up in front of her face, still edge-on to the lens, beaming at it. The camera holds a static shot.

overall_soundscape: A quiet interior at evening with faint room tone and a small intake of breath.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 1.0, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("30", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("30").image("first"),
          image2: reference.konte,
          image3: reference.tablet,
          startImage: animatic.shot("30").image("first"),
          audioStem: animatic.shot("30").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the thin tablet with a white bezel in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame: the girl flips the tablet round to show its screen, then speaks her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her waist-up back at her mark just left of the cork board in warm orange evening light, out of breath, hair mussed, holding the tablet up in both hands in front of her face, her eyes peeking over its top edge. Her shoulders heave with her breathing. In one quick move she lowers the tablet to her chest and flips it round in both hands, so its front faces the lens: the white bezel framing a screen lit plain bright white, her whole face now showing above it. As the screen turns away from her, the white light on her face and on the wall behind her head goes out, leaving her lit by the warm orange evening light alone. She pushes the tablet a little toward the lens, eyebrows high with hope, and (S1), in a bright, light early-teens girl's voice, asks it out of breath, full of hope, <d>[English] This one?</d> Her lips meet and the speaking motion stops. She holds the tablet out and waits, still breathing hard. The camera holds a static shot.

overall_soundscape: A quiet interior at evening with faint room tone and her quick, out-of-breath breathing.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 1.0, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("31", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("31").image("first"),
          image2: reference.konte,
          image3: reference.stickyNote,
          image4: reference.tablet,
          image5: animatic.shot("32").image("first"),
          startImage: animatic.shot("31").image("first"),
          endImage: animatic.shot("32").image("first"),
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Subject 3> is the thin tablet with a white bezel in <Picture 4>.
<Picture 1> is the first frame of [Shot 1].
<Picture 5> is the last frame of [Shot 1].

summary: [keyframe completion] one held shot: the note lands on her forehead and she peels it off to read, ending on the last frame.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Subject 3>: fully_preserved - its shape, colour and material are kept.
<Picture 5>: fully_preserved - the last frame the shot lands on, exactly.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her face filling the frame in dim evening light, bare white wall behind her head and the cork board's edge at the right, a lavender sticky note flying in at the upper left of the frame, the tablet held upright at the left of the frame with its white screen facing the lens, her face lit by the evening light alone. The note darts in fast and slaps onto her forehead in an instant, just under the headband; she lowers the tablet out of the frame as her fingers rise, peel the note off and hold it up in front of her face. The shot ends on <Picture 5>. The camera holds a static shot.

overall_soundscape: A quiet interior at evening with faint room tone and one soft dry paper slap.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio mediaStart={0.12} duration={duration} />
        </Composition>
      );
    })
      .nextShot("32", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("32").image("first"),
          image2: reference.konte,
          image3: reference.stickyNote,
          startImage: animatic.shot("32").image("first"),
          audioStem: animatic.shot("32").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Subject 2> is the lavender sticky note in <Picture 3>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her face filling the frame in dim evening light, bare white wall behind her and the cork board's edge at the right, her fingers holding the lavender sticky note up in front of her face with its written side turned to her own eyes and its plain lavender back toward the lens, her eyes lowered onto it, her mouth a small round o, the tablet lowered out of the frame. She reads the note, her gaze staying on it, and (S1), in a bright, light early-teens girl's voice, reads it out puzzled, <d>[English] ${script.konte[0]}</d> Her lips meet and the speaking motion stops. Then she smiles: her lips stay pressed together and the corners of her mouth pull up into a soft, happy closed-mouth smile, her eyes open, her cheeks lifting a little, the note's plain back still toward the lens. The camera holds a static shot.

overall_soundscape: A quiet interior at evening with faint room tone and a tiny crinkle of paper.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.6, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
      .nextShot("33", ({ duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("33").image("first"),
          image2: reference.konte,
          image3: reference.stickyNote,
          image4: reference.tablet,
          startImage: animatic.shot("33").image("first"),
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag.
<Subject 2> is the lavender sticky note in <Picture 3>.
<Subject 3> is the thin tablet with a white bezel in <Picture 4>.
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot: she turns the note to show its check mark, then presses its face against her chest under her flat palm, beaming.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.
<Subject 2>: fully_preserved - its shape, colour and material are kept.
<Subject 3>: fully_preserved - its shape, colour and material are kept.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her waist-up at her mark in dim dusky evening light, the edge of the orange-lit window at the far left of the frame and the cork board at the right, the white-bezelled tablet tucked under one arm, her other hand holding the lavender sticky note up beside her cheek with its plain blank back toward the lens. With a quick twist of her wrist she flips the note over, its plain lavender back swinging away and its single bold dark check mark turning round to face the lens, then turns her wrist in and presses the note face-down onto the violet logo on her chest, the check mark against the hoodie and her flat palm covering the note's plain back, her eyes squeezing shut into a huge beaming smile, and holds the pose. The camera holds a static shot.

overall_soundscape: A quiet interior at evening with faint room tone and two soft pats of a hand on fabric.

non_diegetic_music: N/A`,
        });
      const cheer = asset("cheer", audioStableAudio3Medium, {
        category: "SFX",
        duration: 2.5,
        prompt: "small crowd bursting into cheers and applause, excited whoops and clapping, bright celebratory, indoor room, close, short burst",
      });
      const rand = (i: number, k: number) => {
        const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
        return x - Math.floor(x);
      };
      const confetti = Array.from({ length: 130 }, (_, i) => {
        const side = i % 2 === 0 ? 1 : -1;
        const round = rand(i, 11) < 0.2;
        const width = 0.8 + rand(i, 1) * 0.9;
        const dx = -12 + rand(i, 3) * 124 - (side === 1 ? 3 : 97);
        const dy = -(6 + rand(i, 4) * 26);
        const terminal = (8 + rand(i, 5) * 10) / 1.25;
        const drift = (rand(i, 6) - 0.5) * 6;
        const swayAmp = 1.2 + rand(i, 7) * 2.2;
        const swayFreq = (2 * Math.PI) / (0.8 + rand(i, 13) * 0.5);
        const swayPhase = rand(i, 14) * 2 * Math.PI;
        const tilt = 20 + rand(i, 15) * 15;
        const step = 1 / 24;
        const path = Array.from({ length: 58 }, (_, k) => {
          const t = (k + 1) * step;
          const u = Math.min(t / 0.5, 1);
          const tau = Math.max(t - 0.5, 0);
          const env = 1 - Math.exp(-tau / 0.35);
          const x = dx * (1 - Math.exp(-t / 0.18)) + (drift * t) / 2.4 + swayAmp * env * Math.sin(swayFreq * tau + swayPhase);
          const y = dy * (1 - (1 - u) ** 3) + terminal * (tau - 0.25 * (1 - Math.exp(-tau / 0.25)));
          const rotation = tilt * env * Math.cos(swayFreq * tau + swayPhase);
          return { x: `${x.toFixed(2)}vmax`, y: `${y.toFixed(2)}vmax`, rotation: Number(rotation.toFixed(1)), duration: step, ease: "none" };
        });
        return {
          left: side === 1 ? 3 : 97,
          color: ["#8b5cf6", "#c4b5fd", "#ffffff", "#f9a8d4", "#fcd34d", "#7dd3fc"][i % 6] ?? "#8b5cf6",
          round,
          width: round ? 0.6 + rand(i, 2) * 0.4 : width,
          height: round ? 0.6 + rand(i, 2) * 0.4 : 0.45 + rand(i, 2) * 0.5,
          path: JSON.stringify(path),
          delay: rand(i, 12) * 0.39,
          rx: 430 + rand(i, 8) * 650,
          ry: (rand(i, 9) - 0.5) * 430,
          rz: (rand(i, 10) - 0.5) * 430,
        };
      });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Audio id="cheer" src={cheer} start={2.4} duration={duration - 2.4} volume={2} fadeOut={0.4} />
          <div className="absolute inset-0 overflow-hidden">
            {confetti.map((c, i) => (
              <div
                id={`cf-${i}`}
                className="cf absolute"
                data-path={c.path}
                data-delay={c.delay}
                style={{ left: `${c.left}vmax`, top: "26vmax", opacity: 0 }}
              >
                <div
                  className="cfi"
                  data-rx={c.rx}
                  data-ry={c.ry}
                  data-rz={c.rz}
                  style={{ width: `${c.width}vmax`, height: `${c.height}vmax`, backgroundColor: c.color, borderRadius: c.round ? "50%" : "0.08vmax" }}
                />
              </div>
            ))}
          </div>
          <div id="stamp" className="absolute inset-0 flex items-center justify-center">
            <div className="rotate-[-8deg] rounded-lg border-[0.6vmax] border-[#8b5cf6] px-[2.4vmax] py-[0.6vmax] text-[6vmax] font-black tracking-widest text-[#8b5cf6]">ACCEPTED</div>
          </div>
          <Animate
            script={({ timeline }) => {
              timeline.set("#stamp", { opacity: 0 }, 0);
              timeline.fromTo("#stamp", { opacity: 0, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.in" }, 2.4);
              const d = (key: string) => (_: number, el: HTMLElement) => Number(el.dataset[key]);
              timeline.set(".cfi", { transformPerspective: 300 }, 0);
              timeline.set(".cf", { opacity: 1 }, 2.5);
              document.querySelectorAll<HTMLElement>(".cf").forEach((el) => {
                timeline.to(`#${el.id}`, { keyframes: JSON.parse(el.dataset.path ?? "[]") }, 2.5 + Number(el.dataset.delay));
              });
              timeline.to(".cfi", { rotationX: d("rx"), rotationY: d("ry"), rotationZ: d("rz"), duration: 2.0, ease: "power1.out" }, 2.5);
            }}
          />
        </Composition>
      );
    })
      .nextShot("34", ({ script, duration }) => {
      const motion = asset("motion", videoMinimaxH3R2v, {
          image1: animatic.shot("34").image("first"),
          image2: reference.konte,
          startImage: animatic.shot("34").image("first"),
          audioStem: animatic.shot("34").stem,
          prompt: `subject_definitions: <Subject 1> is the girl in <Picture 2>: black bob with a purple star-print headband, black choker, an oversized white hoodie with a violet konte logo on the chest, a black pleated skirt with a violet hem, white leg warmers, violet-and-white sneakers and a small violet shoulder bag. She is speaker (S1).
<Picture 1> is the first frame of [Shot 1].

summary: [keyframe completion] one held shot from the first frame, the girl speaking her line.

retention_analysis: <Picture 1>: fully_preserved - the first frame: its framing, the set, the light and her pose are kept exactly.
<Subject 1>: fully_preserved - her face, hair and outfit are kept throughout; her expression and movement follow the description.

detailed_description: 2D-animated. [Shot 1] The shot begins from <Picture 1>: her face centred in the frame in dim evening light, bare white wall behind her head and the cork board's edge at the right, both eyes open on the lens, a bright grin, her chin and the collar of her white hoodie along the bottom edge. Her hand rises into the frame from the bottom edge beside her chin, her wrist bending so her index finger points straight down at the bottom edge of the frame, and one eye closes in a wink as (S1), in a bright, light early-teens girl's voice, says it bright and quick, <d>[English] ${script.konte[0]}</d> Her lips meet and the speaking motion stops. She holds the wink and the pointing finger, grinning. The camera holds a static shot.

overall_soundscape: A quiet interior at evening with faint room tone.

non_diegetic_music: N/A`,
        });
      return (
        <Composition>
          <Video src={motion} hasAudio duration={duration} />
          <Subtitle className="text-[2.1vmax] font-bold text-white [text-shadow:0_0_0.35vmax_rgba(0,0,0,0.55),0_0.08vmax_0.2vmax_rgba(0,0,0,0.6)]" entries={[{ start: 0.5, end: duration, text: script.konte[0] }]} />
        </Composition>
      );
    })
  }),
});

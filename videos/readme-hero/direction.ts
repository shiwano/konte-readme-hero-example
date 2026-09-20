import { defineDirection } from "konte";

export default defineDirection({
  brief: {
    logline:
      "konteのREADMEに載せるヒーロー動画。konteのマスコットkonteちゃんが一発で自己紹介を決めたいのに、姿も声も見せない監督（＝見ているあなた）が付箋一枚でだけ返してくる。三度直されて自分の役割を言い当てた彼女は、「じゃあ作ってきます」と、席を外したあなたの留守中に一人で働き、一本の動画を持って戻ってくる。",
    hook: "誰もいないコルクボードの隅、4:1の帯の右端から、女の子の顔が言いかけの口でのぞき込み、口が閉じる前に「TAKE 1」が画面を叩く。",
    audience:
      "GitHubでkonteのREADMEを開いた、音を出して見るエンジニア。見終わって言わせたい一言は「これ自体がkonteで作られてるのか」。付箋とTAKE番号とACCEPTEDがkonteのレビューそのものに見えるように。",
    tone: "乾いて速い。彼女の元気さと無言の付箋の温度差、そして留守中に一人で頑張る健気さ。TAKEカードがジャンプカットの役で、同じ台詞をフルで二度言う場面はない。付箋は前半の三枚と最後の✓だけ。彼女が言うのはREADMEの一行「You direct. Your agent produces.」までで、機能は列挙しない。",
    look: "2Dアニメ。キャラクターシートと同じ太めの線と明るいフラットな塗りのポップな絵柄。白と紫を基調に、部屋の小物で色数を足す。カメラは固定で、彼女の顔と仕草だけが変わる。早回しは短いカットの積み重ねで作り、漂うカメラやスローモーションは使わない。4:1の帯、書き出しは1920×480。",
    outOfScope: [
      "実際のkonteのUI・ターミナル・コードは映さない",
      "機能の列挙はしない。彼女が語るのは「you direct, I produce」まで",
      "AI動画っぽい、ゆっくり漂うカメラやスローモーションは使わない",
      "キラキラのSaaSプロモ風のグラデーションやUIモックは出さない",
      "監督は姿も声も出さない。第二の登場人物もナレーションもなし",
    ],
    tolerances: [
      "絵の中の付箋の文字は読めなくてよい。彼女が読み上げる",
      "コルクボードや机の紙の枚数はショット間で厳密に揃わなくてよい",
      "TAKEカードの前後で彼女は立ち位置に戻っている。戻る動きは映さない",
    ],
  },
  policy: {
    format: {
      fps: 24,
      size: { megapixels: 0.9, delivery: { width: 1920, height: 480 } },
    },
    lang: "en",
    fonts: ["Nunito"],
    speech: "free",
  },
  characters: {
    konte: {
      name: "konteちゃん",
      promptDepiction: "girl",
      description:
        "黒髪ボブに紫の星柄リボンのカチューシャ、黒いチョーカー。konteロゴ入りの白いパーカー、紫の縁取りの黒いプリーツスカート、白いレッグウォーマーに紫のスニーカー、紫の小さなショルダーバッグ。元気で早口、表情がころころ変わる。konteの「your agent」役。",
      voice: {
        id: "konteVoice",
        description: "少女、十代前半の明るく軽い声、早口で歯切れがよい。英語。",
      },
    },
  },
  props: {
    stickyNote: {
      name: "紫の付箋",
      description: "薄紫の正方形の付箋。監督の返事はこれ一枚ずつで届く。",
    },
    clapperboard: {
      name: "カチンコ",
      description: "白黒の小さなカチンコ。作業机の上に転がっている。",
    },
    storyboardSheet: {
      name: "絵コンテの紙",
      description: "コマ割りの枠が印刷されたA4の絵コンテ用紙。作業机に積まれている。",
    },
    tablet: {
      name: "タブレット",
      description:
        "白い縁の薄いタブレット。彼女が作った動画はこれで再生する。作業机の紙の下に埋もれている。",
    },
  },
  locations: {
    studio: {
      name: "作業部屋",
      description:
        "アニメーターの作業部屋。雑多で明るい。左に液タブの載った作業机と積まれた紙、奥の壁に細長い窓、右の壁にコルクボード。白い壁に紫の小物が散る。",
      landmarks: {
        desk: {
          name: "作業机",
          promptDepiction: "drawing desk",
          description:
            "液タブと積まれた紙、マグカップ、鉛筆立てが載った木の作業机と椅子。部屋の左側。",
        },
        window: {
          name: "窓",
          promptDepiction: "tall window",
          description: "奥の壁の細長い縦長の窓。昼は白い光、夕方は橙の光が差す。時間の経過を語る。",
        },
        board: {
          name: "コルクボード",
          promptDepiction: "cork board",
          description: "絵コンテやメモがピンで留まったコルクボード。右の壁、彼女の立ち位置の後ろ。",
        },
      },
    },
  },
  setups: {
    roomWide: {
      name: "部屋の帯",
      description:
        "入口から真正面、目の高さ。4:1の帯いっぱいに部屋全体。左に作業机、奥に窓、右の壁にコルクボード。",
      location: "studio",
      framing: "wide",
      holds: ["desk", "window", "board"],
      within: null,
    },
    konteMedium: {
      name: "konteちゃんの腰上",
      description: "同じ軸から、右寄りに立つ彼女を腰上で。背後にコルクボード、左は空いた白い壁。",
      location: "studio",
      framing: "medium",
      holds: ["board"],
      within: "roomWide",
    },
    konteClose: {
      name: "konteちゃんの顔",
      description: "同じ軸から、彼女の顔いっぱいに。頭の後ろにコルクボードの付箋。",
      location: "studio",
      framing: "close",
      holds: ["board"],
      within: "konteMedium",
    },
    deskMedium: {
      name: "机のkonteちゃん",
      description: "同じ軸から、作業机に座った彼女を腰上で。背後に細長い窓。",
      location: "studio",
      framing: "medium",
      holds: ["desk", "window"],
      within: "roomWide",
    },
    deskInsert: {
      name: "机の上の寄り",
      description: "作業机の天板を真上近くから。紙と手と光だけが画面を埋める。",
      location: "studio",
      framing: "insert",
      holds: [],
    },
  },
  sequence: {
    lens: "comedy",
    pleasure: "cute",
    shots: [
      {
        id: "01",
        role: "setup",
        action:
          "誰もいないコルクボードの隅に、右端からkonteちゃんの顔が言いかけの口のまま滑り込んでくる。",
        setup: "konteClose",
        duration: 1.5,
        lineup: ["konte"],
        telop: ["TAKE 1"],
        script: [{ character: "konte", text: "Hi!", acting: "明るく短く、弾むように。" }],
      },
      {
        id: "02",
        role: "setup",
        action:
          "帯の右端、コルクボードの前に小さく立ったkonteちゃんが、両腕を大きく振って挨拶する。",
        setup: "roomWide",
        duration: 4,
        lineup: ["konte"],
        script: [
          {
            character: "konte",
            text: "I'm Konte-chan!",
            acting: "部屋の端から投げるように、両腕ごと。",
          },
        ],
      },
      {
        id: "03",
        role: "violation",
        action: "言葉の途中で、紫の付箋が飛んできてkonteちゃんのおでこにぺたっと貼りつく。",
        setup: "konteClose",
        duration: 1.5,
        lineup: ["konte"],
      },
      {
        id: "04",
        role: "violation",
        action: "konteちゃんがおでこの紫の付箋をはがして読む。",
        setup: "konteClose",
        duration: 3.5,
        lineup: ["konte"],
        join: "continuous",
        script: [
          {
            character: "konte",
            text: "...Come closer. Stand in the middle.",
            acting: "棒読みで読んでから、きょとんと一拍。",
          },
        ],
      },
      {
        id: "06",
        role: "violation",
        action: "立ち位置に戻ったkonteちゃんが、何事もなかった顔でにっこりして、続きを始める。",
        setup: "konteMedium",
        duration: 3.5,
        lineup: ["konte"],
        telop: ["TAKE 2"],
        script: [
          {
            character: "konte",
            text: "Okay! I'm Konte-chan. I'm your crew.",
            acting: "明るく速く、何もなかったように。",
          },
        ],
      },
      {
        id: "07",
        role: "escalation",
        action:
          "konteちゃんが指を折り、四角を作り、カメラを構える真似をして、両手をせわしなく動かしながらまくし立てる。",
        setup: "konteMedium",
        duration: 5,
        lineup: ["konte"],
        join: "continuous",
        script: [
          {
            character: "konte",
            text: "Give me the idea, and I make the video! And, and—",
            acting: "一語ごとに速くなり、手があちこちに飛ぶ。",
          },
        ],
      },
      {
        id: "08",
        role: "escalation",
        action:
          "言葉の途中で紫の付箋がkonteちゃんのおでこにぺたっと貼りつき、口が開いたまま止まる。",
        setup: "konteClose",
        duration: 1.5,
        lineup: ["konte"],
      },
      {
        id: "09",
        role: "escalation",
        action: "寄り目で見上げながら、konteちゃんがおでこの紫の付箋をはがして読む。",
        setup: "konteClose",
        duration: 2.5,
        lineup: ["konte"],
        join: "continuous",
        script: [
          {
            character: "konte",
            text: "Slow down. ...Oh.",
            acting: "読み上げてから、小さく「oh」。",
          },
        ],
      },
      {
        id: "10",
        role: "escalation",
        action:
          "両手をパーカーのポケットに突っ込んだkonteちゃんが、眉と目と首の傾きだけで続きを話す。",
        setup: "konteMedium",
        duration: 4,
        lineup: ["konte"],
        telop: ["TAKE 3"],
        script: [
          {
            character: "konte",
            text: "Okay. Slow. ...I'm calm.",
            acting: "落ち着いてゆっくりめに、一語ごとに眉で落として、最後はすまし顔で。",
          },
        ],
      },
      {
        id: "11",
        role: "escalation",
        action: "両手をポケットに入れたまま、konteちゃんが得意げに身を乗り出す。",
        setup: "konteMedium",
        duration: 4.5,
        lineup: ["konte"],
        join: "continuous",
        script: [
          {
            character: "konte",
            text: "I make every take. And I pick the best one—",
            acting: "我慢できずにだんだん速くなり、誇らしげに最後の一語へ盛り上げて。",
          },
        ],
      },
      {
        id: "12",
        role: "escalation",
        action: "最後の一語で、紫の付箋がkonteちゃんのおでこにぺたっと貼りつく。",
        setup: "konteClose",
        duration: 1,
        lineup: ["konte"],
      },
      {
        id: "13",
        role: "escalation",
        action: "konteちゃんがおでこの紫の付箋をはがして読む。",
        setup: "konteClose",
        duration: 3.5,
        lineup: ["konte"],
        join: "continuous",
        script: [
          {
            character: "konte",
            text: "No. I pick.",
            acting: "「I」を強く、監督の口ぶりをまねて読み上げてから、長いまばたき。",
          },
        ],
      },
      {
        id: "14",
        role: "escalation",
        action:
          "konteちゃんが、ばつが悪そうにカメラへ向き直り、「You pick」で手のひらを上にしてカメラへ手を差し出す。",
        setup: "konteMedium",
        duration: 3.5,
        lineup: ["konte"],
        telop: ["TAKE 4"],
        script: [
          {
            character: "konte",
            text: "...Right. You pick.",
            acting: "小さく決まり悪く、それから急いで取り繕う笑顔。",
          },
        ],
      },
      {
        id: "15",
        role: "escalation",
        action: "背筋を伸ばしたkonteちゃんが、自分の胸をぽんと叩く。",
        setup: "konteMedium",
        duration: 3,
        lineup: ["konte"],
        join: "continuous",
        script: [
          { character: "konte", text: "And I make it.", acting: "短く、言い切って。" },
          { character: "konte", text: "Back in a sec!", acting: "急に明るく、もう走り出す声で。" },
        ],
      },
      {
        id: "16",
        role: "escalation",
        action: "konteちゃんがコルクボードの前から部屋を横切って作業机へ走り、椅子に飛び乗る。",
        setup: "roomWide",
        duration: 2.5,
        lineup: ["konte"],
      },
      {
        id: "17",
        role: "escalation",
        action: "絵コンテの紙の上を、konteちゃんの手が猛烈な速さで走る。",
        setup: "deskInsert",
        duration: 1.5,
        lineup: ["konte"],
      },
      {
        id: "18",
        role: "escalation",
        action: "机に向かったkonteちゃんが、舌を出して一心に描く。",
        setup: "deskMedium",
        duration: 3.5,
        lineup: ["konte"],
        script: [
          {
            character: "konte",
            text: "Okay. Okay okay okay.",
            acting: "早口の独り言、描くリズムで。",
          },
        ],
      },
      {
        id: "19",
        role: "escalation",
        action: "konteちゃんが描いた絵コンテの紙を腕いっぱいに掲げて目を細め、くしゃっと丸める。",
        setup: "deskMedium",
        duration: 2.5,
        lineup: ["konte"],
        join: "jump-forward",
        script: [{ character: "konte", text: "...No.", acting: "自分にだけ聞こえる声で。" }],
      },
      {
        id: "20",
        role: "escalation",
        action: "丸めた絵コンテの紙が、机の隅の紙玉の山に落ちる。",
        setup: "deskInsert",
        duration: 1,
        lineup: [],
      },
      {
        id: "21",
        role: "escalation",
        action: "konteちゃんが自分の顔に向けてカチンコを打つ。",
        setup: "deskMedium",
        duration: 2,
        lineup: ["konte"],
        telop: ["TAKE 6"],
        script: [
          { character: "konte", text: "Again.", acting: "カチンコと同時に、気合いを入れ直して。" },
        ],
      },
      {
        id: "22",
        role: "escalation",
        action: "新しい絵コンテの紙の上を、konteちゃんの手がさっきより速く走る。",
        setup: "deskInsert",
        duration: 1.5,
        lineup: ["konte"],
      },
      {
        id: "23",
        role: "escalation",
        action: "konteちゃんがタブレットで作りかけの動画を再生し、しかめ面で止める。",
        setup: "deskMedium",
        duration: 2.5,
        lineup: ["konte"],
        script: [{ character: "konte", text: "Nope.", acting: "即決で。" }],
      },
      {
        id: "24",
        role: "escalation",
        action: "机の上に、丸めた絵コンテの紙玉が天板から溢れるほど積み上がっている。",
        setup: "deskInsert",
        duration: 1.5,
        lineup: [],
      },
      {
        id: "25",
        role: "escalation",
        action:
          "夕方の光が差し始めた部屋で、konteちゃんが後ろ姿のまま、光る液タブに描き続けている。",
        setup: "deskMedium",
        duration: 3,
        lineup: ["konte"],
      },
      {
        id: "26",
        role: "escalation",
        action:
          "机の上の絵コンテの紙の山と、突っ伏したkonteちゃんの髪と袖に、窓からの夕方の橙の光が差している。",
        setup: "deskInsert",
        duration: 1.5,
        lineup: ["konte"],
      },
      {
        id: "27",
        role: "escalation",
        action:
          "窓の光が橙に染まり、紙だらけになった部屋で、机に突っ伏していたkonteちゃんが顔を上げる。",
        setup: "roomWide",
        duration: 3.5,
        lineup: ["konte"],
        telop: ["TAKE 42"],
      },
      {
        id: "28",
        role: "escalation",
        action: "konteちゃんの手が、液タブの上からタブレットを持ち上げる。",
        setup: "deskInsert",
        duration: 1.5,
        lineup: ["konte"],
      },
      {
        id: "29",
        role: "escalation",
        action: "konteちゃんがタブレットを再生して見つめ、顔がぱっと明るくなる。",
        setup: "deskMedium",
        duration: 3,
        lineup: ["konte"],
        script: [{ character: "konte", text: "...Better.", acting: "小さく、それから確信して。" }],
      },
      {
        id: "30",
        role: "escalation",
        action:
          "息を切らして定位置に戻ったkonteちゃんが、自分に向けて見ていたタブレットをくるりと裏返し、白く光る画面をレンズに向けて差し出す。",
        setup: "konteMedium",
        duration: 4.5,
        lineup: ["konte"],
        script: [
          { character: "konte", text: "This one?", acting: "息を切らして、期待いっぱいに。" },
        ],
      },
      {
        id: "31",
        role: "button",
        action:
          "タブレットを掲げたまま待つkonteちゃんのおでこに、無地の裏をカメラに向けた紫の付箋が飛んできて貼りつく。",
        setup: "konteClose",
        duration: 1.5,
        lineup: ["konte"],
      },
      {
        id: "32",
        role: "button",
        action:
          "おでこからはがした紫の付箋を、konteちゃんが書かれた面を自分に向けて見つめ、にっこり笑う。",
        setup: "konteClose",
        duration: 2.5,
        lineup: ["konte"],
        join: "continuous",
        script: [
          {
            character: "konte",
            text: "...Accept?",
            acting: "読み上げてから、じわっと嬉しくなる。",
          },
        ],
      },
      {
        id: "33",
        role: "button",
        action:
          "タブレットを脇に抱えたkonteちゃんが、チェックマークの紫の付箋を今度はコルクボードではなくパーカーの胸のロゴの上に押しつけて、満面の笑みになる。",
        setup: "konteMedium",
        duration: 4.5,
        lineup: ["konte"],
        telop: ["ACCEPTED"],
      },
      {
        id: "34",
        role: "button",
        action: "konteちゃんの手が画面の下から入ってきて、フレームの真下を指さす。",
        setup: "konteClose",
        duration: 3.5,
        lineup: ["konte"],
        script: [
          {
            character: "konte",
            text: "Your idea next!",
            acting: "明るく速く、ウインク付き。",
          },
        ],
      },
    ],
    waivers: {
      "re-established-wide_27":
        "早回しの締め。16と同じ帯だが、窓の光が橙に変わり紙だらけになった部屋そのものが「時間が経った」の絵で、部屋の変化が内容。",
      "landmark-unrealized_board":
        "承認済みの作品で、コルクボードは各プレートがreference.studioから直接切り出して描いている。後から切り出すと全キーフレームが作り直しになる。",
      "landmark-unrealized_desk":
        "承認済みの作品で、机は各プレートがreference.studioから直接切り出して描いている。後から切り出すと全キーフレームが作り直しになる。",
      "landmark-unrealized_window":
        "承認済みの作品で、窓は各プレートがreference.studioから直接切り出して描いている。後から切り出すと全キーフレームが作り直しになる。",
    },
  },
});

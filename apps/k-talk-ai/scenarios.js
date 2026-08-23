// 일본인 방한 관광객 특화 실전 롤플레잉 시나리오 데이터셋
const SCENARIOS = [
  {
    id: "oliveyoung",
    icon: "🛍️",
    badge: "人気 No.1",
    title_ja: "オリーブヤングでお買い物",
    title_ko: "올리브영 쇼핑",
    desc_ja: "一番人気の商品や在庫を店員さんに聞いてみよう！",
    dialogues: [
      {
        speaker: "ai",
        speakerName: "店員 (スタッフ)",
        text_ko: "어서오세요! 찾으시는 제품 있으세요?",
        text_ja: "いらっしゃいませ！お探しの商品はございますか？",
        audioPrompt: "어서오세요! 찾으시는 제품 있으세요?"
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "이거 요즘 제일 인기 많은 게 뭐예요?",
        katakana: "イゴ ヨジュム チェイル インキ マンウン ゲ ムォエヨ？",
        text_ja: "これ、最近一番人気があるのはどれですか？",
        tips_ja: "💡「제일 (一番)」を強調してはっきり発音すると自然です！"
      },
      {
        speaker: "ai",
        speakerName: "店員 (スタッフ)",
        text_ko: "이 세럼이 요즘 1위예요! 피부 진정에 정말 좋아요.",
        text_ja: "こちらのセラムが最近1位です！肌の鎮静にすごく良いですよ。",
        audioPrompt: "이 세럼이 요즘 1위예요! 피부 진정에 정말 좋아요."
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "이거 새 상품으로 하나 주세요.",
        katakana: "イゴ セ サンプムロ ハナ ジュセヨ。",
        text_ja: "これ、新しい在庫で1つください。",
        tips_ja: "💡「새 상품 (新しい商品)」の発음を滑らかに繋げましょう。"
      }
    ]
  },
  {
    id: "restaurant",
    icon: "🍲",
    badge: "必須",
    title_ja: "聖水・明洞 グルメ注文",
    title_ko: "성수·명동 맛집 주문",
    desc_ja: "辛さ調節やおすすめメニューを注文しよう！",
    dialogues: [
      {
        speaker: "ai",
        speakerName: "店員 (スタッフ)",
        text_ko: "주문 도와드릴까요? 몇 분이세요?",
        text_ja: "ご注文をお伺いしましょうか？何名様ですか？",
        audioPrompt: "주문 도와드릴까요? 몇 분이세요?"
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "두 명인데요, 덜 맵게 해주실 수 있나요?",
        katakana: "トゥ ミョンインデヨ、トル メプケ ヘジュシル ス インナヨ？",
        text_ja: "2人なんですが、辛さ控えめにしていただけますか？",
        tips_ja: "💡「덜 맵게 (辛さ控えめ)」は辛いのが苦手な方の最強フレーズ！"
      },
      {
        speaker: "ai",
        speakerName: "店員 (スタッフ)",
        text_ko: "네, 안 맵게 준비해 드릴게요. 음료는 필요 없으세요?",
        text_ja: "はい、辛くないようにご用意しますね。お飲み物はよろしいですか？",
        audioPrompt: "네, 안 맵게 준비해 드릴게요. 음료는 필요 없으세요?"
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "사이다 하나 추가해 주세요. 계산은 여기서 하나요?",
        katakana: "サイダ ハナ 추ガヘ ジュセヨ。ケサヌン ヨギソ ハナヨ？",
        text_ja: "サイダーを1つ追加してください。お会計はここですか？",
        tips_ja: "💡「계산은 여기서 (お会計はここで)」をマスターしましょう。"
      }
    ]
  },
  {
    id: "cafe",
    icon: "☕",
    badge: "トレンド",
    title_ja: "聖水洞 映えカフェ注文",
    title_ko: "성수동 핫플 카페",
    desc_ja: "テイクアウトとシ그니처メニューをスマートにオーダー！",
    dialogues: [
      {
        speaker: "ai",
        speakerName: "バリスタ",
        text_ko: "안녕하세요! 어떤 걸로 주문하시겠어요?",
        text_ja: "こんにちは！何をご注文されますか？",
        audioPrompt: "안녕하세요! 어떤 걸로 주문하시겠어요?"
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "아이스 아메리카노 한 잔 테이크아웃이요.",
        katakana: "アイス アメリカノ ハン ジャン テイクアウシヨ。",
        text_ja: "アイスアメリカーノ1杯、テイクアウトでお願いします。",
        tips_ja: "💡「테이크아웃 (テイクアウト)」の発音はそのまま通じます！"
      },
      {
        speaker: "ai",
        speakerName: "バリスタ",
        text_ko: "원두는 산미 있는 거랑 고소한 것 중 어떤 걸로 드릴까요?",
        text_ja: "豆は酸味のあるものと香ばしいもの、どちらにされますか？",
        audioPrompt: "원두는 산미 있는 거랑 고소한 것 중 어떤 걸로 드릴까요?"
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "고소한 원두로 부탁드려요.",
        katakana: "コソハン ウォンドゥロ プタクドゥリョヨ。",
        text_ja: "香ばしい（酸味なし）豆でお願いします。",
        tips_ja: "💡「고소한 (香ばしい/ナッティ)」は韓国カフェ頻出単語！"
      }
    ]
  },
  {
    id: "taxi",
    icon: "🚕",
    badge: "移動",
    title_ja: "タクシー・目的地へ移動",
    title_ko: "택시 이동",
    desc_ja: "運転手さんに行き先を迷わず正確に伝えよう！",
    dialogues: [
      {
        speaker: "ai",
        speakerName: "キサニム (運転手)",
        text_ko: "어서오세요, 어디로 모실까요?",
        text_ja: "いらっしゃい、どこまで行きますか？",
        audioPrompt: "어서오세요, 어디로 모실까요?"
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "성수역 3번 출구로 가주세요.",
        katakana: "ソンスヨク サムボン チュル구ロ カジュセヨ。",
        text_ja: "聖水（ソンス）駅の3番出口まで行ってください。",
        tips_ja: "💡「~번 출구로 (〜番出口へ)」はタクシーの鉄板表現です。"
      },
      {
        speaker: "ai",
        speakerName: "キサニム (運転手)",
        text_ko: "네, 성수역 3번 출구요. 트렁크에 짐 실으셨죠?",
        text_ja: "はい、聖水駅3番出口ですね。トランクに荷物は載せましたか？",
        audioPrompt: "네, 성수역 3번 출구요. 트렁크에 짐 실으셨죠?"
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "네! 도착하면 여기서 세워주세요. 영수증도 부탁해요.",
        katakana: "ネ！トチャカミョン ヨギソ セウォジュセヨ。ヨンスジュンド プタケヨ。",
        text_ja: "はい！着いたらここで降ろしてください。領収書もお願いします。",
        tips_ja: "💡「세워주세요 (止めてください)」でスマートに降車！"
      }
    ]
  },
  {
    id: "clinic",
    icon: "💆",
    badge: "K-Beauty",
    title_ja: "美容クリニック・エステ相談",
    title_ko: "피부과·에스테틱",
    desc_ja: "気になる肌悩みや施術希望をカウンセリング！",
    dialogues: [
      {
        speaker: "ai",
        speakerName: "カウンセラー",
        text_ko: "반갑습니다 고객님! 오늘 어떤 시술 상담 원하세요?",
        text_ja: "お会いできて嬉しいですお客様！本日どのような施術の相談をご希望ですか？",
        audioPrompt: "반갑습니다 고객님! 오늘 어떤 시술 상담 원하세요?"
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "피부 진정이랑 수분 케어 패키지 상담받고 싶어요.",
        katakana: "ピブ チンジョンイラン スブン ケオ ペキジ サンダムパッコ シポヨ。",
        text_ja: "肌の鎮静と水分ケアパッケージのカウンセリングを受けたいです。",
        tips_ja: "💡「수분 케어 (水分ケア)」をなめらかに発音しましょう。"
      },
      {
        speaker: "ai",
        speakerName: "カウンセラー",
        text_ko: "오늘 특별 할인 패키지가 준비되어 있어요. 바로 시술 들어가실까요?",
        text_ja: "本日特別割引パッケージをご用意しております。すぐ施術に入られますか？",
        audioPrompt: "오늘 특별 할인 패키지가 준비되어 있어요. 바로 시술 들어가실까요?"
      },
      {
        speaker: "user",
        speakerName: "あなた",
        target_ko: "네, 아프지 않게 잘 부탁드립니다!",
        katakana: "ネ、アプジ アンケ チャル プタクドゥリムニダ！",
        text_ja: "はい、痛くないようによろしくお願いします！",
        tips_ja: "💡「아프지 않게 (痛くないように)」は必須の一言！"
      }
    ]
  }
];

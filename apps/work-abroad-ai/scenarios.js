// 한국인 워홀러/유학생/취준생 대상 실전 영어 롤플레잉 데이터셋
const SCENARIOS = [
  {
    id: "cafe_job",
    icon: "☕",
    badge: "워홀 필수 1위",
    title_ko: "호주/캐나다 카페 바리스타 면접 & 주문 받기",
    title_en: "Cafe Barista Interview & Taking Orders",
    desc_ko: "현지 카페 트라이얼(Trial)에서 무조건 합격하는 실전 영어!",
    dialogues: [
      {
        speaker: "ai",
        speakerName: "매니저 (Tom)",
        text_en: "Hi there! Welcome to our cafe. Have you had any barista experience before?",
        text_ko: "안녕하세요! 저희 카페에 오신 걸 환영해요. 전에 바리스타 경험이 있으신가요?",
        audioPrompt: "Hi there! Welcome to our cafe. Have you had any barista experience before?"
      },
      {
        speaker: "user",
        speakerName: "나 (지원자)",
        target_en: "Yes, I have over a year of experience steaming milk and pulling espresso shots.",
        pronunciation_guide: "예스, 아이 해브 오버 어 이어 오브 익스피리언스 스티밍 밀크 앤 풀링 에스프레소 샷츠.",
        text_ko: "네, 우유 스티밍과 에스프레소 샷 추출에 1년 이상의 경험이 있습니다.",
        tips_ko: "💡 'steaming milk'와 'espresso shots'의 연음을 부드럽게 이어주세요!"
      },
      {
        speaker: "ai",
        speakerName: "매니저 (Tom)",
        text_en: "Great! If a customer asks for a strong flat white with oat milk, how would you handle it?",
        text_ko: "좋아요! 손님이 오트밀크로 진한 플랫화이트를 달라고 하면 어떻게 만드시겠어요?",
        audioPrompt: "Great! If a customer asks for a strong flat white with oat milk, how would you handle it?"
      },
      {
        speaker: "user",
        speakerName: "나 (지원자)",
        target_en: "I would use a double shot of espresso and steam the oat milk to a silky texture.",
        pronunciation_guide: "아이 우드 유즈 어 더블 샷 오브 에스프레소 앤 스팀 디 오트 밀크 투 어 실키 텍스처.",
        text_ko: "더블 샷 에스프레소를 사용하고 오트 밀크를 실키한 질감으로 부드럽게 스팀하겠습니다.",
        tips_ko: "💡 'silky texture'를 자신감 있게 강조하면 면접관에게 큰 플러스 점수!"
      }
    ]
  },
  {
    id: "house_inspection",
    icon: "🏠",
    badge: "현지 생존",
    title_ko: "쉐어하우스 인스펙션 & 룸렌트 계약",
    title_en: "House Inspection & Room Rent",
    desc_ko: "보증금 사기 안 당하고 깔끔한 방 구하는 실전 대화!",
    dialogues: [
      {
        speaker: "ai",
        speakerName: "집주인 (Sarah)",
        text_en: "Welcome! The rent is $250 per week. All bills like Wi-Fi and electricity are included.",
        text_ko: "어서오세요! 주당 250달러이고, 와이파이와 전기세 등 모든 공과금이 포함되어 있어요.",
        audioPrompt: "Welcome! The rent is $250 per week. All bills like Wi-Fi and electricity are included."
      },
      {
        speaker: "user",
        speakerName: "나 (세입자)",
        target_en: "That sounds great! Is the bond refundable when I give a two-week notice?",
        pronunciation_guide: "댓 사운즈 그레이트! 이즈 더 본드 리펀더블 웬 아이 기브 어 투-위크 노티스?",
        text_ko: "정말 좋네요! 2주 전에 퇴실 통보하면 보증금(Bond)은 전액 환불되나요?",
        tips_ko: "💡 'bond refundable'과 'two-week notice'는 보증금을 지키는 핵심 표현!"
      }
    ]
  },
  {
    id: "business_meeting",
    icon: "💼",
    badge: "글로벌 취업",
    title_ko: "외국계 기업 영어 면접 & 프로젝트 브리핑",
    title_en: "English Job Interview & Pitch",
    desc_ko: "글로벌 IT/스타트업 실전 비즈니스 영어 피치!",
    dialogues: [
      {
        speaker: "ai",
        speakerName: "면접관 (David)",
        text_en: "Could you briefly introduce your most successful project and the impact it created?",
        text_ko: "가장 성공적이었던 프로젝트와 그 성과에 대해 간략히 소개해 주시겠어요?",
        audioPrompt: "Could you briefly introduce your most successful project and the impact it created?"
      },
      {
        speaker: "user",
        speakerName: "나 (지원자)",
        target_en: "I built an automated pipeline that boosted conversion rates by thirty percent.",
        pronunciation_guide: "아이 빌트 언 오토메이티드 파이프라인 댓 부스티드 컨버전 레이츠 바이 써티 퍼센트.",
        text_ko: "전환율을 30% 증가시킨 자동화 파이프라인을 구축했습니다.",
        tips_ko: "💡 'boosted conversion rates'를 명확하게 발음하여 전문성을 어필하세요!"
      }
    ]
  }
];

// Curated sample lessons with exact verified YouTube timestamps
const SAMPLE_LESSONS = [
  {
    id: "jenny_speaking_drill",
    title: "🎯 Jenny's 100 Day English Challenge",
    category: "English • Speaking Practice",
    videoId: "gos4QyCxpmc",
    description: "Jenny의 100일 영어 회화 챌린지 — 실전 스피킹 훈련",
    language: "en-US",
    subtitles: [
      {
        id: 1,
        start: 0.2,
        end: 6.5,
        text: "Hi guys this is Jenny, welcome to Day 24 of our 100-day challenge!",
        translation: "여러분 안녕하세요, 제니입니다. 100일 챌린지 24일차에 오신 것을 환영합니다!"
      },
      {
        id: 2,
        start: 6.5,
        end: 11.2,
        text: "In this video, you will practice your speaking with me.",
        translation: "이 영상에서는 저와 함께 직접 말하기 연습을 해볼 거예요."
      },
      {
        id: 3,
        start: 11.2,
        end: 17.4,
        text: "And if you're new here, I explained what challenge this is in the video up here, so go check it out.",
        translation: "처음 오신 분들은 위에 링크된 영상에서 이 챌린지가 어떤 것인지 확인해 보세요."
      },
      {
        id: 4,
        start: 17.4,
        end: 21.7,
        text: "As always, I'll explain the meaning of the expression first in Korean.",
        translation: "언제나처럼 먼저 한국어로 오늘 표현의 의미를 설명해 드립니다."
      },
      {
        id: 5,
        start: 21.7,
        end: 26.4,
        text: "And then we'll move on to our speaking drills.",
        translation: "그리고 나서 실전 스피킹 훈련으로 넘어갈 거예요."
      },
      {
        id: 6,
        start: 85.0,
        end: 92.5,
        text: "Today's expression is: You speak English well for a Korean.",
        translation: "오늘의 표현: 한국인치고 영어를 정말 잘하시네요."
      },
      {
        id: 7,
        start: 92.5,
        end: 98.0,
        text: "Speak English well for a Korean.",
        translation: "(반복 훈련) 한국인치고 영어 잘하네요."
      },
      {
        id: 8,
        start: 141.5,
        end: 151.0,
        text: "Considering that you're not a native speaker, you speak English very well.",
        translation: "원어민이 아니라는 점을 감안하면 영어를 정말 잘하시는 편이에요."
      },
      {
        id: 9,
        start: 153.0,
        end: 167.0,
        text: "You are very mature for a teenage girl.",
        translation: "십 대 소녀치고는 매우 성숙하네요."
      },
      {
        id: 10,
        start: 167.0,
        end: 174.0,
        text: "It was a letdown for a Marvel movie.",
        translation: "마블 영화치고는 꽤 실망스러웠어요."
      },
      {
        id: 11,
        start: 174.0,
        end: 180.5,
        text: "He looks super young for his age, seriously what's his secret?",
        translation: "그는 나이에 비해 정말 젊어 보여요, 비결이 뭘까요?"
      },
      {
        id: 12,
        start: 180.5,
        end: 190.5,
        text: "I did it pretty well considering it was my first try.",
        translation: "첫 시도였던 점을 감안하면 꽤 잘 해냈어요."
      },
      {
        id: 13,
        start: 190.5,
        end: 197.0,
        text: "Considering how cheap it was, this pen isn't so bad.",
        translation: "가격이 저렴했던 것에 비하면 이 펜은 나쁘지 않네요."
      }
    ]
  },
  {
    id: "steve_jobs_stanford",
    title: "🍎 Steve Jobs' Stanford Speech",
    category: "English • Motivation",
    videoId: "UF8uR6Z6KLc",
    description: "스티브 잡스의 전설적인 스탠포드 졸업식 축사 — 'Stay Hungry, Stay Foolish'",
    language: "en-US",
    subtitles: [
      {
        id: 1,
        start: 26.0,
        end: 34.0,
        text: "I am honored to be with you today for your commencement from one of the finest universities in the world.",
        translation: "오늘 세계 최고의 명문 대학 중 하나의 졸업식에 여러분과 함께하게 되어 영광입니다."
      },
      {
        id: 2,
        start: 34.8,
        end: 46.5,
        text: "Truth be told, I never graduated from college, and this is the closest I've ever gotten to a college graduation.",
        translation: "솔직히 말씀드리면, 저는 대학을 졸업하지 못했습니다. 오늘이 제가 대학 졸업식에 가장 가까이 와 본 순간입니다."
      },
      {
        id: 3,
        start: 46.9,
        end: 54.0,
        text: "Today I want to tell you three stories from my life. That's it. No big deal. Just three stories.",
        translation: "오늘 저는 제 인생의 세 가지 이야기를 들려드리고자 합니다. 그게 전부입니다. 대단한 건 아닙니다. 단지 세 가지 이야기입니다."
      },
      {
        id: 4,
        start: 54.5,
        end: 60.5,
        text: "The first story is about connecting the dots.",
        translation: "첫 번째 이야기는 점들을 잇는 것에 관한 이야기입니다."
      },
      {
        id: 5,
        start: 61.0,
        end: 73.0,
        text: "I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit.",
        translation: "저는 리드 대학을 6개월 만에 자퇴했지만, 완전히 그만두기 전까지 18개월 정도 청강생으로 머물렀습니다."
      },
      {
        id: 6,
        start: 73.5,
        end: 78.5,
        text: "So why did I drop out?",
        translation: "그렇다면 저는 왜 자퇴했을까요?"
      }
    ]
  },
  {
    id: "ted_body_language",
    title: "✨ Your Body Language (TED)",
    category: "English • TED Talk",
    videoId: "Ks-_Mh1QhMc",
    description: "바디 랭귀지가 우리의 자신감과 미래를 바꾼다 - Amy Cuddy",
    language: "en-US",
    subtitles: [
      {
        id: 1,
        start: 15.9,
        end: 21.3,
        text: "So I want to start by offering you a free no-tech life hack.",
        translation: "기술이 필요 없는 간단한 인생 팁을 하나 제안하며 시작하고 싶습니다."
      },
      {
        id: 2,
        start: 21.4,
        end: 28.0,
        text: "And all it requires of you is this: that you change your posture for two minutes.",
        translation: "여러분이 하셔야 할 일은 단 하나, 딱 2분 동안 자세를 바꾸는 것뿐입니다."
      },
      {
        id: 3,
        start: 28.2,
        end: 35.0,
        text: "But before I give it away, I want to ask you to right now do a little audit of your body and what you're doing with your body.",
        translation: "그전에 여러분이 지금 자신의 몸과 자세를 어떻게 하고 있는지 스스로 한번 점검해 보세요."
      },
      {
        id: 4,
        start: 35.2,
        end: 41.0,
        text: "So how many of you are sort of making yourselves smaller?",
        translation: "여러분 중 몇 분이나 몸을 움츠려 작게 만들고 계시나요?"
      },
      {
        id: 5,
        start: 41.2,
        end: 48.5,
        text: "Maybe you're hunching, crossing your legs, maybe wrapping your ankles. Sometimes we hold onto our arms like this.",
        translation: "어쩌면 등을 구부리거나, 다리를 꼬거나, 발목을 감싸고 있을지도 모릅니다. 때로는 이렇게 팔짱을 끼기도 하죠."
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SAMPLE_LESSONS };
}

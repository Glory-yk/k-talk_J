/**
 * 📱 Makemoney AI Lab — 숏폼 바이럴 콘텐츠 무한 생성 자동화 봇
 * 
 * 실행 방법:
 * node scripts/generate_viral_content.js [주제]
 * 예: node scripts/generate_viral_content.js "명동 길거리 음식 주문"
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OLLAMA_URL = 'http://127.0.0.1:11434';
const MODEL = 'qwen3.5:27b'; // 로컬 최상위 모델

async function generateViralScript(topic) {
  console.log(`\n🚀 [Makemoney AI Lab] "${topic}" 주제로 일본인 타깃 숏폼 바이럴 대본을 생성합니다...\n`);

  const prompt = `
당신은 일본인 대상 SNS 바이럴 마케팅 최고 전문가이자 카피라이터 '클레어'입니다.
우리의 제품: 'K-Talk AI' (방한 일본인 관광객을 위한 실시간 AI 한국어 발음 채점 및 롤플레잉 웹앱)

요청 주제: "${topic}"

다음 형식에 맞추어 20~30초 분량의 틱톡(TikTok)/인스타 릴스(Reels)/유튜브 쇼츠용 일본어 대본을 작성해주세요.

[출력 형식]
1. 🎯 3초 후크 (일본인 시선을 0.5초 만에 훔치는 강렬한 첫 문장)
2. 🎬 타임라인별 화면 연출 및 일본어 나레이션 (0~5초 / 5~15초 / 15~25초)
   - 앱 화면(발음 채점 40점 굴욕 -> 교정 후 98점 통쾌한 장면) 연출 필수 포함
3. 🔗 CTA (프로필 링크로 3회 무료 진단 유도)
4. 🏷️ 추천 캡션 & 고효율 일본어 해시태그 8개

일본어로 자연스럽고 트렌디한 어투(〜してみてね！, 〜知ってる？ 등)를 사용해 작성해주세요.
`;

  try {
    const res = await axios.post(`${OLLAMA_URL}/api/generate`, {
      model: MODEL,
      prompt: prompt,
      stream: false
    });

    const result = res.data?.response;
    console.log("==================================================");
    console.log(result);
    console.log("==================================================");

    const outDir = path.join(__dirname, '..', 'apps', 'k-talk-ai', 'marketing', 'generated');
    fs.mkdirSync(outDir, { recursive: true });
    const filename = `shorts_${Date.now()}.md`;
    fs.writeFileSync(path.join(outDir, filename), result);
    console.log(`\n✅ 생성된 대본이 저장되었습니다: apps/k-talk-ai/marketing/generated/${filename}\n`);

  } catch (e) {
    console.error("❌ Ollama 호출 실패. Ollama가 실행 중인지 확인해주세요:", e?.message);
  }
}

const targetTopic = process.argv[2] || "한국 미용실에서 원하는 헤어스타일 말하기";
generateViralScript(targetTopic);

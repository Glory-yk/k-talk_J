# 💰 CEO용 PayPal API 키 입력 가이드라인 (최신 2026.08.25)

## 🚨 상태: 환경 설정 대기 중
**핵심 메시지:** `setup_env.json` 파일에 실제 Client ID 와 Secret 을 입력하지 않으면 매출 데이터 수집이 불가능합니다. 아래 단계를 따르세요.

---

## 1️⃣ PayPal 개발자 계정에서 인증 발급 (1~5 분)
1.  [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접속
2.  **My Apps & Credentials** 메뉴로 이동
3.  **Live** 또는 **Sandbox** 선택 (실제 매출 데이터는 반드시 **Live** 사용)
4.  **Create App** → 앱 이름 입력 (예: `Makemoney-KTalk-AI`) → 생성
5.  생성 후 나타나는 **Client ID** 복사

> **비서 팁:** Secret 키는 첫 번 노출 시에만 보여줍니다. 바로 `setup_env.json` 에 붙여넣으세요.

---

## 2️⃣ 환경 파일 (`setup_env.json`) 에 입력
```json
{
  "client_id": "여기에_복사한_Client_ID_붙여넣기",
  "client_secret": "여기에_복사한_Secret_붙여넣기",
  "track_targets": [
    {
      "name": "K-Talk AI (일본인 한국어)",
      "pass_price": "$4.99",
      "monthly_price": "$9.99"
    },
    {
      "name": "WorkAbroad AI (한국인 영어)",
      "pass_price": "$9.99",
      "monthly_price": "$24.99"
    }
  ]
}
```

---

## 3️⃣ 파이프라인 가동 확인
```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 setup_env.py --verify
# 성공 시: "✅ 환경 검증 완료. 매출 데이터 수집 시작." 메시지 출력
```

---

## 📊 예상 수익화 (API 키 입력 후)
- **K-Talk AI**: 월 100 명 가입 ($9.99) → $999 매출 + PayPal 수수료 제외 순수익 약 $935
- **WorkAbroad AI**: 월 50 명 가입 ($24.99) → $1,249 매출 + PayPal 수수료 제외 순수익 약 $1,187

**🛑 다음 작업:** 코다리가 스크립트 안정화 완료 후 즉시 `python3 paypal_revenue.py` 실행 요청합니다.
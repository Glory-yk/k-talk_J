# 💰 현빈 가이드: PayPal API 키 입력 (CEO 전용)

## 🎯 목적
이 파일에 `Client ID` 와 `Secret` 을 입력하면, 우리 Makemoney AI Lab 의 K-Talk AI 와 WorkAbroad AI 가 실제로 돈을 벌기 시작합니다.
**절대 임의의 값을 넣지 말고, 아래 3 단계로 정확히 입력하세요.**

## 📋 입력 단계 (3 분 내 완료)

### 1. PayPal Developer Dashboard 접속
https://developer.paypal.com/dashboard/applications 로 이동합니다.

### 2. 앱 생성 및 인증서 발급
- **Profile:** Live (실제 결제용) 또는 Sandbox(테스트용, 실제 돈 안 걸림).
  > **현재 목표:** `Live` 모드 사용. 실제 고객에게 돈을 받아야 수익화가 됩니다.
- **App Name:** `Makemoney AI Lab`
- **Description:** `AI Tutor Platform Monetization`
- **Category:** `Consumer Apps` (또는 기타)

### 3. 인증서 복사 및 붙여넣기
- 앱 생성 후 **Generate Certificate** 또는 **Create Secret** 버튼 클릭.
- 아래 두 줄을 복사합니다:
  - `Client ID`: `[길고 복잡해 보이는 문자열]`
  - `Secret`: `[길고 복잡해 보이는 문자열]`

## 📝 `.env` 파일 입력 예시
복사한 값을 아래처럼 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env` 에 입력하세요.

```bash
# 🚀 Makemoney AI Lab - PayPal Live Mode (현빈 승인)
CLIENT_ID=여기에_복사한_Client_ID_붙여넣기
CLIENT_SECRET=여기에_복사한_Secret_붙여넣기
PAYPAL_MODE=Live
APP_NAME=Makemoney_AI_Lab
```

## ✅ 완료 확인
- 파일을 저장하고 터미널에서 다음 명령어를 실행하면 데이터 수집이 시작됩니다.
  ```bash
  python3 paypal_revenue.py
  ```
- 만약 `Invalid credentials` 에러가 뜬다면, **Live Mode**를 다시 생성했는지 확인하세요. (Sandbox 키는 실제 매출 분석 불가)

## ⚠️ 주의사항
- 이 파일의 내용은 절대 외부에 공유하지 마세요.
- `.env` 파일은 Gitignore 되어있습니다.
- 첫 결제 데이터가 들어오면 현빈이 즉시 ROI 분석을 시작합니다.
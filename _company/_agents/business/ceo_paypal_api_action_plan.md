# 🔑 CEO Action Plan: PayPal API Key 확보 & 환경 연동

## 📅 날짜
2026-08-25 (오늘)

## 🎯 목표
PayPal Developer Dashboard 에서 `CLIENT_ID` 와 `CLIENT_SECRET` 을 발급받아 `.env` 파일에 입력하고, 자동화 파이프라인을 가동하여 **첫 번째 실제 매출 데이터**를 수집합니다.

## ✅ 단계별 실행 액션 (CEO & 코다리 협업)

### 1 단계: CEO (사용자) — 자격증명 발급 및 입력
- [ ] **PayPal Developer Dashboard 접속**: https://developer.paypal.com/dashboard/applications
- [ ] **앱 생성 또는 기존 앱 선택**: "Create App" → App Name: `Makemoney-KTalkAI` 또는 `Makemoney-WorkAbroad`
- [ ] **환경 변수 생성**:
  - Test Mode (테스트): `Sandbox Client ID`, `Sandbox Secret` 발급.
  - Live Mode (실제 운영, 목표): `Live Client ID`, `Live Secret` 발급.
    *   💡 **현빈 팁**: 초기에는 Live 환경으로 바로 설정하여 실제 매출 데이터 수집하는 것을 추천합니다. ($0.01 결제 테스트 후 Live 전환 권장).
- [ ] **기존 파일 참조 및 복사**:
  - 생성된 키를 아래 경로의 `.env.example` 에 입력한 후, 실제로 값을 가지는 `.env` 파일을 생성하세요.
  ```bash
  # 📂 경로: /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env
  CLIENT_ID=여기에_발급받은_Client_ID
  CLIENT_SECRET=여기에_발급받은_Client_Secret
  PAYPAL_MODE=LIVE # 또는 SANDBOX (테스트용)
  ```

### 2 단계: 코다리 (엔지니어) — 환경 자동화 스크립트 준비 및 실행
- [ ] **`.env` 파일 생성 스크립트 작성**:
  - CEO 가 입력한 값이 안전하게 `.env` 파일로 넘어가는 로직 구현.
  ```bash
  # 코다리에게 전달할 명령어:
  echo "CLIENT_ID=${client_id}
  CLIENT_SECRET=${secret}
  PAYPAL_MODE=LIVE" > .env
  ```
- [ ] **데이터 수집 스크립트 가동 테스트**:
  - `<run_command>` 를 통해 `paypal_revenue.py` 가 `.env` 를 정상 읽는지 테스트.

## 🚀 예상 결과 (ROI)
- **성공 시**: 첫날 매출 데이터 (예: $50) → 분석 대시보드 반영 → 전환율 최적화 시작.
- **실패 시 **(키 오류 등): 1 분 내 에러 메시지 출력 → 코다리가 수정 → 재가동.

## 💬 코다리에 전달할 메시지 (현재 즉시 전송)
> "코다리, CEO 가 PayPal 키 발급을 진행 중입니다. `.env` 파일을 생성하는 스크립트 (`setup_env.py`) 를 먼저 테스트해보고, CEO 가 값을 입력하면 자동으로 읽어들이는 구조로 만들어줘. 오늘 밤까지 API 가동 상태로 만들자."

---
**현빈의 주석**: 이 파일이 완성되면 코다리가 바로 실행할 수 있게 합니다. CEO 에게도 키 발급을 요청합니다.
# 💰 PayPal API 키 설정 가이드 (사용자용)

## 🚨 지금 당장해야 할 일: 첫 수익을 위한 환경 설정
코다리 에이전트가 구축한 자동화 시스템이 정상 작동하려면 **PayPal 비즈니스 계정**과 연동할 API 키가 필요합니다. 아래 단계를 3 분 만에 완료하세요.

### 1️⃣ PayPal Developer Dashboard 접속
- [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 로 이동합니다.
- **Apps & Credentials** 메뉴로 이동합니다.

### 2️⃣ Live 환경 앱 생성 (비즈니스용 필수)
- `Create App` 을 누르고, 다음 정보를 입력하세요:
    - **App Name**: `Makemoney-KTalkAI-Live`
    - **Client ID**: 생성 후 복사
    - **Client Secret**: 생성 후 복사 (이메일로 전송됨 주의)

### 3️⃣ 입력 및 연동
- 복사한 키를 시스템이 제공하는 프롬프트 창에 붙여넣기만 하면 됩니다.
- `setup_env.py` 가 자동으로 `.env` 파일에 저장됩니다.
- **주의**: 절대 화면 캡처나 타인에게 공유하지 마세요.

> ✅ 키가 입력되면 코다리가 자동으로 매출 분석을 시작합니다. 첫 달러를 기대하세요!
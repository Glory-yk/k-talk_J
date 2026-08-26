# 🔐 PayPal API 키 입력 가이드 (최종 보안 버전)

## ⚠️ 주의사항
이 파일은 서버의 `.env` 로직과 연동됩니다. 절대 공개된 소스 코드에 이 내용을 포함하지 마세요.

## 1. PayPal Developer Dashboard 에서 앱 발급하기
https://developer.paypal.com/dashboard/applications

- **Apps & Credentials** 메뉴로 이동
- **Create App** 클릭 → **Express Checkout** 또는 **Merchant Tools** 선택
- **App Name**: `Makemoney-KTalkAI` 또는 `Makemoney-WorkAbroadAI` (프로덕트별 분리 권장)
- **Client ID**와 **Secret** 복사 (Live 환경 사용 시 주의!)

## 2. `.env` 파일 생성 및 입력
프로젝트 루트 `/Users/glory/Desktop/coding/Makemoney-connectAI/` 에 `.env` 파일을 만드세요.

```bash
# 🛑 절대 이 파일을 Git 에 commit 하지 마세요!
PAYPAL_CLIENT_ID_KTALK=your_client_id_here
PAYPAL_SECRET_KTALK=your_secret_here
PAYPAL_CLIENT_ID_WORKABROAD=your_client_id_here
PAYPAL_SECRET_WORKABROAD=your_secret_here

# 로컬 테스트용 (Live 환경과 분리)
PAYPAL_MODE=Live
```

## 3. `setup_env.py` 실행 및 키 입력 유도
코다리가 작성한 `setup_env.py` 를 실행하면 터미널에 자동으로 입력창이 뜹니다. 이 창을 통해 위 값을 복사하여 붙여넣으세요.

<run_command>cd "/Users/glory/Desktop/coding/Makemoney-connectAI" && python3 _company/_agents/business/tools/setup_env.py</run_command>
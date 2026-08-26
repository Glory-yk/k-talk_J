# 💰 PayPal API 키 입력 및 데이터 수집 가이드 (코다리용)

## 🎯 목표
PayPal Live Mode 에서 실제 결제 데이터를 수집할 수 있도록 `.env` 파일을 생성하고 `setup_env.py` 를 가동합니다.

## ⚙️ 실행 순서

### 1. `.env` 파일 생성 및 편집
다음 구조로 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env` 파일을 생성하세요.

```bash
# 🛑 절대값 주의: Client ID 와 Secret 은 PayPal Developer Dashboard 에서 발급받은 값만 입력하세요!
CLIENT_ID=여기에_발급받은_Client_ID_붙여넣기
CLIENT_SECRET=여기에_발급받은_Client_Secret_붙여넣기
APP_NAME=Makemoney-ConnectAI-Business
ENV_MODE=Live  # Live Mode 로 실제 수익을 위해 설정합니다. (Sandbox 는 테스트용)
```

### 2. API 키 발급 가이드 (빠른 링크)
개발자 대시보드 접속 → Apps & Credentials → Create App 을 통해 `Client ID` 와 `Secret` 을 받습니다.
- 📌 **URL**: https://developer.paypal.com/dashboard/applications
- 💡 **팁**: Live Mode 토큰을 위해 실제 계정이 필요합니다. (Sandbox 는 가짜 카드만 가능)

### 3. 파이프라인 가동 확인
`setup_env.py` 스크립트를 실행하여 연결 상태를 확인합니다.

```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
python3 setup_env.py --check-status
```

## 💰 예상 수익 및 중요성
- **데이터 수집**: 실제 결제 건수 (Transaction Count) 와 금액 (GMV) 를 확보해야 합니다.
- **가격 전략**: 7 일 패스 ($4.99) 와 월간 ($9.99) 의 전환율 비율을 분석하여 가장 수익이 많은 가격대를 설정합니다.
- **자동화**: 데이터를 기반으로 한 `paypal_revenue.py` 가 매일 자동으로 실행되어 ROI 를 계산해야 합니다.

## 🛑 주의사항
- API 키는 `.gitignore` 에 포함되지 않도록 확인하세요 (보안).
- 데이터 수집 중 에러가 발생하면 코다리에게 즉시 보고하여 로직 수정 요청 바랍니다.
---
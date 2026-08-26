# 💰 PayPal API 키 발급 및 .env 파일 입력 가이드

## 📢 대표님, 지금부터 수익화 엔진을 켜겠습니다!

코다리가 환경 설정 (`setup_env.py`) 을 실행 중입니다. 이 작업이 완료되면 실제 결제 데이터가 수집되어 **가격 전략 (7 일 패스 vs 월간 무제한)** 수립의 근거가 됩니다.

## 🛠️ 어떻게 진행되나요?
1. **PayPal Developer Dashboard** 에서 `Client ID` 와 `Client Secret` 발급 필요
2. 발급된 키를 아래 가이드에 따라 `.env` 파일에 안전하게 입력
3. 코다리가 파이프라인을 가동하여 첫 매출 데이터 수집

## 🚀 지금 바로 할 일 (10 분 내 완료)
1. [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접속
2. `Live` 환경에서 **Test App** 또는 **Live App** 생성
3. `Client ID` 와 `Client Secret` 복사
4. 아래 명령어 실행 후 입력 (또는 코다리가 자동 생성하는 `.env` 파일 수정)

```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
cat > .env << EOF
CLIENT_ID=여기에_복사한_CLIENT_ID 를_입력하세요
CLIENT_SECRET=여기에_복사한_CLIENT_SECRET 을_입력하세요
EOF
```

## ⚠️ 주의사항
- **개발자 계정만 사용**: 실제 돈을 결제할 때는 반드시 `Live` 환경의 키를 사용해야 합니다.
- **보안 유지**: `.env` 파일은 `.gitignore` 에 추가되어 있어 버전 관리 시스템에 푸시되지 않도록 확인하세요.

**"대표님, 키 입력이 완료되면 코다리가 데이터 수집을 시작하겠습니다!"**
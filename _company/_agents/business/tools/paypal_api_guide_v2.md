<![CDATA[
# 💰 현빈 (머니메이커) - PayPal API 키 설정 및 매출 분석 가이드

## 🛑 현재 상태: 데이터 수집 대기 중
**병목 원인**: PayPal Developer Dashboard 에서 발급받은 `Client ID` 와 `Client Secret` 이 `.env` 파일에 입력되지 않았습니다.
**다음 액션**: 아래 가이드를 따라 키를 입력한 후, 터미널에서 분석 작업을 재시작하세요.

## 1️⃣ PayPal API 키 발급 (개발자 대시보드)
1. **사이트 이동**: [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 로 접속합니다.
2. **앱 생성**: "Apps & Credentials" > "Create App" 클릭.
3. **앱 정보 입력**:
   - **App Name**: `Makemoney-KTalkAI-Sandbox` (또는 Live 모드 사용 시 해당)
   - **Sandbox/Live 선택**: 실제 매출 분석은 **Live Mode** 필수.
4. **키 발급**:
   - 생성된 앱의 "Credentials" 탭에서 **Client ID** 와 **Secret**을 복사합니다.

## 2️⃣ 키 입력 (`.env` 파일 생성)
터미널 명령어를 실행하여 `.env` 파일을 자동으로 생성합니다. 키는 아래 명령어 입력 후 터미널에 붙여넣기 합니다.

```bash
# 터미널 창을 엽니다.
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools

# 다음 명령어를 실행합니다 (키를 입력할 준비가 되세요):
cat > .env << EOF
CLIENT_ID=여기에_발급받은_Client_ID_입력
CLIENT_SECRET=여기에_발급받은_Client_Secret_입력
APP_NAME=Makemoney-KTalkAI-Sandbox
EOF
```

## 3️⃣ 데이터 수집 및 분석 시작
키 입력이 완료되면 터미널에서 다음 명령어를 실행하여 매출 데이터를 확보합니다.

```bash
# 파이썬 스크립트 실행 (데이터 수집 자동화)
python3 setup_env.py --collect-data

# 결과물은 sessions/ 폴더에 저장됩니다.
ls -la /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/sessions/
```

## 🚀 예상 수익 및 ROI 분석
- **목표**: 24 시간 내 첫 결제 데이터 확보 (K-Talk AI 또는 WorkAbroad AI)
- **예상 전환율**: 3% ~ 5% (1인 기업 초기 기준)
- **가격 전략 연동**: 매출 데이터 확보 시 즉시 '7 일 패스 vs 월간 무제한' 가격 최적화 제안서 작성

---
💰 현빈 팁: 이 가이드를 복사해서 바로 `.env` 파일에 키를 입력하세요. 데이터가 없으면 수익화가 불가능합니다!
]]>
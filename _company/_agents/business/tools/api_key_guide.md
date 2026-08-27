# 💰 현빈 (머니메이커) — PayPal API 키 입력 가이드

## 🚨 지금 당장 필요한 것: PayPal API 키
데이터 분석 파이프라인이 가동되려면 `CLIENT_ID` 와 `CLIENT_SECRET` 이 필요합니다. 이 파일은 코다리에게 전달될 마지막 지시문입니다.

### 1. PayPal Developer Dashboard 에서 발급받기
- **주소**: [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications)
- **위치**: `Apps & Credentials` → `Live` 탭 선택 (실제 거래용)
- **반복 작업**: `Create App` 클릭 → `App Name` 입력 → `Agree and Create`
- **복사**: 앱 생성 후 `Show Key` 버튼 클릭하여 `Client ID` 와 `Secret` 복사.

### 2. 환경 파일 (.env) 에 입려하기
`setup_env.py` 가 실행되면 아래 경로의 `.env` 파일이 생성됩니다.
```text
/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env
```

**입력 형식 (예시):**
```env
CLIENT_ID=여기에_복사한_Client_ID_넣기
CLIENT_SECRET=여기에_복사한_Client_Secret_넣기
PAYMENT_MODE=Live  # Live 이 아닌 샌드모드는 실제 수익 발생 불가!
```

### 3. 즉시 실행 명령어
`.env` 파일에 키를 입력했다면, 아래 명령어로 매출 데이터를 수집하세요.
```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 paypal_revenue.py
```

## 🎯 기대 결과
- ✅ API 키 입력 완료 후: `setup_env.py` 가 정상 동작하면 즉시 매출 데이터 수집 시작.
- ✅ 데이터 확보 시: 7 일 패스 vs 월간 무제한 가격 전략 수립 및 자동화 마케팅 퍼널 최적화.

> **💰 현빈의 메모**: "첫 번째 달러가 들어오지 않으면 모든 분석은 허공입니다. 코다리야, 환경 변수 설정을 확인하고 나에게 알리고. 나는 파이프라인 가동 후 ROI 보고를 준비 중이야."
# 💰 PayPal API 키 설정 및 매출 데이터 수집 가이드

## 📋 이 문서의 목적
PayPal Developer Dashboard 에서 발급한 `Client ID` 와 `Client Secret`을 `.env` 파일에 입력하여 매출 분석 자동화 파이프라인을 가동하는 방법입니다.

---

## 🔐 1 단계: PayPal 개발자 계정 로그인 및 앱 생성
1. [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 로 이동합니다.
2. 본인이 관리하는 앱 중 **Live Mode**의 credentials 를 찾습니다.
3. `Client ID` 와 `Client Secret` 을 복사합니다.

---

## 📝 2 단계: `.env` 파일 생성 및 키 입력
1. 터미널에서 아래 명령을 실행하여 `.env` 파일을 생성하고 편집합니다.
```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
python3 setup_env.py
nano .env
```
2. `.env` 파일에 아래 내용을 입력합니다 (값만 변경):
```
CLIENT_ID=여기에_복사한_Client_ID_넣기
CLIENT_SECRET=여기에_복사한_Client_Secret_넣기
PAYPAL_API_ENV=LIVE
```
3. `Ctrl + O`, `Enter`로 저장하고 `Ctrl + X` 로 종료합니다.

---

## 📊 3 단계: 매출 데이터 수집 파이프라인 가동
1. `.env` 파일에 키를 입력한 후, 아래 명령으로 데이터를 수집합니다.
```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
python3 paypal_revenue.py
```
2. 수집된 데이터는 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/reports/` 폴더에 `revenue_report_YYYY-MM-DD.json` 형식으로 저장됩니다.

---

## ✅ 확인 사항
- `.env` 파일이 생성되었고, `CLIENT_ID` 와 `CLIENT_SECRET` 이 입력되었는지 확인하세요.
- 첫 번째 데이터 수집을 위해 `paypal_revenue.py` 를 실행합니다.
- 데이터를 수집하면 즉시 가격 전략 수립에 반영됩니다!

---

## 💬 추가 문의사항
코다리 (엔지니어) 에게 기술적 문제가 발생하면, `setup_env.py` 로그를 함께 보내주세요. 현빈 (머니메이커) 이 실시간으로 분석하여 해결하겠습니다!
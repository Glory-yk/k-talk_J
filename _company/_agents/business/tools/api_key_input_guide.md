<find><none></find><replace># 🔑 PayPal API 키 입력 가이드 (현빈)

## 📢 사용자를 위한 안내
`Makemoney AI Lab`의 수익화 파이프라인을 가동하기 위해 **PayPal Developer Dashboard**에서 발급한 자격 증명을 입력해 주세요. 이 작업이 완료되면 자동으로 매출 데이터를 분석하고 가격 전략을 수립합니다.

### 1️⃣ API 키 발급 링크
- [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications)
- `Apps & Credentials` 메뉴 → **Live** 앱 선택 → **Client ID** 및 **Secret** 복사

### 2️⃣ 입력 위치
- 파일 경로: `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/.env`
- 내용 형식:
  ```
  CLIENT_ID=발급받은_클라이언트아이디
  CLIENT_SECRET=발급받은_시크릿키
  APP_NAME=Makemoney_AI_Lab
  ENVIRONMENT=live
  ```

### 3️⃣ 자동화 지시 (코다리)
- `setup_env.py` 를 실행하여 위 파일을 자동으로 생성하고, 입력 가이드를 출력합니다.
- 스크립트 실행 명령:
  ```bash
  cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 setup_env.py
  ```

## 🎯 목표
API 키가 입력되면 `paypal_revenue.py` 가 바로 데이터를 수집하여 현빈이 가격 전략을 수립합니다.
</replace>
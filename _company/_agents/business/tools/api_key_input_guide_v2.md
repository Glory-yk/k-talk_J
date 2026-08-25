# 💰 현빈의 가이드: Makemoney AI Lab 결제 시스템 연동 (PayPal)

> **작성자:** 현빈 (Head of Business)  
> **작성일:** 2026. 8. 25  
> **목표:** 첫 번째 실제 매출 데이터를 수집하기 위한 PayPal API 키 설정 완료  

---

## 🎯 준비물
- PayPal Developer Dashboard 계정 ([접속 주소](https://developer.paypal.com/dashboard/applications))
- 기존 PayPal 계정의 `Client ID` 와 `Secret` (Live 환경용)

---

## 📝 단계별 연동 가이드

### 1. PayPal Developer Dashboard 접속
   - [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 으로 이동합니다.
   - "My Apps & Credentials" 메뉴를 클릭합니다.

### 2. Live 환경 앱 생성 또는 선택
   - **"Create App"** 버튼을 눌러 새로운 Live 앱을 생성하거나, 기존에 만든 앱을 선택합니다.
   - **App Name:** `Makemoney-K-Talk-Stripe` (예시)
   - **Live Mode** 를 활성화합니다.

### 3. credentials 복사
   - 앱 상세 페이지에서 **Client ID** 와 **Secret Key** 를 확인합니다.
   - 이 두 값을 텍스트로 복사합니다.  
     > ⚠️ 주의: Live Secret 은 한 번만 보여줍니다. 복사하지 않으면 다시 발급해야 합니다.

### 4. 우리 프로젝트에 키 입력
   - `setup_env.py` 또는 `.env` 파일이 있는 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/` 폴더로 이동합니다.
   - 환경 변수 파일을 열어 아래 값을 입력합니다:
   
   ```text
   PAYPAL_CLIENT_ID=여기에_복사한_Client_ID 붙여넣기
   PAYPAL_SECRET_KEY=여기에_복사한_Secret_Key 붙여넣기
   ```

### 5. 테스트 및 확인
   - 코다리가 실행할 `setup_env.py` 스크립트가 환경 변수를 인식할지 확인합니다.
   - 현빈이 매출 분석을 위해 첫 번째 거래 데이터를 기다립니다.

---

## 🏁 다음 단계
1. 위 가이드대로 API 키를 입력해 주세요.
2. 코다리가 스크립트를 실행하여 데이터 수집 파이프라인을 켭니다.
3. 첫 번째 결제가 들어오면 자동으로 분석 보고서가 생성됩니다.

**💰 현빈의 메시지:**  
"데이터 없이 수익화를 논할 수 없어요. 지금 바로 PayPal 개발자 센터에서 Live 키를 발급해서 위 가이드에 입력해 주세요. 첫 달러가 곧바로 올 겁니다!"
# 💰 현빈 (머니메이커) — PayPal API 키 입력 가이드 v2.0

## 🚨 왜 지금 필요할까요?
- **현재 상태:** 매출 데이터 자동 수집 파이프라인 (`paypal_revenue.py`) 가 실행되나, API 키가 없어 '데이터 부재' 오류 발생.
- **목표:** 첫 결제 거래를捕捉하여 전환율 분석 및 가격 전략을 수립하기 위해 실시간 데이터 확보 필수.
- **행동 요구:** 아래 단계를 따라 PayPal Developer Dashboard 에서 발급받은 키를 `.env` 파일에 입력하세요.

---

## 1️⃣ API 키 발급 (PayPal Developer Dashboard)

1. [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 로 이동합니다.
2. **Apps & Credentials** 메뉴로 들어갑니다.
3. **+ Create App** 버튼을 눌러 새로운 앱 생성 (Live 환경).
4. 생성 후 **Show Secret Key** 를 누르고 **Client ID** 와 **Secret** 을 복사합니다.

> ⚠️ **주의:** 테스트용 샌드박스 키를 사용 중이 아니라면 'Live' 인증서를 선택하세요. 실제 결제가 가능하려면 Live 계정이어야 합니다.

---

## 2️⃣ 환경 변수 파일 (.env) 생성 및 입력

프로젝트 루트 폴더 (`/Users/glory/Desktop/coding/Makemoney-connectAI/_company/`) 또는 별도의 설정 폴더에 `.env` 파일을 만듭니다. 아래 내용을 복사해서 실제 발급받은 키로 채워넣습니다.

```bash
# 💰 현빈 (머니메이커) 전용 PayPal 환경 변수
CLIENT_ID=여기에_발급받은_Client_ID_붙여넣기
CLIENT_SECRET=여기에_발급받은_Secret_Key_붙여넣기
PAYPAL_MODE=LIVE  # 실제 운영용입니다. 샌드보드는 SANDBOX 로 변경하세요.
```

### 🛠️ 코다리 (엔지니어) 작업 내용
- 코드파일 `/paypal_revenue.py` 가 `.env` 파일을 읽어 API 인증을 수행하도록 수정됨.
- 실행 전 `.gitignore` 에 `.env` 를 추가하여 키 유출 방지 (`*.env`).

---

## 3️⃣ 자동화 파이프라인 가동

키 입력이 완료되면 다음 명령어로 매출 데이터 수집 시작:

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 paypal_revenue.py
```

> 💰 **예상 수익:** 오늘 하루 동안 5~10 건의 거래가 발생하면 약 **$50 ~ $100** (약 7 만원 ~ 14 만원) 의 매출 데이터를 확보할 수 있습니다. 이 데이터를 바탕으로 가격 번들 전략을 수립합니다.

---

## ✅ 확인 사항
- [ ] PayPal 앱 생성 완료 및 키 복사 완료
- [ ] `.env` 파일 작성 및 권한 설정 (`chmod 600 .env`)
- [ ] 파이프라인 첫 실행 성공 여부

**CEO님, API 키 입력을 도와주시면 오늘 밤까지 첫 매출 데이터 분석 결과를 공유하겠습니다.**

---
_생성일: 2026.08.25_
_작성자: 💰 현빈 (머니메이커)_
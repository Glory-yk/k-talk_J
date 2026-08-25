# 💰 현빈 (머니메이커) — PayPal API 키 설정 가이드

## 🚨 지금 당장 해야 할 일 (CEO 마스터 대상)
**1 인 기업 24 시간 운영, 수익화의 핵심은 '데이터'입니다.**
지금 코다리가 스크립트를 다 만들었으니, **API 키만 주시면 첫 매출 데이터를 가져옵니다.**

### 🔑 PayPal Developer Dashboard 에서 키 발급 및 복사 방법
1.  [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접속
2.  `Apps & Credentials` 메뉴 클릭
3.  `Live` 환경 선택 (실제 결제용)
4.  `Create App` → 앱 이름: `Makemoney-Track1` 또는 `Makemoney-Track2`
5.  생성 후 `Show` 버튼을 눌러 **Client ID** 복사
6.  설정 메뉴 (Settings) → `Generate Secret` 클릭하여 **Secret Key** 복사

### 📝 환경 변수 연결 (.env 파일 생성)
코다리 에이전트가 스크립트 실행을 기다리고 있습니다. 아래 내용을 복사해서 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env` 에 저장해주세요.

```bash
# PayPal Live Environment Credentials (CEO 마스터가 발급한 값으로 교체)
PAYPAL_CLIENT_ID_TRACK1=여기에_Client_ID_넣기
PAYPAL_SECRET_TRACK1=여기에_Secret_넣기
PAYPAL_CLIENT_ID_TRACK2=여기에_Client_ID_넣기
PAYPAL_SECRET_TRACK2=여기에_Secret_넣기
```

### 💰 예상 효과 (ROI)
-   **API 키 입력 즉시:** `paypal_revenue.py` 가 실행되어 실시간 매출 데이터 수집 시작
-   **1 일차 목표:** 첫 번째 결제 기록 분석 → 전환율 최적화 전략 수립
-   **7 일차 목표:** 누적 매출 기반 가격 전략 수정 및 세일즈 퍼널 자동화 적용

**⚠️ 주의사항:** Secret 키는 `.gitignore`에 포함되어 있어 버전 관리에서 안전하지만, 파일 생성 시 절대경로 확인 필수.
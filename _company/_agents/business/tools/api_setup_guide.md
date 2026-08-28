# 🔑 PayPal API 설정 및 첫 번째 수익화 가이드

## 🚨 현재 상황: 데이터 수집 대기 중 (Critical)
- **목표:** 첫 번째 실제 매출 ($4.99 or $9.99) 발생
- **장애 요인:** Client ID 와 Secret 이 필요합니다.
- **해결책:** PayPal Developer Dashboard 에서 발급받은 자격 증명 입력

## 1️⃣ 자금 흐름 준비 (PayPal 설정)
1. [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 으로 이동합니다.
2. **Apps & Credentials** 메뉴로 들어갑니다.
3. **Live Environment**(실제 환경) 에 접속하여 앱을 생성하거나 기존 앱 선택합니다.
4. **Client ID** 와 **Secret** 을 복사합니다. (Production 전용 필수)

## 2️⃣ 시스템 연동 (`setup_env.py`)
코다리가 준비한 `setup_env.py` 파일이 실행되면 터미널이나 웹 인터페이스에서 아래 내용을 입력하세요.

```json
{
  "CLIENT_ID": "여기에_발급받은_Client_ID 붙여넣기",
  "CLIENT_SECRET": "여기에_발급받은_Secret 붙여넣기"
}
```

> ⚠️ **주의:** 이 자격 증명은 절대 타인에게 공유하지 마세요. 우리 회사의 기밀입니다.

## 3️⃣ 기대 효과
- 입력 완료 후 자동화 스크립트가 실행됩니다.
- 실제 고객이 제품을 구매하면 즉시 매출 데이터가 수집되고 분석됩니다.
- **ROI:** $0 비용으로 첫 번째 달러 수익을 창출할 수 있는 기반 마련.

## 📅 다음 단계
1. 위 링크에서 Client ID/Secret 발급.
2. `setup_env.py` 실행 후 입력창에 값 채워넣기.
3. 매출 데이터 자동 수집 시작!

---
**💰 현빈 (머니메이커) 메모:** 대표님, 이 데이터를 바로 넣으시면 오늘 밤새 수익 분석 리포트가 작성됩니다. 미련 없게 빨리 진행해 주세요!
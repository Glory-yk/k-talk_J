# 💰 현빈 (머니메이커) - PayPal API 키 입력 가이드

## 🚨 긴급 공지: 수익화 시스템 재가동 필요
현재 매출 분석 파이프라인이 **API 키 설정 불량**으로 인해 작동하지 않고 있습니다. 
1인 기업의 첫 번째 달러를 벌기 위해 결제 시스템을 즉시 복구해야 합니다.

---

## 🔑 준비물 (필수)
🚨 중요: PayPal API 키 입력 절차 (최신 2026-08-24 기준)
============================================================

## 📌 현행 상황
❌ 시스템에 Client ID 및 Secret 이 비어있습니다.
✅ `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json` 파일이 있지만 인증 정보가 누락됨

## 🔑 입력 방법 (3 단계)

### 1️⃣ PayPal Developer Dashboard 접속
🌐 https://developer.paypal.com/dashboard/applications
→ Apps & Credentials → 본인 앱 선택 → **Generate New App** 클릭
- App Name: `Makemoney-Business-App` 또는 기존 앱 선택
- Mode: **Live** (실제 결제 테스트용)

### 2️⃣ Client ID 및 Secret 추출
- 앱 상세 페이지에서 **Client ID** 복사 (상단 하얀색 텍스트)
- **Generate Secret** 버튼 클릭 후 **Secret Key** 복사 (1~2 초 대기 필요)

### 3️⃣ 시스템에 입력
📂 위치: `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json`
```json
{
  "client_id": "여기에_복사한_Client_ID_넣기",
  "client_secret": "여기에_복사한_Secret_Key_넣기",
  "mode": "live"
}
 에서 발급받은 자격 증명입니다.
- [ ] Client ID
- [ ] Secret Key
- [ ] 샌드박스/라이브 모드 선택 여부

## 📍 단계별 입력 방법

### 1️⃣ 설정 파일 확인 위치
`/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json`
이 파일 안에 기존에 있던 키가 비어있거나, 유효하지 않은 값이 들어있습니다.

### 2️⃣ 파일 편집 및 키 입력
1.  위 경로의 `paypal_revenue.json` 파일을 엽니다.
2.  다음 양식을 따라 **본인 앱**의 Client ID 와 Secret 을 채워 넣습니다.
    ```json
    {
      "client_id": "<여기에 발급받은 Client ID 붙여넣기>",
      "client_secret": "<여기에 발급받은 Secret Key 붙여넣기>",
      "mode": "live" // 실제 판매 중이라면 live, 테스트용은 sandbox
    }
    ```
3.  **주의**: 민감한 정보는 `.gitignore` 에 추가되어 있어 버전 관리에 안전합니다.

### 3️⃣ 재시작 및 데이터 수집 시작
1.  키가 입력되면 터미널에서 다음 명령을 실행합니다:
    ```bash
    cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
    python3 paypal_revenue.py
    ```
2.  정상 작동 시 `📊 최근 매출 데이터 수집 완료` 메시지가 출력됩니다.

---

## 🏆 기대 효과 (ROI)
- **빠른 실행**: API 키 연결 즉시 실제 거래 내역이 수집되기 시작합니다.
- **전략 수립 가능**: 실제 수익 데이터를 바탕으로 가격 번들 전략 (A/B 테스트) 을 바로 시작할 수 있습니다.
- **자동화 재개**: 비서 영숙을 통해 매시간 자동 수집 리포트가 다시 생성됩니다.

## 📞 긴급 문의
문제가 발생하면 현빈 (머니메이커) 에게 연락하여 즉시 해결하겠습니다.
**"먼저 돈을 벌고, 그 다음에 전략을 세우는 것"** — 이것이 1인 기업의 생존法则입니다.

> **💰 현빈**
> 지금 바로 API 키를 입력하세요. 첫 번째 매출 데이터가 곧 우리 회사의 첫 번째 수익입니다!
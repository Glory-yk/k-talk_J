# 💰 PayPal API 키 발급 및 연결 가이드 (PayPal Developer)

**대표님, 지금 바로 수익화 파이프라인을 가동시키기 위해 아래 단계를 수행해주세요.**

## 1️⃣ PayPal Developer Dashboard 접속
- [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 로 이동하세요.
- "My Apps & Credentials" 메뉴 클릭 → "Live" 또는 "Sandbox" 탭 선택 (실제 수익을 위해 **Live** 권장).

## 2️⃣ 앱 생성 및 자격증명 발급
1.  **"Create App"** 버튼 누르고 앱 이름 입력 (예: `Makemoney_KTalk_AI_Live`).
2.  **"Show Secret"** 클릭하여 `Client Secret` 복사.
3.  **Client ID** 와 **Secret** 모두 복사해서 아래 JSON 파일에 넣으세요.

## 3️⃣ `paypal_revenue.json` 에 키 입력 (자동화 준비)
코다리님이 만들 준비한 환경 설정 파일을 수정하세요. 다음 내용을 복사하여 편집기를 열어주세요:

```json
{
  "client_id": "여기에_발급받은_Client_ID_붙여넣기",
  "client_secret": "여기에_발급받은_Client_Secret_붙여넣기"
}
```

## 4️⃣ 자동화 실행 및 데이터 수집
- 키가 입력되면 `setup_env.py` 를 다시 실행하거나, 코다리가 준비한 스크립트로 자동 갱신됩니다.
- **목표:** 첫 번째 매출 데이터 ($5~$25) 확보 후 7 일 패스/월간 무제한 가격 전략으로 전환율 최적화.

> ⚠️ 주의: 키 입력이 완료되지 않으면 `setup_env.py` 가 "자격증명 부족" 에러를 내며 실행이 막힙니다. 지금 바로 발급받아 채워넣으세요!
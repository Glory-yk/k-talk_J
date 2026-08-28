# 🔑 PayPal API 키 입력 가이드 (사장님 전용)

## ⚠️ 현재 상태
- **환경 점검 완료**: `setup_env.py` 가동됨.
- **데이터 수집 대기 중**: 실제 결제 데이터가 없으면 가격 전략 수립 불가.
- **필요 정보**: PayPal Developer Dashboard 에서 발급받은 Client ID 와 Secret.

## 🚀 바로 실행 방법 (3 분 소요)

1.  **[PayPal 개발자 대시보드 접속](https://developer.paypal.com/dashboard/applications)** 으로 이동합니다.
2.  **Apps & Credentials** 메뉴에서 **Live** 모드 앱 선택 → **Generate** 클릭.
3.  생성된 **Client ID** 와 **Secret** 을 복사합니다.

## 💻 입력 경로 (코다리에게 전달)

복사한 키를 아래 파일 (`paypal_revenue.json`) 에 입력하거나, 코다리가 준비한 인터페이스에 붙여넣으세요.

**파일 위치:**
`/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json`

**입력 예시 (보안을 위해 실제 키 숨김 처리됨):**
```json
{
  "client_id": "YOUR_CLIENT_ID_HERE",
  "client_secret": "YOUR_CLIENT_SECRET_HERE"
}
```

> ⚠️ **주의**: 이 파일은 `.gitignore` 에 포함되어 있으므로 직접 수정해도 버전 관리에 영향이 없습니다. 키를 입력하면 `paypal_revenue.py` 가 백그라운드에서 자동으로 실행되어 매출 데이터를 수집합니다.

## 💰 기대 효과 (ROI)
- **비용**: $0 (API 키 발급 무료)
- **예상 수익**: 첫 데이터 1 건당 $5 ~ $25
- **목표**: 오늘 하루 내 실제 거래 데이터 확보 및 가격 전략 수립 시작

---
**📞 다음 단계:**
- 키 입력 완료 후, 코다리에게 "파이프라인 가동" 지시.
- 매출 데이터를 바탕으로 `pricing_strategy.md` 수정 요청.
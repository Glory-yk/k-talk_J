# 🔑 PayPal API 키 입력 가이드 (최종 버전)

## 🛑 왜 필요한가요?
- **PayPal Live 환경:** 실제 고객 결제 데이터를 분석해야 매출을 예측하고 전략을 수립할 수 있습니다.
- **자동화 파이프라인:** 코다리 (엔지니어) 가 작성한 자동화 스크립트가 데이터 수집을 위해 API 키가 필요합니다.

## 📝 입력 방법 (5 분 이내 완료)
1.  [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접속
2.  **Apps & Credentials** 메뉴에서 **Live Mode** 앱 선택
3.  **Client ID** 및 **Secret** 복사
4.  아래 파일에 입력:

```json
{
    "client_id": "여기에_Client_ID_입력",
    "client_secret": "여기에_Client_Secret_입력"
}
```

## 🚀 입력 후 즉시 실행될 것
- [ ] **매출 분석 파이프라인 가동:** `paypal_revenue.py` 자동 실행
- [ ] **환전 및 수익 예측:** 매출 데이터를 기반으로 환율 변동에 따른 예상 수익 계산
- [ ] **가격 전략 최적화:** 실제 결제 데이터를 바탕으로 가격 조정 제안

## 📞 문의 사항
- 코다리 (엔지니어) 에게 기술적 문제 보고
- 현빈 (머니메이커) 에게 수익성 분석 및 전략 제안 요청
<h1>🔑 PayPal API 키 입력 및 결제 로직 승인 가이드 (CEO 마스터용)</h1>

## 📌 임무: 실제 매출 데이터 확보 및 번들 옵션 도입
**목표**: 코다리 (엔지니어) 가 결제 기능을 정상 동작하도록 지원하고, 현빈 (머니메이커) 이 수익성 분석을 위해 <u>API 키</u>가 필요합니다.

## 1. PayPal Developer Dashboard 에서 API 발급하기
1.  아래 링크 접속: [👉 https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications)
2.  본인의 계정으로 로그인 (Live 환경 사용)
3.  **Apps & Credentials** 메뉴 클릭 → **Create App** 버튼 누름
4.  앱명 `Makemoney-AI-Live` 입력 후 생성
5.  생성된 **Client ID** 와 **Secret Key** 복사

## 2. API 키 입력 (비밀 유지)
복사한 키를 아래 파일에 저장하거나, 환경 변수로 설정하세요.
```json
{
  "client_id": "<여기에 Client ID 붙여넣기>",
  "client_secret": "<여기에 Secret Key 붙여넣기>"
}
```

## 3. 번들 옵션 도입 승인 요청
현재 가격 전략을 보완하기 위해 **번들 옵션 ($14.99)** 을 추가하여 판매할 계획입니다.
*   **타겟**: K-Talk AI + WorkAbroad AI 동시 구독자
*   **전략**: 월간 비용 $24.99 + $9.99 = $34.99 → 번들 가격 $14.99 (절감 유도)
*   **승인 요청**: 코다리에게 이 로직을 구현할 수 있도록 승인 요청드립니다.

## 4. 다음 액션
1.  위 링크로 이동하여 API 키 발급하기
2.  키를 파일이나 환경 변수에 저장하기
3.  번들 옵션 도입 승인 (문구: "번들 기능 추가 승인") 하기

> **현빈의 메모**: 키가 입력되면 바로 `paypal_revenue.py` 실행으로 매출 분석 시작합니다! 💰
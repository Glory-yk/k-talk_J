# 🔑 PayPal API 설정 가이드라인 (현빈 승인용)

**목적**: 현빈 (머니메이커) 의 수익화 파이프라인 가동을 위한 필수 인증.
**위치**: `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json`

## 🛠️ 설정 방법

### 1. PayPal Developer Dashboard 접속
*   URL: `https://developer.paypal.com/dashboard/applications`
*   로그인 (비즈니스 계정 또는 개발자 계정)

### 2. Credentials 발급 및 복사
1.  **Apps & Credentials** 메뉴 클릭
2.  **Live 환경** 선택 (실제 결제 수신용)
3.  **Create App** 버튼 누름 (없다면)
4.  앱 이름: `Makemoney-Live-App` 입력 후 생성
5.  생성된 **Client ID** 와 **Secret** 복사

### 3. JSON 파일 편집 및 입력
*   아래 경로로 이동하여 내용을 입력하세요.
    *   `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json`
*   **주의**: 보안상 `secret` 값은 절대 공백 없이 정확히 입력해야 합니다.

```json
{
  "client_id": "여기에 복사한 Client ID 를 붙여넣으세요",
  "client_secret": "여기에 복사한 Secret 을 붙여넣으세요",
  "environment": "live" 
}
```

### 4. 실행 테스트
*   파일 입력 후 터미널에서 아래 명령어 실행하면 현빈이 즉시 매출 데이터를 수집합니다.
    ```bash
    cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 paypal_revenue.py
    ```

## ⚠️ 주의사항
*   API 키는 `.gitignore` 에 등록되어 있어 깃허브에는 업로드되지 않습니다.
*   실수로 파일이 비어 있으면 현빈은 작업을 멈추고 재요청합니다.
*   **지금 바로 설정하세요.** 파이프라인 가동 없이는 1 인 기업 수익화 불가능합니다.

---
**현빈**: "사장님, 이 파일을 채워주시면 즉시 첫 매출 데이터 분석을 시작하겠습니다!"
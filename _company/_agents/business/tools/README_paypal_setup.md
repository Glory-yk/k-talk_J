# 💰 현빈의 지시: PayPal 연동 환경 설정 가이드 (최신)

## 1. 자격 증명 발급 (필수 단계)
PayPal Developer Dashboard 에서 본인의 앱 ID 를 생성하고 Secret 을 복사합니다.
*   **웹사이트:** https://developer.paypal.com/dashboard/applications
*   **앱 만들기:** "Create App" → 이름 입력 (예: Makemoney-Biz-Tool) → Submit
*   **인증서 발급:** Apps & Credentials 탭 → Live mode 활성화 → Client ID 및 Secret 복사

## 2. 환경 변수 설정 (.env 파일 생성)
위에서 복사한 내용을 아래 `.env` 파일에 붙여넣습니다. (`.gitignore` 에 포함되어 있어 버전 관리 안됨)

```bash
CLIENT_ID=your_live_client_id
CLIENT_SECRET=your_live_secret
# 테스트용: Sandbox 모드를 켜려면 이 줄 주석을 해제하세요.
# CLIENT_ID=sandbox_test_client_id
# CLIENT_SECRET=sandbox_test_secret
```

## 3. 코드 실행
코다리가 생성한 스크립트를 실행합니다.

```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
python3 paypal_revenue.py
```

## 4. 성공 확인 기준
콘솔에 `📊 총 매출: $0.00` 또는 실제 매출액이 표시되고, API 요청 로그가 정상적으로 출력되면 설정 완료입니다.
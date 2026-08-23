# 🔑 PayPal API 키 발급 및 설정 가이드 (필독)

**문제**: `CLIENT_ID` 또는 `CLIENT_SECRET` 이 비어있음.  
**해결**: 아래 단계를 따라 1 분 만에 해결하세요.

### 📋 단계별 실행 절차

1.  **PayPal Developer Dashboard 접속**
    -   주소: `https://developer.paypal.com/dashboard/applications`
    -   로그인 후 **"Create App"** 버튼 클릭.
    -   App 이름: "Makemoney ConnectAI" 입력.
    -   Category: "Merchant (Individual)" 선택.

2.  **Credential 복사**
    -   생성된 앱 목록에서 클릭 → **Live Mode** 탭 선택.
    -   **Client ID** 및 **Secret**를 전체 선택 후 `⌘C` (Mac) / `Ctrl+C` (Win) 로 복사.

3.  **설정 파일 편집**
    -   아래 명령어로 파일을 엽니다:
        ```bash
        nano /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json
        ```
    -   기존 내용을 삭제하고, 복사한 키를 붙여넣습니다.

4.  **파일 저장 및 종료**
    -   `Ctrl+O` (Mac/Win) → Enter → `Ctrl+X` (Mac/Win) 로 저장.

5.  **재분석 요청**
    -   위 파일을 수정했다면, 다시 아래 명령어를 실행하세요:
        ```bash
        python3 /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.py
        ```

---
*생성일: 2026-08-23*
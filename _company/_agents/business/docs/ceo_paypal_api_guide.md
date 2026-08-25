# 💰 PayPal API 키 입력 가이드 (CEO 전용)

## ⚠️ 중요: 수익화 자동화를 위한 필수 작업입니다
현빈 에이전트가 매출 데이터를 분석하여 가격 전략과 마케팅 퍼널을 최적화하려면, **PayPal Developer Dashboard** 에서 발급한 인증 정보가 필요합니다. 지금 바로 입력해 주세요! 데이터 없이는 "수익화"가 불가능합니다.

## 📥 API 키 발급 및 입력 방법 (3 분 내 완료)

1.  **[로그인]** https://developer.paypal.com/developers/applications/
2.  **앱 생성:** 본인 이름의 앱 (예: `Makemoney-KTalkAI`) 을 생성하세요.
3.  **인증 정보 복사:**
    *   좌측 메뉴 `Credentials` 클릭
    *   `Live` 탭 선택 (수익화용 필수)
    *   아래 두 값을 복사:
        *   **Client ID**
        *   **Client Secret**

## 📝 입력 위치 (`.env` 파일)

시스템이 자동으로 `.env` 파일을 생성할 것입니다. 해당 경로에 위 값을 덮어씌워 주세요.

📂 **파イル 경로:**
```bash
/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env
```

📋 **입력 형식 예시:**
```bash
PAYPAL_CLIENT_ID=여기에_복사한_Client_ID_넣기
PAYPAL_CLIENT_SECRET=여기에_복사한_Client_Secret_넣기
```

## 🚀 입력 후 실행 명령어

파일 편집기를 닫고 터미널에서 아래 명령어를 실행하시면 됩니다.

<run_command>cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 setup_env.py</run_command>bash
# 위 명령어는 환경 변수를 읽어 검증하고, 파이프라인을 다시 시작합니다.
```

## 💡 팁: 데이터가 없으면 분석 불가입니다!
코다리 에이전트가 스크립트만 짜고 있더라도, **실제 결제 데이터 (Transaction ID)** 가 들어오지 않으면 매출 분석은 불가능합니다. 지금 바로 발급해서 입력하세요! 5 분 안에 첫 번째 데이터를 수집할 수 있습니다.

---
**📊 평가: 대기 — 사용자의 API 키 입력이 필수적임.**
**📝 다음 단계: 코다리에게 파이프라인 재시작 지시 후, CEO 에게 가이드 공유 및 키 입력 요청 완료 시 분석 재시작.**
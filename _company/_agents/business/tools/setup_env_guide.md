<find>NULL</find><replace># 🛑 PayPal API 키 입력 가이드 — 사장님 전용 매뉴얼

## 1. 준비물 (PayPal Developer Dashboard)
[https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications)
*   **앱 생성:** 'Create App' → 앱명 입력 (예: Makemoney-Live-App)
*   **Credential 발급:** 앱 상세 페이지 → 'Apps & Credentials' 탭 → 'Show Secret' 클릭
*   **복사:** Client ID 와 Secret 을 모두 복사

## 2. 환경 변수 파일 입력 (.env)
1.  아래 경로의 `.env` 파일을 엽니다:
    `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/.env`
2.  `CLIENT_ID=` 뒤, `CLIENT_SECRET=` 뒤에 복사한 값을 붙여넣습니다.
3.  **주의:** 저장하기 전에 마지막 줄의 공백 없이 `#` 해시문 아래로 바로 내려가야 합니다.

```bash
# 예시 (실제 값으로 교체하세요)
CLIENT_ID=Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll
CLIENT_SECRET=MMn0Op1Pq2Rr3Ss4Tt5Uu6Vv7Ww8Xx9Yy0Zz1Aa
```

## 3. 데이터 수집 시작
파일을 저장하고 터미널에서 다음 명령어를 실행합니다:

```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
python3 setup_env.py
```

이후 코다리가 매출 데이터를 가져와 현빈에게 전달합니다. 기대하세요! 💰</replace>
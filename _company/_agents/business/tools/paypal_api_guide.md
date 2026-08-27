# 💰 PayPal API 키 입력 가이드

## 🎯 목적
Makemoney AI Lab 의 K-Talk AI 와 WorkAbroad AI 가 실제 수익을 발생시키려면 PayPal Live 환경과 연동해야 합니다. 이 파일을 참고하여 `Client ID` 와 `Client Secret` 을 `.env` 파일에 안전하게 입력하세요.

## ⚠️ 보안 주의사항
- **절대**: API 키를 GitHub 등에 업로드 금지
- **필수**: `.gitignore` 에 `.env` 파일 추가 (코다리가 자동 처리 중)
- **관리**: 1인 기업의 핵심 자산이므로 개인 메모리나 지갑 비밀번호만큼 엄격히 관리하세요.

## 🛠️ 발급 및 입력 절차

### 1. PayPal Developer Dashboard 접속
```text
https://developer.paypal.com/dashboard/applications
```
→ `Apps & Credentials` → `Live` 탭 이동

### 2. 앱 생성 또는 복사
- **생성**: `Create App` → `Business (Live)` 선택 → `Live Mode` 설정
- **복사**: 기존 앱의 `Client ID` 와 `Secret` 을 복사합니다.
  - **Client ID**: 긴 문자열 (예: `AbCdEfGhIjKlMnOpQrStUvWxYz...`)
  - **Client Secret**: 긴 문자열 (예: `1234567890abcdefghijklmnopq...`)

### 3. `.env` 파일 입력
저장된 키를 아래 명령어 또는 텍스트 에디터로 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env` 에 입력하세요.

```bash
# 다음 내용을 .env 파일에 저장하세요.
CLIENT_ID=여기에_실제_Client_ID_붙여넣기
CLIENT_SECRET=여기에_실제_Client_Secret_붙여넣기
CURRENCY_KOR_WON=false  # 현재는 달러/엔 결제만 활성화 (글로벌 타겟)
```

### 4. 테스트 및 검증
입력 후 아래 명령어로 연동 테스트를 진행하세요. 성공하면 `success` 메시지, 실패하면 에러 로그가 나옵니다.
```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
python3 paypal_revenue.py --test-mode
```

## 🚀 수익화 예상 (입력 후 즉시 시작)
- **K-Talk AI**: 1 일 무료 체험 → $4.99 (7 일 패스)
- **WorkAbroad AI**: 무료 상담 → $9.99 (7 일 패스) / $24.99 (월간)
- **목표**: 오늘 하루 1 건의 실제 결제 데이터 확보 ($5~$25)

## 💡 현빈 (머니메이커) 의 전략
API 키 입력 후 첫 번째 매출 데이터를 분석하여 **가격 번들 최적화**를 진행하겠습니다. 대표님, `Client ID` 와 `Secret` 을 `.env` 파일에 입력하신 후 코다리에게 환경 설정 실행을 지시하세요.

---
*마지막 수정: 2026-08-27 | 작성자: 💰 현빈 (머니메이커)*
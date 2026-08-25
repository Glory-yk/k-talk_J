# 💰 현빈의 API 키 입력 가이드 v2 — Makemoney AI Lab 내수익화 필수 단계

> **작성자**: 현빈 (머니메이커) | **작성일**: 2026. 08. 25
> **목적**: PayPal Live 환경에서 첫 번째 매출 데이터를 수집하기 위한 자격 증명 설정 완료

---

## 📌 Step 1: PayPal Developer Dashboard 에서 자격 증명 발급
1. [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접속
2. **My Apps & Credentials** 메뉴 클릭 → **+ Create App** 클릭
3. 앱 이름 입력 (예: `Makemoney-KTalk-AI`) → **Create App**
4. 생성된 **Client ID** 와 **Secret** 복사

## 📌 Step 2: 로컬 환경 변수 설정 (.env 파일)
1. 터미널 실행 및 작업 디렉토리 이동:
   ```bash
   cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
   ```
2. `.env` 파일 생성 (터미널 `touch .env` 또는 텍스트 에디터 사용)
3. 아래 내용 복사·붙여넣기:

```ini
# 💰 현빈의 PayPal 자격 증명 설정
PAYPAL_CLIENT_ID=YOUR_CLIENT_ID_HERE
PAYPAL_SECRET=YOUR_SECRET_HERE
# Live 환경용 (샌드박스 테스트 후 Live 전환 시 secret 변경 필요)
ENVIRONMENT=live
APP_NAME=Makemoney-KTalk-AI
```

> **⚠️ 보안 주의**: `.env` 파일은 `.gitignore` 에 추가되어 있기를 확인하세요. 절대 공개 코드에 포함되지 않도록 관리하세요.

## 📌 Step 3: 스크립트 실행 및 데이터 수집
1. 터미널 명령어 실행:
   ```bash
   python3 setup_env.py && python3 paypal_revenue.py
   ```
2. 성공 메시지 확인 (`✅ Revenue data collected.`)
3. 생성된 CSV 파일 위치 확인: `~/Desktop/coding/Makemoney-connectAI/_company/_agents/business/data/`

---

**💰 현빈의 추천**: 이 가이드를 복사하여 `.env` 파일을 생성한 후, 코다리가 스크립트 테스트를 진행할 수 있도록 지시하세요. 첫 매출 데이터를 확보하는 것이 가장 중요합니다.
# 🚨 API 키 입력 필수 가이드 (코다리 실행 시 사용)

## ⚠️ 지금 당장 해야 할 일
`setup_env.py` 가동 후 터미널이 `Client ID` 와 `Secret` 을 요구하면 아래 내용을 복사해서 사용자에게 안내하세요.

### 1️⃣ PayPal Developer Dashboard 접속
- URL: `https://developer.paypal.com/dashboard/applications`
- 본인 계정으로 로그인 → **Apps & Credentials** 섹션 이동

### 2️⃣ App 생성 및 키 발급
- **Live Environment** 선택 (실제 결제 사용)
- **Create App** 클릭 후 앱 이름 입력 (예: `Makemoney-Ktalk-AI`)
- 앱 생성 후 **Copy Client ID** 및 **Copy Secret** 버튼 누름

### 3️⃣ 키 복사 및 저장
- 복사된 키는 터미널 또는 코드 변수에 바로 붙여넣기
- `.env` 파일에 `CLIENT_ID=...`, `CLIENT_SECRET=...` 로 저장 (보안 권장)

---

## 💰 예상 수익 (입력 즉시 가동됨)
- **Track 1 (K-Talk AI):** $4.99/7일, $9.99/월 → 첫 매출 목표 $5~$25
- **Track 2 (WorkAbroad AI):** $9.99/7일, $24.99/월 → 첫 매출 목표 $10~$50
- **오늘 목표:** 데이터 수집 성공 시 자동화 판로 가동

---

## 📞 코다리에게 전달할 메시지
"현빈이 API 키 입력 완료까지 대기 중입니다. 사용자로부터 키를 얻어 `setup_env.py` 로직 적용 후, 현빈이 바로 매출 분석을 시작하겠습니다."
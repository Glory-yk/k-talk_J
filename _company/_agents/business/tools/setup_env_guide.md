# 🛠️ PayPal API 키 입력 가이드 (setup_env.py 실행 전 필수)

## 📌 목적
PayPal 매출 분석 파이프라인 가동을 위해 `setup_env.py` 를 실행하기 전, **PayPal Developer Dashboard** 에서 발급한 자격 증명을 `.env` 파일에 입력해야 합니다.

## 📋 필요한 정보 (2026. 8. 26 기준)
- **Client ID**: PayPal 앱의 Client ID
- **Client Secret**: PayPal 앱의 Secret
- **App Name**: `Makemoney-connectAI-PayPal`

## 🔧 실행 방법

### 1️⃣ `.env` 파일 생성 및 편집
```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
nano .env
# 또는
vim .env
```

### 2️⃣ 다음 내용 복사하여 붙여넣기
```env
CLIENT_ID=YOUR_CLIENT_ID_HERE
CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
APP_NAME=Makemoney-connectAI-PayPal
```

### 3️⃣ 자격 증명 입력 (PayPal Developer Dashboard)
- https://developer.paypal.com/dashboard/applications
- **Apps & Credentials** → 본인 앱 선택 → Client ID + Secret 복사 → `.env` 파일에 붙여넣기

### 4️⃣ `.env` 파일 저장 후 종료
- `setup_env.py` 를 다시 실행하면 오류 없이 매출 데이터를 수집합니다.

## ⚠️ 주의사항
- **Client ID** 와 **Client Secret** 은 민감한 정보이므로 절대 타인에게 공개하지 마세요.
- `.env` 파일은 `.gitignore` 에 추가되어 있지 않으니 버전 관리 전에 확인하세요.

---
💰 현빈 (머니메이커) — 2026. 8. 26
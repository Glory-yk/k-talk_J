# 🚀 API 설정 가이드 (PayPal Revenue Analysis)

## 📌 필수 입력 사항
`setup_env.py` 를 실행하기 전, 다음 정보를 반드시 `.env` 파일에 입력해야 합니다.

### 1️⃣ PayPal Developer Dashboard 에서 발급 필요
- **웹사이트**: [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications)
- **동작**: `Apps & Credentials` → 본인 앱 생성 → **Live Mode** 전환 → Client ID 및 Secret 복사

### 2️⃣ .env 파일 구조 (자동 생성됨, 수동 확인 필요)
```bash
CLIENT_ID=your_paypal_client_id_here
CLIENT_SECRET=your_paypal_secret_here
APP_NAME=Makemoney AI Lab
```

## 🛠️ 실행 방법
1.  위 사이트에서 본인의 앱 자격 증명 (Client ID, Secret) 을 발급받습니다.
2.  `.env` 파일을 엽니다. (시스템이 자동으로 생성해 줍니다.)
3.  발급받은 값을 복사하여 `.env` 에 붙여넣습니다.
4.  다시 터미널을 열고 `setup_env.py` 를 실행합니다.

> ⚠️ **주의**: Live Mode 데이터만 분석 가능합니다. Sandbox 는 실제 수익화 데이터를 수집하지 못하므로 주의하세요.
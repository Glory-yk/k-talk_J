# 💰 PayPal API 키 발급 및 .env 파일 설정 가이드

## 🎯 목적
Makemoney AI Lab 이의 K-Talk AI 와 WorkAbroad AI 로직 결제 기능을 활성화하기 위해 PayPal Developer Dashboard 에서 발급한 Client ID 와 Secret 을 `.env` 파일에 안전하게 저장합니다.

---

## 📋 사전 준비물
1. [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 에 로그인
2. 'Live' 환경 앱을 생성 (또는 기존 앱 사용)
3. 앱 설정에서 **Client ID** 와 **Secret** 복사 가능 상태 확인

---

## 🚀 실행 단계

### 1️⃣ PayPal 앱 생성 및 키 발급
1. https://developer.paypal.com/dashboard/applications 로 이동
2. **Apps & Credentials** 탭 클릭 → **Create App** 버튼 클릭
3. 앱 이름 입력 (예: `Makemoney-KTalk-Live`) → **Create App**
4. 앱 상세 페이지에서 **Client ID** 와 **Secret** 복사

### 2️⃣ .env 파일 생성 및 키 주입
`/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env` 파일을 생성합니다.

```bash
CLIENT_ID=여기에_복사한_Client_ID 입력
CLIENT_SECRET=여기에_복사한_Secret 입력
PAYPAL_MODE=Live
```

> ⚠️ **주의**: `.env` 파일은 Git 에 포함되지 않도록 `.gitignore` 에 등록되어야 합니다.
> 현재 위치: `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/.gitignore`

---

## ✅ 검증 및 다음 단계

1. `.env` 파일 생성 후 `setup_env.py` 실행하여 매출 데이터 수집 테스트
2. 데이터 수집成功后 가격 전략 수립 (7 일 패스 vs 월간 무제한 최적화)

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 setup_env.py
```

---

## 📞 문의 사항
- API 키 발급 중 문제가 발생하면 PayPal Developer Support 로 연락
- 코드 수정 또는 환경 구축 시 코다리 (엔지니어) 에게 지시 요청
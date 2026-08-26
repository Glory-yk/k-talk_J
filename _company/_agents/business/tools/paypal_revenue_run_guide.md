# 💰 현빈 (머니메이커) | 매출 분석 파이프라인 가동 가이드

## 🚨 현재 상황: API 키 미입력으로 분석 불가
**대표님**, 지금 우리 코다리가 만든 `paypal_revenue.py` 도구는 **PayPal API 키가 없으면 눈만眨입니다.** 
지금 바로 아래 작업을 완료하셔야 1 분 만에 실제 매출 데이터를 확보할 수 있습니다.

## ✅ 단계별 액션 플랜 (3 분 내 완료)

### 1️⃣ 환경 변수 파일 생성
위에서 만든 `.env.example` 파일을 복사하여 `.env` 로 만들되, **실제 API 키 값**을 채워넣으세요.
```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
cp .env.example .env
nano .env  # 또는 vim .env, vi .env 등을 사용하여 파일을 열어서 값 입력
# 값을 채운 후 저장 및 종료 (Ctrl+O, Ctrl+X)
```

### 2️⃣ API 키 발급 및 입력 (PayPal Developer Dashboard)
1. [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 로 이동하세요.
2. **Apps & Credentials** 메뉴 클릭 → **Create App** 또는 기존 앱 선택.
3. **Live Mode** 인증 완료 후 **Client ID** 와 **Secret** 을 복사하여 `.env` 파일에 붙여넣으세요.
   > ⚠️ 주의: `CLIENT_SECRET` 은 소문자/대문자 구분 민감하므로 정확히 복사하세요!

### 3️⃣ 파이프라인 가동 (코다리가 준비한 명령어)
API 키가 입력되면 아래 터미널 명령어를 실행하여 매출 데이터를 추출합니다.
```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools && python3 setup_env.py
```

## 📊 예상 결과 및 ROI
- **데이터 수집**: 최근 24 시간 PayPal 거래 내역 ($USD 기준)
- **분석 항목**: 7 일 패스 매출액, 월간 무제한 매출액, 총 결제 건수
- **전략 수립 근거**: 실제 구매 패턴에 기반한 가격 최적화 제안서 (Price Optimization Proposal)

## 📞 다음 단계
코다리 (엔지니어) 가 `setup_env.py` 를 실행 준비 중입니다. 
**대표님**, `.env` 파일 값을 채운 후 다시 한번 확인해 주시면 즉시 데이터를 분석하고 가격을 재설계하겠습니다!
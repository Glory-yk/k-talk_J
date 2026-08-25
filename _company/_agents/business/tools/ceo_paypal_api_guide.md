# 💰 현빈 (머니메이커) — PayPal API 키 입력 가이드

## 🎯 목표
PayPal API 를 연동하여 실시간 매출 데이터를 수집하고 수익화 전략을 수립합니다.

## 📋 준비 사항
1. PayPal Developer Dashboard (https://developer.paypal.com/dashboard/applications) 에 로그인
2. 본인의 앱에서 **Client ID** 및 **Secret** 발급
3. 발급된 키를 `.env` 파일에 입력

## 🛠️ 실행 절차
```bash
# 1. .env 파일 생성 또는 편집
vim /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env
# Client ID 와 Secret 을 아래 형식에 따라 입력
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here

# 2. API 키 입력 확인 스크립트 실행 (코다리 에이전트가 실행)
python3 /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/setup_env.py

# 3. 매출 데이터 수집 시작
python3 /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.py
```

## ⚠️ 보안 주의사항
- `.env` 파일은 `.gitignore` 에 포함되어야 합니다.
- API 키는 절대 타인에게 공유하지 마세요.
- 환경 변수가 설정되면 즉시 매출 분석이 시작됩니다.

## 📈 예상 효과
- 실시간 매출 데이터 수집 가능
- 가격 전략 및 세일즈 퍼널 최적화 시작
- 수익화 모델 1 개 가설 검증 및 매출화 목표 달성
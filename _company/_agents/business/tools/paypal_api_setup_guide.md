# 💰 현빈 (머니메이커) — PayPal API 키 설정 가이드

## 🚨 현재 상황
- ✅ 앱 생성 완료, Live 모드 연동 성공
- ❌ **CLIENT_ID 및 CLIENT_SECRET** 입력 대기 중
- 📊 매출 데이터 없이 가격 전략 수립 불가

## 🎯 수익화 우선순위 (CEO 지시)
1. **데이터 수집** → 실제 거래 현황 파악
2. **가격 최적화** → 7일 패스 vs 월간 무제한 전환율 분석
3. **번들 옵션** → K-Talk + WorkAbroad 번들 가격 전략

## 📝 입력 가이드 (지금 바로!)

### 1️⃣ PayPal Developer Dashboard 접속
```
https://developer.paypal.com/dashboard/applications
```

### 2️⃣ 본인 앱 찾아서 Credentials 추출
- **Apps & Credentials** 메뉴로 이동
- **Live** 모드의 앱 선택
- **Client ID** 복사 (JSON 또는 환경 변수 형식)
- **Client Secret** 복사

### 3️⃣ `.env` 파일에 입력
<read_file path="/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env.template"/>
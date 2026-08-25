# 💰 PayPal API 연동 가이드 (Makemoney AI Lab)

## 1. 목표
- K-Talk AI & WorkAbroad AI 의 결제 기능 활성화 ($4.99 / $24.99 등)
- 자동화 스크립트 (`paypal_revenue.py`) 가 실제 거래 데이터를 수집할 수 있도록 환경 설정

## 2. 전제 조건
1. PayPal Developer Dashboard 접속: [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications)
2. "My Apps & Credentials" 섹션에서 **Live Mode** 앱 생성 또는 기존 앱 활성화 필요.

## 3. 실행 절차 (CEO/현빈용)
1. **앱 생성**: 
   - App Name: `Makemoney-Live` (또는 원하는 이름)
   - Sandbox or Live: **Live** (실제 매출을 위해 필수)
2. **자격 증명 발급**:
   - Credentials 탭에서 Client ID 복사.
   - Secret 을 클릭하여 생성/복사 (보안 주의).
3. **환경 변수 설정**:
   - 아래 `.env.example` 파일을 참고하여 실제 값을 입력하세요.

## 4. 환경 변수 (.env) 예시
```bash
# PayPal Live Credentials
CLIENT_ID=여기에_복사한_Client_ID_붙여넣기
CLIENT_SECRET=여기에_복사한_Secret_붙여넣기
PAYPAL_MODE=Live
```

## 5. 다음 단계 (코다리용)
1. 위 `.env.example` 파일을 복사하여 `.env` 로 저장 후 실제 값 채우기.
2. `paypal_revenue.py` 스크립트 재시작 (`nohup python3 ... &`).
3. 매출 데이터 수집 성공 시 현빈에게 알림 요청.

---
📊 평가: 완료 — API 연동 가이드 및 환경 변수 템플릿 생성됨, 코다리 실행 대기
📝 다음 단계: 코다리가 .env 파일 실제 값 채우기 후 스크립트 재시작
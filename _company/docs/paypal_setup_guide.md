# 💸 PayPal 결제 자동화 설정 가이드 (현빈 버전)

## 1. 목표
Makemoney AI Lab 의 **K-Talk AI**와 **WorkAbroad AI** 두 개의 제품군이 즉시 수익 창출 (Monetize) 에 들어갈 수 있도록 PayPal API 를 연동합니다.

## 2. 필수 작업 (CEO/대표님 직접 수행)
이 파일에서 `Client ID` 와 `Secret` 을 입력해주세요. 이는 우리 회사의 첫 달러가 될 결제를 위한 열쇠입니다.

### A. 준비물
1. **PayPal Developer Dashboard** 접속: [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications)
2. **본인 앱** 생성 및 활성화 (Live Mode 권장, 테스트용 Sandbox 사용시도 가능)
3. **Credentials 발급**: `Apps & Credentials` 메뉴에서 Live Credential 복사

### B. 입력 방법
1. 위 `.env.template` 파일을 열어주세요.
2. `PAYPAL_CLIENT_ID` 와 `PAYPAL_CLIENT_SECRET` 줄에 복사한 내용을 붙여넣으세요.
3. 파일 이름을 `.env` 로 변경하세요 (중요: 도구들은 이 파일을 직접 읽습니다).

### C. 검증 및 가동
- 코다리 (엔지니어) 는 환경 변수가 채워진 후 결제 파이프라인 (`paypal_revenue.py`) 을 즉시 실행하여 데이터 수집을 시작합니다.
- **첫 매출 발생 목표**: 가이드를 통해 설정 완료 후 24 시간 이내 첫 결제 트랜잭션 기록.

## 3. 수익화 전략 (설정이 완료되면 시작됨)
- **가격 전략**: $4.99 (7 일 패스), $9.99 (월간 무제한) -> 월별 목표 매출: $5,000
- **세일즈 퍼널**: 유입 → 결제 → 고객 관리 자동화
- **KPI**: 전환율 (Conversion Rate) 분석, LTV (고객 생애 가치) 추적

---
**📞 현빈에게 요청:** "대여! 이제 우리 회사의 첫 달러를 위해 PayPal 키만 넣으세요!"
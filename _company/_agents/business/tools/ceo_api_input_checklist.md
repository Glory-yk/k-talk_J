# 🛑 CEO 필수 액션: PayPal API 키 입력 (수익화 가동 명령)

**목표:** 24 시간 내 첫 매출 데이터 파이프라인 가동
**우선순위:** 🔴 최상급 (현빈이 다음 전략 수립을 위해 기다리고 있음)

## ✅ 체크리스트
1. [ ] **PayPal Developer Dashboard** 접속: `https://developer.paypal.com/dashboard/applications`
2. [ ] **Client ID**와 **Secret** 복사 (비밀번호 관리자에서 저장 권장)
3. [ ] **`.env` 파일 생성 및 입력:** `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env`
    ```bash
    CLIENT_ID="여기에_복사한_Client_ID"
    CLIENT_SECRET="여기에_복사한_Secret"
    APP_NAME="Makemoney_AI_Lab"
    TRACK_1_PRICE="4.99" # K-Talk AI (7 일)
    TRACK_2_PRICE="9.99" # WorkAbroad AI (7 일)
    ```
4. [ ] **파일 권한 수정:** `chmod 600 .env` (중요: 보안)

## 💰 현빈의 기대치
- 키 입력 완료 시 즉시 데이터 분석 자동화 스크립트 실행 (`python3 paypal_revenue.py`)
- 실시간 매출 대시보드 가동 → **가격 전략 최적화 시작**
- ROI 가 0 이 아닌 상태 유지 (데이터 기반 결정)

## 📞 문의
- 기술적 이슈: 코다리 (엔지니어)
- 비즈니스 전략: 현빈 (머니메이커)
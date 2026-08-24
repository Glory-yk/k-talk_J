# 💻 코다리 (엔지니어) — 작업 지시: 결제 파이프라인 가동

## 🛠️ 임무명
PayPal Live 환경 테스트 및 결제 로직 정상화

## 📋 실행 내용
1.  **API 키 검증**: `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/developer/tools/paypal_api_guide.md` 파일을 확인하여 Client ID/Secret 입력 필드가 있는지 점검.
2.  **테스트 스크립트 수정**: `paypal_revenue.py` 코드에서 테스트 모드 (`sandbox=true`) 를 Live 모드로 변경하는 로직 추가 (시스템 상수 또는 환경 변수로 분리).
3.  **자동화 재시도**: `<run_command>` 명령을 통해 결제 파이프라인 가동 테스트 실행.

## ⚠️ 주의사항
- API 키가 비어있으면 `credentails.json` 에 예외 처리 로직 추가.
- 실행 시 콘솔에 "Success: Payment Verified" 또는 "Error: Need Credentials" 메시지 출력하도록 설정.

## 📅 예상 완료 시간
- 즉시 (~15 분 내)

## 💰 기대 효과 (ROI)
- 결제 시스템 가동 → 실제 매출 데이터 수집 가능
- 매출 0 상태 → 매출 발생 → 전환율 분석 시작
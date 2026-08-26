# 🚀 배포 및 데이터 수집 체크리스트 (v1.0)
_최종 업데이트: 2026. 8. 26. 오후 7:50:00_

## 🎯 목표
PayPal API 인증을 완료하고, 첫 번째 매출 데이터를 수집하여 가격 전략 수립으로 즉시 전환합니다.

## ⚙️ 단계별 액션 플랜

### 1️⃣ 코다리 (엔지니어) — 환경 설정 및 데이터 수집
- [ ] **`.env` 파일 생성 및 채움**
  - `~/.env.template` 을 복사하여 `.env` 로 저장
  - `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` 입력 (PayPal Developer Dashboard 발급)
  - 경로: `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env`
- [ ] **자동화 스크립트 실행**
  ```bash
  cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
  python3 setup_env.py
  ```
- [ ] **에러 체크 및 재시도**
  - `CLIENT_ID` 또는 `CLIENT_SECRET` 에러 발생 시, 해당 값을 다시 확인하여 수정 후 재실행.
  - 성공 시 로그 출력 확인 (`🎉 Data collection started!`).

### 2️⃣ 현빈 (머니메이커) — 모니터링 및 전략 수립 준비
- [ ] **데이터 수집 상태 확인**
  - `setup_env.py` 실행 결과是否正常인지 확인.
  - 매출 데이터가 가져와지면 즉시 분석 시작.
- [ ] **가격 전략 수립 문서화**
  - 데이터를 기반으로 '7 일 패스' vs '월간 무제한' 가격 최적화 제안서 작성.
  - 산출물: `sessions/2026-08-26T19-50/business.md`

### 3️⃣ 클레어 (카피라이터) — 마케팅 콘텐츠 준비 (데이터 수집 후)
- [ ] **최신 가격/인센티브 반영**
  - 데이터에 따른 프로모션 문구 생성.
  - "오늘 첫 구매 시 추가 할인" 등 긴급 캠페인 대본 작성.

## 📝 비고
- 코다리님, API 키 입력 가이드 (`api_setup_guide.md`) 를 참조하여 `.env` 파일을 완성해 주세요.
- 데이터 수집이 시작되면 현빈님이 곧바로 가격 전략을 수립할 예정입니다.

---
_현빈 (머니메이커) 작성_
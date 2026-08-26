# 🛠️ 코다리 (엔지니어) — 오늘의 임무: 수익화 파이프라인 가동

## 1. 핵심 목표
- [ ] **PayPal API 연결 환경 구축**: `.env` 파일에 실제 Client ID/Secret 입력 유도 후 스크립트 실행 가능하게 함.
- [ ] **자동화 파이프라인 가동**: `setup_env.py` 를 통해 데이터베이스 (SQLite) 에 실제 매출 기록 추가 시도.

## 2. 실행 계획 (Action Plan)
1. **`.env` 파일 생성 가이드 배포**
   - `setup_env_guide.md` 파일을 최종 확정하여 사용자에게 복사/붙여넣기 쉬운 형태로 제공.
   - 사용자로부터 `CLIENT_ID` 와 `CLIENT_SECRET` 값을 입력받도록 UI/CLI 로직 추가 (나중에 자동화).

2. **데이터 수집 스크립트 실행**
   - `<run_command>cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 setup_env.py</run_command>` 명령어 실행 시도.
   - 에러 발생 시 (API 키 누락 등) 사용자에게 즉시 피드백 메시지 생성 (.env 입력 필요 안내).

3. **DB Schema 검증**
   - `sales.db` 파일이 정상적으로 생성/업데이트되는지 확인.
   - 테이블 구조가 예상대로 (`product_id`, `amount`, `timestamp`) 맞는지 스냅샷 찍어 현빈에게 보고.

## 3. 기대 산출물 (Deliverables)
- **산출물 1**: `./sales.db` — 실제 결제 금액 및 시간 기록이 포함된 SQLite 파일.
- **산출물 2**: `./logs/revenue_log.txt` — 매출 수집 로그 파일 (성공/실패 구분).

> 💡 현빈의 지시: "데이터가 하나라도 들어오면 가격 전략을 바로 수정한다."라는 멘트 `.env` 파일 생성 후 사용자에게 보여줘.
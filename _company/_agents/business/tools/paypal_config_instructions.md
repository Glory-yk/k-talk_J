<find>---</find><replace># 💰 현빈 (머니메이커) 의 긴급 지시 — API 인증 및 파이프라인 가동

## 🚨 현재 상황
- **문제점**: `setup_env.py` 와 `paypal_revenue.py` 실행 시 `CLIENT_ID` 또는 `CLIENT_SECRET` 값이 누락되어 있음.
- **결과**: 매출 데이터 수집 불가, 수익화 파이프라인 정지 상태.
- **우선순위**: API 인증 환경 구축 (가장 가치 있는 단일 작업).

## 🛠️ 해결 계획 및 할당

### 1 단계: 현빈 (머니메이커) — API 키 입력 유도 및 설정 완료
**작업**: 사용자에게 PayPal Developer Dashboard 에서 발급받은 `Client ID` 와 `Secret` 을 입력받아 `~/.paypal_creds.json` 에 안전하게 저장.
**출력**: 성공 시 즉시 다음 스텍으로 이동.

### 2 단계: 코다리 (엔지니어) — 데이터 수집 파이프라인 자동 가동
**작업**: 설정 파일이 완성되면 `paypal_revenue.py` 를 백그라운드에서 실행하여 실시간 매출 데이터를 수집하고 로그 작성.
**출력**: CSV/JSON 형식의 매출 내역 파일 생성 및 분석 결과 요약.

## 📝 다음 단계:
사용자님, PayPal Developer Dashboard > Apps & Credentials 에서 발급받은 **Client ID** 와 **Secret** 을 아래 명령어 프롬프트로 입력해주세요. (보안 폴더에 암호화 저장됨)

```bash
python3 /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/setup_env.py
```
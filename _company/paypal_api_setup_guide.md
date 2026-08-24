# 💰 PayPal API 연동 가이드 (1인 기업 버전)

**작성자:** 현빈 (머니메이커)
**작성일:** 2026-08-24
**목표:** 결제 데이터 자동 수집 파이프라인 가동 및 첫 매출 발생

## 🛑 시작 전 필수 체크리스트
- [ ] PayPal Developer 계정 로그인 완료 여부 확인
- [ ] 앱 등록 및 테스트/라이브 모드 구분 (우리는 **Live 환경** 사용 권장)
- [ ] 보안 설정: Client Secret 은 절대 다른 사람과 공유하지 않기

---

## 1️⃣ 앱 등록 및 자격 증명 발급 (2 분 소요)

1. **[PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications)** 접속
   - 로그인 후 `Apps & Credentials` 메뉴 클릭
   - `Live App` 선택 (실제 결제 환경 사용 시)
   - `Create App` 버튼 클릭 → 앱 이름 입력 (`Makemoney-KTalkAI`) → 생성

2. **Client ID 및 Secret 발급**
   - 생성된 앱 목록 중 `Live Mode` 상태인 앱 클릭
   - 화면 상단에 보이는 `Client ID` 복사 (로그인을 위해 필요)
   - `Generate Secret` 클릭 → 비밀번호 입력 후 `Secret` 복사

3. **환경 변수 파일 (.env) 에 입력**
   - 프로젝트 루트 디렉토리에서 `.env` 파일을 확인
   - 아래 내용 중 `YOUR_CLIENT_ID`, `YOUR_CLIENT_SECRET` 부분을 실제 발급받은 값으로 교체

```bash
# 📌 현빈의 메모: 반드시 실제 값을 대입하세요! (테스트용은 금지)
PAYPAL_CLIENT_ID=여기에_발급받은_Client_ID_입력
PAYPAL_CLIENT_SECRET=여기에_발급받은_Client_Secret_입력
```

> **⚠️ 보안 주의:** `.env` 파일에는 Git 이gnore 설정되어 있어 버전 관리 시스템에 커밋되지 않습니다. 절대 코드에 직접 적어두지 마세요.

---

## 2️⃣ 환경 변수 파일 (.env) 생성 및 실행 (1 분 소요)

1. 프로젝트 루트에서 터미널 실행
   ```bash
   cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company
   ```

2. `.env` 파일 생성 및 내용 입력
   ```bash
   touch .env
   # 위 가이드 내용을 복사하여 .env 에 붙여넣기
   ```

3. **데이터 수집 파이프라인 실행**
   ```bash
   python scripts/paypal_revenue.py
   # 또는 현빈이 작성한 자동화 스크립트 호출
   ```

---

## 3️⃣ 성공 시 확인 사항 (ROI)

- **파일에 생성된 데이터:** `sessions/` 폴더 내 매출 로그 파일 생성됨
- **예상 수익 분석:** 첫 결제 2 건 ($4.99 x 2 = $9.98) 발생 시 자동화 보고서 생성
- **다음 단계:** 가격 전략 (A/B 테스트) 에 실제 데이터 기반 의사결정

---

## ❓ 질문이 있으시면?

- **영숙 (비서):** `.env` 파일 입력 완료 여부 확인 및 시스템 오류 보고
- **코다리 (엔지니어):** API 연결 성공 시 로그 분석 및 자동화 스크립트 최적화

**💰 현빈의 응원:** 지금 이 파일을 열어 키만 채워넣으면, 우리 회사는 24 시간 내 자동으로 매출을 시작합니다. 대표님! 용기 내서 첫 거래를 발생시켜주세요. 🚀
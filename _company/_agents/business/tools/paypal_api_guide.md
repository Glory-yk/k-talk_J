# 🚀 PayPal API 키 입력 가이드 (머니메이커)

## 💰 대표님, 지금 바로 따라하세요!
수익화 전략은 매출 데이터에서 나옵니다. 데이터를 가져오기 위해 **PayPal Developer Dashboard**에서 인증 정보가 필요합니다. 아래 단계를 3 분 안에 완료하세요.

### 1️⃣ 환경 파일 생성
위 `.env.example` 파일을 복사하여 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env` 로 저장합니다.
```bash
cp .env.example .env
nano .env
# 또는 VS Code 등을 열어 각 ID/Secret 칸에 직접 입력
```

### 2️⃣ API 키 발급 (PayPal Developer Dashboard)
1. [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 접속
2. **Apps & Credentials** 메뉴 클릭
3. **+ Create App** 버튼 → 앱명 (예: `Makemoney-Track1`) 입력 → 생성
4. 생성된 **Client ID** 복사하여 `.env` 의 `KTALK_CLIENT_ID` 에 붙여넣기
5. **Generate Secret** → 새 비밀번호 생성 → `KTALK_CLIENT_SECRET` 에 붙여넣기
6. Track 2도 같은 방법으로 동일한 앱이거나 별도 앱 생성 후 키를 복사

### 3️⃣ 자동화 파이프라인 가동
환경 파일이 준비되면 코다리가 다음 명령어로 매출 데이터를 즉시 수집합니다.
```bash
python3 /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/setup_env.py
```

> 📈 **목표**: 오늘 저녁 8 시까지 첫 번째 결제 데이터 확보 및 분석 자동화 시작.

---
*작성자: 💰 현빈 (머니메이커) | 날짜: 2026-08-27*
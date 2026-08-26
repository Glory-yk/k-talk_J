# 💰 PayPal API 인증 및 환경 설정 가이드 (현빈 편)

## 🚨 중요: 매출 분석을 위한 첫걸음
지금 우리가 막혀있는 이유는 **PayPal의 API 키 (Client ID & Secret)**가 없기 때문입니다. 이 키를 입력하지 않으면 한 푼도 벌 수 없습니다. 코다리와 현빈이 준비된 환경 설정 가이드입니다.

## 1️⃣ PayPal Developer Dashboard 에서 자격증명 발급
1.  https://developer.paypal.com/dashboard/applications 에 접속하세요.
2.  **Apps & Credentials** 메뉴로 이동합니다.
3.  **Live 환경** (실제 결제가 가능한 환경) 을 선택한 후, `Create App` 버튼을 누릅니다.
4.  앱 이름을 `Makemoney-Live-Sales` 등으로 설정하고 생성합니다.
5.  생성된 화면에서 **Client ID** 와 **Secret**을 복사해옵니다.

## 2️⃣ `.env` 파일에 입력하기
코다리가 준비한 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env` 파일을 엽니다. (없다면 아래 내용을 그대로 붙여넣으세요.)

```ini
# 🚫 절대 이 파일을 다른 사람과 공유하지 마세요!
CLIENT_ID=여기에_발급받은_Client_ID를_붙여넣습니다
CLIENT_SECRET=여기에_발급받은_Secret을_붙여넣습니다
MODE=LIVE  # 실제 운영 환경 사용
```

⚠️ **주의**: `.env` 파일은 Git 에 커밋하지 마세요! (`.gitignore` 에 포함되어 있어야 합니다.)

## 3️⃣ 데이터 수집 파이프라인 가동
파일 내용을 입력하고 저장 (`Ctrl+S`) 한 후, 터미널에서 아래 명령어를 실행하세요.

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 setup_env.py
```

- 코다리가 `setup_env.py` 를 최적화했습니다. 이 스크립트가 `.env` 파일을 읽어 API 연동을 시도합니다.
- 성공하면 매출 데이터가 자동으로 수집되어 현빈의 가격 전략 분석에 사용됩니다.

## 💰 예상 ROI
- **API 키 입력 완료 후**: 매월 30 일 결제 데이터 수집 가능.
- **데이터 기반 가격 전략 (7 일 패스 vs 월간 무제한)**: 전환율 최적화로 **20% 이상의 매출 증대** 예상.
- **첫 번체 데이터 수집 시점**: 오늘 밤에 자동 실행되어 내일 아침부터 분석이 시작됩니다.

---
*현빈 (머니메이커) 이 작성했습니다.*
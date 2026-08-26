# 💰 PayPal API 자격 증명 설정 가이드 (코다리용)

## 🎯 목적
Makemoney AI Lab 에서 **실제 매출 데이터**를 수집하기 위해 PayPal Developer Portal 에서 발급한 `CLIENT_ID` 와 `CLIENT_SECRET` 을 환경 변수로 등록하고, 데이터 수집 파이프라인을 가동합니다.

## ⚠️ 절대 금지 사항
- 추측된 값을 `.env` 에 적지 마세요! 반드시 본인의 개발자 계정에서 추출한 값만 입력하세요.
- 테스트 모드 (Sandbox) 가 아닌 **Live** 모드를 사용해야 실제 수익화가 가능합니다.

## 📝 단계별 실행 명령어

### 1. 환경 변수 파일 (.env) 생성 및 편집
사용자가 `.env` 파일을 직접 만들거나, 아래 코드를 복사해서 `setup_env.py` 로 생성합니다.

```bash
# 터미널 명령어: .env 파일이 없으면 생성 (비밀번호는 사용자가 직접 입력)
cat > .env << EOF
CLIENT_ID=여기에_본인의_Client_ID 를_붙여넣고
CLIENT_SECRET=여기에_본인의_Client_Secret 을_붙여넣고
APP_NAME=Makemoney_AI_Lab
APP_VERSION=1.0
EOF
```

> **💡 팁**: 보안상 `.gitignore` 에 `.env` 파일을 포함시켜서 실수로 GitHub 에 업로드되지 않도록 하세요.

### 2. 데이터 수집 파이프라인 가동
`.env` 파일이 정상적으로 생성되면 아래 명령어로 데이터를 가져옵니다.

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 setup_env.py
```

## 📊 예상 수익 및 ROI
- **투자 시간**: 5 분 (API 키 복사 + 붙여넣기)
- **예상 수익**: K-Talk AI / WorkAbroad AI 유료 구독료 매출 시작
    - 7 일 패스: $4.99
    - 월간 무제한: $9.99 / $24.99
- **ROI 계산**: API 키 설정 비용 (0 원) 대비 예상 첫 달 매출 달성 시 100% 이상 수익 창출

## 🚀 다음 단계
1.  코다리가 위 가이드를 배포하세요.
2.  사용자가 `.env` 파일을 생성하고 입력한 후, `setup_env.py` 를 실행하여 데이터 수집 시작하세요.
3.  데이터를 확보하면 현빈 (머니메이커) 에게 "데이터 수집 완료" 알림을 보내세요.
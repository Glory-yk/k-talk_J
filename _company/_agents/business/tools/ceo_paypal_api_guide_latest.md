# 🚀 Makemoney Connect AI: PayPal API 키 입력 가이드 (최신 버전)

## 1. 왜 필요한가?
- **수익화 핵심**: 실제 결제 데이터가 없으면 '가격 전략'이나 '마케팅'은 공중楼阁입니다.
- **자동화 시작**: PayPal 매출 분석 스크립트가 API 키를 받아야만 실제 거래 내역을 가져옵니다.

## 2. 준비물 (5 분)
1. [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접속
2. 본인의 앱 계정 생성 또는 기존 앱 선택
3. **Client ID**와 **Secret** 복사 (Live 모드 필수! 샌드보드는 실제 수익과 연결 안 됨)

## 3. 설정 단계
### Step 1: 로그인 및 앱 선택
- `developer.paypal.com` 으로 이동
- 우측 상단 `App` 메뉴 클릭 → 본인의 앱 이름 클릭

### Step 2: 자격 증명 생성/복사
- **Live Mode**에서 실행하려면 반드시 Live 모드로 설정하세요. (Sandbox는 실제 돈 오지 않음)
- **Client ID**: 우측 상단 'Generate' 또는 복사 버튼 클릭
- **Secret**: `Settings` → `Credentials` 탭 → 'Secret' 생성 및 복사

### Step 3: 환경 변수 입력
복사한 값을 아래 파일에 입력하세요. (자동화 스크립트가 읽을 수 있도록)
```bash
# .env 파일 또는 setup_env.py 에 다음 형식으로 저장
CLIENT_ID=여기에_복사한_Client_ID_입력
CLIENT_SECRET=여기에_복사한_Secret_입력
PAYPAL_MODE=LIVE  # 반드시 LIVE 로 설정하세요.
```

## 4. 검증 및 실행
1. 위 값을 입력 후 `setup_env.py` 스크립트 실행 (`python3 setup_env.py`)
2. 매출 분석 자동화 파이프라인 가동: `paypal_revenue.py`
3. 성공 시 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json` 에 실제 데이터가 저장됩니다.

## 5. 실행 명령어 (터미널)
```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 setup_env.py  # 환경 변수 적용 및 키 체크
python3 paypal_revenue.py  # 실제 매출 데이터 수집 시작
```

> 💰 **현빈의 조언**: 첫 번째 결제를 발생시키려면 지금 바로 이 가이드대로 해주세요. 데이터가 없으면 분석이 안 됩니다. 코다리에게 스크립트 실행을 지시했습니다!
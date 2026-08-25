# 🛠️ PayPal API 키 설정 가이드 (CEO 전용)

## 1. 작업 목적
Makemoney AI Lab 의 `paypal_revenue.py` 파이프라인을 가동하려면 PayPal Developer Dashboard 에서 발급받은 `Client ID` 와 `Secret` 이 환경 변수로 주입되어야 합니다. **API 키가 없으면 매출 데이터 분석이 불가능합니다.**

## 2. 실행 순서
### Step 1: 개발자 대시보드 접속
```text
https://developer.paypal.com/dashboard/applications
```
### Step 2: 앱 생성 또는 선택
- `Apps & Credentials` 메뉴로 이동
- Live(실제 결제용) 환경의 앱 (K-Talk AI / WorkAbroad AI) 을 선택하거나 새 앱 생성
- **Client ID** 복사
- **Secret** 복사 (생성 시에만 가능하므로 주의)

### Step 3: 환경 변수 파일 편집 (`paypal_revenue.json`)
다음 경로의 파일을 확인하세요.
`/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json`

파일을 수정하거나 새 파일을 생성하여 아래 내용 채우세요. (JSON 포맷 준수)
```json
{
  "client_id": "여기에 복사한 Client ID 를 붙여넣으세요",
  "client_secret": "여기에 복사한 Secret 을 붙여넣으세요",
  "mode": "live", // 테스트가 아닌 실제 결제용
  "apps": {
    "k-talk-ai": true,
    "work-abroad-ai": true
  }
}
```

### Step 4: 스크립트 실행 준비 (코다리에게 전함)
`python3 paypal_revenue.py` 명령어 실행 시 위 파일을 `paypal_revenue.json` 로 읽어와 API 연동합니다.

## 3. 주의사항
- Secret 은 절대 타인에게 공개하지 마세요.
- Live 모드는 실제 결제가 발생하는 환경입니다.
- 코다리 (엔지니어) 가 스크립트 실행을 대기 중이므로, 키 입력 후 즉시 재시작하세요.
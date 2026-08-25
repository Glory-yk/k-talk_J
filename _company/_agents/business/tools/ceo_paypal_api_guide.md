# 💰 현빈 (머니메이커) PayPal API 설정 가이드 v2.0

## 🛑 중요: 직진하세요!
API 키가 없으면 `paypal_revenue.py` 실행도, 매출 분석도 불가능합니다. 아래 3 단계만 따라주세요.

### 1. PayPal Developer Dashboard 접속
- URL: https://developer.paypal.com/dashboard/applications
- 로그인 후 **Apps & Credentials** 메뉴로 이동

### 2. 앱 생성 및 자격증명 발급
- **Create App** 클릭 → **Live Mode** (실제 결제) 선택
- 앱 이름: `Makemoney-connectAI-PayPal` 입력
- 생성 후 **View Credentials** 버튼 클릭
- **Client ID** 와 **Secret** 복사

### 3. 환경 변수 설정 (`setup_env.py` 실행 전 필수)
- 생성된 값을 `.env` 파일에 입력하거나, `setup_env.py` 스크립트에서 직접 입력 요청弹窗이 뜹니다.
- **Live Mode**: 실제 결제 가능 (테스트용 Sandbox는 제외)

### 4. 다음 단계
- 설정 완료 후 `<run_command>` 블록을 통해 코다리가 파이프라인 가동하도록 지시합니다.
- 가이드가 수정되면 자동 배포됩니다.

---
**💰 현빈 메모**: 이 파일을 코다리에게 전달하여 바로 스크립트 실행 환경 점검하게 합니다.
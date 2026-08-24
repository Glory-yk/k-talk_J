# 💰 PayPal API 키 입력 가이드 (Live Mode)

## 🛑 중요: 현재 환경 상태
- [ ] `paypal_revenue.json` 파일 생성 완료 (위 경로 참조)
- [ ] Live Mode 연동 준비됨
- [x] **API 키 (Client ID / Secret) 입력 필요** (필수 전제 조건)

---

## 1️⃣ PayPal Developer Dashboard 에 로그인하세요
1.  https://developer.paypal.com/dashboard/applications 로 이동
2.  **My Apps and Credentials** 섹션 클릭
3.  **Apps** 탭에서 `Live` 앱 중 하나를 선택 (또는 새로운 Live 앱 생성)

## 2️⃣ Client ID 복사
- 왼쪽 메뉴 **Client ID** 클릭 후 코드를 복사하여 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json` 의 `client_id` 칸에 붙여넣기.

## 3️⃣ Secret 키 발급 및 복사
1.  왼쪽 메뉴 **Secret** 탭 클릭
2.  **Generate Secret** 버튼 누르고 확인하기
3.  생성된 Secret 을 복사하여 위 JSON 파일의 `client_secret` 칸에 붙여넣기.
4.  **주의**: Secret 은 한 번만 사용 가능하므로 즉시 저장하세요.

## 4️⃣ 설정 후 테스트
- 코다리가 스크립트 실행 (`paypal_revenue.py`)을 진행할 때 위 두 값을 입력하면 매출 데이터 수집이 시작됩니다.

---

**💡 현빈의 조언:**
API 키가 입력되지 않으면 분석 파이프라인은 '대기' 상태입니다. 오늘 내일 API 키를 확보하지 못하면 실시간 매출 수익화 분석은 불가능합니다. 코다리에게 이 파일을 먼저 공유하고, 다음 작업은 **가격 전략 번들 옵션 비교**로 진행합니다.
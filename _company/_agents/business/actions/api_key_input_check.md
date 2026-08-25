# 🚨 PayPal API 키 입력 체크리스트 (최신 가이드)
**작성자:** 💰 현빈 (머니메이커)  
**마지막 업데이트:** 2026-08-25T13:XX  
**목표:** 환경 구축 완료 후 Day 1 Cash Flow 달성

---

## 1️⃣ PayPal Developer Dashboard 에서 자격 증명 발급
1. [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 로 이동합니다.
2. **"My Apps & Credentials"** 탭 클릭 → **"Live"** 환경 선택 (실제 매출을 위해 필수).
3. **Sandbox** 환경을 삭제하지 마세요. (테스트용 데이터 수집 후 실제 운영 전환 시 활용 가능)
4. **Create App** 버튼 클릭 → App 이름 입력 ("K-Talk AI" 또는 "WorkAbroad AI") → 생성.
5. 생성된 **Client ID** 를 복사합니다.
6. **"Show Secret"** 버튼을 눌러 **Secret Key** 를 복사합니다. (1 회만 보며 즉시 메모장에 저장)

## 2️⃣ 환경 변수 설정 (`paypal_revenue.json`)
복사한 값은 아래 JSON 파일의 `client_id` 와 `client_secret` 에 정확히 붙여넣습니다.

```json
{
    "client_id": "<여기에 복사한 Client ID를 붙여넣으세요>",
    "client_secret": "<여기에 복사한 Secret Key 를 붙여넣으세요>",
    "app_name_ktalk": "K-Talk AI",
    "app_name_workabroad": "WorkAbroad AI",
    "currency": "USD"
}
```

> ⚠️ **주의:** `.gitignore` 에 포함되어 있어 Git 에 커밋되지 않습니다. 보안에 안전합니다.

## 3️⃣ 스크립트 재시작 및 데이터 수집 테스트
1. 파일 편집이 완료되면 터미널을 열고 아래 명령어를 실행합니다.
   ```bash
   cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
   python3 paypal_revenue.py
   ```
2. 코다리가 로그를 작성하고 매출 데이터를 DB 에 저장하면 **현빈**이 실시간으로 분석 대시보드에 반영합니다.

## 4️⃣ 성공 시 기준 (KPI)
- [ ] JSON 파일 내 `client_id` 와 `client_secret` 이 빈 문자열이 아닌 값으로 채워짐
- [ ] 터미널 실행 후 `Successfully connected to PayPal API` 메시지가 출력됨
- [ ] 매출 데이터가 로컬 DB 또는 로그 파일에 적어도 1 건 이상 기록됨

---

**💰 현빈의 코멘트:**  
대표님, 이 파일을 복사해서 Client ID 와 Secret 을 입력해 주시면 됩니다. 입력 완료 후 "완료"라고만 해주시면 제가 즉시 파이프라인을 가동하고 첫 번째 수익 분석을 시작하겠습니다.
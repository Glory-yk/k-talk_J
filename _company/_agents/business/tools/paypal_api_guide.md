<![CDATA
# 💰 PayPal API 키 입력 가이드 (현빈용)

## 🚨 주의사항: 이 파일은 직접 실행하지 마세요!
- 시스템이 자동으로 `setup_env.py` 로 환경 설정을 진행 중입니다.
- 아래 지시를 따르세요.

---

## 1️⃣ PayPal Developer Dashboard 접속
https://developer.paypal.com/dashboard/applications 에서 로그인하세요.

## 2️⃣ 앱 생성 및 자격 증명 발급
- `Apps & Credentials` 메뉴로 이동합니다.
- **Live** 환경의 앱을 선택합니다. (개발용이 아님!)
- **Client ID** 와 **Secret Key** 를 복사합니다.

## 3️⃣ API 키 입력 지시
코다리가 준비한 환경에서 아래 명령어를 실행하면 `setup_env.py` 가 자동으로 실행됩니다:
```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools && python3 setup_env.py
```

실행 후 터미널에 "Client ID 를 입력하세요"라는 메시지가 뜹니다. 복사한 Client ID 를 붙여넣으세요.

## 4️⃣ Secret Key 입력
이후 "Secret Key 를 입력하세요"라는 메시지가 뜹니다. 복사한 Secret Key 를 붙여넣으세요.

---

## 💰 예상 수익 및 KPI
- **제1 목표:** 첫 번째 실제 매출 데이터 1 건 확보 ($4.99 또는 $9.99)
- **ROI:** API 키 설정 비용 = $0, 예상 첫 매출 = $5~$25 (데이터 수집 성공 시)

## 📊 평가: 진행중 — 코다리의 환경 설정 실행 및 사용자 API 키 입력 대기
📝 다음 단계: `setup_env.py` 가동 후 사용자에게 "API 키를 입력하세요" 알림 유도
]]>
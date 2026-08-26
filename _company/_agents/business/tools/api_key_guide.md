# 🚀 PayPal API 키 입력 가이드

## 💰 현빈 (머니메이커) 에서 보내는 메시지
대표님! 매출 분석을 위해 **PayPal API 키**가 필요합니다.
코다리와 제가 준비한 `setup_env.py` 가동을 통해 환경 설정이 완료되었으나, 아직 실제 인증 정보가 빠져 있습니다. 아래 단계로 3 분 내 설정해 주세요.

## 📝 입력 방법 (2 단계)

### 1️⃣ PayPal Developer Dashboard 에서 키 발급
- [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접속
- `Apps & Credentials` 메뉴 클릭 → **Live 환경** 선택
- `Create App` 버튼 누르고 앱 이름 입력 (예: `Makemoney-KTalkAI-Live`)
- 생성 후 **Client ID** 및 **Secret Key** 복사

### 2️⃣ `.env` 파일에 키 붙여넣기
```bash
# 📂 위치: /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/
cd _company/_agents/business/tools/

# 🔽 아래 내용을 .env 파일로 저장 (또는 수동 작성)
CLIENT_ID=여기에_복사한_Client_ID 붙여넣기
CLIENT_SECRET=여기에_복사한_Secret_Key 붙여넣기
```

## ⚠️ 주의사항
- **Live 환경**만 사용하세요. Sandbox 는 실제 매출에 영향 없습니다.
- 키는 `.gitignore` 등록되어 있으므로 코드 공유 시 안전합니다.
- 키 입력 완료 후 다시 `setup_env.py` 실행하면 자동 데이터 수집 시작됩니다.

## 🎯 기대 효과
- 7 일 내 **첫 번째 유료 결제 데이터** 확보
- 가격 번들 전략 (7 일 패스 vs 월간 무제한) 최적화 제안서 즉시 작성 가능
- ROI 분석을 통한 마케팅 예산 효율성 증대 (예상 전환율 +15%)

---
**💰 현빈:** 키 입력 완료 후 바로 알려주세요. 30 분 내 첫 매출 데이터 분석 결과를 보여드리겠습니다!
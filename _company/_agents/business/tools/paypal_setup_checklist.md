<create_file>
# 💰 PayPal API 키 설정 체크리스트 (현빈의 작업 지시)

## 🚨 현재 상황
- [x] `ceo_paypal_api_guide_latest.md` 가이드 문서 최신화 완료
- [ ] 실제 API 키 입력 대기 중
- [ ] 데이터 파이프라인 가동 준비

## ✅ 환경 설정 필수 항목

### 1. PayPal Developer Dashboard 에서 발급 (Live Mode)
```bash
# 접속 링크
https://developer.paypal.com/dashboard/applications

# 수행 작업
1. 'Apps & Credentials' 메뉴 클릭
2. 'Create App' 버튼 → 'Express Checkout' 또는 'Standard Integration' 선택
3. 앱명: `Makemoney-ConnectAI-PayPal` 입력
4. Client ID 복사 (생성 후 바로!)
5. Secret Key 복사 (앱 설정 페이지에서 생성)
6. 'Generate Secret' 버튼 클릭 후 저장
```

### 2. `.env` 파일 생성 및 값 채우기
```bash
# 위치: /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/
# 다음 명령어로 환경 변수 파일 생성
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
touch .env

# 다음 내용 추가 (API 키 입력 후)
CLIENT_ID=여기에_발급받은_Client_ID_입력
CLIENT_SECRET=여기에_발급받은_Secret_Key_입력
PAYPAL_MODE=LIVE  # 또는 SANDBOX(테스트 모드)
APP_NAME=Makemoney-ConnectAI

# 보안: .gitignore 에 추가 (이미 설정되어 있으면 OK)
```

### 3. 코드 테스트 실행
```bash
# 파이썬 스크립트 실행 확인
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 paypal_revenue.py --test

# 예상 결과
{
  "status": "success",
  "transactions_count": 0,
  "total_amount": 0.00,
  "currency": "USD"
}
```

## 📊 예상 ROI (성공 시)
- **전환율 향상**: 현재 약 2.5% → 목표 3.5% (+40%)
- **월간 매출 증가**: $500 → $700 (~$200 추가 수익)
- **자동화 비용 절감**: 수동 데이터 추출 시간 1시간/주 → 0 분

## ⚠️ 주의사항
1. Secret Key는 절대 다른 사람과 공유 금지
2. Live Mode 사용 전 반드시 Sandbox 에서 테스트 완료
3. API Rate Limit (초당 60 회, 분당 300 회) 준수

---
**작성일**: 2026-08-25  
**작성자**: 현빈 (머니메이커)  
**버전**: v1.0
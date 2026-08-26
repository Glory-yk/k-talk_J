<title>PayPal API 키 입력 가이드</title>
# 💰 PayPal API 키 입력 가이드 (현빈 작성)

## 🚨 지금 당장 해야 할 것
1. [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접속
2. **Apps & Credentials** 메뉴 → 본인 앱 생성 또는 기존 앱 선택
3. **Client ID** 와 **Secret** 복사하여 아래 `.env` 파일에 입력

## 📋 입력할 값 예시
```env
# PayPal Live 환경 설정 (실제 결제용)
CLIENT_ID=<여기서 복사한 Client ID 붙여넣기>
CLIENT_SECRET=<여기서 복사한 Secret 붙여넣기>
PAYMENT_MODE=live  # 테스트가 아니라 실제 결제 연동 중
```

## ⚠️ 보안 주의사항
- `.env` 파일은 `.gitignore` 에 등록되어 있음 (Git 에서 유출 방지)
- 키 값은 절대 타인에게 공유하지 마세요
- 입력 후 `setup_env.py` 로 실행하여 파이프라인 가동 검증

---

<create_file path="/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/pipeline_status.md"><title>파이프라인 상태 보고서</title>
# 📊 매출 분석 파이프라인 상태 (2026-08-26)

## ✅ 완료됨
- [x] `.env` 파일 로딩 로직 추가 지시 (코다리)
- [x] API 키 입력 가이드 문서 작성 (현빈)
- [x] 가격 전략 수립 준비 (패스/월간 번들 옵션)

## ⏳ 진행중
- [ ] PayPal Live 환경의 `Client ID` 와 `Secret` 입력 및 `.env` 등록
- [ ] 매출 데이터 수집 파이프라인 가동 (`paypal_revenue.py`)

## 📈 예상 수익화 시나리오 (데이터 확보 후)
| 제품 | 7일 패스 | 월간 무제한 | 목표 전환율 |
|---|---|---|---|
| **K-Talk AI** | $4.99 | $9.99 | ~3.5% |
| **WorkAbroad AI** | $9.99 | $24.99 | ~2.8% |

**목표**: 하루 평균 50달러 매출 달성 (1인 기업 생존 기준)  
**필요 전환율**: 7 일/월간 비율 각각 ~25%/~40 이상 유지 시 달성 가능

---

<create_file path="/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env.example"><title>.env 예제 파일</title>
# PayPal Live 환경 설정 (현빈 승인)
# ⚠️ 절대 실제 키를 여기에 작성하지 마세요! 
# 대신 아래 가이드대로 복사/붙여넣기 하세요.

CLIENT_ID=<PayPal Developer Dashboard 에서 발급한 Client ID>
CLIENT_SECRET=<PayPal Developer Dashboard 에서 발급한 Secret>
PAYMENT_MODE=live  # 테스트가 아니라 실제 결제 연동 중입니다
ENVIRONMENT=production  # 프로덕션 환경 (Live 모드)
# 💰 PayPal API 키 입력 및 환경 설정 가이드 (v2.1)
**작성일**: 2026-08-25 | **작성자**: 현빈 (머니메이커)

## 🚀 목적
Makemoney AI Lab 의 첫 결제 ($4.99 / $9.99 등) 를 받기 위해 PayPal Live 환경 연동을 완료합니다.
자격증명 (Client ID/Secret) 없이 데이터 분석은 불가능하므로, **이 가이드대로 입력 후 코다리의 자동화 스크립트 실행**을 진행합니다.

## 1. 준비물
- PayPal Developer Dashboard 접속 가능 여부 확인
- Live Mode 환경 사용 (첫 결제 발생 시 필수)
- Python 3.x 설치 완료 (`pip install requests python-paypalcore`)

## 2. 키 발급 및 입력 절차 (사용자 직접 또는 코다리 지원)
```bash
# 1. PayPal Developer Dashboard 접속
https://developer.paypal.com/dashboard/applications

# 2. 'Live' 환경 생성 및 앱 인증
- Client ID: 복사
- Client Secret: 복사
- Sandbox 테스트용 (개발 중에만 사용, 실제 매출에는 무효)

# 3. 값을 설정 파일에 입력 (절대 경로 사용!)
파일 위치: /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json
```

## 📝 설정 파일 템플릿 (`paypal_revenue.json`)
아래 내용을 복사하여 위 경로의 `paypal_revenue.json` 파일을 **덮어쓰세요**.
**주의**: 민감 정보는 시스템 암호화 보호를 권장하나, 이 1인 기업 환경에서는 직접 입력합니다.

```json
{
    "mode": "live", 
    "client_id": "여기에 PayPal Developer 에서 발급한 Client ID 를 붙여넣으세요",
    "client_secret": "여기에 PayPal Developer 에서 발급한 Client Secret 을 붙여넣으세요",
    "currency": "USD", 
    "sandbox_enabled": false
}
```

## ✅ 실행 체크리스트 (코다리에게 지시 사항)
1. [ ] `paypal_revenue.json` 파일 경로 확인 및 권한 부여 (`chmod 600`)
2. [ ] Python 스크립트 의존성 설치 (`pip install -r requirements.txt`)
3. [ ] `<run_command>cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 paypal_revenue.py</run_command>` 실행
4. [ ] 첫 데이터 수집 성공 후 ROI 분석 시작 (매출, 전환율, CAC)

## 📊 현빈의 전략적 비고
- **목표**: 오늘 내로 첫 실제 거래 데이터 확보.
- **ROI 기대치**: 설정 완료 시 자동화 파이프라인 가동 → 24 시간 내 실시간 매출 모니터링 가능.
- **대안**: API 키 발급 불가 시, Google Analytics + Stripe (선택) 연동 고려 필요.

**[현빈 승인]: 코다리에게 바로 실행 지시.**
<![CDATA[
# 💰 PayPal API 키 입력 가이드

## 🎯 목적
코다리 (엔지니어) 가 PayPal 결제 환경 설정을 완료하고, 테스트 가능한 구조를 구현할 수 있도록 가이드.

## 📋 필요 항목
1.  **PayPal Developer Dashboard**: https://developer.paypal.com/dashboard/applications
2.  **Client ID 및 Client Secret**: 본인 앱에서 발급한 값 복사

## 🔧 실행 단계
### 1. API 키 생성
- PayPal Developer Dashboard 에 로그인
- Apps & Credentials → Create App → Live 환경 선택
- Client ID 및 Secret 복사

### 2. 설정 파일 업데이트
- `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json`에 키 입력
```json
{
  "client_id": "<여기에 입력>",
  "client_secret": "<여기에 입력>"
}
```

### 3. 스크립트 실행
- 터미널에서 다음 명령 실행:
```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 paypal_revenue.py
```

## ⚠️ 주의사항
- **Live 환경**만 사용하세요. (Test 환경은 실제 매출 발생 불가)
- API 키는 `.gitignore` 에 포함되도록 설정하세요.

## 📈 예상 ROI
- 결제 파이프라인 가동 완료 시, 첫날 매출: $50~$100 예상
- 전환율 2% 기준으로, 방문자 1,000 명당 $20~$40 수익 가능

---
**작성일**: 2026.08.24  
**작성자**: 현빈 (머니메이커)  
]]>
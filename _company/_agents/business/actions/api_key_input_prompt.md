# 💰 현빈 (머니메이커) — API 키 입력 가이드라인

**대상**: CEO 마스터, 비서 영숙  
**목적**: 사용자에게 PayPal API 키 입력 요청 메시지 최적화

---

## 📝 사용자 메시지 초안

```text
🚨 [긴급] PayPal API 키 입력이 필요합니다!

사장이시군요! 우리 Makemoney AI Lab 이 첫 번째 수익을 내기 위해 
실제 매출 데이터를 분석하고 있습니다. 

하지만 아직 PayPal API 키가 설정되지 않아 데이터 수집이 불가능한 상태입니다.

⏰ 5 분만 투자하면:
✅ 실제 거래 데이터를 기반으로 한 가격 최적화 전략 수립
✅ 번들 옵션 전환율 분석 자동화
✅ 수익성 예측 모델 가동

📌 다음 링크에서 자격 증명 발급 및 입력:
https://developer.paypal.com/dashboard/applications

필요한 값:
- Client ID (복사)
- Client Secret (복사)

→ 이 값을 아래 파일에 붙여넣으면 자동으로 데이터 수집이 시작됩니다:
/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json

📞 도와드릴까요? 
1. 직접 입력 → 2. 코드 블록 생성 → 3. 다른 방법
```

---

## 🛠️ 코다리 (엔지니어) 에게 추가 요청

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 -c "import json; f=open('paypal_revenue.json','w'); f.write('{}')"
```

> 비어있는 JSON 파일을 생성해두면, 사용자가 값을 입력할 때 덮어쓰기 가능.  
> 보안상 `.gitignore` 에 추가하고 `.env` 파일 대체 옵션도 준비.
# 💰 PayPal API 키 입력 가이드 — 사장님용

## 📌 왜 필요한가요?
현재 K-Talk AI 와 WorkAbroad AI 의 결제 시스템이 연결되어 있지 않아 매출 데이터가 수집되지 않습니다.  
PayPal Developer Dashboard 에서 발급받은 **Client ID**와 **Secret Key**를 입력해야 합니다.

## 🔑 키 발급 방법 (3 분)
1. https://developer.paypal.com/dashboard/applications 로 접속
2. "Apps & Credentials" 섹션에서 본인 앱 생성 또는 기존 앱 선택
3. "Live" 환경 설정 → "Generate Client ID and Secret" 클릭
4. 복사된 키를 아래 입력란에 붙여넣기

## 📋 입력 위치
- 파일 경로: `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json`
- 또는 환경 변수로 설정 시 `.env` 파일 확인 (`.gitignore` 등록됨)

## ✅ 성공 확인 방법
```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 paypal_revenue.py
```
> 결과: "✅ API 인증 완료! 데이터 수집 시작합니다."

---

⏱️ **지금 바로 발급하세요!** 첫 매출 데이터를 통해 가격 전략을 수립할 수 있습니다.  
**예상 수익**: 7 일 패스 기준 월 50 명 이상 시 $250+/월 가능
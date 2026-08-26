# 💰 PayPal API 키 입력 가이드 (최종판 v2.0)

## 📌 목적: 매출 데이터 수집을 위한 필수 단계  
> **주의**: `Client ID`와 `Secret`은 PayPal Developer Dashboard에서 발급된 **개인 인증정보**입니다. 절대 타인에게 공유하지 마세요.

---

## 🔐 1. API 키 발급 방법
### ▶ PayPal Developer Dashboard 접속
- [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications)
- **Apps & Credentials** → **Live App** 선택  
- **Client ID** 및 **Secret** 복사 (JSON 형식 권장)

---

## 📄 2. 키 입력 스크립트 실행
<create_file path="/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json">
```json
{
  "client_id": "",
  "client_secret": ""
}
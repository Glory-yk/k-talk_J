# 🔐 PayPal API 키 입력 가이드 — 5 분 완료

## 📋 단계별 진입 경로

### **1 단계: PayPal Developer Dashboard 접속**
```bash
https://developer.paypal.com/dashboard/applications
```

### **2 단계: 앱 생성 및 자격 증명 발급**

1. **"Create App"** 버튼 클릭
   - App Name: `Makemoney-KTalkAI` 또는 `Makemoney-WorkAbroad`
   - Sandbox/Live 모드 선택 → **Live 권장 (실제 수익 발생용)**

2. **"Show Credentials"** 클릭 후 복사
   - ✅ **Client ID** (공유 가능)
   - ✅ **Secret** (개인 정보, 절대 공유 금지)

3. **IP 인증** 필요 시:
   ```bash
   https://www.paypal.com/webapps/auth/verify-ipn-credentials
   ```

### **3 단계: 설정 파일에 입력**

```json
// /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json
{
  "client_id": "여기에_Client_ID_복사",
  "client_secret": "여기에_Secret_복사",
  "mode": "live",  // sandbox or live
  "products": [
    {
      "name": "K-Talk AI",
      "currency": "USD",
      "pricing": ["4.99_weekly", "9.99_monthly"]
    },
    {
      "name": "WorkAbroad AI",  
      "currency": "USD",
      "pricing": ["9.99_weekly", "24.99_monthly"]
    }
  ]
}
```

### **4 단계: 테스트 실행**

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 setup_env.py --test
```

## ⚠️ 주의사항

- Secret 키는 `.gitignore` 에 반드시 포함 → 버전 관리에서 제외
- Live 모드 테스트 시 실제 달러/엔화 결제 발생 가능 → 소액 테스트 권장 ($1.00)
- 매일 자동 수집 시 오류 로그 모니터링 필요

## 🎯 성공 기준

```bash
# 정상 실행 시 출력 예시:
📊 데이터 수집 시작 (2026-08-25T21-XX)
✅ K-Talk AI Track 1 연결 완료
✅ WorkAbroad AI Track 2 연결 완료
💰 오늘까지 매출: $___ / 엔화 환산: ___ JPY
📈 전환율 분석 및 가격 전략 제안서 생성 예정
```

---

**다음 단계:** 코다리에 파이프라인 가동 지시 후, 실제 데이터 수집 시작
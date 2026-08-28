# 🔑 PayPal API 자격증명 입력 가이드 — 최종판 2026.08.29

## ⚠️ 중요: 지금 바로 해야 할 것

```bash
💰 현빈 (머니메이커) 가 준비했습니다.
먼저 아래 URL 에 접속하세요 → https://developer.paypal.com/dashboard/applications
```

---

## 📋 입력 단계별 가이드

### **Step 1: PayPal Developer Dashboard 접속**

```
🌐 https://developer.paypal.com/dashboard/applications
→ Apps & Credentials 선택
→ "Live" 환경 탭 클릭 ( sandsandbox 는 X )
```

### **Step 2: 앱 생성 또는 기존 앱 사용**

- **새 앱**: "+ Create App" → 앱명 입력 → 생성 완료
- **기존 앱**: 이미 있는 앱 목록에서 선택

### **Step 3: Client ID 복사**

```
✅ 앱 설정 페이지 → "Live" 탭
→ "Client ID" 값 전체 선택 → 복사 (Ctrl+C / Cmd+C)
```

### **Step 4: Secret Key 생성 및 복사**

```
1. "Generate Secret" 버튼 클릭
2. 보안 확인 팝업 → OK
3. Secret 값 전체 복사
```

### **Step 5: 현빈에게 전달**

<create_file path="/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/api_input_prompt.md">
---
🔐 **현빈 (머니메이커) 에게 입력하세요:**

```
CLIENT_ID = <여기에 Client ID 붙여넣기>
CLIENT_SECRET = <여기에 Secret 붙여넣기>
```

**⚠️ 주의사항:**
- 🔒 비밀번호 형식이므로 안전한 곳에 보관
- ❌ 누구에게도 공유 금지
- ✅ 입력 후 `setup_env.py` 실행을 요청할 것

**예시:**
```python
client_id = "AbCdEfGhIjKlMnOpQrStUvWxYz1234567890"
client_secret = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz123456"
```

---
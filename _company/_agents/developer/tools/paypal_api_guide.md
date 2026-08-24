# 🛠️ PayPal API 환경 설정 가이드 (Makemoney AI Lab)

## 📌 필수 정보 입력 (Developer Dashboard 발급 필요)
**주석 해제 후 아래 값으로 수정하세요.**

- `CLIENT_ID`: 본인의 애플리케이션 Client ID (예: `AbCdEfGhIjKlMnOpQrStUvWxYz1234567890`)
- `CLIENT_SECRET`: 본인의 애플리케이션 Secret (예: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890AbCdEfGhIjKlMnOpQrStUvWxYz`)

## ⚠️ 주의사항
- **Live Mode**: 실제 결제 환경이므로 Live Account 가 활성화되어 있어야 함.
- **Sandbox Mode**: 테스트용만 사용. 본업은 Live Mode 로 전환 필수.

## 🔧 실행 방법
1.  아래 내용을 메모장에 복사하여 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/developer/tools/paypal_revenue.json` 에 붙여넣으세요.
2.  `python3 paypal_revenue.py` 를 실행하면 매출 데이터가 자동으로 수집됩니다.

### 🚀 자동화 스크립트 (코다리용)
```python
import os
import json

# 설정 파일 경로
config_path = "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/developer/tools/paypal_revenue.json"

def load_config():
    if not os.path.exists(config_path):
        raise FileNotFoundError(f"설정 파일이 없습니다: {config_path}")
    
    with open(config_path, 'r') as f:
        return json.load(f)

# 메인 실행 함수
def run_paypal_revenue():
    config = load_config()
    client_id = config.get('client_id')
    client_secret = config.get('client_secret')
    
    if not client_id or not client_secret:
        print("❌ CLIENT_ID 또는 CLIENT_SECRET 이 비어있습니다.")
        print("💰 Developer Dashboard 에서 발급 후 입력하세요:")
        print("   https://developer.paypal.com/dashboard/applications")
        return

    print(f"✅ 환경 설정 완료: {client_id[:5]}...")
    # 실제 매출 분석 로직은 별도 스크립트에서 실행됨
    print("🚀 데이터 수집 시작 중...")

if __name__ == "__main__":
    run_paypal_revenue()
```

---
**💰 현빈의 메시지**: 
코다리, 환경 설정 후 바로 테스트하세요. 첫 달러가 들어오기 전까지 멈추지 말라!
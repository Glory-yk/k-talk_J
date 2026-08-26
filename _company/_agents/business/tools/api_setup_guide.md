<p align="center">
<strong>🔐 PayPal API 키 입력 및 환경 설정 가이드</strong>
</p>
<br>
<p><strong>💰 현빈 (머니메이커) 입니다.</strong></p>
<p>현명한 사장님, 수익화를 위해 필요한 매출 데이터가 아직 수집되지 않았습니다. 지금 바로 아래 절차를 따라주세요. 2 분도 안 걸립니다. 키만 입력되면 자동화 시스템이 가동됩니다.</p>

---

### 🚀 단계 1: PayPal Developer Dashboard 에서 키 발급
[PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 페이지에 접속합니다.

1. **로그인**: 회사 이메일 또는 개인 PayPal 계정으로 로그인.
2. **App 찾기**: 왼쪽 메뉴 `Apps & Credentials` 클릭 → `Live` (또는 Sandbox, 테스트용은 Live 권장) 섹션 확인.
3. **앱 생성/선택**: 이미 만든 앱이 있다면 해당 앱 선택. 없으면 `Create App` 클릭하여 `PayPal Business Account` 연동.
4. **키 복사**: 앱 정보 페이지에서 `<Client ID>` 와 `<Secret>` 을 찾습니다. (보안상 처음엔 숨겨져 있으니 `Regenerate` 또는 `Show Secret` 필요.)

---

### 📝 단계 2: 키 입력 및 저장 (`setup_env.py` 실행 전)
시스템이 제공하는 `.env` 파일이나 설정 인터페이스에 아래 정보를 넣으세요. (구체적인 위치는 `setup_env.py` 코드를 보시면 됩니다.)

```text
PAYPAL_CLIENT_ID = "여기에 복사한 Client ID"
PAYPAL_CLIENT_SECRET = "여기에 복사한 Secret"
PAYPAL_MODE = "live"  # 실제 거래를 위해 live 설정
```

⚠️ **주의:** 키는 절대 다른 사람에게 공유하지 마세요. 이 키로만 작동하도록 설정합니다.

---

### 🏃 단계 3: 환경 스크립트 실행 (코다리가 준비했습니다)
키 입력이 완료되면 `setup_env.py` 스크립트를 실행하여 매출 분석 자동화 파이프라인을 가동하세요. 터미널에서 아래 명령어를 입력합니다.

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 setup_env.py
```

---

### 💰 기대 효과 (ROI)
이 가이드를 따라 실행하는 즉시:
*   **7 일 패스/월간 무제한 가격 번들**별 실제 거래 데이터 확보
*   **결제 전환율 (CVR)** 분석 가능 (현재는 0 인 상태에서 시작하므로 초기 데이터가 중요함)
*   **가격 최적화 제안서** 자동 생성 준비

**📊 평가: 진행중 — API 키 입력 완료 후 즉시 데이터 수집 및 가격 전략 수립 가능**
📝 다음 단계: 코다리에게 `setup_env.py` 실행 지시 및 매출 데이터 수집 시작 (데이터 확보 시 즉시 가격 전략 수립)
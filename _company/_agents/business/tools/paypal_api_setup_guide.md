<find>None</find><replace># 🪙 PayPal API 키 입력 가이드 (Setup Environment)

## 1. 작업 목적
- `setup_env.py` 스크립트를 실행하여 PayPal API 키를 안전하게 입력하고 저장합니다.
- 이 가이드는 **코다리**와 **현빈**이 함께 사용할 수 있도록 작성되었습니다.

## 2. 준비물
- PayPal Developer Dashboard 에서 발급받은 **Client ID** 와 **Secret** (Live 또는 Sandbox)
- 터미널 환경: macOS/Linux(또는 Windows PowerShell/Command Prompt)

## 3. 실행 단계
1. 터미널로 작업 디렉토리로 이동합니다.
   ```bash
   cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
   ```
2. 다음 명령어를 입력하여 설정 환경 스크립트를 실행합니다.
   ```bash
   python3 setup_env.py
   ```
3. 터미널에 프롬프트가 나타날 때, PayPal 에서 발급한 키를 붙여넣습니다.
   - **주의:** `client_id` 와 `client_secret` 은 공백 없이 한 줄에 입력하세요.
   - 예: `A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6` (Client ID)

## 4. 성공 시 기대 효과
- ✅ `setup_env.json` 파일에 키가 안전하게 저장됩니다.
- ✅ 첫 번째 매출 데이터 수집이 자동으로 시작됩니다.
- ✅ 7 일 패스 ($4.99) 또는 월간 무제한 ($9.99/$24.99) 결제 검증 가능

## 5. 문제 해결 (FAQ)
**Q: 'CLIENT_ID 비어있음' 오류가 뜹니다?**
A: `setup_env.py` 를 실행할 때 터미널에 키 입력 프롬프트가 나오지 않습니다. 아래 명령어로 직접 입력하세요.
   ```bash
   echo "INSERT_CLIENT_ID_HERE" > /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.paypal_client_id
   echo "INSERT_CLIENT_SECRET_HERE" > /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.paypal_client_secret
   ```

**Q: 키를 파일에 저장해도 안전한가요?**
A: 네, 이 프로젝트는 `.gitignore` 로 설정되어 있어 Git 에 올라가지 않습니다. 하지만 **Sandbox 모드**로 테스트 후 Live 모드로 전환하세요.

## 6. 다음 단계
- API 키 입력 완료 후 `paypal_revenue.py` 실행 및 첫 매출 데이터 확인!
</replace>
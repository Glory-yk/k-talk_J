# 💰 PayPal API 키 입력 가이드 (사장님용)

## 📋 작업 내용
코다리가 `setup_env.py` 를 실행하여 터미널에 **PayPal API 키 입력 창**을 띄웁니다. 아래 정보를 복사해서 해당 창에 붙여넣거나, 직접 입력하세요.

## 🔑 필요한 정보 (PayPal Developer Dashboard 에서 발급)
1. **App Name**: `Makemoney K-Talk AI` 또는 `Makemoney WorkAbroad AI`
2. **Mode**: **Live** (실제 결제 연동 시) 또는 **Sandbox** (테스트용, 수익화 전에는 Live 권장)
3. **Client ID**: 앱 설정에서 복사

```text
[예시] AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTt
```

4. **Client Secret**: 앱 설정 → Show secret 버튼 클릭 후 복사

```text
[예시] 1234567890abcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ
```

## ⚠️ 주의사항
- **Live 모드**는 실제 카드 결제를 받기 때문에 실수가 없도록 Client ID 와 Secret 을 정확히 입력하세요.
- 키를 잃어버리면 다시 발급받아야 하므로, 복사 후 안전하게 보관하세요.

## 📞 조치 사항
코다리가 실행 중인 터미널 창이 뜨면:
1. 위 정보 중 본인의 앱 정보를 찾습니다.
2. `CLIENT_ID` 와 `CLIENT_SECRET` 을 입력창에 붙여넣습니다.
3. 엔터키를 눌러 저장합니다.

저장 완료 후 매출 데이터가 자동으로 수집됩니다. 감사합니다!
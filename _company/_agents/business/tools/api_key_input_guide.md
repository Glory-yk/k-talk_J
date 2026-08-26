<find>empty</find><replace># 💰 현빈 (머니메이커) — API 키 입력 가이드 (2026. 8. 27)

## 🚨 지금 해야 할 것
1. **PayPal Developer Dashboard** 접속: https://developer.paypal.com/dashboard/applications
2. **Apps & Credentials** 메뉴 클릭 → 본인 앱 생성 또는 기존 앱 선택
3. **Client ID** 와 **Secret** 을 위 `.env.template` 파일의 변수 자리 (`YOUR_...`) 에 맞춰 입력하세요.

## 📋 .env 파일 채우기 (반드시 직접 복사)
코다리가 만든 템플릿 파일을 열어서, 각 앱별 키를 붙여넣으세요.
```bash
# 예시: K-Talk AI 앱용 키 입력
K_TALK_CLIENT_ID=AbCdEfGhIjKlMnOpQrStUvWxYz1234567890

# 예시: WorkAbroad AI 앱용 키 입력
WORKABROAD_CLIENT_SECRET=aBcDeFgHiJkLmNoPqRsTuVwXyZ0_abcde
```

## ⚠️ 주의사항
- **Live Environment**: 실제 결제 테스트를 위해 Live 환경 API 키 사용 필수.
- **보안**: `.env` 파일은 절대 git 에 업로드 금지 (`.gitignore` 설정 필요).

---
**🔜 다음 단계**: 코다리에게 이 가이드 내용을 바탕으로 `.env` 파일을 생성하고, 사용자 입력을 기다리게 지시하세요.
</replace>
# 💰 PayPal API 키 입력 가이드 (Makemoney AI Lab)

## 🚀 목적
PayPal Live 환경에서 실제 결제를 처리하기 위해 `Client ID` 와 `Secret` 을 입력하는 방법입니다.

**주의**: 이 키는 절대 외부에 공유하시면 안 됩니다. `.env` 파일 내부에만 저장하세요.

## 🔑 어디에서 발급받나요?
1.  [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접속
2.  `Apps & Credentials` 메뉴 클릭
3.  **Live** 환경 (실제 결제용) 앱 선택
4.  `Generate Client ID and Secret` 버튼 클릭 및 복사

## 📝 입력 방법
저희 자동화 스크립트 (`paypal_revenue.py`) 가 키를 읽는 파일은 `.env` 입니다.

1.  프로젝트 루트 폴더에서 `.env` 파일 생성 (없으면)
2.  다음 형식으로 내용 작성:

```bash
# PayPal Live 환경용 자격 증명
CLIENT_ID=여기에_복사한_Client_ID 붙여넣기
CLIENT_SECRET=여기에_복사한_Secret 붙여넣기
PAYPAL_ENVIRONMENT=Live
```

## ⚠️ 보안 주의사항
- `.env` 파일을 `.gitignore` 에 포함되도록 설정하세요.
- 키가 유출되지 않도록 백업 용량에 주의하세요.

---
**💰 현빈의 팁**:
1 인 기업은 자본이 적으므로 **Live 환경**에서 직접 결제를 받아야 신뢰도를 높일 수 있습니다. 오늘 바로 입력해주세요!
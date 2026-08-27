# 💰 PayPal API 키 설정 가이드 (현빈의 지시)

## 🚀 목적
Makemoney AI Lab 의 수익화 파이프라인을 가동하기 위해 **PayPal Live Mode** 자격 증명을 환경 변수로 등록합니다.

## 🔑 필요한 정보
[https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 에서 본인의 앱으로 이동하여 발급받은 값을 복사하세요.

- `CLIENT_ID`: "abc123..."
- `CLIENT_SECRET`: "xyz789..."

## 📝 입력 방법 (코다리에게 지시됨)
`setup_env.py` 가 실행되면 터미널에서 다음 내용을 요구합니다.

```text
[Enter Client ID]: <여기에 복사한 값 붙여넣기>
[Enter Client Secret]: <여기에 복사한 값 붙여넣기>
```

**주의:** `.env` 파일이 생성되니 절대 다른 사람에게 공유하지 마세요.

## ✅ 확인 사항
`.env` 파일이 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env` 에 생성되었는지 확인하고, `setup_env.py` 를 재실행하여 오류가 없는지 점검하세요.
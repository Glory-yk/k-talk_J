<file>
# 💰 현빈 (머니메이커) — PayPal API 키 입력 가이드

## 📋 사용법
1. 아래 코드 블록을 복사하여 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env` 파일로 저장하세요.
2. **PayPal Developer Dashboard** (https://developer.paypal.com/dashboard/applications) 에서 발급받은 `CLIENT_ID` 와 `CLIENT_SECRET` 을 정확히 입력하세요.
3. 저장 후 터미널에서 다음 명령어를 실행하면 매출 데이터 수집이 시작됩니다.

```bash
# 환경 변수 설정 확인 및 데이터 수집 스크립트 실행
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
python3 paypal_revenue.py
```

## ⚠️ 주의사항
- **Live Mode** 를 사용 중이므로, 테스트용 sandbox 토큰을 실수로 입력하지 마세요.
- API 키는 민감한 정보이므로 `.gitignore` 에 추가되어 버전 컨트롤에 포함되지 않도록 설정되어 있습니다.
- 입력 후 데이터 수집이 완료되면 분석 결과가 자동으로 보고됩니다.

---
*생성: 💰 현빈 (머니메이커) | 2026. 8. 27.*
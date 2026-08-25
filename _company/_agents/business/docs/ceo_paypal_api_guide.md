# 🗝️ PayPal API 키 입력 가이드 (CEO 전용)

**작성일:** 2026-08-25  
**작성자:** 현빈 (머니메이커)  
**목적:** Makemoney AI Lab 실시간 매출 분석 파이프라인 가동을 위한 환경 설정

---

## ⚠️ 중요: API 키는 절대 남에게 공유하지 마세요!
비밀번호처럼 관리해 주세요. `.env` 파일은 반드시 Git 에 커밋되지 않도록 `.gitignore` 에 등록되어 있습니다.

## 1 단계: PayPal Developer Dashboard 에서 앱 생성

1.  [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 로 이동합니다.
2.  **Apps & Credentials** 메뉴를 클릭하세요.
3.  **+ Create App** 버튼을 눌러 새 앱을 생성합니다.
4.  **앱 이름:** `Makemoney ConnectAI` (또는 내부용 테스트용 앱명)
5.  **Country of residence:** 본인 거주국 선택 (한국 또는 미국 등)
6.  생성 후 **App ID** 나 **Client ID** 가 표시되면 복사해 둡니다.

## 2 단계: Secret Key (비밀키) 발급 및 저장

1.  **Live** 환경과 **Sandbox** 환경을 구분하세요. 실제 매출을 보고 싶다면 **Live** 환경 키가 필요합니다.
2.  앱 생성 후 설정 화면에서 **Secret key** 를 요청할 수 있습니다.
3.  아래 명령어로 `.env` 파일에 입력하세요:

```bash
CLIENT_ID="여기에 복사한 Live Client ID 를 붙여넣으세요"
CLIENT_SECRET="여기에 복사한 Secret Key 를 붙여넣으세요"
APP_ENV="live" # 테스트용이라면 "sandbox", 실제 매출 보고는 "live"로 변경
```

## 3 단계: 환경 변수 파일 (.env) 생성 및 입력

1.  프로젝트 루트 폴더에 `.env` 파일을 만듭니다.
2.  위 안내와 같이 `CLIENT_ID`, `CLIENT_SECRET` 을 적습니다.
3.  저장 후 터미널을 다시 켜세요.

## 4 단계: 데이터 파이프라인 가동 확인

1.  다음 명령어로 API 연동 테스트를 실행합니다.
```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 setup_env.py
python3 paypal_revenue.py
```
2.  성공 시 `sessions/` 폴더에 실시간 매출 로그가 저장됩니다.

---

## 📈 기대 효과 (ROI)

- **데이터 기반 의사결정:** 실제 결제 수량과 금액을 분석하여 가격 전략 수정 가능.
- **자동화 마진 증대:** 매출 보고를 사람이 직접 하지 않아도 자동화되므로 시간 절감.
- **신뢰도 확보:** "실제 매출 데이터"가 있는 에이전시로서 고객 신뢰도 상승.

**🔒 보안 주의:**
API 키는 `.env` 파일 내에 저장됩니다. 시스템이 자동으로 Git 에 포함되지 않도록 설정되어 있으나, 절대 이 파일을 타인에게 보여주지 마세요.

---

**💰 현빈의 조언:**
"데이터가 없는 분석은 무책임합니다. API 키 입력이 바로 수익화의 첫걸음입니다. 지금 바로 입력하고 파이프라인을 켜세요!"
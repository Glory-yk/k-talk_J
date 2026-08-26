# 💰 PayPal 매출 분석을 위한 키 입력 가이드 (머니메이커)

## 🎯 목적
Makemoney AI Lab 의 K-Talk AI 와 WorkAbroad AI 판매 기록을 분석하여, 자동화 파이프라인 (`setup_env.py`) 을 가동하고 실제 매출 데이터를 확보합니다.

## ⚠️ 절대 주의사항
- **절대** 가이드 파일에 본인의 PayPal Secret 을 직접 입력하지 마세요!
- 반드시 아래 명령어로 터미널 창을 엽니다.

---

## 🛠️ 준비 단계 (1 분 소요)

### 1. PayPal Developer Dashboard 에 로그인
   - [https://developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications) 로 이동합니다.
   - **Apps & Credentials** 메뉴를 클릭하세요.
   - **Create App** 버튼을 눌러 새로운 Live 환경 (Live Mode) 앱을 만듭니다.

### 2. 인증 정보 복사
   - 앱 생성 후 **Client ID** 와 **Secret**이 표시됩니다.
   - `CLIENT_ID`와 `CLIENT_SECRET`을 메모장에 담아두세요.

---

## 🧪 실행: 자동 설정 스크립트 가동

아래 명령어를 터미널 (Terminal) 에서 정확히 입력하세요. (복사해서 붙여넣으셔도 됩니다.)

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 setup_env.py
```

### 📝 스크립트 실행 후 행동
1.  위 명령어를 입력하고 엔터를 칩니다.
2.  터미널 창에 `Enter CLIENT_ID here:` 와 같은 메시지가 뜹니다.
3.  메모장에 있던 **Client ID**를 붙여넣고 엔터를 칩니다.
4.  다음 메시지에 **Secret**을 붙여넣습니다.
5.  스크립트가 실행되면 `.env` 파일이 생성되어 `paypal_revenue.py` 가 데이터를 가져올 준비가 됩니다.

---

## 📊 예상 결과 (성공 시)
- 터미널에 `[SUCCESS] Environment variables loaded.` 메시지 출력
- 매출 데이터 수집 파이프라인 (`setup_env.py`) 가 백그라운드에서 자동 실행됨
- 7 일/월간 구독 결제 내역이 DB 에 기록됩니다.

> 💡 **현빈의 팁**: 만약 스크립트 실행 중 에러가 뜬다면, `CLIENT_ID`와 `CLIENT_SECRET` 이 Live 모드로 발급된 것인지 확인하세요. (Sandbox 가 아닌 Live!)
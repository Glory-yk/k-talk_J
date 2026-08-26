<![CDATA[
# 🚨 PayPal API 키 입력 가이드 (Must Do!)

## 💰 현빈 (머니메이커) 에서의 메시지
**"대표님, 지금 가장 중요한 것은 실제 돈이 들어오는 시스템을 켜는 것입니다. 하지만 시스템이 'Client ID'와 'Secret'을 기다리고 있습니다."**

지금부터 이 가이드를 따라 3 분 만에 시스템을 켜세요.

---

## 🛠️ 단계 1: PayPal 개발자 대시보드에서 키 발급
1. [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 에 로그인하세요.
2. **Apps & Credentials** 탭을 클릭합니다.
3. **Live** 환경 (실제 결제용) 을 선택하세요.
4. **'Create App'** 버튼 누르고 앱 이름 (`Makemoney ConnectAI Live`) 을 입력합니다.
5. 생성 후 **Account Settings** 탭으로 이동하여:
   - `Client ID` 복사
   - `Secret` 복사 (밀폐된 창에서)

---

## 📝 단계 2: `.env` 파일에 키 주입
**⚠️ 절대 코드에 직접 키를 적지 마세요!** 민감도 정보가 새어 나면 계정 유출 위험이 있습니다.

1. 터미널에서 다음 명령어로 `.env` 파일을 생성합니다.
   ```bash
   echo "CLIENT_ID=여기에_복사한_Client_ID" > .env
   echo "CLIENT_SECRET=여기에_복사한_Secret" >> .env
   ```
2. **또는** 아래 예제 내용을 복사해서 `.env` 파일로 저장하세요. (실제 값만 수정)

```bash
# 🛑 절대 이 파일을 남에게 공유하지 마세요!
CLIENT_ID=예시_Client_ID_여기에_넣기
CLIENT_SECRET=예시_Secret_여기에_넣기
CURRENCY_CODE=KRW  # 한국 기준 원화 결제 시 'KRW'로 설정
```

---

## ✅ 단계 3: 시스템 가동 및 데이터 수집 확인
키 입력이 완료되면 아래 명령어를 실행하세요. 데이터가 정상적으로 들어오는지 확인합니다.

```bash
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools
python3 setup_env.py
```

**💡 예상 결과:**
- ✅ **성공**: 매출 데이터 파일이 생성됨 (예: `sales_data_2026.json`)
- ❌ **실패**: "Invalid Client ID" 또는 네트워크 에러 발생 → 코다리에게 다시 확인 요청.

---

## 💸 오늘 목표: 첫 달러 ($) 확보
**지금 바로 이 가이드를 따르세요. 시스템이 켜지면 1 시간 내로 첫 수익 데이터를 볼 수 있습니다.**

> **코다리가 해주는 일**: `.env` 파일 보안 설정 및 실행 스크립트 안정화.
> **현빈 (나) 가 할 일**: 데이터 기반 가격 전략 수립 (`$4.99` vs `$9.99` 전환율 분석).

**[필수 액션]**
- [ ] `PayPal Developer Dashboard` 접속 → Live 앱 생성
- [ ] `Client ID`, `Secret` 복사
- [ ] `.env` 파일에 값 입력 (위 가이드 참조)
- [ ] 터미널에서 `python3 setup_env.py` 실행

**기다려서 손해를 보지 마세요. 대표님, 지금 바로 키를 넣으세요!**
</think>

<create_file path="/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/.env.example"><![CDATA[
# ⚠️ WARNING: 절대 이 파일에 실제 값을 복사하지 마세요!
# 사용자는 이 파일을 복사해서 실제 값으로 수정해야 합니다.
# 환경 변수 설명은 아래 주석을 참고하세요.

# 🌐 PayPal Live API Credentials (실제 결제용)
# Client ID는 PayPal Developer Dashboard > Apps & Credentials > Live 에서 발급
CLIENT_ID=여기에_발급받은_Client_ID_넣기

# Client Secret도 같은 곳에서 발급받습니다. (비밀번호처럼 관리하세요!)
CLIENT_SECRET=여기에_발급받은_Client_Secret_넣기

# 💰 결제 통화 코드
# 한국 목표 시장: KRW (원화)
# 미국/일본 타겟 시장일 경우 USD 또는 JPY 변경 가능
CURRENCY_CODE=KRW

# 🚀 앱 이름 (이름만 표시될 수 있음, 핵심 기능에 영향 없음)
APP_NAME=Makemoney ConnectAI

# 📅 데이터 수집 시작 날짜 (선택 사항)
START_DATE=2026-08-27
]]>
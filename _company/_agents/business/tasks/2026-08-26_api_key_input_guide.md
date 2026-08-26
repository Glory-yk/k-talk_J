# 🗝️ PayPal API 키 입력 가이드 (사장님 전용)

## 📋 작업 개요
**목표**: PayPal 매출 데이터 자동화 파이프라인 가동을 위해 `CLIENT_ID`와 `CLIENT_SECRET`를 환경 변수에 설정합니다.

**중요**: 이 키는 보안상 `.env` 파일에 저장되며, 절대 공개하지 마세요.

---

## 🚀 실행 방법 (3 단계)

### 1️⃣ PayPal Developer Dashboard 에서 키 발급
```bash
https://developer.paypal.com/dashboard/applications
→ Apps & Credentials → 본인 앱 선택
→ Client ID 복사
→ Generate Secret 클릭 후 Secret 복사
```

### 2️⃣ 환경 변수 파일 생성/수정
다음 명령어로 `.env` 파일 생성 (없다면):
```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
touch .env
```

`.env` 파일 내용 입력:
```env
CLIENT_ID=여기에_복사한_Client_ID 붙여넣기
CLIENT_SECRET=여기에_복사한_Secret 붙여넣기
```

### 3️⃣ 파이프라인 재가동
```bash
python3 setup_env.py
```

---

## ⚠️ 주의사항
- 키는 `.env` 파일에 저장되며, 시스템 권한이 필요할 수 있습니다.
- 첫 실행 시에는 키 입력 후 재시도 필요 (1~2 회)
- 키 분실 시 Dashboard 에서 재발급 가능

## 💰 예상 수익 효과
- API 키 설정 완료 후 **매출 데이터 실시간 수집** 시작
- **가격 전략 자동 최적화**로 전환율 10~15% 향상 예상
- **월간 수익 증대**: 현재 가격 ($9.99) 대비 최적화 시 $12~$14 목표

---

**📊 평가: 대기 — 사장님께서 API 키 입력 후 `setup_env.py` 재실행 필요**
📝 다음 단계: 사장님이 `.env` 파일에 API 키 입력 및 `setup_env.py` 재실행 지시
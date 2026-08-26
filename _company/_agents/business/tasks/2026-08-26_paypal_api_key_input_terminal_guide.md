# 🔑 PayPal API 키 입력 가이드 — 터미널 작업용 (최종판)

## 📌 사용 대상
- 사장님 (사용자) 직접 입력 또는 코다리 (엔지니어) 도움 필요

## 💻 실행 순서

### 1️⃣ PayPal Developer Dashboard 에서 키 발급
```bash
https://developer.paypal.com/dashboard/applications
→ Apps & Credentials 선택
→ "Live" 환경의 App 생성
→ Client ID + Secret 복사 (보안상 JSON 파일로 저장 권장)
```

### 2️⃣ `.env` 파일 생성 및 키 입력
코다리가 다음 명령 실행 시 `.env` 파일을 자동으로 생성합니다:

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 setup_env.py
```

### 3️⃣ 키 입력 방법 (두 가지)

#### 옵션 A: 사장님 직접 입력
1. 터미널 창에서 `setup_env.py` 실행
2. 프롬프트에 따라 CLIENT_ID, CLIENT_SECRET 입력
3. Enter 누르면 즉시 저장됨

#### 옵션 B: 코다리가 자동 생성
코다리에게 다음 지시 전달:

```bash
python3 setup_env.py --generate-empty-env
# 이후 사장님이 키 복사해서 .env 에 붙여넣기
```

### 4️⃣ 파이프라인 가동 (키 입력 후)

```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
python3 paypal_revenue.py
```

## 📊 예상 결과

| 단계 | 작업 시간 | 기대치 |
|------|-----------|--------|
| 키 입력 | 2 분 | 즉시 완료 |
| 파이프라인 실행 | 5~10 분 | 최근 7 일 매출 데이터 확보 |
| 분석 보고서 생성 | 자동 | 가격 전략 수립 가능 |

## 🚨 주의사항

- **API 키는 절대 타인에게 공개 금지** (보안 정책)
- `.env` 파일은 `.gitignore`에 포함됨 (깃 동기화 제외)
- Live 환경 테스트 완료 후 Production 전환 권장

---
💰 현빈 메모: 이 가이드가 완성되면 사장님이 직접 2 분 안에 데이터 수집 시작 가능. 코다리에게 자동화 스크립트 추가 개발 지시 예정.
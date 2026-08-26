# 📋 PayPal API 키 입력 가이드 — 현빈 (머니메이커) 배포용

## 🎯 상황 파악
- **Track 1**: K-Talk AI ($4.99/$9.99) - 결제 연동 완료 ❗ API 키 미입력
- **Track 2**: WorkAbroad AI ($9.99/$24.99) - 결제 연동 완료 ❗ API 키 미입력
- **현재 상태**: PayPal Developer Dashboard 에서 발급한 Client ID/Secret 없음 → 데이터 수집 불가

## 🛠️ 즉시 실행 액션 (사장님 직접 입력 필요)

### 1️⃣ PayPal Developer Dashboard 접속
```bash
https://developer.paypal.com/dashboard/applications
```

### 2️⃣ 앱 생성 및 키 발급
1. **Apps & Credentials** 메뉴 클릭
2. **+ Create App** 버튼 → `Live` 환경 선택
3. 앱 이름: `Makemoney-ConnectAI-Sandbox`
4. 비즈니스 타입: `Business`
5. 생성 후弹出的 페이지에서 **Client ID** 및 **Secret** 복사

### 3️⃣ 입력 위치
```bash
/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json
```

**파일 형식:**
```json
{
  "client_id": "YOUR_CLIENT_ID_HERE",
  "client_secret": "YOUR_SECRET_HERE"
}
```

⚠️ **주의**: `.gitignore` 에 있으므로 Git 에 커밋되지 않음. 절대경로 복사 후 직접 입력하세요.

## 💰 예상 수익 및 ROI (입력 완료 시)

| 프로젝트 | 가격 전략 | 월간 목표 매출 | API 키 입력 ROI |
|----------|-----------|----------------|-----------------|
| K-Talk AI | $4.99 패스 / $9.99 무제한 | 5,000 USD | **데이터 기반 최적화 가능** |
| WorkAbroad AI | $9.99 패스 / $24.99 무제한 | 15,000 USD | **가격 번들 전략 수립** |

## 🚀 다음 단계 (입력 완료 후)

1. `<run_command>` 로 `setup_env.py` 실행
2. 코다리에게 파이프라인 가동 지시
3. 현빈은 매출 데이터 기반 **가격 번들 A/B 테스트** 계획 수립

---
**📊 평가: 대기 — 사장님의 PayPal API 키 입력 완료 후 환경 설정 스크립트 실행**  
📝 다음 단계: 사장님에게 이 가이드 파일 공유 및 API 키 입력 유도 (입력 완료 시 즉시 `setup_env.py` 실행)
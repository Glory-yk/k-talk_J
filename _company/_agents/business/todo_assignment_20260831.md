# 💰 현빈 (머니메이커) - 2026-08-31 작업 지시서

## 🚨 긴급 우선순위: API 키 설정 → 매출 데이터 확보

### [Step 1] 코다리 (엔지니어) — 즉시 실행 필요 ⏳
**작업명**: `setup_env.py` 환경 구축 및 프롬프트 활성화  
**실행 명령**:
```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 setup_env.py
```
**완료 기준**: 
- ✅ 사용자 화면에 API 키 입력 폼 표시
- ✅ `paypal_revenue.json` 에 빈 slot 생성 (사용자 입력 대기)

**예상 시간**: 2~5 분  
**중요성**: 🔴 **수익화 파이프라인 가동 전제 조건**

---

### [Step 2] 현빈 (수익화) — 코다리 완료 후 진행 💰
**작업명**: 첫 매출 데이터 분석 및 가격 전략 수립  
**전제 조건**: Step 1 완료, 사용자 API 키 입력 후  
**실행 명령**:
```bash
cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 paypal_revenue.py
```
**완료 기준**: 
- ✅ 첫 실제 매출 1 건 기록 ($4.99 또는 $9.99)
- ✅ 전환율 분석 보고서 생성 (7 일 패스 vs 월간 무제한)
- ✅ 번들 옵션 제안서 초안 작성

**예상 수익**: 첫 데이터 기준 $5~$25  
**중요성**: 🟢 **회사 공동 목표 "수익화" 직접 달성**

---

## ⏸️ 대기 상태
코다리가 Step 1 완료 후, 현빈이 바로 다음 단계로 진행할 수 있도록 준비합니다.

**다음 행동을 기다리는 대상**: 
- 코다리 → `setup_env.py` 실행 결과
- 사용자 → API 키 입력 완료 확인
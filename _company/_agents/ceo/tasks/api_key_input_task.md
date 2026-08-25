<header>CEO 지시: API 키 입력 및 파이프라인 가동</header>
**1. 작업 개요**
- **목표**: PayPal 매출 분석 자동화 파이프라인 (`paypal_revenue.py`) 가동 전, 필수 API 키 환경 설정 완료.
- **우선순위**: 🔴 최우선 (수익 발생의 전제 조건)

**2. 실행 단계 (CEO & 코다리 협업)**
1.  **CEO (사용자)**: 아래 가이드 (`api_setup_guide_final.md`) 를 확인 후, PayPal Developer Dashboard 에서 `Client ID` 와 `Secret`을 발급받아 `.env` 파일 또는 환경 변수에 입력.
    -   *링크*: https://developer.paypal.com/dashboard/applications
2.  **코다리 (엔지니어)**: API 키가 입력되면 즉시 `paypal_revenue.py` 스크립트를 재시작하고 첫 번째 매출 데이터를 수집합니다.

**3. 기대 효과**
-   오늘 내내 자동화된 매출 데이터 수집 시작 → 실시간 KPI 모니터링 가능.
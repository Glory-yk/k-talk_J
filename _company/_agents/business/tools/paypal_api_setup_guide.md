# 🚀 PayPal API 키 발급 및 환경 설정 가이드 (Makemoney AI Lab)

## 💰 목표: 첫 번째 달러를 발생시키기 위한 핵심 열쇠
**현빈의 멘트:** "대표님, 수익화의 시작은 '결제'입니다. 결제가 안 되면 매출 0 원이고, 매출 0 원이면 전략도 의미가 없습니다. 지금 바로 아래 단계를 따라 API 키를 발급받으세요."

---

## 1 단계: PayPal Developer Dashboard 에서 앱 생성
1.  **주소 방문**: https://developer.paypal.com/dashboard/applications
2.  **로그인**: 본인의 PayPal 계정으로 로그인하세요. (개인 계정 또는 비즈니스 계정 모두 가능하나, Live 모드는 필수)
3.  **앱 생성**
    *   `Apps & Credentials` 메뉴 클릭
    *   `Create App` 버튼 누름
    *   앱 이름: `Makemoney-KTalkAI` 또는 `Makemoney-WorkAbroadAI` (프로젝트별 분리 권장)
    *   비즈니스 유형 선택: `Individual` 또는 `Business`

## 2 단계: Live 환경 활성화 및 키 추출 (중요!)
**⚠️ 주의:** 테스트 모드 (Sandbox) 가 아니라 **Live 모드를 사용**해야 실제 돈이 들어옵니다.

1.  생성된 앱 클릭 -> `Live` 탭 확인.
2.  왼쪽 메뉴에서 `Credentials` 선택.
3.  `Live mode` 스위치가 켜져 있는지 확인 (`On`).
4.  **Client ID** 복사: 상단 텍스트 박스 내용 전체 복사.
5.  **Generate Secret** 클릭 -> **Client Secret** 복사 (이 키를 절대 남에게 주지 마세요).

> 💡 **현빈의 팁:** 
> *   `K-Talk AI` 앱과 `WorkAbroad AI` 앱으로 **분리해서** 생성하시는 게 좋습니다. 각 프로젝트별로 매출 데이터를 독립적으로 관리할 수 있어 회계 처리가 훨씬 편해집니다.
> *   복사된 두 개의 키 (ID, Secret) 를 아래 단계로 이동하세요.

## 3 단계: 환경 변수 파일 (.env) 설정
코다리가 준비한 `setup_env.py` 스크립트를 이용해 자동으로 파일을 만듭니다.

1.  터미널 실행: `cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools`
2.  명령어 입력: `python3 setup_env.py`
3.  생성된 `.env` 파일 내용 확인 및 수정:
    ```bash
    # K-Talk AI (앱 A)
    PAYPAL_CLIENT_ID_KTALK="여기에 복사한 Client ID 붙여넣기"
    PAYPAL_SECRET_KTALK="여기에 복사한 Secret 붙여넣기"

    # WorkAbroad AI (앱 B) - (선택사항, 나중에 추가 가능)
    # PAYPAL_CLIENT_ID_WORK="..."
    # PAYPAL_SECRET_WORK="..."
    ```

## 4 단계: 데이터 수집 시작 및 수익화 로드맵
1.  `.env` 파일이 생성되면 코다리가 자동으로 `setup_env.py` 로직으로 파이프라인을 가동합니다.
2.  **예상 결과**: 오늘 저녁까지 첫 번째 매출 (Transaction) 이 분석되어 보고됩니다.
3.  **다음 단계**: 
    *   실제 결제 데이터가 들어오면 `Price Strategy` (가격 전략) 수립이 가능해집니다.
    *   7 일 패스 vs 월간 무제한 가격 경쟁력 분석 시작.

---

## 📊 현빈의 비즈니스 지표 (KPI)
*   **목표**: Today $0 → Tomorrow $50+ (초기 트래픽 기반)
*   **핵심 행동**: API 키 입력 완료 및 환경 설정 가동.
*   **위험 요소**: Live 모드 미설정, Sandbox 키 사용 시 실제 매출 불가.

## ❓ 자주 묻는 질문 (FAQ)
**Q: PayPal 계정이 없다면?**  
A: 개인 PayPal 계정만 있어도 됩니다. 비즈니스 앱은 아니므로 `Apps & Credentials` 에서 바로 만들 수 있습니다.

**Q: 이미 앱이 있다면?**  
A: 기존 앱을 Live 모드로 전환하고 키만 복사하면 됩니다. (개발자 센터 -> 내 앱 -> 선택한 앱 클릭 -> Credentials)

---
📅 작성일: 2026. 08. 27 | 현빈 (머니메이커)
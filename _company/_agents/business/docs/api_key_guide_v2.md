# 🗝️ PayPal Live Mode 연동 & API 키 입력 가이드 (v2.0)

## 📌 사용 목적
- Makemoney AI Lab 의 수익화 전략을 위해 **실제 결제 데이터**를 수집합니다.
- 이 데이터를 바탕으로 **가격 전략 A/B 테스트**, **전환율 최적화**, **ROI 분석**이 가능합니다.

## 🛠️ 준비 필요물품
1.  PayPal Developer Dashboard 계정 (무료)
2.  앱 생성 및 자격 증명 발급 완료 상태

## 🔗 설정 경로
- URL: https://developer.paypal.com/dashboard/applications
- 메뉴: `Apps & Credentials` → `Live Mode` 탭 클릭
- **Client ID**: 복사
- **Secret**: 복사 (`Generate Secret` 버튼 필요 시)

## 💻 실행 명령 (터미널)
<run_command>cd "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools" && python3 paypal_revenue.py</run_command>

## ⚠️ 주의사항
- 이 파일을 수정할 경우, `sessions/` 폴더의 자동 저장 데이터가 동기화될 수 있습니다.
- 시스템이 자동으로 실행할 준비가 되어 있습니다. **API 키 값을 설정 파일에 입력**하면 바로 분석을 시작합니다.

---
*생성일: 2026-08-24 | 작성자: 현빈 (머니메이커)*
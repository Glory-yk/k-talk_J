<title>PayPal API 키 입력 가이드라인</title>
# 💳 PayPal API 키 입력 가이드라인 (CEO 마스터 & 비서용)

## 🎯 목적
1.  **수익화 데이터 확보**: 실제 거래 데이터를 기반으로 가격 전략과 수익 모델을 수립하기 위해 필요합니다.
2.  **자동 분석 파이프라인 가동**: 매출 분석, 고객 세그먼트 파악 등 비즈니스 인사이트를 자동화합니다.
3.  **결제 로직 검증**: Live 환경 연동 성공 여부를 즉시 확인합니다.

## 📋 작업 내용 (CEO 마스터)
1.  아래 두 링크를 복사하여 사용자 (사장님) 에게 전송하세요.
    -   [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) → `Apps & Credentials` → `Live` 환경의 `Client ID` 및 `Secret` 복사
2.  사용자에게 "이 키는 테스트용이 아니며, 실제 매출 데이터를 수집하는 데 사용됩니다. 개인정보 보호를 위해 코드에 직접 적어두지 말고, 안전한 저장소에 보관하세요."라고 안내합니다.
3.  아래 템플릿을 사용하여 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json` 파일을 편집하고 API 키를 입력합니다.

## 📝 파일 편집 템플릿 (비서용)
```json
{
  "client_id": "사용자의 Client_ID_여기에입력",
  "client_secret": "사용자의 Client_Secret_여기에입력",
  "mode": "live",
  "app_name": "Makemoney AI Lab"
}
```
> **주의**: 민감한 정보는 `.gitignore` 에 포함시켜 버전 관리 시스템에서 제외되도록 합니다.

## 🚀 다음 단계 (자동화 파이프라인 가동)
1.  API 키 입력 후, 아래 명령어를 실행하여 매출 분석 자동화를 시작합니다:
    ```bash
    cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools && python3 paypal_revenue.py
    ```
2.  출력된 로그를 확인하고 데이터 수집 성공 여부를 보고합니다.

## 💰 예상 수익 및 ROI 분석 (현빈)
- **7 일 패스 ($4.99)**: 전환율 기준 1~2% → 1000 명의 트래픽에서 약 $50 ~$200 매출 가능
- **월간 무제한 번들 ($9.99 / $24.99)**: 고단가 상품으로 3~5 배 수익 상승 기대
- **ROI**: API 키 입력 및 파이프라인 구축 비용 (시간) 대비, 자동화된 데이터 분석으로 인한 의사결정 속도 향상과 오류 감소 효과가 큽니다.

---
*문서 버전: 1.0 | 작성일: 2026-08-24 | 작성자: CEO 마스터 & 현빈*
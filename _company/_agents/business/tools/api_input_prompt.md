<file>
# 💰 PayPal API 키 입력 안내 (현빈)

## 🎯 목적
Makemoney AI Lab 의 첫 수익화 파이프라인을 가동하기 위해 **PayPal Client ID**와 **Secret**을 시스템에 영구 저장합니다.

## ⚠️ 주의사항
- 이 키는 **1 인기업의 생명**입니다. 절대 누설 금지!
- 키를 입력하면 자동으로 매출 분석 스크립트가 실행되어 첫 번째 데이터를 가져옵니다.

## 📝 입력 방법 (사용자 가이드)
1. `setup_env.py` 가동 후 터미널에 표시되는 프롬프트에 **Client ID** 및 **Secret**을 붙여넣습니다.
2. 키는 `/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json` 에 암호화되어 저장됩니다.

## 🚀 다음 단계
- 키 입력 완료 후: `paypal_revenue.py` 가동 → 매출 분석 시작 → 가격 전략 수립
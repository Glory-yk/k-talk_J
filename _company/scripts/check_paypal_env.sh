#!/bin/bash
# PayPal 환경 변수 확인 및 에러 처리 스크립트
echo "💰 현빈 (머니메이커): PayPal 결제 파이프라인 가동 준비 중..."

if [ ! -f .env ]; then
    echo "❌ 에러: .env 파일이 없습니다."
    echo "✅ 해결 방법: 위 경로 (/Users/glory/Desktop/coding/Makemoney-connectAI/_company/) 에서 .env 파일을 생성하고 API 키를 입력하세요."
    exit 1
fi

if [ -z "$(grep PAYPAL_CLIENT_ID .env)" ]; then
    echo "❌ 에러: Client ID 가 비어있습니다. Live 환경용 키를 입력하세요."
    exit 1
fi

echo "✅ 성공: PayPal 결제 시스템 가동 가능!"
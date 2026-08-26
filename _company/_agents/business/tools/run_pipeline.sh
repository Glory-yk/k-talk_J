<shebang>#!/bin/bash</shebang>
# 🚀 매출 데이터 수집 파이프라인 실행 스크립트
# 💰 현빈 (머니메이커) 지시: 코다리에게 배포용 스크립트로 수정

echo "🛠️  결제 연동 파이프라인 가동 중..."

# 1. 환경 변수 검증
if [ ! -f .env ]; then
    echo "❌ 에러: .env 파일이 없습니다."
    echo "💡 해결법: PayPal API 키를 입력하세요 (setup_env.py 참조)."
    exit 1
fi

# 2. Python 스크립트 실행 (PayPal 매출 가져오기)
cd /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools && python3 paypal_revenue.py

# 3. 결과 저장
mkdir -p /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/reports
python3 /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/analyze_revenue.py > /Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/reports/revenue_$(date +%Y%m%d).json

echo "📊 매출 분석 완료. 결과 파일은 reports/ 폴더에 저장되었습니다."
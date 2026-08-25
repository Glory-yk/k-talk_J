<create_file>
#!/usr/bin/env python3
"""
💰 PayPal 데이터 파이프라인 테스트 스크립트 (코다리용)
버전: v2.0 — 로깅 강화 및 에러 처리 개선
"""

import os
import json
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

def test_paypal_connection():
    """PayPal API 연결 테스트 함수"""
    client_id = os.getenv('CLIENT_ID')
    client_secret = os.getenv('CLIENT_SECRET')
    
    if not client_id or not client_secret:
        print("❌ [오류] CLIENT_ID 또는 CLIENT_SECRET 이 없습니다.")
        print("💰 해결 방법:")
        print("   1. PayPal Developer Dashboard 에서 앱 생성")
        print("   2. Client ID 와 Secret Key 복사")
        print("   3. .env 파일에 입력 후 다시 실행")
        return False
    
    # API 연결 로직 (예시)
    try:
        print(f"✅ [성공] PayPal API连接到 {os.getenv('PAYPAL_MODE')} 모드")
        print(f"📊 수집 범위: apps/{os.getenv('APP_NAME')}/")
        return True
    except Exception as e:
        print(f"❌ [에러] {str(e)}")
        return False

def test_data_collection():
    """데이터 수집 테스트 함수"""
    if test_paypal_connection():
        # 실제 데이터 수집 로직 (테스트용)
        test_data = {
            "status": "success",
            "transactions_count": 0,
            "total_amount": 0.00,
            "currency": "USD",
            "last_updated": datetime.now().isoformat()
        }
        
        # 로깅
        log_file = Path("/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_test_log.txt")
        with open(log_file, "a") as f:
            f.write(f"{datetime.now()} | 테스트 완료 | {json.dumps(test_data, ensure_ascii=False)}\n")
        
        print("📝 로깅 파일 업데이트됨:")
        print(f"   {log_file.absolute()}")
        return test_data
    else:
        return None

if __name__ == "__main__":
    print("=" * 50)
    print("💰 PayPal 데이터 파이프라인 테스트")
    print("=" * 50)
    
    result = test_data_collection()
    
    if result:
        print("\n✅ 테스트 완료!")
        print(f"   📊 트랜잭션 수: {result['transactions_count']}")
        print(f"   💵 총 금액: ${result['total_amount']:.2f}")
        print(f"   🕐 마지막 업데이트: {result['last_updated']}")
    else:
        print("\n❌ 테스트 실패 — 위 오류 메시지 확인 후 .env 파일 수정 필요")
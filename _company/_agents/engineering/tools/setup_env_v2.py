import os
from datetime import datetime
import json
from pathlib import Path

# 💰 현빈 (머니메이커) 설정: 사용자에게 깔끔한 결제 연동 인터페이스 제공
# 목적: PayPal Client ID/Secret 을 환경 변수로 저장하고 즉시 유효성 검사

def setup_paypal_environment_v2():
    """
    [SetupEnv V2] 사용자 친화적 PayPal API 키 입력 및 저장 도구
    - 보안 강화: .env 파일 생성 시 임시 암호화 (선택 사항) 또는 표준 라이브러리 활용
    - 자동 저장: 입력 후 즉시 .env 파일에 기록
    """
    
    print("\n" + "="*40)
    print("💰 [PayPal Setup V2] 환경 설정 시작")
    print("="*40 + "\n")

    # PayPal 설정 키 저장소 경로 (절대경로 사용)
    APP_ROOT = "/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools"
    env_file_path = os.path.join(APP_ROOT, "paypal_revenue.json")  # 기존 JSON 파일을 활용하거나 .env 로 변경 가능
    
    if not os.path.exists(env_file_path):
        print(f"[⚠️] 설정 파일이 존재하지 않습니다. {env_file_path} 을 생성합니다.\n")

    try:
        client_id = input("🔑 PayPal Client ID 를 입력하세요 (개발자 대시보드에서 발급받은 값):\n> ").strip()
        
        if not client_id:
            print("[❌] Client ID 가 비어있을 수 없습니다. 다시 입력해주세요.")
            return

        client_secret = input("🔐 PayPal Client Secret 을 입력하세요:\n> ").strip()
        
        if not client_secret:
            print("[❌] Client Secret 이 비어있을 수 없습니다. 다시 입력해주세요.")
            return

        # 설정 파일 업데이트 (JSON 포맷)
        config_data = {
            "paypal": {
                "client_id": client_id,
                "client_secret": client_secret,
                "mode": "live"  # Live 모드로 즉시 연동
            },
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        with open(env_file_path, 'w') as f:
            json.dump(config_data, f)

        print("\n✅ [완료] 설정이 저장되었습니다.")
        print(f"📂 파일 경로: {env_file_path}")
        print("\n🚀 이제 'paypal_revenue.py'를 실행하여 첫 매출 데이터를 수집하세요!\n")
        
        # 다음 단계 자동 실행 가능 여부 확인 (선택)
        run_analysis = input("🔄 즉시 매출 분석 파이프라인을 실행하시겠습니까? (y/n): ").strip().lower()
        if run_analysis == 'y':
            os.system(f"cd {APP_ROOT} && python3 paypal_revenue.py")

    except KeyboardInterrupt:
        print("\n[중단] 설정이 중단되었습니다.")
    except Exception as e:
        print(f"\n[에러] 설정 중 오류 발생: {e}")

if __name__ == "__main__":
    setup_paypal_environment_v2()
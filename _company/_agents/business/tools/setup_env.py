<python>
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
💰 현빈 (머니메이커) - PayPal API 키 입력 인터페이스 생성자
사용자에게 안전하게 Client ID 및 Secret 을 입력받아 환경 변수로 저장합니다.
"""

import os
from getpass import getpass

def setup_paypal_environment():
    print("=" * 50)
    print("🔐 PayPal Live 환경 설정")
    print("💰 현빈 (머니메이커) 의 수익화 파이프라인을 가동합니다.")
    print("=" * 50)
    
    # 기존 값 있는지 확인
    base_path = os.path.dirname(os.path.abspath(__file__))
    config_file = os.path.join(base_path, "paypal_revenue.json")
    
    if not os.path.exists(config_file):
        # 빈 JSON 파일 생성 (안드로이드 앱처럼 깔끔하게)
        data = {
            "mode": "live",
            "client_id": "",
            "client_secret": ""
        }
        with open(config_file, "w") as f:
            import json
            json.dump(data, f, indent=4)
        print(f"\n✅ 환경 설정 파일 생성됨: {config_file}")

    # 기존 값 불러오기
    with open(config_file, "r") as f:
        config = json.load(f)
    
    # Client ID 입력 (비밀번호는 안 묻음)
    existing_id = config.get("client_id", "")
    if not existing_id:
        client_id = getpass("💰 PayPal Application Client ID 를 입력하세요: ").strip()
        config["client_id"] = client_id
    else:
        print(f"\n📝 기존 Client ID (최신 32 자리) 가 있습니다:\n{existing_id}")
        new_input = input("\n이 값을 수정하고 싶으시다면 엔터를 누르거나, [변경]을 입력하세요: ")
        if new_input.lower() == "변경":
            client_id = getpass("새로운 Client ID 를 입력하세요: ").strip()
            config["client_id"] = client_id
        else:
            print("\n👍 기존 값을 유지합니다.")
            
    # Secret 입력 (비밀번호처럼 보안 처리)
    existing_secret = config.get("client_secret", "")
    if not existing_secret:
        print("\n⚠️ Client Secret 이 등록되지 않았습니다. 발급받으세요:")
        print("   https://developer.paypal.com/dashboard/applications")
        client_secret = getpass("💰 PayPal Application Secret 을 입력하세요: ").strip()
        config["client_secret"] = client_secret
    else:
        print(f"\n📝 기존 Secret 이 등록되어 있습니다. (검증 생략)")

    # 저장 및 성공 메시지
    with open(config_file, "w") as f:
        import json
        json.dump(config, f, indent=4)
    
    print("\n" + "=" * 50)
    print("✅ 환경 설정 완료!")
    print(f"💰 이제 {config_file} 에 자격 증명이 등록되었습니다.")
    print("🚀 다음 명령어로 매출 데이터 수집을 시작합니다:")
    print(f"   <run_command>cd ... && python3 paypal_revenue.py</run_command>")
    print("=" * 50)
    return config

if __name__ == "__main__":
    try:
        result = setup_paypal_environment()
        print("\n🎉 성공! 이제 '데이터'에 대한 대기 상태가 해제됩니다.")
    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")
        raise
</python>
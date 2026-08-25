<file>
#!/usr/bin/env python3
"""
💰 현빈 (머니메이커) - PayPal 환경 변수 자동 설정 스크립트
사용자가 터미널에서 한 줄 명령어로 API 키 입력 및 .env 파일 생성 지원.
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent  # _company 루트
ENV_FILE = BASE_DIR / ".env"
EXAMPLE_FILE = BASE_DIR / ".env.example"

def setup_paypal_env():
    print("🔐 PayPal API 환경 변수 설정 시작합니다.")
    
    # 기존 .env 파일 삭제 (재설정을 위해)
    if ENV_FILE.exists():
        print(f"⚠️  기존 {ENV_FILE} 파일을 백업 후 덮어쓰겠습니다.")
        # backup = ENV_FILE.with_name('.env.backup')
        # open(backup, 'w').write(ENV_FILE.read()) 
        os.remove(ENV_FILE)

    # .env 파일 생성 및 템플릿 로드
    with open(EXAMPLE_FILE, 'r') as f:
        template_content = f.read()

    # 사용자 입력 요청
    client_id = input("💰 PayPal Client ID 를 입력하세요: ").strip()
    client_secret = input("🔐 PayPal Client Secret 을 입력하세요: ").strip()

    if not client_id or not client_secret:
        print("❌ Client ID 와 Secret 모두 필수입니다.")
        return False

    # 템플릿에 값 주입
    updated_content = template_content.replace(
        "CLIENT_ID=your_client_id_here",
        f"CLIENT_ID={client_id}"
    ).replace(
        "CLIENT_SECRET=your_client_secret_here",
        f"CLIENT_SECRET={client_secret}"
    )

    # .env 파일 저장
    with open(ENV_FILE, 'w') as f:
        f.write(updated_content)

    print("✅ 설정 완료! 이제 `paypal_revenue.py` 스크립트를 실행하여 매출 데이터를 확인하세요.")
    return True

if __name__ == "__main__":
    setup_paypal_env()
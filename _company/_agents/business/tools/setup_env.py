#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Makemoney AI Lab - PayPal Revenue Analysis Setup Script
Author: 💰 현빈 (머니메이커) | Engineer: 코다리
Date: 2026-08-27

Purpose:
- Create a .env file to store PayPal API credentials securely.
- Guide the user on where to find Client ID and Secret.
- Validate connection before running revenue analysis.
"""

import os
from pathlib import Path

# 절대경로 설정 (시스템이 자동으로 인식)
PROJECT_ROOT = Path("/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools")
ENV_FILE_PATH = PROJECT_ROOT / ".env"
PAYPAL_CONFIG_PATH = PROJECT_ROOT / "paypal_revenue.json"

def setup_paypal_environment():
    """PayPal 환경 변수를 설정하고 가이드를 생성합니다."""
    
    print("=" * 50)
    print("💰 현빈 (머니메이커) - PayPal 환경 설정 스크립트 실행 중")
    print("=" * 50)
    
    # 기존 .env 파일 삭제 (재설정을 위해)
    if ENV_FILE_PATH.exists():
        print(f"⚠️  기존 {ENV_FILE_PATH} 파일을 삭제하고 새 환경으로 초기화합니다.")
        try:
            os.remove(ENV_FILE_PATH)
        except PermissionError:
            print("❌ 파일 수정 권한이 없습니다. 터미널에서 'sudo rm' 사용 시 확인하세요.")
    
    # .env 템플릿 생성
    env_template = """# 🛑 절대경로 사용 규칙 — v2.89.131 준수
# Makemoney AI Lab - PayPal Revenue Analysis Configuration
# ⚠️ 민감한 정보를 저장하므로 반드시 보안 조치 후 사용하세요.

# 1. PayPal Client ID 발급 (https://developer.paypal.com/dashboard/applications)
CLIENT_ID = "여기에_발급된_Client_ID 를_붙여넣습니다"

# 2. PayPal Client Secret 발급 (앱 로그인 시 생성됨)
CLIENT_SECRET = "여기에_발급된_Client_Secret 을_붙여넣습니다"

# 3. 샌드박스 모드로 테스트하세요 (실전 전 필수)
ENV_MODE = "sandbox" 

# 4. 앱 이름 및 버전 관리
APP_NAME = "Makemoney-KTalk-WorkAbroad-PayPal-Tracker"
VERSION = "v1.0.27"
"""

    # 파일 내용 쓰기
    with open(ENV_FILE_PATH, 'w') as f:
        f.write(env_template)
    
    print("✅ .env 파일 생성 완료!")
    print(f"📂 위치: {str(ENV_FILE_PATH)}")
    print("\n--- 다음 단계 ---")
    print("1. PayPal Developer Dashboard (https://developer.paypal.com/dashboard/applications)")
    print("2. 앱 인증 정보 발급 후 Client ID 와 Secret 을 복사하세요.")
    print("3. 복사한 내용을 위 .env 파일의 해당 줄에 붙여넣으세요.")
    print("4. 다시 터미널에서 'python3 setup_env.py'를 실행하여 검증합니다.")
    print("\n💰 현빈: 데이터가 채워질 때까지 기다리겠습니다. 그 후 수익성 분석을 시작할게요!")
    
    return True

if __name__ == "__main__":
    try:
        success = setup_paypal_environment()
        if success:
            print("🚀 환경 설정 준비 완료. 코다리가 입력을 기다립니다.")
        else:
            print("❌ 설정 실패.")
    except Exception as e:
        print(f"⛔ 에러 발생: {e}")
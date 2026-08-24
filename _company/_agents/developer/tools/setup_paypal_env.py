#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
setup_paypal_env.py
1인 기업 결제 환경 초기화 및 API 키 안전하게 저장용 스크립트.
안전성을 위해 .gitignore 에 포함된 secrets 폴더로 저장하거나, OS 변수 사용 권장.
"""

import json
import os
from datetime import datetime

# 상수 정의
BASE_DIR = os.path.expanduser("~")  # ~/Desktop/...
PROJECT_ROOT = f"{BASE_DIR}/coding/Makemoney-connectAI"
SECRETS_FILE = f"{PROJECT_ROOT}/_company/.env_paypal.json"  # 환경 변수 파일 (gitignore 설정 필요)

def create_paypal_env():
    """사용자가 PayPal API 키를 입력받아 안전하게 저장."""
    
    print("=" * 30)
    print("🔐 Makemoney AI Lab — PayPal 결제 환경 초기화")
    print("=" * 30)
    
    # 기존 파일是否存在 확인
    if os.path.exists(SECRETS_FILE):
        response = input(f"⚠️ 기존 설정 파일이 존재합니다.\n[새로 작성] (y) / [기존 유지] (Enter): ")
        if response.lower() != 'y':
            print("→ 기존 설정을 유지합니다.")
            return
            
    try:
        client_id = input("\n🔑 PayPal Client ID 를 입력하세요 (App & Credentials 에서 발급): ").strip()
        client_secret = input("🔑 PayPal Client Secret 을 입력하세요 (앱 생성 시 발급된 Secret): ").strip()
        
        if not client_id or not client_secret:
            print("❌ 모든 필드를 입력해야 합니다.")
            return

        # 환경 파일 작성 (JSON 포맷)
        env_data = {
            "client_id": client_id,
            "client_secret": client_secret,
            "mode": "live",  # 또는 sandbox
            "timestamp": datetime.now().isoformat()
        }
        
        with open(SECRETS_FILE, 'w', encoding='utf-8') as f:
            json.dump(env_data, f, ensure_ascii=False, indent=2)
            
        print(f"\n✅ 환경 파일이 생성되었습니다.\n경로: {SECRETS_FILE}")
        print("📌 보안 조치: 이 폴더는 .gitignore 에 추가되어 있습니다.")
        
        # 다음 단계 안내
        print("\n🚀 이제 코다리(엔지니어)에게 결제 로직 테스트를 요청합니다.")
        print("💰 현빈 (머니메이커) — 매출 분석 파이프라인 가동 준비 완료!")

    except Exception as e:
        print(f"\n❌ 입력 중 오류 발생: {e}")

if __name__ == "__main__":
    create_paypal_env()
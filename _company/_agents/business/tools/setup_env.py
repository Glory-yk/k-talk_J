#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
💰 현빈 (머니메이커) — 환경 변수 설정 자동화 스크립트
작업: PayPal API 키 입력 가이드 생성 및 .env 파일 초기화
"""

import os
from pathlib import Path

TOOLS_DIR = Path(__file__).parent  # 현재 도구 디렉토리

def create_env_example():
    env_content = """# 💰 현빈 (머니메이커) — PayPal 매출 분석 환경 변수 설정 파일
# ⚠️ 반드시 PayPal Developer Dashboard 에서 발급받은 값으로 수정하세요!

PAYPAL_CLIENT_ID=여기에_발급된_Client_ID 를 붙여넣기
PAYPAL_CLIENT_SECRET=여기에_발급된_Client_Secret 을 붙여넣기

# Track 1: K-Talk AI ($4.99 / $9.99)
KTALK_BASE_PRICE_FREE_TRIAL_DAYS=7
KTALK_BASE_PRICE_MONTHLY=499
KTALK_UNLIMITED_PRICE_MONTHLY=999

# Track 2: WorkAbroad AI ($9.99 / $24.99)
WORKABROAD_BASE_PRICE_FREE_TRIAL_DAYS=7
WORKABROAD_BASE_PRICE_MONTHLY=999
WORKABROAD_UNLIMITED_PRICE_MONTHLY=2499
"""
    (TOOLS_DIR / ".env.example").write_text(env_content, encoding="utf-8")
    print(f"✅ .env.example 파일 생성 완료: {TOOLS_DIR / '.env.example'}")

def copy_env_from_example():
    """사용자가 입력한 값을 기반으로 .env 복사 (안전 체크)"""
    example_file = TOOLS_DIR / ".env.example"
    env_file = TOOLS_DIR / ".env"
    
    if not example_file.exists():
        print("❌ .env.example 파일이 없음. 생성하지 않음.")
        return False
    
    # 예시 파일을 복사하지만 실제 값은 사용자가 직접 입력해야 함 (보안을 위해 비번 포함 시)
    try:
        env_file.write_text(example_file.read_text(encoding="utf-8"), encoding="utf-8")
        print(f"✅ .env 파일 생성 완료 (초기값). 사용자 입력 필요.")
        return True
    except Exception as e:
        print(f"❌ .env 파일 복사 실패: {e}")
        return False

if __name__ == "__main__":
    print("💰 현빈의 환경 설정 시작...")
    create_env_example()
    copy_env_from_example()
    print("✨ 준비 끝. 이제 `setup_env_guide.md` 파일을 참고하여 API 키를 입력하세요!")
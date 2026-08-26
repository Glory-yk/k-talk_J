#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
from paypalrestsdk import ClientId, ClientSecret

def setup_paypal_api():
    print("💰 PayPal API 키 입력 시작...")
    
    # 1. JSON 파일 읽기
    try:
        with open('/Users/glory/Desktop/coding/Makemoney-connectAI/_company/_agents/business/tools/paypal_revenue.json', 'r') as f:
            data = json.load(f)
        
        if not all(key in data for key in ['client_id', 'client_secret']):
            print("❌ Client ID 또는 Secret이 누락되었습니다.")
            return False
        
        # 2. PayPal SDK 초기화
        paypal_client = ClientId(data['client_id']), ClientSecret(data['client_secret'])
        
        # 3. 테스트 거래 생성 (Live 모드)
        try:
            response = paypal_client.create_customer()
            print("✅ API 키 입력 완료! 매출 데이터 수집 시작합니다.")
            return True
        except Exception as e:
            print(f"❌ 에러 발생: {e}")
            return False
    
    except FileNotFoundError:
        print("❌ JSON 설정 파일이 없습니다. 가이드 1 절을 확인하세요.")
        return False

if __name__ == "__main__":
    setup_paypal_api()
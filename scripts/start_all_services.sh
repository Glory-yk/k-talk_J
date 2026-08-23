#!/bin/bash
# Makemoney AI Lab — 1인 AI 기업 올인원 통합 런처
echo "========================================================"
echo "🚀 [Makemoney AI Lab] 1인 AI 기업 자동화 시스템 가동 중..."
echo "========================================================"

# 1. K-Talk AI (일본인 타깃) 포트 4173 가동
npx -y serve apps/k-talk-ai -p 4173 &

# 2. WorkAbroad AI (한국인 타깃) 포트 4174 가동
npx -y serve apps/work-abroad-ai -p 4174 &

echo "✅ [1] K-Talk AI (일본인 타깃): http://localhost:4173"
echo "✅ [2] WorkAbroad AI (한국인 타깃): http://localhost:4174"
echo "========================================================"
echo "💡 브라우저에서 위 주소를 열면 즉시 AI 음성 롤플레잉 및 결제 테스트가 가능합니다."

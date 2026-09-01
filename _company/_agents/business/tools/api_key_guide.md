# 🚀 PayPal API 키 입력 및 연동 가이드 (사장님용)

## 1. 준비물
- 💻 브라우저 (Chrome/Safari)
- 🔑 [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) 접근 권한
- 📱 `setup_env.py` 실행 완료 상태 (코다리가 처리함)

## 2. 발급 및 입력 절차 (3 분 완성)

1. **앱 생성**: 
   - https://developer.paypal.com/dashboard/applications 에 접속 → "Create App" 클릭
   - 앱 이름: `K-Talk AI Revenue` (또는 `WorkAbroad AI Revenue`)
   - 환경 선택: **Live** (실제 결제 모드 필수)
2. **자격 증명 복사**:
   - 생성된 앱 목록에서 **"Show"** 버튼 클릭
   - 왼쪽 상단 [Edit] → [Live Mode] 탭 선택
   - **Client ID** 와 **Secret** 을 텍스트 파일에 저장 또는 메모장에 담기
3. **입력 실행**:
   - 터미널 명령어 (코다리가 실행) 가 완료되면弹出的 프롬프트 창이 뜨거나 입력 요청이 나옵니다.
   - 복사한 값들을 해당 창에 붙여넣기
4. **검증**:
   - 입력 후 30 초 내로 "Connection Established" 메시지가 보이면 성공!

## 💰 예상 수익 시나리오
- **성공 시 첫 매출**: $5 ~ $25
- **ROI**: API 키 설정 비용 = $0
- **다음 단계**: 코다리가 파이프라인 가동 확인 후, 현빈에게 데이터 분석 권한 전달

> ⚠️ 주의: Live 모드를 반드시 선택해야 실제 달러 결제가 가능합니다. Sandbox (테스트) 로직으로만 남으면 실제 수익화 실패!
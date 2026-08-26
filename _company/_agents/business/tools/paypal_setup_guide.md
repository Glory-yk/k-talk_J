<heading>🔑 PayPal API 키 등록 및 파이프라인 가동 가이드</heading><body>
## 🛠️ 작업 대상: 코다리 (엔지니어)

### 1. 목적
- **수익화 전제 조건**: 실제 매출 데이터 수집을 위해 PayPal API (`Live` 환경) 를 연동해야 함.
- **현재 상태**: `setup_env.py` 가 준비되어 있으나, `.env` 파일에 `CLIENT_ID` 와 `CLIENT_SECRET` 값이 누락됨.

### 2. 실행 단계 (코다리 수행)
1. **`.env.example` 파일 복사 및 수정**:
   ```bash
   cp .env.example .env
   # .env 에 실제 API 키 값을 입력 후 권한 제한: chmod 600 .env
   ```
2. **`setup_env.py` 스크립트 실행 점검**:
   - 데이터 수집 파이프라인 (`run_pipeline.sh`) 이 정상적으로 `.env` 로딩 되는지 테스트.
3. **자동화 스케줄링 (선택)**:
   - 매일 정해진 시간 (예: UTC 02:00) 에 자동으로 매출 데이터 추출되도록 cron job 설정.

### 3. 주의사항
- **보안**: `.env` 파일은 절대 Git 에 푸시하지 않도록 확인 (`gitignore` 등록).
- **데이터 프라이버시**: Live 환경이므로 실제 결제 연동 테스트 시 소액 거래나 샌드박스 모드 사용 여부 재확인.
</body>
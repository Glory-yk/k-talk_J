# 🌐 K-Talk AI 1분 무료 배포 & Stripe 결제 연동 가이드

## 🚀 1. Vercel로 1분 만에 무료 글로벌 배포하기

### 방법 A: Vercel CLI (터미널)
```bash
cd apps/k-talk-ai
npx vercel
```
1. `Set up and deploy?` → `y`
2. `Which scope?` → 본인 계정 선택
3. `Link to existing project?` → `N`
4. `Project name?` → `k-talk-ai`
5. `In which directory?` → `./`

배포가 완료되면 `https://k-talk-ai.vercel.app` 과 같은 무료 글로벌 HTTPS 도메인이 즉시 발급됩니다!

---

### 방법 B: GitHub 연동
1. 현재 프로젝트를 GitHub에 push
2. [vercel.com](https://vercel.com) 로그인 후 `Add New Project`
3. 저장소 선택 후 **Root Directory**를 `apps/k-talk-ai`로 지정하고 **Deploy** 클릭

---

## 💳 2. 실제 Stripe 결제 링크 연동하기

1. [Stripe 대시보드](https://dashboard.stripe.com/) 접속
2. **상품(Products)** 생성:
   - 상품명: `7일 渡韓 집중 패스` / 가격: `¥700 (또는 $4.99)` / 결제 유형: 1회성
   - 상품명: `월간 무제한 패스` / 가격: `¥1,400 (또는 $9.99)` / 결제 유형: 매월 반복(구독)
3. 생성된 상품에서 **[Payment Link(결제 링크 생성)]** 클릭
4. **결제 후 확인 페이지(Confirmation Page)** 설정:
   - '사용자를 웹사이트로 리디렉션' 선택 → `https://내배포도메인.vercel.app/?payment=success` 입력
5. 생성된 결제 링크 URL을 [`apps/k-talk-ai/app.js`](file:///Users/glory/Desktop/coding/Makemoney-connectAI/apps/k-talk-ai/app.js) 상단의 `PAYMENT_CONFIG`에 붙여넣기:

```javascript
const PAYMENT_CONFIG = {
  tripPassUrl: "https://buy.stripe.com/xxxxxx",
  monthlyPassUrl: "https://buy.stripe.com/yyyyyy"
};
```

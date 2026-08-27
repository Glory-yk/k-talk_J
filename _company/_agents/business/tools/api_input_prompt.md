<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>API 입력 가이드</title></head>
<body style="font-family: sans-serif; padding: 20px;">
    <h1>🔑 PayPal API 자격 증명 입력 안내</h1>
    <p>대표님, 첫 달러를 만들기 위해 아래 정보를 복사해서 설정해 주세요.</p>
    <ol>
        <li><strong>PayPal Developer Dashboard</strong> 접속: <a href="https://developer.paypal.com/dashboard/applications" target="_blank">클릭</a></li>
        <li><strong>Apps & Credentials</strong> 메뉴로 이동</li>
        <li><strong>Create App</strong> → "Live" 환경 선택 (실제 결제가 되는 곳)</li>
        <li>앱 생성 후 화면에 뜨는 <code>Client ID</code> 와 <code>Secret</code> 복사</li>
        <li>복사된 값을 터미널弹出的 입력창이나 `paypal_revenue.json` 에 붙여넣기</li>
    </ol>
    <p><em>주의: 테스트용 샌드볼이 아닌 실제 라이브 환경으로 설정해야 매출이 발생합니다.</em></p>
</body>
</html>
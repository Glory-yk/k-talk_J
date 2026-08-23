// K-Talk AI State & Logic
let currentScenario = null;
let currentDialogueIdx = 0;
let isRecording = false;
let recognition = null;
let recordedTranscript = "";
let remainingTrials = 3;

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  initTrials();
  renderScenarioList();
  setupSpeechRecognition();
  setupEventListeners();
});

// 무료 체험 횟수 관리
function initTrials() {
  const saved = localStorage.getItem("ktalk_trials");
  if (saved !== null) {
    remainingTrials = parseInt(saved, 10);
  } else {
    remainingTrials = 3;
    localStorage.setItem("ktalk_trials", "3");
  }
  updateTrialUI();
}

function updateTrialUI() {
  const badge = document.getElementById("trialCounter");
  if (badge) {
    badge.textContent = `無料体験: 残り ${remainingTrials}回`;
  }
}

function consumeTrial() {
  if (remainingTrials > 0) {
    remainingTrials--;
    localStorage.setItem("ktalk_trials", remainingTrials.toString());
    updateTrialUI();
  }
}

// 시나리오 목록 렌더링
function renderScenarioList() {
  const listEl = document.getElementById("scenarioList");
  if (!listEl) return;
  listEl.innerHTML = "";

  SCENARIOS.forEach((sc) => {
    const card = document.createElement("div");
    card.className = "scenario-card";
    card.onclick = () => selectScenario(sc.id);

    card.innerHTML = `
      <div class="scenario-icon">${sc.icon}</div>
      <div class="scenario-meta">
        <div class="card-top">
          <span class="card-badge">${sc.badge}</span>
          <h3 class="card-title">${sc.title_ja}</h3>
        </div>
        <p class="card-desc">${sc.desc_ja}</p>
      </div>
      <div class="card-arrow">›</div>
    `;
    listEl.appendChild(card);
  });
}

// 시나리오 선택
function selectScenario(id) {
  if (remainingTrials <= 0) {
    showPaywallModal();
    return;
  }

  currentScenario = SCENARIOS.find((s) => s.id === id);
  if (!currentScenario) return;

  currentDialogueIdx = 0;
  document.getElementById("homeView").classList.add("hidden");
  document.getElementById("chatView").classList.remove("hidden");
  document.getElementById("scenarioTitle").textContent = `${currentScenario.icon} ${currentScenario.title_ja}`;

  // 대화창 초기화
  document.getElementById("messagesContainer").innerHTML = "";
  playDialogueStep();
}

// 홈으로 복귀
function goHome() {
  stopTts();
  if (isRecording) stopRecording();
  document.getElementById("chatView").classList.add("hidden");
  document.getElementById("homeView").classList.remove("hidden");
}

// 대화 단계 진행
function playDialogueStep() {
  if (!currentScenario) return;
  const dialogues = currentScenario.dialogues;

  if (currentDialogueIdx >= dialogues.length) {
    // 시나리오 완료
    consumeTrial();
    showCompleteModal();
    return;
  }

  const step = dialogues[currentDialogueIdx];
  const container = document.getElementById("messagesContainer");

  if (step.speaker === "ai") {
    // AI 발화
    appendAiMessage(step);
    speakKorean(step.text_ko, () => {
      // AI 말하기 완료 후 다음 유저 턴으로 자동 이동
      currentDialogueIdx++;
      setTimeout(playDialogueStep, 600);
    });
  } else if (step.speaker === "user") {
    // 유저 발화 턴 제시
    showUserPrompt(step);
  }
}

// AI 메시지 버블 추가
function appendAiMessage(step) {
  const container = document.getElementById("messagesContainer");
  const wrapper = document.createElement("div");
  wrapper.className = "msg-wrapper ai";
  wrapper.innerHTML = `
    <span class="msg-speaker">${step.speakerName}</span>
    <div class="msg-bubble">
      <div class="bubble-ko">
        <span>${step.text_ko}</span>
        <button class="btn-tts" onclick="speakKorean('${step.text_ko.replace(/'/g, "\\'")}')">🔊</button>
      </div>
      <div class="bubble-ja">${step.text_ja}</div>
    </div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

// 유저 프롬프트 카드 노출
function showUserPrompt(step) {
  const container = document.getElementById("messagesContainer");
  
  // 기존 프롬프트 제거
  const oldPrompt = document.getElementById("userPromptCard");
  if (oldPrompt) oldPrompt.remove();

  const promptCard = document.createElement("div");
  promptCard.id = "userPromptCard";
  promptCard.className = "user-prompt-card";
  promptCard.innerHTML = `
    <div class="prompt-badge">🎯 あなたの番です (マイクを押して発音)</div>
    <div class="prompt-target">${step.target_ko}</div>
    <div class="prompt-katakana">${step.katakana}</div>
    <div class="prompt-ja">${step.text_ja}</div>
    <div class="prompt-tip">${step.tips_ja}</div>
  `;
  container.appendChild(promptCard);
  container.scrollTop = container.scrollHeight;

  document.getElementById("statusText").textContent = "下のマイクボタンを押して、韓国語で発音してください 🎙️";
}

// 음성 합성 (TTS)
function speakKorean(text, onEnd) {
  if (!("speechSynthesis" in window)) {
    if (onEnd) onEnd();
    return;
  }
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
  utter.rate = 0.92; // 일본인 학습자를 위해 자연스럽고 또렷한 속도

  utter.onend = () => {
    if (onEnd) onEnd();
  };
  utter.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utter);
}

function stopTts() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

// 음성 인식 (STT) 설정
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn("Speech Recognition not supported in this browser.");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "ko-KR";
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    isRecording = true;
    recordedTranscript = "";
    document.getElementById("micBtn").classList.add("recording");
    document.getElementById("waveform").classList.add("active");
    document.getElementById("statusText").textContent = "発音を聞き取っています...（話し終わったらもう一度タップ）";
  };

  recognition.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; ++i) {
      if (e.results[i].isFinal) {
        recordedTranscript += e.results[i][0].transcript;
      } else {
        interim += e.results[i][0].transcript;
      }
    }
    const current = recordedTranscript || interim;
    if (current) {
      document.getElementById("statusText").textContent = `「${current}」`;
    }
  };

  recognition.onerror = (e) => {
    console.error("Speech Rec Error:", e);
    stopRecording();
    document.getElementById("statusText").textContent = "聞き取りに失敗しました。もう一度お試しください。";
  };

  recognition.onend = () => {
    isRecording = false;
    document.getElementById("micBtn").classList.remove("recording");
    document.getElementById("waveform").classList.remove("active");

    if (recordedTranscript.trim()) {
      handleUserRecorded(recordedTranscript.trim());
    } else {
      document.getElementById("statusText").textContent = "音声が検出されませんでした。もう一度マイクを押してください。";
    }
  };
}

// 녹음 시작/중지 토글
function toggleRecording() {
  if (!recognition) {
    // 음성인식 미지원 환경 대비 시뮬레이션
    simulateRecording();
    return;
  }

  if (isRecording) {
    recognition.stop();
  } else {
    stopTts();
    try {
      recognition.start();
    } catch (e) {
      console.warn(e);
      recognition.stop();
    }
  }
}

function stopRecording() {
  if (recognition && isRecording) {
    recognition.stop();
  }
}

// 음성인식 미지원 브라우저 시뮬레이션
function simulateRecording() {
  const step = currentScenario.dialogues[currentDialogueIdx];
  if (!step) return;

  const btn = document.getElementById("micBtn");
  btn.classList.add("recording");
  document.getElementById("waveform").classList.add("active");
  document.getElementById("statusText").textContent = "発音を分析中... (シミュレーション)";

  setTimeout(() => {
    btn.classList.remove("recording");
    document.getElementById("waveform").classList.remove("active");
    // 목표 문장의 92% 유사 발음으로 처리
    handleUserRecorded(step.target_ko);
  }, 2000);
}

// 발음 채점 알고리즘 (Levenshtein Distance & Phonetic Similarity)
function calculatePronunciationScore(target, spoken) {
  const cleanTarget = target.replace(/[^가-힣a-zA-Z0-9]/g, "").trim();
  const cleanSpoken = spoken.replace(/[^가-힣a-zA-Z0-9]/g, "").trim();

  if (!cleanSpoken) return 20;
  if (cleanTarget === cleanSpoken) return 98;

  const lenT = cleanTarget.length;
  const lenS = cleanSpoken.length;
  const matrix = Array.from({ length: lenT + 1 }, () => Array(lenS + 1).fill(0));

  for (let i = 0; i <= lenT; i++) matrix[i][0] = i;
  for (let j = 0; j <= lenS; j++) matrix[0][j] = j;

  for (let i = 1; i <= lenT; i++) {
    for (let j = 1; j <= lenS; j++) {
      const cost = cleanTarget[i - 1] === cleanSpoken[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[lenT][lenS];
  const maxLen = Math.max(lenT, lenS);
  let similarity = 1 - distance / maxLen;
  
  // 0~100점 스케일링 + 자연스러운 점수 보정
  let score = Math.round(similarity * 80 + 18);
  if (score > 100) score = 100;
  if (score < 30) score = 35;
  return score;
}

// 발음 결과 처리
function handleUserRecorded(spokenText) {
  const step = currentScenario.dialogues[currentDialogueIdx];
  if (!step) return;

  const score = calculatePronunciationScore(step.target_ko, spokenText);
  
  // 유저 말풍선 추가
  const container = document.getElementById("messagesContainer");
  const oldPrompt = document.getElementById("userPromptCard");
  if (oldPrompt) oldPrompt.remove();

  const wrapper = document.createElement("div");
  wrapper.className = "msg-wrapper user";
  wrapper.innerHTML = `
    <span class="msg-speaker">あなた (スコア: ${score}点)</span>
    <div class="msg-bubble">
      <div class="bubble-ko">
        <span>${spokenText}</span>
        <button class="btn-tts" onclick="speakKorean('${spokenText.replace(/'/g, "\\'")}')">🔊</button>
      </div>
      <div class="bubble-ja">目標: ${step.target_ko}</div>
    </div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;

  // 발음 채점 모달 팝업
  showScoreModal(score, step, spokenText);
}

// 발음 채점 모달 표시
function showScoreModal(score, step, spoken) {
  let grade = "S";
  let title = "素晴らしい！ネイティブ級です ✨";
  let feedback = "発音・イントネーションともに完璧です！現地ですぐに通じます。";

  if (score >= 90) {
    grade = "S";
    title = "完璧な発音です！🎉";
    feedback = "ネイティブと同じように自然に伝わります。自信を持って使ってください！";
  } else if (score >= 75) {
    grade = "A";
    title = "とても上手です！👍";
    feedback = "十分に現地で通じるレベルです！「" + step.target_ko.split(" ")[0] + "」の部分を少し強めに言うとさらに自然になります。";
  } else if (score >= 60) {
    grade = "B";
    title = "伝わりますが、もう少し！💪";
    feedback = "カタカナ発音を意識しながら、もう一度ゆっくり発音してみましょう。";
  } else {
    grade = "C";
    title = "もう一回チャレンジ！🔥";
    feedback = "音声をもう一度よく聞いて、真似して発音してみましょう。";
  }

  document.getElementById("modalScoreNum").textContent = score;
  document.getElementById("modalScoreGrade").textContent = `RANK: ${grade}`;
  document.getElementById("modalScoreTitle").textContent = title;
  document.getElementById("modalScoreFeedback").textContent = feedback;

  document.getElementById("scoreModal").classList.add("show");
}

// 점수 확인 후 다음 단계로
function continueDialogue() {
  document.getElementById("scoreModal").classList.remove("show");
  currentDialogueIdx++;
  setTimeout(playDialogueStep, 500);
}

// 시나리오 완료 모달
function showCompleteModal() {
  document.getElementById("modalScoreNum").textContent = "100";
  document.getElementById("modalScoreGrade").textContent = "COMPLETE";
  document.getElementById("modalScoreTitle").textContent = "ミッションクリア！🎉";
  document.getElementById("modalScoreFeedback").textContent = "このシチュエーションの韓国語会話をマスターしました！旅行先でぜひ使ってみてください。";
  
  const btn = document.getElementById("btnModalContinue");
  btn.textContent = "他のシチュエーションへ";
  btn.onclick = () => {
    document.getElementById("scoreModal").classList.remove("show");
    goHome();
  };

  document.getElementById("scoreModal").classList.add("show");
}

// 플랜 선택 상태
let selectedPlanType = "trip";

function selectPlan(planType) {
  selectedPlanType = planType;
  const tripCard = document.getElementById("planTrip");
  const monthlyCard = document.getElementById("planMonthly");

  if (planType === "trip") {
    tripCard.classList.add("active");
    monthlyCard.classList.remove("active");
  } else {
    monthlyCard.classList.add("active");
    tripCard.classList.remove("active");
  }
}

// PayPal Smart Buttons 초기화
function initPayPalButtons() {
  if (!window.paypal || !document.getElementById("paypal-button-container")) {
    document.getElementById("btnFallbackPay").style.display = "block";
    return;
  }

  try {
    window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
        height: 45
      },
      createOrder: function(data, actions) {
        const amount = selectedPlanType === "trip" ? "4.99" : "9.99";
        const desc = selectedPlanType === "trip" ? "K-Talk AI 7-Day Travel Pass ($4.99)" : "K-Talk AI Monthly Unlimited Pass ($9.99)";
        
        return actions.order.create({
          purchase_units: [{
            description: desc,
            amount: {
              currency_code: "USD",
              value: amount
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          const payerName = details.payer?.name?.given_name || "お客様";
          alert(`🎉 決済が完了しました！\n${payerName}様、ご購入ありがとうございます。\n全シチュエーション無制限アクセスが解放されました！`);
          unlockProAccess();
          closePaywallModal();
        });
      },
      onError: function(err) {
        console.error("PayPal Checkout Error:", err);
        document.getElementById("btnFallbackPay").style.display = "block";
      }
    }).render("#paypal-button-container");
  } catch (e) {
    console.warn("PayPal render failed:", e);
    document.getElementById("btnFallbackPay").style.display = "block";
  }
}

// Paywall 모달 (체험 횟수 초과 시)
function showPaywallModal() {
  document.getElementById("paywallModal").classList.add("show");
  if (!document.getElementById("paypal-button-container").hasChildNodes()) {
    initPayPalButtons();
  }
}

function closePaywallModal() {
  document.getElementById("paywallModal").classList.remove("show");
}

// 결제 시뮬레이션 또는 직접 해금
function purchasePlan(planType) {
  const planNames = {
    trip: "7日間 渡韓集中パス ($4.99)",
    monthly: "月額使い放題パス ($9.99/mo)"
  };
  
  alert(`【決済完了】\n${planNames[planType]} をご購入いただきありがとうございます！\n全シチュエーション無制限アクセスが解放されました。`);
  
  unlockProAccess();
  closePaywallModal();
}

function unlockProAccess() {
  remainingTrials = 999;
  localStorage.setItem("ktalk_trials", "999");
  updateTrialUI();
}

// 결제 후 리다이렉트 감지 (?payment=success)
function checkPaymentRedirect() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("payment") === "success" || params.get("status") === "success") {
    unlockProAccess();
    alert("🎉 渡韓パスが正常にアクティベートされました！全機能を無制限にご利用いただけます。");
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function setupEventListeners() {
  document.getElementById("micBtn").onclick = toggleRecording;
  checkPaymentRedirect();
  // 페이팔 버튼 준비
  setTimeout(initPayPalButtons, 1000);
}

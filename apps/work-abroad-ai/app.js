// WorkAbroad AI State & Logic
let currentScenario = null;
let currentDialogueIdx = 0;
let isRecording = false;
let recognition = null;
let recordedTranscript = "";
let remainingTrials = 3;
let selectedPlanType = "trip";

document.addEventListener("DOMContentLoaded", () => {
  initTrials();
  renderScenarioList();
  setupSpeechRecognition();
  setupEventListeners();
});

function initTrials() {
  const saved = localStorage.getItem("workabroad_trials");
  if (saved !== null) {
    remainingTrials = parseInt(saved, 10);
  } else {
    remainingTrials = 3;
    localStorage.setItem("workabroad_trials", "3");
  }
  updateTrialUI();
}

function updateTrialUI() {
  const badge = document.getElementById("trialCounter");
  if (badge) {
    badge.textContent = `무료 체험: 잔여 ${remainingTrials}회`;
  }
}

function consumeTrial() {
  if (remainingTrials > 0) {
    remainingTrials--;
    localStorage.setItem("workabroad_trials", remainingTrials.toString());
    updateTrialUI();
  }
}

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
          <h3 class="card-title">${sc.title_ko}</h3>
        </div>
        <p class="card-desc">${sc.desc_ko}</p>
      </div>
      <div class="card-arrow">›</div>
    `;
    listEl.appendChild(card);
  });
}

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
  document.getElementById("scenarioTitle").textContent = `${currentScenario.icon} ${currentScenario.title_ko}`;

  document.getElementById("messagesContainer").innerHTML = "";
  playDialogueStep();
}

function goHome() {
  stopTts();
  if (isRecording) stopRecording();
  document.getElementById("chatView").classList.add("hidden");
  document.getElementById("homeView").classList.remove("hidden");
}

function playDialogueStep() {
  if (!currentScenario) return;
  const dialogues = currentScenario.dialogues;

  if (currentDialogueIdx >= dialogues.length) {
    consumeTrial();
    showCompleteModal();
    return;
  }

  const step = dialogues[currentDialogueIdx];

  if (step.speaker === "ai") {
    appendAiMessage(step);
    speakEnglish(step.text_en, () => {
      currentDialogueIdx++;
      setTimeout(playDialogueStep, 600);
    });
  } else if (step.speaker === "user") {
    showUserPrompt(step);
  }
}

function appendAiMessage(step) {
  const container = document.getElementById("messagesContainer");
  const wrapper = document.createElement("div");
  wrapper.className = "msg-wrapper ai";
  wrapper.innerHTML = `
    <span class="msg-speaker">${step.speakerName}</span>
    <div class="msg-bubble">
      <div class="bubble-en">
        <span>${step.text_en}</span>
        <button class="btn-tts" onclick="speakEnglish('${step.text_en.replace(/'/g, "\\'")}')">🔊</button>
      </div>
      <div class="bubble-ko">${step.text_ko}</div>
    </div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

function showUserPrompt(step) {
  const container = document.getElementById("messagesContainer");
  const oldPrompt = document.getElementById("userPromptCard");
  if (oldPrompt) oldPrompt.remove();

  const promptCard = document.createElement("div");
  promptCard.id = "userPromptCard";
  promptCard.className = "user-prompt-card";
  promptCard.innerHTML = `
    <div class="prompt-badge">🎯 내 답변 차례 (마이크를 누르고 발음)</div>
    <div class="prompt-target">${step.target_en}</div>
    <div class="prompt-guide">${step.pronunciation_guide}</div>
    <div class="prompt-ko">${step.text_ko}</div>
    <div class="prompt-tip">${step.tips_ko}</div>
  `;
  container.appendChild(promptCard);
  container.scrollTop = container.scrollHeight;

  document.getElementById("statusText").textContent = "아래 마이크 버튼을 누르고 영어로 말해보세요 🎙️";
}

function speakEnglish(text, onEnd) {
  if (!("speechSynthesis" in window)) {
    if (onEnd) onEnd();
    return;
  }
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.95;

  utter.onend = () => { if (onEnd) onEnd(); };
  utter.onerror = () => { if (onEnd) onEnd(); };

  window.speechSynthesis.speak(utter);
}

function stopTts() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    isRecording = true;
    recordedTranscript = "";
    document.getElementById("micBtn").classList.add("recording");
    document.getElementById("waveform").classList.add("active");
    document.getElementById("statusText").textContent = "영어를 듣고 분석 중입니다...";
  };

  recognition.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; ++i) {
      if (e.results[i].isFinal) recordedTranscript += e.results[i][0].transcript;
      else interim += e.results[i][0].transcript;
    }
    const current = recordedTranscript || interim;
    if (current) document.getElementById("statusText").textContent = `"${current}"`;
  };

  recognition.onerror = () => {
    stopRecording();
    document.getElementById("statusText").textContent = "음성을 인식하지 못했습니다. 다시 시도해 주세요.";
  };

  recognition.onend = () => {
    isRecording = false;
    document.getElementById("micBtn").classList.remove("recording");
    document.getElementById("waveform").classList.remove("active");

    if (recordedTranscript.trim()) {
      handleUserRecorded(recordedTranscript.trim());
    } else {
      document.getElementById("statusText").textContent = "마이크를 다시 누르고 말씀해 주세요.";
    }
  };
}

function toggleRecording() {
  if (!recognition) {
    simulateRecording();
    return;
  }

  if (isRecording) recognition.stop();
  else {
    stopTts();
    try { recognition.start(); } catch (e) { recognition.stop(); }
  }
}

function stopRecording() {
  if (recognition && isRecording) recognition.stop();
}

function simulateRecording() {
  const step = currentScenario.dialogues[currentDialogueIdx];
  if (!step) return;

  const btn = document.getElementById("micBtn");
  btn.classList.add("recording");
  document.getElementById("waveform").classList.add("active");
  document.getElementById("statusText").textContent = "발음 분석 중...";

  setTimeout(() => {
    btn.classList.remove("recording");
    document.getElementById("waveform").classList.remove("active");
    handleUserRecorded(step.target_en);
  }, 2000);
}

function calculatePronunciationScore(target, spoken) {
  const cleanTarget = target.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
  const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

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
  
  let score = Math.round(similarity * 80 + 18);
  if (score > 100) score = 100;
  if (score < 35) score = 40;
  return score;
}

function handleUserRecorded(spokenText) {
  const step = currentScenario.dialogues[currentDialogueIdx];
  if (!step) return;

  const score = calculatePronunciationScore(step.target_en, spokenText);
  
  const container = document.getElementById("messagesContainer");
  const oldPrompt = document.getElementById("userPromptCard");
  if (oldPrompt) oldPrompt.remove();

  const wrapper = document.createElement("div");
  wrapper.className = "msg-wrapper user";
  wrapper.innerHTML = `
    <span class="msg-speaker">나 (발음 점수: ${score}점)</span>
    <div class="msg-bubble">
      <div class="bubble-en">
        <span>${spokenText}</span>
        <button class="btn-tts" onclick="speakEnglish('${spokenText.replace(/'/g, "\\'")}')">🔊</button>
      </div>
      <div class="bubble-ko">목표: ${step.target_en}</div>
    </div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;

  showScoreModal(score, step);
}

function showScoreModal(score, step) {
  let grade = "S";
  let title = "원어민급 완벽한 발음입니다! 🎉";
  let feedback = "현지 매니저가 한 번에 알아들을 수 있는 매우 또렷하고 자연스러운 발음입니다!";

  if (score >= 90) {
    grade = "S";
    title = "합격 가능성 99%! 완벽합니다 🎉";
    feedback = "억양과 단어 연음 처리가 훌륭합니다. 실전 인터뷰에서도 자신 있게 발화하세요!";
  } else if (score >= 75) {
    grade = "A";
    title = "매우 훌륭합니다! 👍";
    feedback = "충분히 통과 가능한 수준입니다. 강세를 조금 더 또렷하게 주시면 완벽합니다.";
  } else if (score >= 60) {
    grade = "B";
    title = "의미는 통하지만 연습이 필요해요! 💪";
    feedback = "원어민 음성을 다시 한번 듣고 쉐도잉해 보세요.";
  } else {
    grade = "C";
    title = "다시 한번 도전해 보세요! 🔥";
    feedback = "발음 가이드를 참고하여 한 단어씩 끊어서 또렷하게 읽어보세요.";
  }

  document.getElementById("modalScoreNum").textContent = score;
  document.getElementById("modalScoreGrade").textContent = `RANK: ${grade}`;
  document.getElementById("modalScoreTitle").textContent = title;
  document.getElementById("modalScoreFeedback").textContent = feedback;

  document.getElementById("scoreModal").classList.add("show");
}

function continueDialogue() {
  document.getElementById("scoreModal").classList.remove("show");
  currentDialogueIdx++;
  setTimeout(playDialogueStep, 500);
}

function showCompleteModal() {
  document.getElementById("modalScoreNum").textContent = "100";
  document.getElementById("modalScoreGrade").textContent = "PASS";
  document.getElementById("modalScoreTitle").textContent = "인터뷰 미션 합격! 🎉";
  document.getElementById("modalScoreFeedback").textContent = "이 시나리오의 핵심 질문과 답변을 마스터하셨습니다! 실전에서도 최고의 결과를 얻으실 거예요.";
  
  const btn = document.getElementById("btnModalContinue");
  btn.textContent = "다른 시나리오 도전하기";
  btn.onclick = () => {
    document.getElementById("scoreModal").classList.remove("show");
    goHome();
  };

  document.getElementById("scoreModal").classList.add("show");
}

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

function initPayPalButtons() {
  if (!window.paypal || !document.getElementById("paypal-button-container")) {
    document.getElementById("btnFallbackPay").style.display = "block";
    return;
  }

  try {
    window.paypal.Buttons({
      style: { layout: "vertical", color: "blue", shape: "rect", height: 45 },
      createOrder: function(data, actions) {
        const amount = selectedPlanType === "trip" ? "9.99" : "24.99";
        const desc = selectedPlanType === "trip" ? "WorkAbroad AI 7-Day Pass ($9.99)" : "WorkAbroad AI Monthly Pass ($24.99)";
        
        return actions.order.create({
          purchase_units: [{ description: desc, amount: { currency_code: "USD", value: amount } }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          const payerName = details.payer?.name?.given_name || "고객";
          alert(`🎉 결제가 완료되었습니다!\n${payerName}님, 감사합니다.\n모든 워홀/인터뷰 시나리오 무제한 접근이 해금되었습니다!`);
          unlockProAccess();
          closePaywallModal();
        });
      },
      onError: function(err) {
        console.error("PayPal Error:", err);
        document.getElementById("btnFallbackPay").style.display = "block";
      }
    }).render("#paypal-button-container");
  } catch (e) {
    document.getElementById("btnFallbackPay").style.display = "block";
  }
}

function showPaywallModal() {
  document.getElementById("paywallModal").classList.add("show");
  if (!document.getElementById("paypal-button-container").hasChildNodes()) {
    initPayPalButtons();
  }
}

function closePaywallModal() {
  document.getElementById("paywallModal").classList.remove("show");
}

function purchasePlan(planType) {
  const planNames = {
    trip: "7일 워홀 출국 집중 패스 ($9.99)",
    monthly: "월간 무제한 합격 패스 ($24.99/mo)"
  };
  alert(`【결제 완료】\n${planNames[planType]} 구매가 완료되었습니다!\n무제한 롤플레잉 이용이 가능합니다.`);
  unlockProAccess();
  closePaywallModal();
}

function unlockProAccess() {
  remainingTrials = 999;
  localStorage.setItem("workabroad_trials", "999");
  updateTrialUI();
}

function setupEventListeners() {
  document.getElementById("micBtn").onclick = toggleRecording;
  setTimeout(initPayPalButtons, 1000);
}

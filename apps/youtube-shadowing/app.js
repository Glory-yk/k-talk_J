// YouTube Shadowing Web Application Controller (V6 - Smooth Playback Engine)

let player = null;
let isPlayerReady = false;
let currentLesson = null;
let currentSentenceIndex = 0;
let playbackCheckInterval = null;

// Playback Modes: 'loop' | 'pause' | 'flow'
let playbackMode = 'loop'; 

let isBlurredOriginal = false;
let isHideTranslation = false;
let currentSpeed = 1.0;
let currentLanguage = 'en-US';
let savedBookmarks = JSON.parse(localStorage.getItem('yt_shadow_bookmarks') || '[]');

// Undo / Redo History Stacks
let historyStack = [];
let redoStack = [];

// Seeking Debounce flag
let isSeekDebouncing = false;

// Speech Recognition & Audio
let recognition = null;
let isRecording = false;
let audioContext = null;
let analyser = null;
let micStream = null;
let animationFrameId = null;

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initPresets();
  initEventListeners();
  initSpeechRecognition();
  renderBookmarks();
  
  if (typeof SAMPLE_LESSONS !== 'undefined' && SAMPLE_LESSONS.length > 0) {
    currentLesson = SAMPLE_LESSONS[0];
    renderTranscriptList();
    selectSentence(0, false);
  }
  
  initYouTubePlayer();
  updateUndoRedoButtons();
  updatePlaybackModeUi();
});

// YouTube API Setup & Player Initialization
function initYouTubePlayer() {
  window.onYouTubeIframeAPIReady = function() {
    createPlayer();
  };

  if (window.YT && window.YT.Player) {
    createPlayer();
  } else {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
  }
}

function createPlayer() {
  if (player) return;
  const initialVideoId = currentLesson ? currentLesson.videoId : 'gos4QyCxpmc';
  
  player = new YT.Player('yt-player-iframe', {
    height: '100%',
    width: '100%',
    videoId: initialVideoId,
    host: 'https://www.youtube.com',
    playerVars: {
      autoplay: 0,
      playsinline: 1,
      rel: 0,
      modestbranding: 1,
      controls: 1,
      enablejsapi: 1,
      origin: window.location.origin
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onPlayerError
    }
  });
}

function onPlayerReady(event) {
  isPlayerReady = true;
  if (player && typeof player.setPlaybackRate === 'function') {
    player.setPlaybackRate(currentSpeed);
  }
  
  if (currentLesson) {
    const startSec = currentLesson.subtitles[0]?.start || 0;
    if (typeof player.cueVideoById === 'function') {
      player.cueVideoById(currentLesson.videoId, startSec);
    }
  }
  
  startPlaybackTracker();
}

function onPlayerStateChange(event) {
  const playIcon = document.getElementById('play-icon');
  if (!playIcon) return;
  
  if (event.data === YT.PlayerState.PLAYING) {
    playIcon.innerHTML = `<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>`; // Pause icon
  } else {
    playIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`; // Play icon
  }
}

function onPlayerError(event) {
  console.warn('YouTube Player Error code:', event.data);
  showToast('⚠️ 이 영상은 YouTube 정책상 외부 임베드가 제한되었을 수 있습니다.');
}

// Continuous playback tracker for sentence bounding & modes
function startPlaybackTracker() {
  if (playbackCheckInterval) clearInterval(playbackCheckInterval);
  
  playbackCheckInterval = setInterval(() => {
    if (!player || !isPlayerReady || typeof player.getPlayerState !== 'function' || !currentLesson || !currentLesson.subtitles || !currentLesson.subtitles.length) return;
    if (isSeekDebouncing) return;
    
    const state = player.getPlayerState();
    if (state !== YT.PlayerState.PLAYING) return;
    
    const currentTime = player.getCurrentTime();
    const curSentence = currentLesson.subtitles[currentSentenceIndex];
    if (!curSentence) return;
    
    // Mode 3: Continuous Flow (Follow timeline without stopping)
    if (playbackMode === 'flow') {
      const activeIdx = currentLesson.subtitles.findIndex(s => currentTime >= s.start && currentTime <= s.end);
      if (activeIdx !== -1 && activeIdx !== currentSentenceIndex) {
        selectSentence(activeIdx, false);
      }
      return;
    }
    
    // Check sentence boundary
    if (currentTime >= curSentence.end) {
      if (playbackMode === 'pause') {
        // Mode 2: Pause after sentence
        isSeekDebouncing = true;
        player.pauseVideo();
        player.seekTo(curSentence.start, true);
        showToast('⏸️ 문장 끝 — 따라 말해보세요 (M키 / 다음 문장은 →)');
        setTimeout(() => { isSeekDebouncing = false; }, 300);
      } else if (playbackMode === 'loop') {
        // Mode 1: A-B Infinite Loop
        isSeekDebouncing = true;
        player.seekTo(curSentence.start, true);
        setTimeout(() => { isSeekDebouncing = false; }, 250);
      }
    }
  }, 80);
}

// Mode Switcher: 'loop' | 'pause' | 'flow'
window.setPlaybackMode = function(mode) {
  playbackMode = mode;
  updatePlaybackModeUi();
  const label = mode === 'loop' ? '🔁 한 문장 무한 반복' : (mode === 'pause' ? '⏸️ 문장 끝 자동 정지' : '⏩ 연속 자유 재생');
  showToast(`재생 모드: ${label}`);
};

function updatePlaybackModeUi() {
  document.getElementById('btn-mode-loop')?.classList.toggle('active', playbackMode === 'loop');
  document.getElementById('btn-mode-pause')?.classList.toggle('active', playbackMode === 'pause');
  document.getElementById('btn-mode-flow')?.classList.toggle('active', playbackMode === 'flow');
}

// History Management (Undo / Redo)
function pushHistory() {
  if (!currentLesson || !currentLesson.subtitles) return;
  const snapshot = JSON.parse(JSON.stringify(currentLesson.subtitles));
  historyStack.push(snapshot);
  if (historyStack.length > 50) historyStack.shift();
  redoStack = [];
  updateUndoRedoButtons();
}

window.undo = function() {
  if (historyStack.length === 0 || !currentLesson) {
    showToast('취소할 이전 작업이 없습니다.');
    return;
  }
  const currentSnapshot = JSON.parse(JSON.stringify(currentLesson.subtitles));
  redoStack.push(currentSnapshot);
  
  const previousState = historyStack.pop();
  currentLesson.subtitles = previousState;
  
  if (currentSentenceIndex >= currentLesson.subtitles.length) {
    currentSentenceIndex = Math.max(0, currentLesson.subtitles.length - 1);
  }
  
  renderTranscriptList();
  selectSentence(currentSentenceIndex, false);
  updateUndoRedoButtons();
  showToast('↩️ 실행 취소 완료');
};

window.redo = function() {
  if (redoStack.length === 0 || !currentLesson) {
    showToast('다시 실행할 작업이 없습니다.');
    return;
  }
  const currentSnapshot = JSON.parse(JSON.stringify(currentLesson.subtitles));
  historyStack.push(currentSnapshot);
  
  const nextState = redoStack.pop();
  currentLesson.subtitles = nextState;
  
  if (currentSentenceIndex >= currentLesson.subtitles.length) {
    currentSentenceIndex = Math.max(0, currentLesson.subtitles.length - 1);
  }
  
  renderTranscriptList();
  selectSentence(currentSentenceIndex, false);
  updateUndoRedoButtons();
  showToast('↪️ 다시 실행 완료');
};

function updateUndoRedoButtons() {
  const btnUndo = document.getElementById('btn-undo');
  const btnRedo = document.getElementById('btn-redo');
  if (btnUndo) btnUndo.disabled = (historyStack.length === 0);
  if (btnRedo) btnRedo.disabled = (redoStack.length === 0);
}

// Load a lesson object
function loadLesson(lesson) {
  currentLesson = lesson;
  currentSentenceIndex = 0;
  historyStack = [];
  redoStack = [];
  updateUndoRedoButtons();
  
  if (lesson.language) {
    currentLanguage = lesson.language;
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = lesson.language;
  }
  
  document.querySelectorAll('.sample-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.id === lesson.id);
  });
  
  if (player && isPlayerReady && typeof player.loadVideoById === 'function') {
    player.loadVideoById(lesson.videoId, lesson.subtitles[0]?.start || 0);
  }
  
  renderTranscriptList();
  selectSentence(0, false);
}

// Preset Pills Rendering
function initPresets() {
  const container = document.getElementById('samples-container');
  if (!container || typeof SAMPLE_LESSONS === 'undefined') return;
  
  container.innerHTML = SAMPLE_LESSONS.map((s, idx) => `
    <button class="sample-pill ${idx === 0 ? 'active' : ''}" data-id="${s.id}" onclick="onSelectSample('${s.id}')">
      <span>${s.title.split(' ')[0]}</span>
      <span>${s.title.replace(/^[^ ]+ /, '')}</span>
    </button>
  `).join('');
}

window.onSelectSample = function(id) {
  const found = SAMPLE_LESSONS.find(s => s.id === id);
  if (found) loadLesson(found);
};

// URL Parser
function parseYouTubeId(url) {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regex);
  return match ? match[1] : null;
}

// Custom Video Loader with Auto Caption Extraction
window.handleLoadCustomUrl = async function() {
  const input = document.getElementById('yt-url-input');
  const url = input.value.trim();
  const videoId = parseYouTubeId(url);
  
  if (!videoId) {
    alert('올바른 유튜브 영상 링크나 11자리 Video ID를 입력해주세요.');
    return;
  }
  
  showLoading(true);
  
  try {
    const res = await fetch(`/api/transcript?videoId=${videoId}&lang=${currentLanguage.slice(0, 2)}`);
    const data = await res.json();
    
    let subtitles = [];
    let note = '';
    
    if (data.success && data.subtitles && data.subtitles.length > 0) {
      subtitles = data.subtitles;
      note = `✅ 자연스러운 문장 분할 완료 (${subtitles.length}개 쉐도잉 문장 추출)`;
    } else {
      const duration = (player && typeof player.getDuration === 'function') ? player.getDuration() : 180;
      const totalSec = Math.max(60, duration > 0 ? duration : 180);
      const step = 6;
      for (let s = 0; s < totalSec; s += step) {
        subtitles.push({
          id: subtitles.length + 1,
          start: s,
          end: Math.min(totalSec, s + step),
          text: `[구간 ${Math.floor(s/step) + 1}] ${formatTime(s)} ~ ${formatTime(Math.min(totalSec, s + step))}`,
          translation: "대본 등록 버튼을 눌러 직접 자막을 넣거나 구간별로 쉐도잉해보세요."
        });
      }
      note = '⚠️ 자동 자막이 없어 6초 단위 구간 분할로 생성했습니다.';
    }
    
    const customLesson = {
      id: 'custom_' + videoId,
      title: `🎬 사용자 유튜브 영상 (${videoId})`,
      category: 'Custom Video',
      videoId: videoId,
      language: currentLanguage,
      subtitles: subtitles
    };
    
    loadLesson(customLesson);
    input.value = '';
    showToast(note);
  } catch (err) {
    console.error('Error fetching subtitles:', err);
    showToast('영상을 불러왔습니다.');
  } finally {
    showLoading(false);
  }
};

function showLoading(show) {
  const btn = document.querySelector('.btn-load');
  if (btn) {
    btn.innerHTML = show ? `<span>자막 추출 중...</span>` : `<span>영상 불러오기</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
  }
}

function showToast(msg) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.style.cssText = `
      position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.95); color: #fff; padding: 10px 20px;
      border-radius: 9999px; border: 1px solid var(--accent-primary);
      box-shadow: 0 10px 30px rgba(0,0,0,0.6); z-index: 1000; font-size: 0.9rem;
      pointer-events: none; transition: opacity 0.3s;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// Sentence Selection & UI Update
function selectSentence(index, shouldPlay = true) {
  if (!currentLesson || !currentLesson.subtitles || !currentLesson.subtitles.length) return;
  if (index < 0 || index >= currentLesson.subtitles.length) return;
  
  currentSentenceIndex = index;
  const sentence = currentLesson.subtitles[index];
  
  const origEl = document.getElementById('current-original');
  const transEl = document.getElementById('current-translation');
  const indexBadge = document.getElementById('sentence-badge');
  
  if (origEl) origEl.textContent = sentence.text;
  if (transEl) transEl.textContent = sentence.translation;
  if (indexBadge) indexBadge.textContent = `${index + 1} / ${currentLesson.subtitles.length}`;
  
  document.querySelectorAll('.sentence-item').forEach((item, idx) => {
    item.classList.toggle('active', idx === index);
    if (idx === index) {
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
  
  updateDictationCard(sentence);
  resetFeedback();
  
  if (player && isPlayerReady && typeof player.seekTo === 'function') {
    isSeekDebouncing = true;
    player.seekTo(sentence.start, true);
    setTimeout(() => { isSeekDebouncing = false; }, 250);
    
    if (shouldPlay && typeof player.playVideo === 'function') {
      player.playVideo();
    }
  }
}

// Render Transcript List with fine-tuning, undo-ready actions
function renderTranscriptList() {
  const listEl = document.getElementById('transcript-list');
  if (!listEl || !currentLesson || !currentLesson.subtitles) return;
  
  listEl.innerHTML = currentLesson.subtitles.map((sub, idx) => `
    <div class="sentence-item ${idx === currentSentenceIndex ? 'active' : ''}" onclick="selectSentence(${idx}, true)">
      <div class="item-top">
        <span class="item-time">
          ${formatTime(sub.start)} - ${formatTime(sub.end)}
          <button class="time-adjust-btn" title="시작 시간 0.5초 당기기" onclick="event.stopPropagation(); adjustStartTime(${idx}, -0.5)">-0.5s</button>
          <button class="time-adjust-btn" title="시작 시간 0.5초 미루기" onclick="event.stopPropagation(); adjustStartTime(${idx}, 0.5)">+0.5s</button>
        </span>
        <div class="item-actions">
          <button class="item-btn" title="이 문장 단어별로 나누기" onclick="event.stopPropagation(); openSplitModal(${idx})">✂️</button>
          <button class="item-btn" title="아래 문장과 합치기" onclick="event.stopPropagation(); mergeWithNext(${idx})">🔗</button>
          <button class="item-btn" title="이 문장 수정" onclick="event.stopPropagation(); editSentence(${idx})">✏️</button>
          <button class="item-btn" title="이 구간 삭제" onclick="event.stopPropagation(); deleteSentence(${idx})">🗑️</button>
          <button class="item-btn" title="문장 복습 저장" onclick="event.stopPropagation(); toggleBookmark(${idx})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${isBookmarked(sub.text) ? 'var(--accent-amber)' : 'none'}" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
      <div class="item-orig">${sub.text}</div>
      <div class="item-trans">${sub.translation}</div>
    </div>
  `).join('');
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Adjust Start Timestamp (with undo support)
window.adjustStartTime = function(idx, delta) {
  if (!currentLesson || !currentLesson.subtitles[idx]) return;
  pushHistory();
  const s = currentLesson.subtitles[idx];
  s.start = Math.max(0, Math.round((s.start + delta) * 10) / 10);
  renderTranscriptList();
  selectSentence(idx, true);
  showToast(`시작 시간 조절: ${s.start}s (실행 취소: ⌘Z)`);
};

// Merge current sentence with next (with undo support)
window.mergeWithNext = function(idx) {
  if (!currentLesson || !currentLesson.subtitles[idx] || !currentLesson.subtitles[idx + 1]) {
    alert('합칠 다음 문장이 없습니다.');
    return;
  }
  pushHistory();
  const cur = currentLesson.subtitles[idx];
  const next = currentLesson.subtitles[idx + 1];
  cur.text = `${cur.text} ${next.text}`;
  cur.end = next.end;
  currentLesson.subtitles.splice(idx + 1, 1);
  renderTranscriptList();
  selectSentence(idx, true);
  showToast('문장을 하나로 합쳤습니다. (실행 취소: ⌘Z)');
};

// Delete sentence (with undo support)
window.deleteSentence = function(idx) {
  if (!currentLesson || !currentLesson.subtitles[idx]) return;
  pushHistory();
  currentLesson.subtitles.splice(idx, 1);
  if (currentSentenceIndex >= currentLesson.subtitles.length) {
    currentSentenceIndex = Math.max(0, currentLesson.subtitles.length - 1);
  }
  renderTranscriptList();
  selectSentence(currentSentenceIndex, false);
  showToast('구간을 삭제했습니다. (실행 취소: ⌘Z)');
};

// ===== Shadowingapp_claude 기반 고급 문장 편집 & 다중 분할 시스템 =====
let editSegIndices = [];
let editAllWords = [];
let editSplitPoints = new Set();
let previewRangeTimer = null;

window.editSentence = function(idx) {
  openAdvancedEditModal(idx);
};

window.openEditModal = function(idx) {
  openAdvancedEditModal(idx);
};

window.openSplitModal = function(idx) {
  openAdvancedEditModal(idx);
};

window.openAdvancedEditModal = function(idx) {
  if (!currentLesson || !currentLesson.subtitles[idx]) return;
  editSegIndices = [idx];
  _initAdvancedEditModal();
};

function _initAdvancedEditModal() {
  editSplitPoints = new Set();
  editAllWords = [];
  let gIdx = 0;
  
  editSegIndices.forEach((si, order) => {
    const sub = currentLesson.subtitles[si];
    const words = sub.text.trim().split(/\s+/).filter(Boolean);
    words.forEach((w, wi) => {
      editAllWords.push({ word: w, segIdx: si, segOrder: order, wordIdx: wi, globalIdx: gIdx });
      gIdx++;
    });
    if (order < editSegIndices.length - 1) editSplitPoints.add(gIdx);
  });
  
  const i = editSegIndices[0];
  const s = currentLesson.subtitles[i];
  
  const titleEl = document.getElementById('editModalTitle');
  if (titleEl) titleEl.innerHTML = `<span>✂</span> 문장 편집 & 분할 (${i + 1}번)`;
  
  const textInput = document.getElementById('textEditInput');
  const transInput = document.getElementById('textEditTransInput');
  if (textInput) textInput.value = s.text;
  if (transInput) transInput.value = s.translation;
  
  const mergePrevBtn = document.getElementById('mergePrevBtn');
  const mergeNextBtn = document.getElementById('mergeNextBtn');
  if (mergePrevBtn) mergePrevBtn.style.display = (i > 0) ? '' : 'none';
  if (mergeNextBtn) mergeNextBtn.style.display = (i < currentLesson.subtitles.length - 1) ? '' : 'none';
  
  renderEditWords();
  renderEditTimeline();
  initTimingSection();
  
  const modal = document.getElementById('editModalOverlay');
  if (modal) modal.classList.add('active');
}

window.closeAdvancedEditModal = function() {
  const modal = document.getElementById('editModalOverlay');
  if (modal) modal.classList.remove('active');
  editSegIndices = [];
  editAllWords = [];
  editSplitPoints.clear();
  if (previewRangeTimer) clearInterval(previewRangeTimer);
};

function renderEditWords() {
  const container = document.getElementById('editWords');
  if (!container) return;
  container.innerHTML = '';
  
  let prevSegOrder = -1;
  editAllWords.forEach((item) => {
    const gi = item.globalIdx;
    
    if (item.segOrder !== prevSegOrder && prevSegOrder !== -1) {
      const div = document.createElement('span');
      div.className = 'edit-seg-divider';
      container.appendChild(div);
    }
    prevSegOrder = item.segOrder;
    
    if (editSplitPoints.has(gi)) {
      const mark = document.createElement('span');
      mark.className = 'edit-cut-mark';
      mark.textContent = '✂';
      container.appendChild(mark);
    }
    
    const span = document.createElement('span');
    span.className = 'edit-word' + (editSplitPoints.has(gi) ? ' split-point' : '');
    span.textContent = item.word;
    span.title = `클릭하여 이 단어('${item.word}') 앞에서 분할/취소`;
    
    span.onclick = () => {
      if (gi === 0) {
        showToast('첫 번째 단어는 분할 위치로 선택할 수 없습니다.');
        return;
      }
      if (editSplitPoints.has(gi)) {
        editSplitPoints.delete(gi);
      } else {
        editSplitPoints.add(gi);
      }
      renderEditWords();
      renderEditTimeline();
    };
    container.appendChild(span);
  });
  
  if (editSplitPoints.size === 0) {
    const hint = document.createElement('div');
    hint.style.cssText = 'width:100%;text-align:center;color:rgba(255,255,255,0.3);font-size:0.8rem;padding:6px 0;';
    hint.textContent = '단어를 클릭해 분할 위치(✂)를 지정하세요.';
    container.appendChild(hint);
  }
}

function renderEditTimeline() {
  const tl = document.getElementById('editTimeline');
  if (!tl || editSegIndices.length === 0) return;
  tl.innerHTML = '';
  
  const firstSeg = currentLesson.subtitles[editSegIndices[0]];
  const lastSeg = currentLesson.subtitles[editSegIndices[editSegIndices.length - 1]];
  const totalWords = editAllWords.length;
  const totalDur = lastSeg.end - firstSeg.start;
  
  const cuts = [0, ...Array.from(editSplitPoints).sort((a,b)=>a-b), totalWords];
  cuts.forEach((cut, ci) => {
    if (ci === cuts.length - 1) return;
    const startW = cut;
    const endW = cuts[ci + 1];
    const startT = Math.round((firstSeg.start + (startW / totalWords) * totalDur) * 100) / 100;
    const endT = Math.round((firstSeg.start + (endW / totalWords) * totalDur) * 100) / 100;
    const dur = (endT - startT).toFixed(1);
    const text = editAllWords.slice(startW, endW).map(w=>w.word).join(' ');
    
    const preview = document.createElement('div');
    preview.style.cssText = `
      display: flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15);
      border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: 0.15s;
      color: #fff; font-size: 0.85rem;
    `;
    preview.onmouseenter = () => {
      preview.style.borderColor = 'var(--accent-cyan)';
      preview.style.background = 'rgba(0, 242, 254, 0.15)';
    };
    preview.onmouseleave = () => {
      preview.style.borderColor = 'rgba(255,255,255,0.15)';
      preview.style.background = 'rgba(255,255,255,0.06)';
    };
    preview.innerHTML = `
      <span style="font-size: 0.9rem; color: var(--accent-cyan);">▶</span>
      <span style="font-size: 0.78rem; color: var(--text-dim);">${formatTime(startT)}~${formatTime(endT)} (${dur}s)</span>
      <span style="font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px;">${text}</span>
    `;
    preview.onclick = () => previewRange(startT, endT);
    tl.appendChild(preview);
  });
}

function previewRange(startT, endT) {
  if (!player || !isPlayerReady || typeof player.seekTo !== 'function') return;
  if (previewRangeTimer) clearInterval(previewRangeTimer);
  
  isSeekDebouncing = true;
  player.seekTo(startT, true);
  setTimeout(() => { isSeekDebouncing = false; }, 250);
  player.playVideo();
  
  showToast(`▶ 구간 미리듣기: ${formatTime(startT)} ~ ${formatTime(endT)}`);
  
  previewRangeTimer = setInterval(() => {
    if (!player || typeof player.getCurrentTime !== 'function') return;
    const cur = player.getCurrentTime();
    if (cur >= endT) {
      player.pauseVideo();
      clearInterval(previewRangeTimer);
    }
  }, 50);
}

window.previewEditSegment = function() {
  if (editSegIndices.length === 0) return;
  const firstSeg = currentLesson.subtitles[editSegIndices[0]];
  const lastSeg = currentLesson.subtitles[editSegIndices[editSegIndices.length - 1]];
  previewRange(firstSeg.start, lastSeg.end);
};

window.applyEditSplit = function() {
  if (editSplitPoints.size === 0 && editSegIndices.length === 1) {
    showToast('⚠️ 분할할 단어를 먼저 클릭해 가위(✂) 마커를 지정하세요.');
    return;
  }
  
  const cuts = Array.from(editSplitPoints).sort((a,b)=>a-b);
  const groups = [];
  let prev = 0;
  cuts.forEach(c => {
    groups.push(editAllWords.slice(prev, c));
    prev = c;
  });
  groups.push(editAllWords.slice(prev));
  
  const validGroups = groups.filter(g => g.length > 0);
  if (validGroups.length < 2) {
    showToast('⚠️ 분할 위치를 1개 이상 지정해주세요.');
    return;
  }
  
  const firstSeg = currentLesson.subtitles[editSegIndices[0]];
  const lastSeg = currentLesson.subtitles[editSegIndices[editSegIndices.length - 1]];
  const totalWords = editAllWords.length;
  const totalDur = lastSeg.end - firstSeg.start;
  
  pushHistory();
  
  const newSegs = validGroups.map((grp, gi) => {
    const startWord = grp[0].globalIdx;
    const endWord = grp[grp.length - 1].globalIdx;
    let t = grp.map(w => w.word).join(' ').trim();
    t = t.charAt(0).toUpperCase() + t.slice(1);
    if (!/[.?!]$/.test(t)) t += '.';
    
    return {
      id: 0,
      start: Math.round((firstSeg.start + (startWord / totalWords) * totalDur) * 100) / 100,
      end: Math.round((firstSeg.start + ((endWord + 1) / totalWords) * totalDur) * 100) / 100,
      text: t,
      translation: gi === 0 ? firstSeg.translation : "(분할된 문장)"
    };
  });
  newSegs[newSegs.length - 1].end = lastSeg.end;
  
  const minIdx = editSegIndices[0];
  const deleteCount = editSegIndices.length;
  currentLesson.subtitles.splice(minIdx, deleteCount, ...newSegs);
  
  currentLesson.subtitles.forEach((s, idx) => { s.id = idx + 1; });
  
  renderTranscriptList();
  selectSentence(minIdx, true);
  closeAdvancedEditModal();
  showToast(`✂️ ${validGroups.length}개 문장으로 분할 완료! (실행 취소: ⌘Z)`);
};

window.applyEditMergeNext = function() {
  if (editSegIndices.length === 0) return;
  const i = editSegIndices[0];
  if (i >= currentLesson.subtitles.length - 1) {
    showToast('다음 문장이 없습니다.');
    return;
  }
  
  pushHistory();
  const cur = currentLesson.subtitles[i];
  const next = currentLesson.subtitles[i + 1];
  
  cur.text = `${cur.text} ${next.text}`;
  cur.end = next.end;
  currentLesson.subtitles.splice(i + 1, 1);
  currentLesson.subtitles.forEach((s, idx) => { s.id = idx + 1; });
  
  renderTranscriptList();
  selectSentence(i, true);
  closeAdvancedEditModal();
  showToast('다음 문장과 합쳤습니다. (실행 취소: ⌘Z)');
};

window.applyEditMergePrev = function() {
  if (editSegIndices.length === 0) return;
  const i = editSegIndices[0];
  if (i <= 0) {
    showToast('이전 문장이 없습니다.');
    return;
  }
  
  pushHistory();
  const prev = currentLesson.subtitles[i - 1];
  const cur = currentLesson.subtitles[i];
  
  prev.text = `${prev.text} ${cur.text}`;
  prev.end = cur.end;
  currentLesson.subtitles.splice(i, 1);
  currentLesson.subtitles.forEach((s, idx) => { s.id = idx + 1; });
  
  renderTranscriptList();
  selectSentence(i - 1, true);
  closeAdvancedEditModal();
  showToast('이전 문장과 합쳤습니다. (실행 취소: ⌘Z)');
};

window.applyTextEdit = function() {
  if (editSegIndices.length === 0) return;
  const val = document.getElementById('textEditInput')?.value.trim();
  const transVal = document.getElementById('textEditTransInput')?.value.trim();
  if (!val) {
    showToast('원문 텍스트를 입력해주세요.');
    return;
  }
  
  pushHistory();
  const i = editSegIndices[0];
  currentLesson.subtitles[i].text = val;
  if (transVal) currentLesson.subtitles[i].translation = transVal;
  
  renderTranscriptList();
  selectSentence(i, false);
  closeAdvancedEditModal();
  showToast('✏️ 텍스트 저장 완료 (실행 취소: ⌘Z)');
};

// ===== Shadowingapp_claude 타이밍 미세 조정 엔진 =====
let timingOrigStart = 0;
let timingOrigEnd = 0;
let timingBarMin = 0;
let timingBarMax = 0;
let _timingDragging = null;
let timingPlayheadTimer = null;

function initTimingSection() {
  const isSingle = editSegIndices.length === 1;
  const section = document.getElementById('timingSection');
  if (section) section.style.display = isSingle ? '' : 'none';
  if (!isSingle) return;
  
  const seg = currentLesson.subtitles[editSegIndices[0]];
  timingOrigStart = seg.start;
  timingOrigEnd = seg.end;
  
  // Bar range: 10s buffer before and after
  const duration = (player && typeof player.getDuration === 'function') ? player.getDuration() : seg.end + 30;
  timingBarMin = Math.max(0, Math.round((seg.start - 8) * 10) / 10);
  timingBarMax = Math.min(duration || seg.end + 20, Math.round((seg.end + 8) * 10) / 10);
  
  document.getElementById('timingStartInput').value = seg.start.toFixed(2);
  document.getElementById('timingEndInput').value = seg.end.toFixed(2);
  document.getElementById('timingStartDisplay').textContent = seg.start.toFixed(2) + 's';
  document.getElementById('timingEndDisplay').textContent = seg.end.toFixed(2) + 's';
  document.getElementById('timingLabelLeft').textContent = formatTime(timingBarMin);
  document.getElementById('timingLabelRight').textContent = formatTime(timingBarMax);
  document.getElementById('timingLabelMid').textContent = `${(seg.end - seg.start).toFixed(1)}s 길이`;
  
  updateTimingBar();
  _attachTimingHandlers();
  startTimingBarPlayhead();
}

function updateTimingBar() {
  const s = parseFloat(document.getElementById('timingStartInput')?.value) || 0;
  const e = parseFloat(document.getElementById('timingEndInput')?.value) || 0;
  const span = Math.max(0.1, timingBarMax - timingBarMin);
  
  const lp = Math.max(0, Math.min(100, ((s - timingBarMin) / span) * 100));
  const rp = Math.max(0, Math.min(100, ((e - timingBarMin) / span) * 100));
  
  const rangeEl = document.getElementById('timingBarRange');
  const hStart = document.getElementById('timingHandleStart');
  const hEnd = document.getElementById('timingHandleEnd');
  const midLabel = document.getElementById('timingLabelMid');
  
  if (rangeEl) {
    rangeEl.style.left = lp + '%';
    rangeEl.style.width = Math.max(1, rp - lp) + '%';
  }
  if (hStart) hStart.style.left = lp + '%';
  if (hEnd) hEnd.style.left = rp + '%';
  if (midLabel) midLabel.textContent = `${Math.max(0, e - s).toFixed(1)}s 구간`;
}

window.setTimingFromVideo = function(which) {
  if (!player || typeof player.getCurrentTime !== 'function') return;
  const t = Math.round(player.getCurrentTime() * 100) / 100;
  
  if (which === 'start') {
    document.getElementById('timingStartInput').value = t.toFixed(2);
    document.getElementById('timingStartDisplay').textContent = t.toFixed(2) + 's';
  } else {
    document.getElementById('timingEndInput').value = t.toFixed(2);
    document.getElementById('timingEndDisplay').textContent = t.toFixed(2) + 's';
  }
  
  updateTimingBar();
  previewCurrentTiming();
};

window.nudgeTiming = function(which, delta) {
  const id = which === 'start' ? 'timingStartInput' : 'timingEndInput';
  const dispId = which === 'start' ? 'timingStartDisplay' : 'timingEndDisplay';
  const cur = parseFloat(document.getElementById(id)?.value) || 0;
  const val = Math.max(0, Math.round((cur + delta) * 100) / 100);
  
  const inputEl = document.getElementById(id);
  const dispEl = document.getElementById(dispId);
  if (inputEl) inputEl.value = val.toFixed(2);
  if (dispEl) dispEl.textContent = val.toFixed(2) + 's';
  
  updateTimingBar();
  previewCurrentTiming();
};

window.previewCurrentTiming = function() {
  const s = parseFloat(document.getElementById('timingStartInput')?.value) || 0;
  const e = parseFloat(document.getElementById('timingEndInput')?.value) || 0;
  if (e > s) {
    previewRange(s, e);
  }
};

window.applyTimingEdit = function() {
  if (editSegIndices.length === 0) return;
  const i = editSegIndices[0];
  const s = parseFloat(document.getElementById('timingStartInput')?.value);
  const e = parseFloat(document.getElementById('timingEndInput')?.value);
  
  if (isNaN(s) || isNaN(e) || e <= s) {
    showToast('⚠️ 시작 시간이 종료 시간보다 빨라야 합니다.');
    return;
  }
  
  pushHistory();
  currentLesson.subtitles[i].start = s;
  currentLesson.subtitles[i].end = e;
  
  renderTranscriptList();
  selectSentence(i, false);
  showToast(`⏱️ 타이밍 미세 조정 저장 완료: ${formatTime(s)} ~ ${formatTime(e)} (실행 취소: ⌘Z)`);
};

window.resetTimingEdit = function() {
  document.getElementById('timingStartInput').value = timingOrigStart.toFixed(2);
  document.getElementById('timingEndInput').value = timingOrigEnd.toFixed(2);
  document.getElementById('timingStartDisplay').textContent = timingOrigStart.toFixed(2) + 's';
  document.getElementById('timingEndDisplay').textContent = timingOrigEnd.toFixed(2) + 's';
  updateTimingBar();
};

function _attachTimingHandlers() {
  const hs = document.getElementById('timingHandleStart');
  const he = document.getElementById('timingHandleEnd');
  const bar = document.getElementById('timingBarWrap');
  if (!hs || !he || !bar) return;
  
  const hsClone = hs.cloneNode(true);
  const heClone = he.cloneNode(true);
  hs.parentNode.replaceChild(hsClone, hs);
  he.parentNode.replaceChild(heClone, he);
  
  hsClone.addEventListener('mousedown', e => _timingOnDown(e, 'start'));
  heClone.addEventListener('mousedown', e => _timingOnDown(e, 'end'));
  hsClone.addEventListener('touchstart', e => _timingOnDown(e, 'start'), { passive: false });
  heClone.addEventListener('touchstart', e => _timingOnDown(e, 'end'), { passive: false });
}

function _timingOnDown(e, which) {
  e.preventDefault();
  e.stopPropagation();
  _timingDragging = which;
  document.addEventListener('mousemove', _timingOnMove);
  document.addEventListener('mouseup', _timingOnUp);
  document.addEventListener('touchmove', _timingOnMove, { passive: false });
  document.addEventListener('touchend', _timingOnUp);
}

function _timingOnMove(e) {
  if (!_timingDragging) return;
  e.preventDefault();
  const bar = document.getElementById('timingBarWrap');
  if (!bar) return;
  
  const rect = bar.getBoundingClientRect();
  const cx = e.touches ? e.touches[0].clientX : e.clientX;
  const pct = Math.max(0, Math.min(1, (cx - rect.left) / rect.width));
  const t = Math.round((timingBarMin + pct * (timingBarMax - timingBarMin)) * 100) / 100;
  
  const id = _timingDragging === 'start' ? 'timingStartInput' : 'timingEndInput';
  const dispId = _timingDragging === 'start' ? 'timingStartDisplay' : 'timingEndDisplay';
  
  document.getElementById(id).value = t.toFixed(2);
  document.getElementById(dispId).textContent = t.toFixed(2) + 's';
  updateTimingBar();
}

function _timingOnUp() {
  if (_timingDragging) {
    _timingDragging = null;
    document.removeEventListener('mousemove', _timingOnMove);
    document.removeEventListener('mouseup', _timingOnUp);
    document.removeEventListener('touchmove', _timingOnMove);
    document.removeEventListener('touchend', _timingOnUp);
    previewCurrentTiming();
  }
}

function startTimingBarPlayhead() {
  if (timingPlayheadTimer) clearInterval(timingPlayheadTimer);
  const posEl = document.getElementById('timingPlayPos');
  if (!posEl) return;
  
  timingPlayheadTimer = setInterval(() => {
    const modal = document.getElementById('editModalOverlay');
    if (!modal || !modal.classList.contains('active') || !player || typeof player.getCurrentTime !== 'function') {
      clearInterval(timingPlayheadTimer);
      return;
    }
    const cur = player.getCurrentTime();
    const span = Math.max(0.1, timingBarMax - timingBarMin);
    const pct = Math.max(0, Math.min(100, ((cur - timingBarMin) / span) * 100));
    posEl.style.left = pct + '%';
  }, 60);
}

// Add Current Time as New Sentence Checkpoint (with undo support)
window.addCurrentTimeAsSentence = function() {
  if (!player || !isPlayerReady || typeof player.getCurrentTime !== 'function' || !currentLesson) return;
  const curTime = Math.round(player.getCurrentTime() * 10) / 10;
  const inputPrompt = prompt("새 구간의 대본/텍스트를 입력하세요:", "") || `구간 ${formatTime(curTime)}`;
  if (inputPrompt !== null) {
    pushHistory();
    const newSentence = {
      id: currentLesson.subtitles.length + 1,
      start: curTime,
      end: curTime + 5.0,
      text: inputPrompt,
      translation: "(사용자 지정 문장)"
    };
    currentLesson.subtitles.push(newSentence);
    currentLesson.subtitles.sort((a, b) => a.start - b.start);
    renderTranscriptList();
    showToast(`새 문장 추가 완료 (${formatTime(curTime)}) (실행 취소: ⌘Z)`);
  }
};

// Paste Custom SRT / Plain Text Subtitles (with undo support)
window.openCustomSubtitleModal = function() {
  const text = prompt("SRT 자막 내용이나 한 줄씩 대본을 붙여넣으세요:\n(한 줄당 1개 문장으로 자동 타임스탬프 계산)");
  if (!text) return;
  
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !/^\d+$/.test(l));
  if (lines.length === 0) return;
  
  pushHistory();
  const newSubs = [];
  const duration = (player && typeof player.getDuration === 'function') ? player.getDuration() : lines.length * 5;
  const step = Math.max(3, duration / lines.length);
  
  lines.forEach((line, idx) => {
    newSubs.push({
      id: idx + 1,
      start: Math.round(idx * step * 10) / 10,
      end: Math.round((idx + 1) * step * 10) / 10,
      text: line,
      translation: "(등록된 대본)"
    });
  });
  
  currentLesson.subtitles = newSubs;
  renderTranscriptList();
  selectSentence(0, true);
  showToast(`${lines.length}개 문장 등록 완료 (실행 취소: ⌘Z)`);
};

// Controls: Play/Pause, Replay, Next, Prev
window.togglePlay = function() {
  if (!player || !isPlayerReady || typeof player.getPlayerState !== 'function') return;
  const state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};

window.replaySentence = function() {
  if (!player || !isPlayerReady || typeof player.seekTo !== 'function' || !currentLesson) return;
  const sentence = currentLesson.subtitles[currentSentenceIndex];
  if (sentence) {
    isSeekDebouncing = true;
    player.seekTo(sentence.start, true);
    setTimeout(() => { isSeekDebouncing = false; }, 250);
    player.playVideo();
  }
};

window.prevSentence = function() {
  if (currentSentenceIndex > 0) {
    selectSentence(currentSentenceIndex - 1, true);
  }
};

window.nextSentence = function() {
  if (currentLesson && currentLesson.subtitles && currentSentenceIndex < currentLesson.subtitles.length - 1) {
    selectSentence(currentSentenceIndex + 1, true);
  }
};

window.setSpeed = function(rate) {
  currentSpeed = rate;
  if (player && isPlayerReady && typeof player.setPlaybackRate === 'function') {
    player.setPlaybackRate(rate);
  }
  document.querySelectorAll('.speed-opt').forEach(btn => {
    btn.classList.toggle('active', parseFloat(btn.dataset.speed) === rate);
  });
};

window.toggleOriginalBlur = function() {
  isBlurredOriginal = !isBlurredOriginal;
  const origEl = document.getElementById('current-original');
  const btn = document.getElementById('blur-toggle');
  if (origEl) origEl.classList.toggle('blurred', isBlurredOriginal);
  if (btn) btn.classList.toggle('active', isBlurredOriginal);
};

window.toggleTranslationHide = function() {
  isHideTranslation = !isHideTranslation;
  const transEl = document.getElementById('current-translation');
  const btn = document.getElementById('trans-toggle');
  if (transEl) transEl.classList.toggle('hidden', isHideTranslation);
  if (btn) btn.classList.toggle('active', isHideTranslation);
};

// Speech Recognition & Pronunciation Scoring
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;
  
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = currentLanguage;
  
  recognition.onstart = () => {
    isRecording = true;
    updateMicUi(true);
    startVisualizer();
  };
  
  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    document.getElementById('recognized-text').textContent = transcript;
    
    if (event.results[0].isFinal) {
      evaluatePronunciation(transcript);
    }
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    stopRecording();
  };
  
  recognition.onend = () => {
    stopRecording();
  };
}

window.changeLanguage = function(lang) {
  currentLanguage = lang;
  if (recognition) recognition.lang = lang;
  showToast(`인식 언어: ${lang}`);
};

window.toggleMicRecording = function() {
  if (!recognition) {
    const manualSpoken = prompt("브라우저 음성 인식이 지원되지 않는 환경입니다. 내가 말한 내용을 입력해 발음을 채점해보세요:");
    if (manualSpoken) {
      document.getElementById('recognized-text').textContent = manualSpoken;
      evaluatePronunciation(manualSpoken);
    }
    return;
  }
  
  if (isRecording) {
    recognition.stop();
  } else {
    recognition.lang = currentLanguage;
    try {
      recognition.start();
    } catch (e) {
      console.warn(e);
    }
  }
};

function updateMicUi(recording) {
  const micBtn = document.getElementById('btn-mic-record');
  const micText = document.getElementById('mic-status-text');
  if (micBtn) micBtn.classList.toggle('recording', recording);
  if (micText) micText.textContent = recording ? '듣고 있습니다...' : '말하기 (Shadow)';
}

function stopRecording() {
  isRecording = false;
  updateMicUi(false);
  stopVisualizer();
}

// Live Audio Waveform Visualizer
async function startVisualizer() {
  try {
    const canvas = document.getElementById('mic-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = audioContext.createMediaStreamSource(micStream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function draw() {
      animationFrameId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = `rgb(${dataArray[i] + 50}, 102, 241)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }
    draw();
  } catch (err) {
    console.warn('Mic visualizer permission denied or unavailable', err);
  }
}

function stopVisualizer() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }
}

// Compare user transcript with original sentence
function evaluatePronunciation(spokenText) {
  if (!currentLesson || !currentLesson.subtitles || !currentLesson.subtitles[currentSentenceIndex]) return;
  const original = currentLesson.subtitles[currentSentenceIndex].text;
  
  const cleanOriginal = original.toLowerCase().replace(/[^a-z0-9\s가-힣]/gi, '').split(/\s+/).filter(Boolean);
  const cleanSpoken = spokenText.toLowerCase().replace(/[^a-z0-9\s가-힣]/gi, '').split(/\s+/).filter(Boolean);
  
  let matchCount = 0;
  const wordTags = cleanOriginal.map(origWord => {
    if (cleanSpoken.includes(origWord)) {
      matchCount++;
      return `<span class="word-tag correct">${origWord}</span>`;
    } else {
      const close = cleanSpoken.some(spk => levenshtein(origWord, spk) <= 2);
      if (close) {
        matchCount += 0.6;
        return `<span class="word-tag close">${origWord}</span>`;
      }
      return `<span class="word-tag missed">${origWord}</span>`;
    }
  });
  
  const scorePercent = Math.min(100, Math.round((matchCount / Math.max(1, cleanOriginal.length)) * 100));
  
  const scoreEl = document.getElementById('accuracy-score');
  const wordsEl = document.getElementById('diff-words');
  
  if (scoreEl) {
    scoreEl.textContent = `${scorePercent}% 정확도`;
    scoreEl.className = 'score-badge ' + (scorePercent >= 80 ? 'high' : (scorePercent >= 50 ? 'mid' : 'low'));
  }
  
  if (wordsEl) {
    wordsEl.innerHTML = wordTags.join(' ');
  }
}

function resetFeedback() {
  const scoreEl = document.getElementById('accuracy-score');
  const wordsEl = document.getElementById('diff-words');
  const recognizedEl = document.getElementById('recognized-text');
  
  if (scoreEl) {
    scoreEl.textContent = '0% 정확도';
    scoreEl.className = 'score-badge mid';
  }
  if (wordsEl) wordsEl.innerHTML = '<span style="color:var(--text-dim);">마이크 버튼을 누르고 문장을 따라 말해보세요. (또는 클릭하여 직접 텍스트 입력)</span>';
  if (recognizedEl) recognizedEl.textContent = '...';
}

function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }
  return matrix[b.length][a.length];
}

// Dictation Cloze Mode Logic
function updateDictationCard(sentence) {
  const container = document.getElementById('cloze-container');
  if (!container || !sentence) return;
  
  const words = sentence.text.split(' ');
  const maskedHtml = words.map((w, idx) => {
    if (w.length > 3 && idx % 2 === 1) {
      return `<input type="text" class="cloze-input" data-ans="${w.replace(/[^a-zA-Z0-9가-힣]/g, '')}" style="width: ${Math.max(40, w.length * 11)}px; padding: 2px 6px; background: rgba(0,0,0,0.3); border: 1px dashed var(--accent-cyan); color: #fff; border-radius: 4px; text-align: center;" placeholder="___" />`;
    }
    return `<span>${w}</span>`;
  }).join(' ');
  
  container.innerHTML = `
    <div style="font-size: 1.1rem; line-height: 2; margin-bottom: 1rem;">${maskedHtml}</div>
    <button class="btn-load" style="padding: 0.4rem 1rem; font-size: 0.85rem;" onclick="checkDictationAnswers()">정답 확인</button>
    <span id="cloze-result" style="margin-left: 1rem; font-weight: 600;"></span>
  `;
}

window.checkDictationAnswers = function() {
  const inputs = document.querySelectorAll('.cloze-input');
  let allCorrect = true;
  inputs.forEach(inp => {
    const userVal = inp.value.trim().toLowerCase();
    const correctVal = inp.dataset.ans.toLowerCase();
    if (userVal === correctVal) {
      inp.style.borderColor = 'var(--accent-green)';
      inp.style.background = 'rgba(16, 185, 129, 0.2)';
    } else {
      allCorrect = false;
      inp.style.borderColor = 'var(--accent-red)';
      inp.style.background = 'rgba(239, 68, 68, 0.2)';
    }
  });
  
  const resultEl = document.getElementById('cloze-result');
  if (resultEl) {
    resultEl.textContent = allCorrect ? '🎉 완벽합니다!' : '⚠️ 틀린 단어를 다시 확인해보세요.';
    resultEl.style.color = allCorrect ? 'var(--accent-green)' : 'var(--accent-amber)';
  }
};

// Bookmarks & Vocabulary Management
function isBookmarked(text) {
  return savedBookmarks.some(b => b.text === text);
}

window.toggleBookmark = function(index) {
  if (!currentLesson || !currentLesson.subtitles[index]) return;
  const sentence = currentLesson.subtitles[index];
  const existingIdx = savedBookmarks.findIndex(b => b.text === sentence.text);
  
  if (existingIdx >= 0) {
    savedBookmarks.splice(existingIdx, 1);
  } else {
    savedBookmarks.push({
      ...sentence,
      videoTitle: currentLesson.title,
      videoId: currentLesson.videoId,
      date: new Date().toLocaleDateString()
    });
  }
  
  localStorage.setItem('yt_shadow_bookmarks', JSON.stringify(savedBookmarks));
  renderTranscriptList();
  renderBookmarks();
};

function renderBookmarks() {
  const container = document.getElementById('bookmarks-list');
  if (!container) return;
  
  if (savedBookmarks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <p>저장된 문장이 없습니다.<br>학습 중 별표를 눌러 나만의 단어장을 만드세요.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = savedBookmarks.map((b, idx) => `
    <div class="sentence-item" style="margin-bottom: 0.5rem;">
      <div class="item-top">
        <span class="item-time">${b.videoTitle || '저장된 문장'}</span>
        <button class="item-btn" onclick="removeBookmark(${idx})">✕</button>
      </div>
      <div class="item-orig">${b.text}</div>
      <div class="item-trans">${b.translation}</div>
    </div>
  `).join('');
}

window.removeBookmark = function(idx) {
  savedBookmarks.splice(idx, 1);
  localStorage.setItem('yt_shadow_bookmarks', JSON.stringify(savedBookmarks));
  renderBookmarks();
  renderTranscriptList();
};

window.exportBookmarks = function() {
  if (savedBookmarks.length === 0) {
    alert('내보낼 저장된 문장이 없습니다.');
    return;
  }
  const csvContent = "data:text/csv;charset=utf-8," + 
    ["Original,Translation,Source"].concat(
      savedBookmarks.map(b => `"${b.text.replace(/"/g, '""')}","${b.translation.replace(/"/g, '""')}","${(b.videoTitle||'').replace(/"/g, '""')}"`)
    ).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "youtube_shadowing_vocabulary.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// UI Tabs Switching
window.switchTab = function(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabName}`);
  });
};

// Keyboard Shortcuts & Global Undo/Redo Listener
function initEventListeners() {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        undo();
        return;
      }
    }
    
    if ((e.metaKey || e.ctrlKey) && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        redo();
        return;
      }
    }

    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.code) {
      case 'Space':
        e.preventDefault();
        togglePlay();
        break;
      case 'KeyR':
        e.preventDefault();
        replaySentence();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevSentence();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextSentence();
        break;
      case 'KeyM':
        e.preventDefault();
        toggleMicRecording();
        break;
      case 'KeyH':
        e.preventDefault();
        toggleOriginalBlur();
        break;
      case 'KeyT':
        e.preventDefault();
        toggleTranslationHide();
        break;
      case 'KeyA':
        e.preventDefault();
        addCurrentTimeAsSentence();
        break;
      case 'KeyI':
        if (document.getElementById('editModalOverlay')?.classList.contains('active')) {
          e.preventDefault();
          setTimingFromVideo('start');
        }
        break;
      case 'KeyO':
        if (document.getElementById('editModalOverlay')?.classList.contains('active')) {
          e.preventDefault();
          setTimingFromVideo('end');
        }
        break;
    }
  });
}

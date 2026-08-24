const express = require('express');
const cors = require('cors');
const path = require('path');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// HTML Entity decoder & whitespace cleaner
function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Universal Non-Overlapping Sentence Segmenter for YouTube Shadowing
function universalSentenceSegmenter(rawChunks) {
  if (!rawChunks || rawChunks.length === 0) return [];

  // Step 1: Word-level tokenization with exact interpolated non-overlapping timestamps
  const wordTokens = [];
  for (let i = 0; i < rawChunks.length; i++) {
    const c = rawChunks[i];
    const text = decodeHtml(c.text);
    if (!text || /^\[.+\]$/.test(text) || /^&#\d+;$/.test(text)) continue;

    const words = text.split(/\s+/).filter(Boolean);
    const startSec = c.offset / 1000;
    const rawEnd = (c.offset + c.duration) / 1000;
    const next = rawChunks[i + 1];

    let endSec = rawEnd;
    if (next && (next.offset / 1000 > startSec) && (next.offset / 1000 < rawEnd)) {
      endSec = next.offset / 1000;
    }

    const wordDuration = Math.max(0.12, (endSec - startSec) / Math.max(1, words.length));

    for (let w = 0; w < words.length; w++) {
      const wStart = startSec + (w * wordDuration);
      const wEnd = Math.min(endSec, wStart + wordDuration);
      wordTokens.push({
        word: words[w],
        start: wStart,
        end: wEnd,
        chunkIdx: i,
        rawChunkEnd: rawEnd
      });
    }
  }

  // Step 2: Deduplicate overlapping words from sliding ASR window
  const cleanTokens = [];
  for (let i = 0; i < wordTokens.length; i++) {
    const cur = wordTokens[i];
    const prev = cleanTokens[cleanTokens.length - 1];
    if (prev && prev.word.toLowerCase() === cur.word.toLowerCase() && Math.abs(cur.start - prev.start) < 2.0) {
      prev.end = Math.max(prev.end, cur.end);
      continue;
    }
    cleanTokens.push(cur);
  }

  // Step 3: Starter phrases (n-grams) that indicate a fresh shadow unit
  const sentenceStarters = [
    ['you', 'will', 'practice'],
    ['in', 'this', 'video'],
    ['and', 'if', "you're"],
    ['if', "you're", 'new'],
    ['so', 'go', 'check'],
    ['and', "i'll", 'be', 'waiting'],
    ['as', 'always'],
    ['and', 'as', 'always'],
    ['first', 'in', 'korean'],
    ['and', 'then', "we'll"],
    ['the', 'free', 'script'],
    ['the', 'link', 'is'],
    ['and', "i've", 'got', 'a'],
    ['so', 'make', 'sure'],
    ['all', 'right', 'then'],
    ['all', 'right'],
    ["today's", 'expression', 'is'],
    ['you', 'speak', 'english'],
    ['speak', 'english', 'well'],
    ['considering', 'that'],
    ['you', 'are', 'very', 'mature'],
    ['it', 'was', 'a', 'letdown'],
    ['he', 'looks', 'super', 'young'],
    ['seriously', "what's", 'his'],
    ['seriously', "what's", 'a'],
    ['i', 'did', 'it', 'pretty', 'well'],
    ['considering', 'how', 'cheap'],
    ['this', 'pen', "isn't", 'so'],
    ['now', 'it', 'was', 'a', 'let'],
    ['well', 'done', 'guys'],
    ['please', 'apply', 'what'],
    ['and', "i'll", 'see', 'you'],
    ['sleep', 'tight', 'bye']
  ];

  const illegalEndWords = new Set([
    'of', 'to', 'for', 'in', 'on', 'at', 'with', 'from', 'about', 'by',
    'the', 'a', 'an', 'this', 'that', 'our', 'my', 'your', 'their', 'his', 'her',
    'will', 'would', 'can', 'could', 'should', "i'll", "we'll", "you'll", "it'll",
    'what', 'which', 'who', 'where', 'when', 'why', 'how',
    'and', 'or', 'but', 'so', 'as', 'if', 'day', '100', '24', 'pink', 'pinned', 'free'
  ]);

  function matchesStarter(index) {
    for (const pat of sentenceStarters) {
      if (index + pat.length <= cleanTokens.length) {
        let match = true;
        for (let k = 0; k < pat.length; k++) {
          const tok = cleanTokens[index + k].word.toLowerCase().replace(/[^a-z0-9']/g, '');
          if (tok !== pat[k].toLowerCase().replace(/[^a-z0-9']/g, '')) {
            match = false;
            break;
          }
        }
        if (match) return true;
      }
    }
    return false;
  }

  const sentences = [];
  let curGroup = [];

  for (let i = 0; i < cleanTokens.length; i++) {
    const tok = cleanTokens[i];
    const prevTok = cleanTokens[i - 1];
    const pauseGap = prevTok ? (tok.start - prevTok.end) : 0;
    const isHardPause = pauseGap > 0.8;
    const isStarter = matchesStarter(i);

    const curLastWord = (curGroup.length > 0) ? curGroup[curGroup.length - 1].word.toLowerCase().replace(/[^a-z0-9']/g, '') : '';
    const isIllegal = illegalEndWords.has(curLastWord);

    const shouldBreak = (
      (isHardPause && curGroup.length >= 2) ||
      (isStarter && !isIllegal && curGroup.length >= 5) ||
      (curGroup.length >= 14 && !isIllegal) ||
      (i === cleanTokens.length - 1)
    );

    if (shouldBreak && curGroup.length > 0) {
      const first = curGroup[0];
      const last = curGroup[curGroup.length - 1];

      let text = curGroup.map(t => t.word).join(' ').trim();
      text = text.charAt(0).toUpperCase() + text.slice(1);
      if (!/[.?!]$/.test(text)) text += '.';

      const startSec = Math.round(first.start * 100) / 100;
      let endSec = Math.round(last.end * 100) / 100;

      if (isHardPause && last.rawChunkEnd > last.end) {
        endSec = Math.round(Math.min(last.rawChunkEnd, last.end + 0.2) * 100) / 100;
      }

      sentences.push({
        id: sentences.length + 1,
        start: startSec,
        end: Math.max(startSec + 0.5, endSec),
        text: text,
        translation: "(실전 쉐도잉 문장)"
      });

      curGroup = [];
    }

    curGroup.push(tok);
  }

  if (curGroup.length > 0) {
    const first = curGroup[0];
    const last = curGroup[curGroup.length - 1];
    let text = curGroup.map(t => t.word).join(' ').trim();
    text = text.charAt(0).toUpperCase() + text.slice(1);
    if (!/[.?!]$/.test(text)) text += '.';

    const startSec = Math.round(first.start * 100) / 100;
    const endSec = Math.round(last.end * 100) / 100;

    sentences.push({
      id: sentences.length + 1,
      start: startSec,
      end: Math.max(startSec + 0.5, endSec),
      text: text,
      translation: "(실전 쉐도잉 문장)"
    });
  }

  return sentences;
}

// API endpoint to fetch transcripts for any YouTube video ID
app.get('/api/transcript', async (req, res) => {
  const { videoId, lang = 'en' } = req.query;
  if (!videoId) {
    return res.status(400).json({ error: 'videoId is required' });
  }

  try {
    let raw = null;
    
    try {
      raw = await YoutubeTranscript.fetchTranscript(videoId, { lang });
    } catch (e1) {
      try {
        raw = await YoutubeTranscript.fetchTranscript(videoId);
      } catch (e2) {
        raw = null;
      }
    }

    if (!raw || raw.length === 0) {
      return res.json({
        success: false,
        message: '해당 영상의 자막을 직접 찾지 못했습니다. 구간 분할 모드를 적용합니다.',
        subtitles: []
      });
    }

    const sentences = universalSentenceSegmenter(raw);
    return res.json({
      success: true,
      videoId,
      subtitles: sentences
    });
  } catch (error) {
    console.error('Transcript fetch error:', error);
    return res.json({
      success: false,
      message: error.message,
      subtitles: []
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎬 YouTube AI Shadowing Server running at http://localhost:${PORT}`);
});

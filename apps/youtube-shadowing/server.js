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
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Natural Clause & Breath-Segmenter for YouTube Shadowing
function naturalSentenceSegmenter(rawChunks) {
  if (!rawChunks || rawChunks.length === 0) return [];

  const sentences = [];
  let curChunkGroup = [];
  let curGroupText = '';

  // Words or phrases that naturally mark a new sentence/clause
  const majorThoughtStarters = [
    /^(hi\s+guys|hello\s+everyone|welcome\s+to)/i,
    /^(in\s+this\s+video|in\s+today's\s+video)/i,
    /^(and\s+if\s+you're|if\s+you're\s+new)/i,
    /^(so\s+go\s+check|so\s+make\s+sure|make\s+sure\s+to)/i,
    /^(and\s+i'll\s+be\s+waiting|i'll\s+be\s+waiting)/i,
    /^(as\s+always|and\s+as\s+always|and\s+then\s+we'll)/i,
    /^(the\s+free\s+script|the\s+link\s+is)/i,
    /^(and\s+i've\s+got\s+a\s+question|i\s+have\s+a\s+question)/i,
    /^(all\s+right\s+then|all\s+right|let's\s+go\s+ahead)/i,
    /^(today's\s+expression\s+is|today's\s+lesson\s+is)/i,
    /^(you\s+speak\s+english|speak\s+english\s+well)/i,
    /^(considering\s+that|considering)/i,
    /^(you\s+are\s+very\s+mature|it\s+was\s+a\s+letdown|he\s+looks\s+super\s+young)/i
  ];

  const illegalEndRegex = /\b(of|to|for|in|on|at|with|from|about|by|the|a|an|this|that|our|my|your|their|is|are|am|was|were|be|been|have|has|had|will|would|can|could|should|what|which|who|where|when|why|how|and|or|but|so|as|if|all\s+right|day|100|100-day|24|free\s+script|pink\s+comment|pinned\s+comment)$/i;

  for (let i = 0; i < rawChunks.length; i++) {
    const chunk = rawChunks[i];
    const text = decodeHtml(chunk.text);
    if (!text || /^\[.+\]$/.test(text) || /^&#\d+;$/.test(text)) continue;

    const startSec = chunk.offset / 1000;
    const endSec = (chunk.offset + chunk.duration) / 1000;
    const nextChunk = rawChunks[i + 1];
    const nextText = nextChunk ? decodeHtml(nextChunk.text) : '';
    const gapToNext = nextChunk ? (nextChunk.offset / 1000 - endSec) : 999;

    curChunkGroup.push({ text, start: startSec, end: endSec });
    curGroupText = curChunkGroup.map(c => c.text).join(' ').trim();

    const isNextMajorStarter = majorThoughtStarters.some(regex => regex.test(nextText));
    const endsIllegally = illegalEndRegex.test(curGroupText);
    const wordCount = curGroupText.split(/\s+/).length;
    const isBigPause = gapToNext > 1.2;

    // Break when:
    // 1) Clear silence/pause (> 1.2s)
    // 2) Next chunk starts a new thought AND current group has at least 6 words and ends cleanly
    // 3) Group reaches 12~15 words (natural speaking breath limit) and ends on a clean word
    const shouldBreak = (
      (isBigPause && !endsIllegally) ||
      (isNextMajorStarter && !endsIllegally && wordCount >= 6) ||
      (wordCount >= 14 && !endsIllegally) ||
      (i === rawChunks.length - 1)
    );

    if (shouldBreak && curChunkGroup.length > 0) {
      const firstChunk = curChunkGroup[0];
      const lastChunk = curChunkGroup[curChunkGroup.length - 1];
      
      // Clean duplicate overlapping words
      const words = curGroupText.split(' ').filter(Boolean);
      const cleanWords = [];
      for (let k = 0; k < words.length; k++) {
        if (k === 0 || words[k].toLowerCase() !== words[k - 1].toLowerCase()) {
          cleanWords.push(words[k]);
        }
      }
      
      let sentenceStr = cleanWords.join(' ').trim();
      let formatted = sentenceStr.charAt(0).toUpperCase() + sentenceStr.slice(1);
      if (!/[.?!]$/.test(formatted)) formatted += '.';

      // Safe buffer padding (+0.3s) so words are never cut abruptly
      const safeStart = Math.max(0, Math.round(firstChunk.start * 10) / 10);
      const safeEnd = Math.round((lastChunk.end + 0.3) * 10) / 10;

      sentences.push({
        id: sentences.length + 1,
        start: safeStart,
        end: Math.max(safeStart + 1.5, safeEnd),
        text: formatted,
        translation: "(실전 쉐도잉 문장)"
      });

      curChunkGroup = [];
      curGroupText = '';
    }
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

    const sentences = naturalSentenceSegmenter(raw);
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

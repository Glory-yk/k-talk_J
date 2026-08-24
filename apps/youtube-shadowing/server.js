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
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// True Non-Overlapping Audio Boundary Segmenter
function trueAudioBoundarySegmenter(rawChunks) {
  if (!rawChunks || rawChunks.length === 0) return [];

  // Step 1: Compute true non-overlapping start and end for every chunk
  const processedChunks = [];
  for (let i = 0; i < rawChunks.length; i++) {
    const c = rawChunks[i];
    const text = decodeHtml(c.text);
    if (!text || /^\[.+\]$/.test(text) || /^&#\d+;$/.test(text)) continue;

    const startSec = c.offset / 1000;
    const next = rawChunks[i + 1];
    
    // In YouTube transcripts, the next chunk's offset is the exact moment the next words start.
    // If there is a big gap (> 1.2s), use current chunk's offset + duration.
    let endSec = (c.offset + c.duration) / 1000;
    if (next && (next.offset / 1000 > startSec)) {
      const nextStart = next.offset / 1000;
      if (nextStart - startSec < 10.0) {
        endSec = nextStart;
      }
    }

    processedChunks.push({
      text,
      start: startSec,
      end: endSec
    });
  }

  // Step 2: Combine chunks into natural complete sentences (6~10 words or complete clauses)
  const sentences = [];
  let curGroup = [];

  for (let i = 0; i < processedChunks.length; i++) {
    const chunk = processedChunks[i];
    curGroup.push(chunk);

    const nextChunk = processedChunks[i + 1];
    const groupText = curGroup.map(c => c.text).join(' ').trim();
    const wordCount = groupText.split(/\s+/).length;
    
    // Silence / pause to next chunk
    const gapToNext = nextChunk ? (nextChunk.start - chunk.end) : 999;
    const hasPause = gapToNext > 0.8;
    const isGoodLength = wordCount >= 7;

    if (hasPause || isGoodLength || i === processedChunks.length - 1) {
      if (curGroup.length > 0) {
        const first = curGroup[0];
        const last = curGroup[curGroup.length - 1];

        // Clean duplicates
        const words = groupText.split(/\s+/).filter(Boolean);
        const cleanWords = [];
        for (let k = 0; k < words.length; k++) {
          if (k === 0 || words[k].toLowerCase() !== words[k - 1].toLowerCase()) {
            cleanWords.push(words[k]);
          }
        }

        let cleanText = cleanWords.join(' ').trim();
        let formatted = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
        if (!/[.?!]$/.test(formatted)) formatted += '.';

        sentences.push({
          id: sentences.length + 1,
          start: Math.round(first.start * 100) / 100,
          end: Math.round(last.end * 100) / 100,
          text: formatted,
          translation: "(실전 쉐도잉 문장)"
        });

        curGroup = [];
      }
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

    const sentences = trueAudioBoundarySegmenter(raw);
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

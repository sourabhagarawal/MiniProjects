const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('.'));

const SYSTEM_PROMPT = `You are a note classification assistant. When given a note, you respond ONLY with a valid JSON object — no markdown fences, no explanation, no extra text. The JSON must have exactly these fields:
- "summary": a single sentence (max 50 words) capturing the note's main point
- "category": exactly one of ["Work", "Personal", "Ideas", "Research", "Other"]
- "tags": an array of 3 to 6 lowercase hyphen-separated keyword tags relevant to the note content

Example output:
{"summary":"Team discussed Q2 roadmap priorities and assigned owners to each feature.","category":"Work","tags":["roadmap","meeting","q2","product","team"]}`;

app.post('/api/tag', (req, res) => {
  const { apiKey, noteContent } = req.body;

  if (!apiKey || !noteContent) {
    return res.status(400).json({ error: 'apiKey and noteContent are required' });
  }

  const requestBody = JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: `Note:\n${noteContent}` }]
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  };

  const proxyReq = https.request(options, (proxyRes) => {
    let data = '';
    proxyRes.on('data', chunk => { data += chunk; });
    proxyRes.on('end', () => {
      try {
        const anthropicResponse = JSON.parse(data);

        if (proxyRes.statusCode === 401) {
          return res.status(401).json({ error: 'Invalid API key. Check your key in Settings.' });
        }
        if (proxyRes.statusCode === 429) {
          return res.status(429).json({ error: 'Rate limit reached. Please wait a moment and try again.' });
        }
        if (anthropicResponse.error) {
          return res.status(502).json({ error: anthropicResponse.error.message });
        }

        const rawText = anthropicResponse.content[0].text;
        const metadata = JSON.parse(rawText);
        return res.json(metadata);
      } catch (e) {
        return res.status(502).json({ error: 'Claude returned an unexpected response. Try again.' });
      }
    });
  });

  proxyReq.on('error', () => {
    res.status(500).json({ error: 'Network error contacting Anthropic API.' });
  });

  proxyReq.write(requestBody);
  proxyReq.end();
});

app.listen(3000, () => {
  console.log('AI Smart Note Tagger running at http://localhost:3000');
});

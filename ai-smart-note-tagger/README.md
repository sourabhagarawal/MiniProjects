# 🏷️ AI Smart Note Tagger

Paste any note and Claude AI instantly generates **tags**, a **one-line summary**, and a **category** — all saved locally in your browser. No database, no signup.

![Screenshot placeholder](screenshot.png)

---

## Features

- ✨ **AI tagging** — Claude Haiku generates 3–6 keyword tags per note
- 📝 **Auto-summary** — one-sentence summary for every note
- 🗂️ **Categories** — Work, Personal, Ideas, Research, or Other
- 🔍 **Search & filter** — search full text or click any tag to filter
- 💾 **Persistent** — notes saved to `localStorage` (survive page refresh)
- 📱 **Mobile-responsive** — works on any screen size
- 🔑 **Your key, your data** — API key stored only in your browser

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML/CSS/JS + Tailwind CDN |
| Backend | Node.js + Express (local proxy) |
| AI | Anthropic Claude Haiku (`claude-haiku-4-5-20251001`) |
| Storage | Browser `localStorage` |

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18+
- An [Anthropic API key](https://console.anthropic.com/)

### 2. Install & Run

```bash
cd ai-smart-note-tagger
npm install
npm start
```

Then open **http://localhost:3000** in your browser.

### 3. Add your API key

Click the **⚙️ gear icon** in the top-right corner, paste your `sk-ant-...` key, and click **Save Key**.

### 4. Tag your first note

1. Paste or type any note in the text area
2. Click **✨ Tag This Note**
3. Review the AI-generated summary, category, and tags
4. Click **💾 Save Note** to add it to your feed

---

## Project Structure

```
ai-smart-note-tagger/
├── index.html    # Full frontend (HTML + Tailwind + inline JS)
├── server.js     # Express proxy — forwards requests to Anthropic API
├── package.json  # Node dependencies (express, cors)
└── README.md
```

---

## How It Works

```
Browser → POST /api/tag → server.js → Anthropic API → { summary, category, tags }
```

The local Express server exists solely to work around browser CORS restrictions on the Anthropic API. Your API key is sent from the browser to the local server only — it never leaves your machine.

---

## Git & Deploy

```bash
cd /c/tfs/MiniProjects
git add ai-smart-note-tagger/
git commit -m "feat: add AI Smart Note Tagger"
git push origin main
```

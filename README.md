# UToob

A YouTube clone built with React. Streams real data from the YouTube Data API v3 via a server-side proxy so the API key is never exposed in the browser.

## Features

- **Home feed** — trending videos with infinite pagination (Load More)
- **Watch page** — video player with likes, share, save, theater mode
- **Shorts** — TikTok-style vertical scroll with auto-play and comments drawer
- **Search** — results with channel avatars and decoded HTML entities
- **Channel page** — banner, avatar, subscriber count, videos tab, about tab
- **Explore / Category pages** — Trending, Music, Gaming, Sports, Movies, Live
- **Live chat** — real-time polling for videos that have an active live chat
- **Comments** — top comments sorted by relevance, with like counts and reply threads
- **Watch History** — auto-saved to localStorage, clearable
- **Watch Later** — save/unsave from any video card or watch page
- **Dark / Light mode** — toggle in header, persisted across sessions
- **Mobile responsive** — works on all screen sizes

## Tech Stack

- React 18 (Create React App)
- Redux Toolkit
- React Router v6
- Tailwind CSS
- YouTube Data API v3
- Netlify Functions (production API proxy)
- http-proxy-middleware (dev API proxy)

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd utoob-clone
npm install
```

### 2. Add your YouTube API key

Create a `.env` file in the project root:

```
YOUTUBE_API_KEY=your_api_key_here
```

Get a key from [Google Cloud Console](https://console.cloud.google.com/) — enable the **YouTube Data API v3**.

### 3. Run locally

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000). The dev server proxies all `/api/youtube/*` requests through `setupProxy.js`, appending the API key server-side.

## Deployment (Netlify)

The `netlify.toml` config handles everything:

- `npm run build` builds the React app
- `/api/youtube/*` requests are rewritten to `/.netlify/functions/youtube`
- The Netlify Function reads `YOUTUBE_API_KEY` from environment variables

Set `YOUTUBE_API_KEY` in your Netlify site's environment variables — the key never touches the client bundle.

## Project Structure

```
src/
  components/       React components
  utils/
    constants.js    API base URLs
    localStore.js   localStorage helpers (history, watch later)
    formatDuration  ISO 8601 → mm:ss
    relativeTime    "2 days ago" formatter
  setupProxy.js     Dev server API proxy
netlify/
  functions/
    youtube.js      Production serverless proxy
```

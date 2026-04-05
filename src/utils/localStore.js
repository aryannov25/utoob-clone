const HISTORY_KEY = "yt_history";
const WL_KEY = "yt_watch_later";

const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};
const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// ── Watch History ────────────────────────────────────────────────────
export const getHistory = () => get(HISTORY_KEY);

export const addToHistory = (video) => {
  const list = get(HISTORY_KEY).filter((v) => v.id !== video.id);
  list.unshift(video);
  save(HISTORY_KEY, list.slice(0, 100));
};

export const removeFromHistory = (id) =>
  save(
    HISTORY_KEY,
    get(HISTORY_KEY).filter((v) => v.id !== id),
  );

export const clearHistory = () => localStorage.removeItem(HISTORY_KEY);

// ── Watch Later ──────────────────────────────────────────────────────
export const getWatchLater = () => get(WL_KEY);

export const toggleWatchLater = (video) => {
  const list = get(WL_KEY);
  const idx = list.findIndex((v) => v.id === video.id);
  if (idx >= 0) list.splice(idx, 1);
  else list.unshift(video);
  save(WL_KEY, list);
  return idx < 0; // true = added, false = removed
};

export const isInWatchLater = (id) => get(WL_KEY).some((v) => v.id === id);

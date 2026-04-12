// Pick the highest-quality thumbnail the API returned.
// YouTube snippet.thumbnails may include: default, medium, high, standard, maxres.
// maxres/standard are often missing for older videos, so we gracefully fall back.
const VIDEO_ORDER = ["maxres", "standard", "high", "medium", "default"];

const pickVideo = (thumbnails) => {
  if (!thumbnails) return undefined;
  for (const key of VIDEO_ORDER) {
    const url = thumbnails[key]?.url;
    if (url) return url;
  }
  return undefined;
};

export const bestVideoThumb = (thumbnails) => pickVideo(thumbnails);

// Channel / profile avatars.
// YouTube embeds the size in the URL path (e.g. `=s88-c-k-c0x...`).
// Rewriting that parameter is the reliable way to upsize, because the `high`
// variant URL the API returns is inconsistent across channels.
// Accepts either a raw URL string or the `snippet.thumbnails` object.
export const upsizeAvatar = (input, size = 176) => {
  if (!input) return undefined;
  const base =
    typeof input === "string"
      ? input
      : input.default?.url || input.medium?.url || input.high?.url;
  if (!base) return undefined;
  return base.replace(/=s\d+-/, `=s${size}-`);
};

export const bestChannelThumb = (thumbnails, size = 176) =>
  upsizeAvatar(thumbnails, size);

// Direct fallback from a videoId — use when the snippet isn't available.
// `maxresdefault.jpg` is HD (1280x720); falls back to hq on <img> error.
export const videoThumbFromId = (videoId, quality = "maxresdefault") =>
  videoId ? `https://i.ytimg.com/vi/${videoId}/${quality}.jpg` : "";

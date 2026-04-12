// All YouTube API calls go through /api/youtube/* proxy (key added server-side).
export const YT_API = "/api/youtube";

export const YOUTUBE_SEARCH_API = "/api/suggestions?q=";

export const VIDEO_INFO_URL = `${YT_API}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=`;

export const CHANNEL_INFO_URL = `${YT_API}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=`;

export const SEARCH_MAX_LENGTH = 100;

export function capitalizeTheFirstLetterOfEachWord(words) {
  return words
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

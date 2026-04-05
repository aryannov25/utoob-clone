// All YouTube API calls go through /api/youtube/* proxy (key added server-side)
export const YT_API = "/api/youtube";

export const YOUTUBE_API_KEY = `${YT_API}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN`;

export const YOUTUBE_SEARCH_API = "/api/suggestions?q=";

export const VIDEO_INFO_URL = `${YT_API}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=`;

export const CHANNEL_INFO_URL = `${YT_API}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=`;

export const OFFSET_LIVE_CHAT = 20;

export function capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}

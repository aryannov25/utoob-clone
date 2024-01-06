//const GOOGLE_API_KEY = "AIzaSyAB2Tp4B26-K28nsWmdX9UwZkX-n2wpEt8";
//AIzaSyDWPq_w0_uVejy_MPuXReLG7VXXY4NuZpM

export const YOUTUBE_API_KEY =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  process.env.REACT_APP_GOOGLE_API_KEY;
// GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "https://clients1.google.com/complete/search?client=firefox&ds=yt&q=";

export const VIDEO_INFO_URL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  process.env.REACT_APP_GOOGLE_API_KEY +
  "&id=";

export const CHANNEL_INFO_URL =
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  process.env.REACT_APP_GOOGLE_API_KEY +
  "&id=";

export const OFFSET_LIVE_CHAT = 20;

export function capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}

// CORS Proxy
// https://proxy.cors.sh/
// https://corsproxy.org/?

// Search Url
//  https://clients1.google.com/complete/search?client=firefox&ds=yt&q=
//  http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=


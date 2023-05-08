//const GOOGLE_API_KEY = "AIzaSyAB2Tp4B26-K28nsWmdX9UwZkX-n2wpEt8";
//AIzaSyDWPq_w0_uVejy_MPuXReLG7VXXY4NuZpM

export const YOUTUBE_API_KEY =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  process.env.REACT_APP_GOOGLE_API_KEY;
// GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "https://corsproxy.io/?https://clients1.google.com/complete/search?client=firefox&ds=yt&q=";

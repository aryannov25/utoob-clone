import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useVideo = () => {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("v"));

  const YOUTUBE_API_KEY =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN&key=" +
    process.env.REACT_APP_GOOGLE_API_KEY;

  useEffect(() => {
    Suggestions();
    // eslint-disable-next-line
  }, []);

  async function Suggestions() {
    const data = await fetch(YOUTUBE_API_KEY);
    const json = await data.json();
    // console.log(json.items);
    setVideos(json.items);
  }

  return videos;
};
export default useVideo;

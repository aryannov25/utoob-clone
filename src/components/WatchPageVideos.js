import React, { useEffect, useState } from "react";
import VideoSuggestionsCard from "./VideoSuggestionsCard";
import { useSearchParams } from "react-router-dom";

const WatchPageVideos = () => {
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("v");
  const [relatedVideoData, setRelatedVideoData] = useState([]);

  const getRelatedVideos = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&relatedToVideoId=${videoId}&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("-----------------");
        // console.log(data);
        setRelatedVideoData(data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRelatedVideos();
    // eslint-disable-next-line
  }, [videoId]);

  if (!relatedVideoData?.length) {
    return null;
  }

  return (
    <>
      {/* <ScrollToTop/> */}
      <div className="ml-6 mt-4 mr-6 py-2 w-[450px] dark:bg-zinc-900">
        {relatedVideoData.map((v) => (
          <VideoSuggestionsCard info={v} />
        ))}
      </div>
    </>
  );
};

export default WatchPageVideos;

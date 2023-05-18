import React from "react";
import useVideo from "../utils/useVideo";
import VideoSuggestionsCard from "./VideoSuggestionsCard";
import { Link } from "react-router-dom";

const WatchPageVideos = () => {
  const watchPageVideo = useVideo();
  return (
    <div className="ml-6 mt-4 mr-6 w-[450px]">
      {watchPageVideo.map((v) => (
        <Link to={"/watch?v=" + v.id} key={v.id}>
          <VideoSuggestionsCard info={v} />
        </Link>
      ))}
    </div>
  );
};

export default WatchPageVideos;

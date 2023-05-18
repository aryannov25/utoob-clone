import React from "react";
import useVideo from "../utils/useVideo";
import SuggestionsCard from "./SuggestionsCard";
import { Link } from "react-router-dom";

const WatchPageVideos = () => {
  const watchPageVideo = useVideo();
  return (
    <div className="ml-6 mt-4 mr-6 w-[400px]">
      {watchPageVideo.map((v) => (
        <Link to={"/watch?v=" + v.id} key={v.id}>
          <SuggestionsCard info={v} />
        </Link>
      ))}
    </div>
  );
};

export default WatchPageVideos;

import React, { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "./../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API_KEY);
    const json = await data.json();
    console.log(json.items);
    setVideos(json.items);
  };

  if (!videos.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <VideoCard info={videos[2]} />
    </div>
  );
};

export default VideoContainer;

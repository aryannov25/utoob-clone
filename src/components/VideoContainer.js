import React, { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "./../utils/constants";
import VideoCard from './VideoCard';

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
  return <div>
    <VideoCard/>
  </div>;
};

export default VideoContainer;

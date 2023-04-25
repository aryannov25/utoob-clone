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
  
//conditional rendering
  if (!videos.length) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-around">
      {videos.map((video)=>(
        <VideoCard info={video} />

      ))}
      
    </div>
  );
};

export default VideoContainer;

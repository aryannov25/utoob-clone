import React from "react";
import { prettifyNumber } from "./../utils/number";

const VideoCard = ({ info }) => {
  // console.log(info);

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const views = statistics.viewCount;

  return (
    <div className="p-2 m-2 w-72 h-80 shadow-lg rounded-lg transition duration-500 ease-in-out hover:scale-105 hover:shadow-slate-400">
      <img className="rounded-lg" src={thumbnails.medium.url} alt="thumbnail" />
      <ul>
        <li className="font-bold">{title}</li>
        <li>{channelTitle}</li>
        <li>{prettifyNumber(views)} views</li>
      </ul>
    </div>
  );
};

export default VideoCard;

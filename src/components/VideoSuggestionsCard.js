import React from "react";
// import { prettifyNumber } from "./../utils/number";

const VideoSuggestionsCard = ({ info }) => {
  //  console.log(info);
  // const { snippet, statistics } = info;
  const { snippet } = info;
  const { channelTitle, title, thumbnails } = snippet;
  // const views = statistics.viewCount;

  return (
    <a href={"/watch?v=" + info.id.videoId} key={info.id.videoId}>
      <div className="flex flex-row rounded-lg mt-2 ">
        <img
          className="rounded-lg w-[180px] "
          alt="thumbnail"
          src={thumbnails.medium.url}
        />
        <ul key="list">
          <li key="title" className="p-1 text-sm font-bold">
            {title}
          </li>
          <li key="channelTitle" className="px-1 text-xs text-stone-500">
            {channelTitle}
          </li>
          {/* <li className="px-1 text-xs text-stone-500">
            {prettifyNumber(views)} views
          </li> */}
        </ul>
      </div>
    </a>
  );
};

export default VideoSuggestionsCard;

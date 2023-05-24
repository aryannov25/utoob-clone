import React from "react";
// import { prettifyNumber } from "./../utils/number";
import { Link } from "react-router-dom";
import ScrollToTop from "./../utils/scrollToTop";

const VideoSuggestionsCard = ({ info }) => {
  //  console.log(info);
  // const { snippet, statistics } = info;
  const { snippet } = info;
  const { channelTitle, title, thumbnails } = snippet;
  // const views = statistics.viewCount;

  return (
    <Link to={"/watch?v=" + info.id.videoId} key={info.id.videoId}>
      <ScrollToTop />
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
    </Link>
  );
};

export default VideoSuggestionsCard;

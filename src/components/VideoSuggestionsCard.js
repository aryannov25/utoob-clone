import React from "react";

const VideoSuggestionsCard = ({ info }) => {
  //  console.log(info);
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const views = statistics.viewCount;

  function prettifyNumber(views) {
    var thousand = 1000;
    var million = 1000000;
    var billion = 1000000000;
    var trillion = 1000000000000;
    if (views < thousand) {
      return String(views);
    }

    if (views >= thousand && views <= 1000000) {
      return Math.round(views / thousand) + "k";
    }

    if (views >= million && views <= billion) {
      return Math.round(views / million) + "M";
    }

    if (views >= billion && views <= trillion) {
      return Math.round(views / billion) + "B";
    } else {
      return Math.round(views / trillion) + "T";
    }
  }

  return (
    <div className=" flex flex-row rounded-lg mt-2 ">
      <img
        class="rounded-lg w-[190px] "
        alt="thumbnail"
        src={thumbnails.medium.url}
      />
      <ul>
        <li className="p-1 text-sm font-bold">{title}</li>
        <li className="px-1 text-xs text-stone-500">{channelTitle}</li>
        <li className="px-1 text-xs text-stone-500">
          {prettifyNumber(views)} views
        </li>
      </ul>
    </div>
  );
};

export default VideoSuggestionsCard;

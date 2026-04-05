import React, { useState } from "react";
import { Link } from "react-router-dom";
import { prettifyNumber } from "./../utils/number";
import { formatDuration } from "../utils/formatDuration";
import { relativeTime } from "../utils/relativeTime";
import { toggleWatchLater, isInWatchLater } from "../utils/localStore";

const avatarColor = (name = "") => {
  const colors = [
    "#1e40af",
    "#7e22ce",
    "#065f46",
    "#9f1239",
    "#92400e",
    "#0e7490",
    "#3f6212",
    "#4c1d95",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const VideoCard = ({ info, channelThumb }) => {
  const { snippet, statistics, contentDetails } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const views = statistics?.viewCount;
  const duration = formatDuration(contentDetails?.duration);

  const [inWL, setInWL] = useState(() => isInWatchLater(info.id));

  const handleWatchLater = (e) => {
    e.stopPropagation();
    const added = toggleWatchLater({
      id: info.id,
      title,
      channelTitle,
      channelId: snippet.channelId,
      thumbnail: thumbnails.medium.url,
      duration: contentDetails?.duration,
      viewCount: views,
      publishedAt,
    });
    setInWL(added);
  };

  return (
    <div className="group flex flex-col bg-transparent cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          src={thumbnails.medium.url}
          alt={title}
        />

        {/* Duration badge */}
        {duration && (
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[11px] font-medium px-1.5 py-0.5 rounded">
            {duration}
          </span>
        )}

        {/* Watch later button */}
        <button
          onClick={handleWatchLater}
          title={inWL ? "Remove from Watch Later" : "Save to Watch Later"}
          className={`absolute top-1.5 right-1.5 p-1.5 rounded-full bg-black/70 text-white transition-opacity ${
            inWL ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {inWL ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm-8 8.5v-2h-2v2H8v2h4v2h2v-2h4v-2h-4z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <path d="M12 8v4m0 0v4m0-4h4m-4 0H8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Metadata */}
      <div className="flex gap-3 mt-3">
        {channelThumb ? (
          <img
            className="flex-shrink-0 w-9 h-9 rounded-full object-cover mt-0.5"
            src={channelThumb}
            alt={channelTitle}
          />
        ) : (
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 select-none"
            style={{ backgroundColor: avatarColor(channelTitle) }}
          >
            {channelTitle?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}

        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-[#f1f1f1] text-sm font-semibold leading-tight line-clamp-2">
            {title}
          </p>
          <Link
            to={`/channel/${snippet.channelId}`}
            className="text-[#aaaaaa] text-xs hover:text-[#f1f1f1] transition-colors w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            {channelTitle}
          </Link>
          <p className="text-[#aaaaaa] text-xs">
            {views !== undefined ? `${prettifyNumber(views)} views` : ""}
            {views !== undefined && publishedAt ? " · " : ""}
            {relativeTime(publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

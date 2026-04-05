import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWatchLater, toggleWatchLater } from "../utils/localStore";
import { formatDuration } from "../utils/formatDuration";
import { relativeTime } from "../utils/relativeTime";
import { prettifyNumber } from "../utils/number";

const WatchLaterPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => getWatchLater());

  const handleRemove = (e, video) => {
    e.stopPropagation();
    toggleWatchLater(video);
    setItems(getWatchLater());
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen px-4 sm:px-6 py-6">
      <h1 className="text-[#f1f1f1] text-2xl font-bold mb-6">Watch Later</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <svg
            className="w-16 h-16 text-[#3f3f3f]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm-8 8.5v-2h-2v2H8v2h4v2h2v-2h4v-2h-4z" />
          </svg>
          <p className="text-[#aaaaaa] text-base">No videos saved yet</p>
          <p className="text-[#717171] text-sm">
            Save videos to watch them later
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((v) => (
            <div
              key={v.id}
              onClick={() => navigate(`/watch?v=${v.id}`)}
              className="flex gap-3 p-2 rounded-xl hover:bg-[#272727] transition-colors cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-[168px] h-[94px] rounded-xl overflow-hidden">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                {v.duration && (
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 py-0.5 rounded">
                    {formatDuration(v.duration)}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1 flex-1 min-w-0 py-0.5">
                <p className="text-[#f1f1f1] text-sm font-semibold line-clamp-2 leading-snug">
                  {v.title}
                </p>
                <p className="text-[#aaaaaa] text-xs">{v.channelTitle}</p>
                <p className="text-[#aaaaaa] text-xs">
                  {v.viewCount ? `${prettifyNumber(v.viewCount)} views · ` : ""}
                  {relativeTime(v.publishedAt)}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={(e) => handleRemove(e, v)}
                className="flex-shrink-0 self-start p-1.5 text-[#717171] hover:text-[#f1f1f1] opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-[#3f3f3f]"
                title="Remove from Watch Later"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLaterPage;

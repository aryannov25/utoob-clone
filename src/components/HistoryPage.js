import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getHistory,
  removeFromHistory,
  clearHistory,
} from "../utils/localStore";
import { formatDuration } from "../utils/formatDuration";
import { relativeTime } from "../utils/relativeTime";
import { prettifyNumber } from "../utils/number";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => getHistory());

  const handleRemove = (e, id) => {
    e.stopPropagation();
    removeFromHistory(id);
    setItems(getHistory());
  };

  const handleClear = () => {
    clearHistory();
    setItems([]);
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#f1f1f1] text-2xl font-bold">Watch History</h1>
        {items.length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-[#3ea6ff] hover:text-[#65b8ff] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <svg
            className="w-16 h-16 text-[#3f3f3f]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
          </svg>
          <p className="text-[#aaaaaa] text-base">No watch history yet</p>
          <p className="text-[#717171] text-sm">
            Videos you watch will appear here
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
                onClick={(e) => handleRemove(e, v.id)}
                className="flex-shrink-0 self-start p-1.5 text-[#717171] hover:text-[#f1f1f1] opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-[#3f3f3f]"
                title="Remove from history"
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

export default HistoryPage;

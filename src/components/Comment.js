import React from "react";
import { relativeTime } from "../utils/relativeTime";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

const Comment = ({ item, repliesQty, setVisibleSection, visibleSection }) => {
  const {
    authorProfileImageUrl,
    authorDisplayName,
    publishedAt,
    textOriginal,
    textDisplay,
    likeCount,
  } = item.snippet?.topLevelComment?.snippet;
  const text = textOriginal || textDisplay || "";

  return (
    <div className="flex gap-3">
      <img
        className="w-10 h-10 rounded-full flex-shrink-0 object-cover ring-1 ring-white/10"
        src={authorProfileImageUrl}
        alt={authorDisplayName}
        referrerPolicy="no-referrer"
        loading="lazy"
      />

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#f4f4f5] text-[13px] font-semibold">
            {authorDisplayName}
          </span>
          <span className="text-[#71717a] text-xs">
            {relativeTime(publishedAt)}
          </span>
        </div>

        <p className="text-[#e5e5e7] text-sm leading-relaxed whitespace-pre-line break-words">
          {text}
        </p>

        <div className="flex items-center gap-1 mt-1">
          <button className="press flex items-center gap-1.5 text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-full px-2 py-1.5 transition-colors">
            <AiFillLike className="w-4 h-4" />
            {likeCount > 0 && (
              <span className="text-xs font-medium">
                {likeCount >= 1000
                  ? `${(likeCount / 1000).toFixed(1)}K`
                  : likeCount}
              </span>
            )}
          </button>
          <button className="press flex items-center gap-1.5 text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-full p-1.5 transition-colors">
            <AiFillDislike className="w-4 h-4" />
          </button>
          <button className="press text-[#a1a1aa] text-xs font-semibold hover:text-white hover:bg-white/5 rounded-full px-3 py-1.5 transition-colors">
            Reply
          </button>
        </div>

        {repliesQty && (
          <button
            className="press flex items-center gap-2 mt-1 text-[#ff5d7a] text-sm font-semibold hover:bg-[#ff2e4d]/10 rounded-full px-3 py-1.5 w-fit transition-colors"
            onClick={
              item.id !== visibleSection
                ? () => setVisibleSection(item.id)
                : () => setVisibleSection(null)
            }
          >
            {item.id === visibleSection ? (
              <BiUpArrow className="w-3 h-3" />
            ) : (
              <BiDownArrow className="w-3 h-3" />
            )}
            {repliesQty} {repliesQty === 1 ? "reply" : "replies"}
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(Comment);

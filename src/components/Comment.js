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
      {/* Avatar */}
      <img
        className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
        src={authorProfileImageUrl}
        alt={authorDisplayName}
      />

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {/* Author + date */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#f1f1f1] text-sm font-semibold">
            {authorDisplayName}
          </span>
          <span className="text-[#aaaaaa] text-xs">
            {relativeTime(publishedAt)}
          </span>
        </div>

        <p className="text-[#f1f1f1] text-sm leading-relaxed whitespace-pre-line break-words">
          {text}
        </p>

        {/* Like / dislike / reply row */}
        <div className="flex items-center gap-4 mt-1">
          <button className="flex items-center gap-1.5 text-[#aaaaaa] hover:text-[#f1f1f1] transition-colors">
            <AiFillLike className="w-4 h-4" />
            {likeCount > 0 && (
              <span className="text-xs">
                {likeCount >= 1000
                  ? `${(likeCount / 1000).toFixed(1)}K`
                  : likeCount}
              </span>
            )}
          </button>
          <button className="flex items-center gap-1.5 text-[#aaaaaa] hover:text-[#f1f1f1] transition-colors">
            <AiFillDislike className="w-4 h-4" />
          </button>
          <button className="text-[#aaaaaa] text-xs font-semibold hover:text-[#f1f1f1] transition-colors">
            Reply
          </button>
        </div>

        {/* Expand replies */}
        {repliesQty && (
          <button
            className="flex items-center gap-2 mt-1 text-[#3ea6ff] text-sm font-semibold hover:bg-[#263850] rounded-full px-2 py-1 w-fit transition-colors"
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

import React from "react";
import { publishedAt as publishedAtFunc } from "../utils/publisedAt";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const CommentReply = ({ commentStructure }) => {
  const { textDisplay, authorProfileImageUrl, authorDisplayName, publishedAt } =
    commentStructure?.snippet;

  return (
    <div className="flex gap-3 ml-12 mt-4">
      {/* Avatar */}
      <img
        className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
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
            {publishedAtFunc(publishedAt)}
          </span>
        </div>

        {/* Reply text */}
        <p
          className="text-[#f1f1f1] text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: textDisplay }}
        />

        {/* Action row */}
        <div className="flex items-center gap-4 mt-1">
          <button className="flex items-center gap-1.5 text-[#aaaaaa] hover:text-[#f1f1f1] transition-colors">
            <AiFillLike className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1.5 text-[#aaaaaa] hover:text-[#f1f1f1] transition-colors">
            <AiFillDislike className="w-4 h-4" />
          </button>
          <button className="text-[#aaaaaa] text-xs font-semibold hover:text-[#f1f1f1] transition-colors">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentReply;

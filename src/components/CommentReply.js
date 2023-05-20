import React from "react";
import { publishedAt as publishedAtFunc } from "../utils/publisedAt";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const CommentReply = ({ commentStructure }) => {
  const { textDisplay, authorProfileImageUrl, authorDisplayName, publishedAt } =
    commentStructure?.snippet;

  return (
    <div>
      <div className="ml-10 mb-3 flex flex-rowitems-start">
        <img
          className="mt-2 h-9 w-9 rounded-[50%]"
          src={authorProfileImageUrl}
          alt="commentAuthor"
        />
        <div className="flex flex-col ml-3 justify-start">
          <h2 className="text-black-400 font-semibold text-md">
            {authorDisplayName}
            <span className="ml-2 text-gray-600 text-sm">
              {publishedAtFunc(publishedAt)}
            </span>
          </h2>
          <h3 className="text-sm mt-1">{textDisplay}</h3>
        </div>
      </div>
      <div className="flex flex-row mr-3 items-center ml-14 mb-2">
        <button className="w-5 h-5 mr-2 ml-8 hover:bg-gray-300 hover:rounded-full">
          <AiFillLike />
        </button>
        <button className="w-5 h-5 mr-2 hover:bg-gray-300 hover:rounded-full">
          <AiFillDislike />
        </button>
        <span className="">Reply</span>
      </div>
    </div>
  );
};

export default CommentReply;

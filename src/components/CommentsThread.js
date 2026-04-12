import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentReply from "./CommentReply";

const CommentsThread = ({ videoID }) => {
  const [commentThread, setCommentThread] = useState([]);
  const [visibleSection, setVisibleSection] = useState(null);

  useEffect(() => {
    if (!videoID) return;
    setCommentThread([]);
    const getComments = async () => {
      try {
        const data = await fetch(
          `/api/youtube/commentThreads?part=snippet%2Creplies&maxResults=30&order=relevance&videoId=${videoID}`,
        );
        if (!data.ok) return;
        const json = await data.json();
        if (json.items) setCommentThread(json.items);
      } catch (e) {
        // comments unavailable — leave empty
      }
    };
    getComments();
  }, [videoID]);

  if (!commentThread?.length) {
    return (
      <div className="flex items-center justify-center py-16 text-[#71717a] text-sm">
        Comments are turned off.
      </div>
    );
  }

  return (
    <div className="pb-10">
      <h2 className="text-[#f4f4f5] text-xl font-bold mb-6 tracking-tight">
        {commentThread.length} Comments
      </h2>

      <div className="flex flex-col gap-7">
        {commentThread.map((item) => (
          <div key={item.id}>
            <Comment
              item={item}
              repliesQty={item?.replies?.comments?.length}
              visibleSection={visibleSection}
              setVisibleSection={setVisibleSection}
            />
            {visibleSection === item.id &&
              item?.replies?.comments?.map((commentStructure) => (
                <CommentReply
                  key={
                    commentStructure?.snippet?.parentId +
                    commentStructure?.snippet?.textOriginal
                  }
                  commentStructure={commentStructure}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsThread;

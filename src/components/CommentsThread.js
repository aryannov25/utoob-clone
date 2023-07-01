import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentReply from "./CommentReply";

const CommentsThread = ({ videoID }) => {
  const [commentThread, setCommentThread] = useState([]);
  const [visibleSection, setVisibleSection] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=30&videoId=${videoID}` +
          "&key=" +
          process.env.REACT_APP_GOOGLE_API_KEY
      );
      const json = await data.json();
      // console.log(json.items);
      setCommentThread(json.items);
    };

    getComments();
  }, [videoID]);

  // console.log(commentThread?.length);
  if (!commentThread?.length) {
    return (
      <>
        <h2 className="flex justify-center items-center mb-56 p-4 dark:bg-zinc-900">
          Comments are turned off.{" "}
        </h2>
      </>
    );
  }
  return (
    <>
      <h1 className="p-5 font-extrabold">Comments</h1>
      {commentThread.map((item) => {
        return (
          <div
            key={item.id}
            className="m-7 shadow-md rounded-lg dark:bg-zinc-900"
          >
            <Comment
              item={item}
              repliesQty={item?.replies?.comments?.length}
              visibleSection={visibleSection}
              setVisibleSection={setVisibleSection}
            />
            {visibleSection === item.id &&
              item?.replies?.comments?.map((commentStructure) => {
                return (
                  <CommentReply
                    key={
                      commentStructure?.snippet?.parentId +
                      commentStructure?.snippet?.textOriginal
                    }
                    commentStructure={commentStructure}
                  />
                );
              })}
          </div>
        );
      })}
    </>
  );
};

export default CommentsThread;
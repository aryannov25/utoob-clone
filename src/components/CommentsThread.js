import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentReply from "./CommentReply";

const CommentsThread = ({ videoID }) => {
  const [commentThread, setCommentThread] = useState([]);
  const [visibleSection, setVisibleSection] = useState(null);

  const getComments = async () => {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoID}` +
        "&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    );
    const json = await data.json();
    console.log(json.items);
    setCommentThread(json.items);
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, []);

  if (commentThread.length === 0) {
    return (
      <>
        <h2 className="flex justify-center items-center mb-56">
          Comments are turned off.{" "}
          <span className="font-semibold text-blue-700 ml-2">Learn more</span>
        </h2>
      </>
    );
  }

  return (
    <>
      {commentThread.map((item) => {
        return (
          <div key={item.id} className="m-5 p-2 shadow-md rounded-lg">
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

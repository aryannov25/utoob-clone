import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/appSlice";
import Comments from "./Comments";
import WatchPageVideos from "./WatchPageVideos";
import VideoInfo from "./VideoInfo";
import ScrollToTop from "./../utils/scrollToTop";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);

  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("v"));

  useEffect(() => {
    dispatch(closeMenu());
    // eslint-disable-next-line
  }, []);

  const getComments = async () => {
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=" +
        searchParams.get("v") +
        "&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    );
    const json = await data.json();
    // console.log(json.items);
    setComments(json.items);
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!getComments ? (
        <>
          <ScrollToTop />
        </>
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex">
            <div className="p-5 start-0 ">
              <iframe
                width="1200"
                height="600"
                src={
                  "https://www.youtube.com/embed/" +
                  searchParams.get("v") +
                  "?autoplay=1"
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="w-[30%] pt-3">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo,
                tempora hic dicta, velit cupiditate vel amet eligendi earum
                neque impedit atque? Illum, facilis modi laudantium porro fugiat
                non dolor et.
              </p>
            </div>
          </div>
          <div className="flex flex-row m-5 h-[30vh] justify-between">
            <div className="flex flex-col w-[70%] mt-[-1.75rem]">
              <VideoInfo />
              <div className="flex flex-row h-[70vh] w-[100%] justify-between">
                <div className="w-full">
                  <h1 className="p-5 font-extrabold">
                    Comments : {comments.length}
                  </h1>
                  {comments.map((comment) => (
                    <Comments
                      imglink={
                        comment?.snippet?.topLevelComment?.snippet
                          ?.authorProfileImageUrl
                      }
                      name={
                        comment?.snippet?.topLevelComment?.snippet
                          ?.authorDisplayName
                      }
                      text={
                        comment?.snippet?.topLevelComment?.snippet?.textDisplay
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="ml-5">
                <h1 className="font-extrabold">Related Videos</h1>
                <WatchPageVideos />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPage;

import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/appSlice";
// import Comments from "./Comments";
import WatchPageVideos from "./WatchPageVideos";
import VideoInfo from "./VideoInfo";
import CommentsThread from "./CommentsThread";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const dispatch = useDispatch();
  // const [comments, setComments] = useState([]);

  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("v"));

  useEffect(() => {
    dispatch(closeMenu());
    // eslint-disable-next-line
  }, []);

  // const getComments = async () => {
  //   const data = await fetch(
  //     "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=" +
  //       searchParams.get("v") +
  //       "&key=" +
  //       process.env.REACT_APP_GOOGLE_API_KEY
  //   );
  //   const json = await data.json();
  //   // console.log(json.items);
  //   setComments(json.items);
  // };

  // useEffect(() => {
  //   getComments();
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className="dark:bg-zinc-900 h-[550%]">
      <div className="flex flex-col w-full ">
        <div className="flex">
          <div className="pt-5 pl-5 start-0 w-[70%]">
            {/* <iframe
              width="100%"
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
            ></iframe> */}

            <iframe
              width="1100"
              height="600"
              src={"https://www.youtube.com/embed/" + searchParams.get("v")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-[30%] p-5">
            <LiveChat />
          </div>
        </div>
        <div className="flex flex-row m-5 h-[30vh] justify-between dark:bg-zinc-900 ">
          <div className="flex flex-col w-[70%] mt-[-1.75rem] dark:bg-zinc-900 ">
            <VideoInfo />
            <div className="flex flex-row h-[70vh] w-[100%] justify-between dark:bg-zinc-900">
              <div className="w-full dark:bg-zinc-900">
                {/* {comments.map((comment) => (
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
                  ))} */}
                <CommentsThread videoID={searchParams.get("v")} />
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
    </div>
  );
};

export default WatchPage;

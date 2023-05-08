import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/appSlice";
import Comments from "./Comments";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("v"));

  useEffect(() => {
    dispatch(closeMenu());
  });

  const getComments = async () => {
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=" +
        searchParams.get("v") +
        "&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    );
    const json = await data.json();
    console.log(json.items);
  };

  useEffect(() => {
    getComments();
  });

  return (
    <>
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
        <div className="">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo,
            tempora hic dicta, velit cupiditate vel amet eligendi earum neque
            impedit atque? Illum, facilis modi laudantium porro fugiat non dolor
            et.
          </p>
        </div>
        <div className="">
          <Comments />
        </div>
      </div>
    </>
  );
};

export default WatchPage;

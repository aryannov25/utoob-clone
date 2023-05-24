import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { publishedAt as publishedAtFunc } from "../utils/publisedAt";
import { VIDEO_INFO_URL, CHANNEL_INFO_URL } from "../utils/constants";
import { prettifyNumber } from "./../utils/number";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const VideoInfo = () => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [channelID, setChannelID] = useState();
  const [channelInfo, setChannelInfo] = useState();
  const [searchParams] = useSearchParams();
  const videoID = searchParams.get("v");
  const [moreEnabled, setMoreEnabled] = useState(false);

  useEffect(() => {
    const getVideoInfo = async () => {
      const res = await fetch(VIDEO_INFO_URL + videoID);
      const json = await res.json();
      setVideoInfo(json);
      setChannelID(json?.items?.[0]?.snippet?.channelId);

      // console.log(json?.items[0]?.snippet?.channelId);
    };
    getVideoInfo();
  }, [videoID]);

  // console.log(channelID);

  useEffect(() => {
    const getChannel = async () => {
      const res = await fetch(CHANNEL_INFO_URL + channelID);
      const json = await res.json();
      // console.log(json);
      setChannelInfo(json);
    };
    getChannel();
  }, [channelID]);

  // console.log(videoInfo);

  const description = videoInfo?.items?.[0]?.snippet?.description || "";

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-xl">
        {videoInfo?.items?.[0]?.snippet?.title}
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex mt-2">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src={channelInfo?.items?.[0]?.snippet?.thumbnails.default.url}
            alt="channelIcon"
          />

          <div className="flex-col">
            <h2 className="font-semibold ml-2">
              {videoInfo?.items?.[0]?.snippet?.channelTitle}
            </h2>
            <h5 className="ml-2 font-semibold text-sm text-gray-400">
              {prettifyNumber(
                channelInfo?.items?.[0]?.statistics?.subscriberCount
              )}{" "}
              subscribers
            </h5>
          </div>
          <button className="ml-8 h-9 bg-black text-white rounded-full px-4 py-0">
            Subscribe
          </button>
        </div>
        <div>
          <h2 className="flex mx-5">
            <button className="flex justify-center items-center ml-8 h-9 bg-gray-100 font-semibold text-black rounded-full px-4 py-0">
              <span className="h-5 w-5 mr-2">
                <AiFillLike />
              </span>
              <span className="mr-2">
                {prettifyNumber(videoInfo?.items?.[0]?.statistics?.likeCount)}
              </span>
              <span className="mr-2">|</span>
              <span className="h-5 w-5 mt-1">
                <AiFillDislike />
              </span>
            </button>
            <button className="ml-4 h-9 bg-gray-100 font-semibold text-black rounded-full  px-4 py-0">
              Share
            </button>
            <button className="ml-4 h-9 bg-gray-100 font-semibold text-black rounded-full  px-4 py-0">
              Save
            </button>
            <button className="ml-4 h-9 bg-gray-100 font-semibold text-black rounded-full  px-4 py-0">
              ...
            </button>
          </h2>
        </div>
      </div>
      <div className="flex flex-col bg-gray-100 rounded-lg p-4 mt-3">
        <div className="flex font-semibold">
          <h2>
            {" "}
            {prettifyNumber(videoInfo?.items?.[0]?.statistics?.viewCount)} views
          </h2>
          <h2 className="ml-4">
            {publishedAtFunc(videoInfo?.items?.[0]?.snippet?.publishedAt)}
          </h2>
        </div>
        <div className=" whitespace-pre-line  scroll-hide">
          {/* {videoInfo?.items[0]?.snippet?.description} */}
          {moreEnabled ? description : description.slice(0, 150)}
          <h1
            className="cursor-pointer text-blue-600"
            onClick={() => setMoreEnabled((bool) => !bool)}
          >
            {moreEnabled ? " ...Show Less" : "...Show More"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;

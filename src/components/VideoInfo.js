import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { relativeTime } from "../utils/relativeTime";
import { VIDEO_INFO_URL, CHANNEL_INFO_URL } from "../utils/constants";
import { prettifyNumber } from "./../utils/number";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import {
  addToHistory,
  toggleWatchLater,
  isInWatchLater,
} from "../utils/localStore";

const VideoInfo = () => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [channelID, setChannelID] = useState();
  const [channelInfo, setChannelInfo] = useState();
  const [searchParams] = useSearchParams();
  const videoID = searchParams.get("v");
  const [moreEnabled, setMoreEnabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedToWL, setSavedToWL] = useState(() => isInWatchLater(videoID));

  useEffect(() => {
    const getVideoInfo = async () => {
      const res = await fetch(VIDEO_INFO_URL + videoID);
      const json = await res.json();
      setVideoInfo(json);
      setChannelID(json?.items?.[0]?.snippet?.channelId);

      // Save to watch history
      const item = json?.items?.[0];
      if (item) {
        addToHistory({
          id: videoID,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          channelId: item.snippet.channelId,
          thumbnail: item.snippet.thumbnails?.medium?.url,
          duration: item.contentDetails?.duration,
          viewCount: item.statistics?.viewCount,
          publishedAt: item.snippet.publishedAt,
        });
      }
    };
    getVideoInfo();
    setSavedToWL(isInWatchLater(videoID));
  }, [videoID]);

  useEffect(() => {
    if (!channelID) return;
    const getChannel = async () => {
      const res = await fetch(CHANNEL_INFO_URL + channelID);
      const json = await res.json();
      setChannelInfo(json);
    };
    getChannel();
  }, [channelID]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // fallback: select input
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const item = videoInfo?.items?.[0];
    if (!item) return;
    const added = toggleWatchLater({
      id: videoID,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      thumbnail: item.snippet.thumbnails?.medium?.url,
      duration: item.contentDetails?.duration,
      viewCount: item.statistics?.viewCount,
      publishedAt: item.snippet.publishedAt,
    });
    setSavedToWL(added);
  };

  const description = videoInfo?.items?.[0]?.snippet?.description || "";

  return (
    <div className="flex flex-col gap-3">
      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#f1f1f1] text-[#0f0f0f] text-sm font-medium px-4 py-2 rounded-full shadow-lg z-50">
          Link copied to clipboard
        </div>
      )}

      {/* Title */}
      <h1 className="text-[#f1f1f1] text-xl font-semibold leading-snug">
        {videoInfo?.items?.[0]?.snippet?.title}
      </h1>

      {/* Channel row + action buttons */}
      <div className="flex flex-col gap-3">
        {/* Channel info + subscribe */}
        <div className="flex items-center gap-3 flex-wrap">
          {channelInfo?.items?.[0]?.snippet?.thumbnails?.default?.url ? (
            <img
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              src={channelInfo.items[0].snippet.thumbnails.default.url}
              alt="Channel icon"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#3ea6ff] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
              {videoInfo?.items?.[0]?.snippet?.channelTitle?.[0]?.toUpperCase() ||
                "C"}
            </div>
          )}
          <div className="flex flex-col flex-1 min-w-0">
            <Link
              to={`/channel/${channelID}`}
              className="text-[#f1f1f1] font-semibold text-sm hover:underline"
            >
              {videoInfo?.items?.[0]?.snippet?.channelTitle}
            </Link>
            <span className="text-[#aaaaaa] text-xs">
              {prettifyNumber(
                channelInfo?.items?.[0]?.statistics?.subscriberCount,
              )}{" "}
              subscribers
            </span>
          </div>
          <button className="w-full sm:w-auto bg-white text-[#0f0f0f] text-sm font-semibold rounded-full px-4 py-2 hover:bg-[#d9d9d9] transition-colors">
            Subscribe
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Like / dislike pill */}
          <div className="flex items-center bg-[#272727] rounded-full overflow-hidden">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] transition-colors border-r border-[#404040]">
              <AiFillLike className="w-5 h-5 text-[#f1f1f1]" />
              <span className="text-[#f1f1f1] text-sm font-medium">
                {prettifyNumber(videoInfo?.items?.[0]?.statistics?.likeCount)}
              </span>
            </button>
            <button className="flex items-center px-4 py-2 hover:bg-[#3f3f3f] transition-colors">
              <AiFillDislike className="w-5 h-5 text-[#f1f1f1]" />
            </button>
          </div>

          <button
            onClick={handleShare}
            className="bg-[#272727] text-[#f1f1f1] text-sm font-medium rounded-full px-4 py-2 hover:bg-[#3f3f3f] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
            </svg>
            Share
          </button>

          <button
            onClick={handleSave}
            className={`text-sm font-medium rounded-full px-4 py-2 transition-colors flex items-center gap-2 ${
              savedToWL
                ? "bg-[#f1f1f1] text-[#0f0f0f] hover:bg-[#d9d9d9]"
                : "bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f]"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill={savedToWL ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={savedToWL ? 0 : 2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            {savedToWL ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Description box */}
      <div
        className="bg-[#212121] rounded-xl p-4 cursor-pointer"
        onClick={() => setMoreEnabled((b) => !b)}
      >
        <div className="flex gap-3 mb-2">
          <span className="text-[#f1f1f1] text-sm font-semibold">
            {prettifyNumber(videoInfo?.items?.[0]?.statistics?.viewCount)} views
          </span>
          <span className="text-[#f1f1f1] text-sm font-semibold">
            {relativeTime(videoInfo?.items?.[0]?.snippet?.publishedAt)}
          </span>
        </div>
        <p className="text-[#f1f1f1] text-sm whitespace-pre-line leading-relaxed">
          {moreEnabled ? description : description.slice(0, 150)}
        </p>
        <button className="text-[#f1f1f1] text-sm font-semibold mt-2 hover:underline">
          {moreEnabled ? "Show less" : "...more"}
        </button>
      </div>
    </div>
  );
};

export default VideoInfo;

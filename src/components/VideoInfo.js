import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { relativeTime } from "../utils/relativeTime";
import { VIDEO_INFO_URL, CHANNEL_INFO_URL } from "../utils/constants";
import { prettifyNumber } from "./../utils/number";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { bestVideoThumb, bestChannelThumb } from "../utils/thumbnail";
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
          thumbnail: bestVideoThumb(item.snippet.thumbnails),
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
    <div className="flex flex-col gap-4">
      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-[#0a0a0c] text-sm font-semibold px-5 py-2.5 rounded-full shadow-2xl z-50 rise-in">
          Link copied to clipboard
        </div>
      )}

      <h1 className="text-[#f4f4f5] text-[22px] md:text-[24px] font-bold leading-tight tracking-[-0.02em]">
        {videoInfo?.items?.[0]?.snippet?.title}
      </h1>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {bestChannelThumb(channelInfo?.items?.[0]?.snippet?.thumbnails) ? (
            <img
              className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-1 ring-white/10"
              src={bestChannelThumb(channelInfo.items[0].snippet.thumbnails)}
              alt="Channel icon"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ff2e4d] to-[#8250ff] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ring-1 ring-white/10">
              {videoInfo?.items?.[0]?.snippet?.channelTitle?.[0]?.toUpperCase() ||
                "C"}
            </div>
          )}
          <div className="flex flex-col flex-1 min-w-0">
            <Link
              to={`/channel/${channelID}`}
              className="text-[#f4f4f5] font-semibold text-[15px] hover:text-white transition-colors w-fit"
            >
              {videoInfo?.items?.[0]?.snippet?.channelTitle}
            </Link>
            <span className="text-[#a1a1aa] text-xs">
              {prettifyNumber(
                channelInfo?.items?.[0]?.statistics?.subscriberCount,
              )}{" "}
              subscribers
            </span>
          </div>
          <button className="press w-full sm:w-auto bg-white text-[#0a0a0c] text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#e5e5e7] transition-colors">
            Subscribe
          </button>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center bg-white/5 ring-1 ring-white/10 rounded-full overflow-hidden backdrop-blur">
            <button className="press flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 transition-colors border-r border-white/10">
              <AiFillLike className="w-5 h-5 text-[#f4f4f5]" />
              <span className="text-[#f4f4f5] text-sm font-semibold">
                {prettifyNumber(videoInfo?.items?.[0]?.statistics?.likeCount)}
              </span>
            </button>
            <button className="press flex items-center px-4 py-2.5 hover:bg-white/10 transition-colors">
              <AiFillDislike className="w-5 h-5 text-[#f4f4f5]" />
            </button>
          </div>

          <button
            onClick={handleShare}
            className="press bg-white/5 ring-1 ring-white/10 text-[#f4f4f5] text-sm font-semibold rounded-full px-4 py-2.5 hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
            </svg>
            Share
          </button>

          <button
            onClick={handleSave}
            className={`press text-sm font-semibold rounded-full px-4 py-2.5 transition-all flex items-center gap-2 backdrop-blur ${
              savedToWL
                ? "bg-gradient-to-br from-[#ff2e4d] to-[#ff5d7a] text-white shadow-[0_8px_24px_-10px_rgba(255,46,77,0.6)]"
                : "bg-white/5 ring-1 ring-white/10 text-[#f4f4f5] hover:bg-white/10"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill={savedToWL ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={savedToWL ? 0 : 2}
              viewBox="0 0 24 24"
              aria-hidden="true"
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
        className="bg-white/5 backdrop-blur ring-1 ring-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/[0.07] transition-colors"
        onClick={() => setMoreEnabled((b) => !b)}
      >
        <div className="flex gap-3 mb-2">
          <span className="text-[#f4f4f5] text-sm font-bold">
            {prettifyNumber(videoInfo?.items?.[0]?.statistics?.viewCount)} views
          </span>
          <span className="text-[#f4f4f5] text-sm font-bold">
            {relativeTime(videoInfo?.items?.[0]?.snippet?.publishedAt)}
          </span>
        </div>
        <p className="text-[#e5e5e7] text-sm whitespace-pre-line leading-relaxed">
          {moreEnabled ? description : description.slice(0, 150)}
        </p>
        <button className="text-[#ff5d7a] text-sm font-semibold mt-2 hover:text-[#ff2e4d] transition-colors">
          {moreEnabled ? "Show less" : "...more"}
        </button>
      </div>
    </div>
  );
};

export default VideoInfo;

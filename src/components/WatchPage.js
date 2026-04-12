import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/appSlice";
import WatchPageVideos from "./WatchPageVideos";
import VideoInfo from "./VideoInfo";
import CommentsThread from "./CommentsThread";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [liveChatId, setLiveChatId] = useState(null);
  const [liveChecked, setLiveChecked] = useState(false);
  const [theater, setTheater] = useState(false);

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  useEffect(() => {
    if (!videoId) return;
    setLiveChatId(null);
    setLiveChecked(false);
    const check = async () => {
      const res = await fetch(
        `/api/youtube/videos?part=liveStreamingDetails&id=${videoId}`,
      );
      const json = await res.json();
      const chatId = json?.items?.[0]?.liveStreamingDetails?.activeLiveChatId;
      setLiveChatId(chatId || null);
      setLiveChecked(true);
    };
    check();
  }, [videoId]);

  return (
    <div className="min-h-screen">
      <div
        className={`flex flex-col md:flex-row gap-6 px-3 md:px-6 pt-6 mx-auto ${theater ? "max-w-none" : "max-w-[1800px]"}`}
      >
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <div className="w-full">
            <div
              className="relative w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setTheater((t) => !t)}
                title={theater ? "Default view" : "Theater mode"}
                aria-label="Toggle theater mode"
                className={`press p-2 rounded-full transition-colors ${
                  theater
                    ? "text-white bg-white/10 ring-1 ring-white/15"
                    : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
                </svg>
              </button>
            </div>
          </div>

          <VideoInfo />
          <CommentsThread videoID={videoId} />

          {liveChecked && liveChatId && (
            <div className={theater ? "block" : "md:hidden"}>
              <LiveChat liveChatId={liveChatId} />
            </div>
          )}

          <div className={theater ? "block" : "md:hidden"}>
            <h2 className="text-[#f4f4f5] font-bold text-base mb-3 tracking-tight">
              Related Videos
            </h2>
            <WatchPageVideos />
          </div>
        </div>

        {/* Right sidebar — hidden in theater mode */}
        {!theater && (
          <div className="hidden md:flex flex-shrink-0 w-[402px] flex-col gap-5">
            {liveChecked && liveChatId && <LiveChat liveChatId={liveChatId} />}
            <div>
              <h2 className="text-[#f4f4f5] font-bold text-base mb-3 tracking-tight">
                Related Videos
              </h2>
              <WatchPageVideos />
            </div>
          </div>
        )}
      </div>
      <div className="h-8" />
    </div>
  );
};

export default WatchPage;

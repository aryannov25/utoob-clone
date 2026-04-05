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
    // eslint-disable-next-line
  }, []);

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
    <div className="bg-[#0f0f0f] min-h-screen">
      <div
        className={`flex flex-col md:flex-row gap-6 px-3 md:px-6 pt-5 mx-auto ${theater ? "max-w-none" : "max-w-[1800px]"}`}
      >
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Player + theater toggle */}
          <div className="w-full">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="flex justify-end mt-1.5">
              <button
                onClick={() => setTheater((t) => !t)}
                title={theater ? "Default view" : "Theater mode"}
                className={`p-1.5 rounded transition-colors ${
                  theater
                    ? "text-[#f1f1f1] bg-[#272727]"
                    : "text-[#aaaaaa] hover:text-[#f1f1f1] hover:bg-[#272727]"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
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
            <h2 className="text-[#f1f1f1] font-semibold text-base mb-3">
              Related Videos
            </h2>
            <WatchPageVideos />
          </div>
        </div>

        {/* Right sidebar — hidden in theater mode */}
        {!theater && (
          <div className="hidden md:flex flex-shrink-0 w-[402px] flex-col gap-4">
            {liveChecked && liveChatId && <LiveChat liveChatId={liveChatId} />}
            <div>
              <h2 className="text-[#f1f1f1] font-semibold text-base mb-3">
                Related Videos
              </h2>
              <WatchPageVideos />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;

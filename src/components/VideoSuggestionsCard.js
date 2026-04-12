import React from "react";
import { Link } from "react-router-dom";
import { bestVideoThumb, videoThumbFromId } from "../utils/thumbnail";
import { formatDuration } from "../utils/formatDuration";
import { prettifyNumber } from "../utils/number";
import { relativeTime } from "../utils/relativeTime";

const VideoSuggestionsCard = ({ info, isPlaying = false, duration, viewCount }) => {
  const { snippet } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const videoId = info.id?.videoId || info.id;
  const thumbUrl =
    videoThumbFromId(videoId, "hqdefault") || bestVideoThumb(thumbnails);
  const durationText = duration ? formatDuration(duration) : null;
  const isLive = snippet?.liveBroadcastContent === "live";
  const isUpcoming = snippet?.liveBroadcastContent === "upcoming";

  return (
    <div
      className={`flex gap-2 p-2 rounded-2xl transition-colors cursor-pointer group ${isPlaying ? "bg-white/10 ring-1 ring-white/10" : "hover:bg-white/5"}`}
    >
      <Link
        to={"/watch?v=" + videoId}
        className="flex-shrink-0 w-[168px] h-[94px] overflow-hidden rounded-xl relative ring-1 ring-white/5"
      >
        {isPlaying && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-xl">
            <div className="flex items-end gap-[3px] h-5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-[3px] bg-[#ff2e4d] rounded-sm"
                  style={{
                    animation: `playingBar${n} 0.8s ease-in-out infinite alternate`,
                    height: n === 2 ? "100%" : "60%",
                  }}
                />
              ))}
            </div>
            <style>{`
              @keyframes playingBar1 { from { height: 30% } to { height: 100% } }
              @keyframes playingBar2 { from { height: 100% } to { height: 40% } }
              @keyframes playingBar3 { from { height: 50% } to { height: 100% } }
            `}</style>
          </div>
        )}
        <img
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          alt={title}
          src={thumbUrl}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const fallback = bestVideoThumb(thumbnails);
            if (fallback && e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
        />
        {/* Badges */}
        {isLive ? (
          <span className="absolute bottom-1.5 right-1.5 bg-[#ff2e4d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            LIVE
          </span>
        ) : isUpcoming ? (
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
            UPCOMING
          </span>
        ) : durationText ? (
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
            {durationText}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-col gap-1 min-w-0 py-0.5">
        <Link to={"/watch?v=" + videoId}>
          <p className="text-[#f4f4f5] text-[13px] font-semibold leading-snug line-clamp-2 hover:text-white transition-colors">
            {title}
          </p>
        </Link>
        <Link
          to={`/channel/${snippet.channelId}`}
          className="text-[#a1a1aa] text-xs hover:text-[#f4f4f5] transition-colors w-fit"
        >
          {channelTitle}
        </Link>
        {(viewCount || publishedAt) && (
          <p className="text-[#71717a] text-[11px]">
            {viewCount ? `${prettifyNumber(viewCount)} views` : ""}
            {viewCount && publishedAt ? " · " : ""}
            {publishedAt ? relativeTime(publishedAt) : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(VideoSuggestionsCard);

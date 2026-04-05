import React from "react";
import { Link } from "react-router-dom";

const VideoSuggestionsCard = ({ info, isPlaying = false }) => {
  const { snippet } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div
      className={`flex gap-2 p-2 rounded-xl transition-colors cursor-pointer group ${isPlaying ? "bg-[#272727]" : "hover:bg-[#272727]"}`}
    >
      {/* Thumbnail */}
      <Link
        to={"/watch?v=" + info.id.videoId}
        className="flex-shrink-0 w-[168px] h-[94px] overflow-hidden rounded-xl relative"
      >
        {isPlaying && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-xl">
            {/* Animated bars */}
            <div className="flex items-end gap-[3px] h-5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-[3px] bg-[#ff0000] rounded-sm"
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
          src={thumbnails.medium.url}
        />
      </Link>

      {/* Metadata */}
      <div className="flex flex-col gap-1 min-w-0 py-0.5">
        <Link to={"/watch?v=" + info.id.videoId}>
          <p className="text-[#f1f1f1] text-xs font-semibold leading-snug line-clamp-2 hover:underline">
            {title}
          </p>
        </Link>
        <Link
          to={`/channel/${snippet.channelId}`}
          className="text-[#aaaaaa] text-xs hover:text-[#f1f1f1] transition-colors w-fit"
        >
          {channelTitle}
        </Link>
      </div>
    </div>
  );
};

export default VideoSuggestionsCard;

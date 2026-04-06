import React from "react";
import { Link } from "react-router-dom";
import { formatDuration } from "../utils/formatDuration";

const ResultCard = ({ data, isChannel, channelThumb, duration, decodeHtml = (s) => s }) => {
  if (!data) return null;

  const { snippet, id } = data;
  const title = decodeHtml(snippet?.title || "");
  const description = decodeHtml(snippet?.description || "");
  const liveBroadcast = snippet?.liveBroadcastContent; // "live" | "upcoming" | "none"

  // Channel result
  if (isChannel) {
    return (
      <Link to={`/channel/${id.channelId}`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl hover:bg-[#272727] transition-colors">
          {channelThumb ? (
            <img src={channelThumb} alt={title} className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#3ea6ff] flex items-center justify-center text-black font-bold text-3xl flex-shrink-0">
              {title[0]}
            </div>
          )}
          <div className="flex flex-col gap-1.5 min-w-0 text-center sm:text-left">
            <p className="text-[#f1f1f1] text-base font-semibold">{title}</p>
            <p className="text-[#aaaaaa] text-sm">YouTube · Channel</p>
            {description && (
              <p className="text-[#aaaaaa] text-sm line-clamp-2 mt-1">{description}</p>
            )}
            <span className="inline-block mt-2 w-fit mx-auto sm:mx-0 bg-white text-[#0f0f0f] text-xs font-semibold rounded-full px-4 py-1.5 hover:bg-[#d9d9d9] transition-colors">
              View channel
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Video result
  const formattedDuration = formatDuration(duration);

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl hover:bg-[#272727] transition-colors cursor-pointer">
      {/* Thumbnail */}
      <Link to={`/watch?v=${id.videoId}`} className="flex-shrink-0 w-full sm:w-[360px]">
        <div className="relative w-full aspect-video sm:h-[202px] sm:aspect-auto rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={snippet?.thumbnails?.medium?.url}
            alt={title}
          />

          {/* Live badge */}
          {liveBroadcast === "live" && (
            <span className="absolute bottom-2 right-2 bg-[#ff0000] text-white text-[11px] font-bold px-2 py-0.5 rounded">
              LIVE
            </span>
          )}

          {/* Upcoming / Scheduled badge */}
          {liveBroadcast === "upcoming" && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
              </svg>
              Upcoming
            </span>
          )}

          {/* Duration badge */}
          {liveBroadcast === "none" && formattedDuration && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-medium px-1.5 py-0.5 rounded">
              {formattedDuration}
            </span>
          )}
        </div>
      </Link>

      {/* Metadata */}
      <div className="flex flex-col gap-2 py-1 flex-1 min-w-0">
        <Link to={`/watch?v=${id.videoId}`}>
          <p className="text-[#f1f1f1] text-base font-medium leading-snug line-clamp-2 hover:underline">
            {title}
          </p>
        </Link>

        <div className="flex items-center gap-2">
          {channelThumb ? (
            <img src={channelThumb} alt={snippet?.channelTitle} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-[#3f3f3f] flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-[#aaaaaa]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          )}
          <Link to={`/channel/${snippet?.channelId}`} className="text-[#aaaaaa] text-sm hover:text-[#f1f1f1] transition-colors">
            {snippet?.channelTitle}
          </Link>
        </div>

        {description && (
          <p className="text-[#aaaaaa] text-sm line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;

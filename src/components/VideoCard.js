import React, { useState } from "react";
import { Link } from "react-router-dom";
import { prettifyNumber } from "./../utils/number";
import { formatDuration } from "../utils/formatDuration";
import { relativeTime } from "../utils/relativeTime";
import { avatarColor } from "../utils/avatarColor";
import { bestVideoThumb, videoThumbFromId } from "../utils/thumbnail";
import { toggleWatchLater, isInWatchLater } from "../utils/localStore";

const VideoCard = ({ info, channelThumb }) => {
  const { snippet, statistics, contentDetails } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const thumbUrl =
    videoThumbFromId(info.id, "maxresdefault") || bestVideoThumb(thumbnails);
  const views = statistics?.viewCount;
  const duration = formatDuration(contentDetails?.duration);

  const [inWL, setInWL] = useState(() => isInWatchLater(info.id));
  const [channelThumbOk, setChannelThumbOk] = useState(true);

  const handleWatchLater = (e) => {
    e.stopPropagation();
    const added = toggleWatchLater({
      id: info.id,
      title,
      channelTitle,
      channelId: snippet.channelId,
      thumbnail: bestVideoThumb(thumbnails),
      duration: contentDetails?.duration,
      viewCount: views,
      publishedAt,
    });
    setInWL(added);
  };

  return (
    <div className="group flex flex-col bg-transparent cursor-pointer rise-in">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl ring-1 ring-white/5 group-hover:ring-white/20 transition-all duration-300 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] group-hover:shadow-[0_16px_40px_-16px_rgba(255,46,77,0.35)]">
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          src={thumbUrl}
          alt={title}
          loading="lazy"
          onError={(e) => {
            const fallback = bestVideoThumb(thumbnails);
            if (fallback && e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Duration badge */}
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-md">
            {duration}
          </span>
        )}

        {/* Watch later button */}
        <button
          onClick={handleWatchLater}
          title={inWL ? "Remove from Watch Later" : "Save to Watch Later"}
          className={`press absolute top-2 right-2 p-2 rounded-full bg-black/70 backdrop-blur text-white transition-all ${
            inWL
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
          }`}
        >
          {inWL ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm-8 8.5v-2h-2v2H8v2h4v2h2v-2h4v-2h-4z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <path d="M12 8v4m0 0v4m0-4h4m-4 0H8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Metadata */}
      <div className="flex gap-3 mt-3 px-0.5">
        {channelThumb && channelThumbOk ? (
          <img
            className="flex-shrink-0 w-9 h-9 rounded-full object-cover mt-0.5 ring-1 ring-white/10"
            src={channelThumb}
            alt={channelTitle}
            referrerPolicy="no-referrer"
            onError={() => setChannelThumbOk(false)}
          />
        ) : (
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 select-none ring-1 ring-white/10"
            style={{ backgroundColor: avatarColor(channelTitle) }}
          >
            {channelTitle?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}

        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-[#f4f4f5] text-[14px] font-semibold leading-snug line-clamp-2 group-hover:text-white tracking-[-0.01em]">
            {title}
          </p>
          <Link
            to={`/channel/${snippet.channelId}`}
            className="text-[#a1a1aa] text-xs hover:text-[#f4f4f5] transition-colors w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            {channelTitle}
          </Link>
          <p className="text-[#71717a] text-xs">
            {views !== undefined ? `${prettifyNumber(views)} views` : ""}
            {views !== undefined && publishedAt ? " · " : ""}
            {relativeTime(publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VideoCard);

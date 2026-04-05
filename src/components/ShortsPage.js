import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { prettifyNumber } from "../utils/number";

// ---------------------------------------------------------------------------
// SVG icon primitives — kept inline to avoid extra asset dependencies
// ---------------------------------------------------------------------------

const ThumbUpIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
  </svg>
);

const ThumbDownIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
);

const CommentIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

const ShareIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// ---------------------------------------------------------------------------
// Deterministic avatar background colour (matches VideoCard convention)
// ---------------------------------------------------------------------------
const avatarColor = (name = "") => {
  const colors = [
    "#1e40af",
    "#7e22ce",
    "#065f46",
    "#9f1239",
    "#92400e",
    "#0e7490",
    "#3f6212",
    "#4c1d95",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// ---------------------------------------------------------------------------
// Decode HTML entities (API returns &amp; etc.)
// ---------------------------------------------------------------------------
const decodeHtml = (str = "") => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

// ---------------------------------------------------------------------------
// Action button used in the right-side panel
// ---------------------------------------------------------------------------
const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-1 text-white bg-transparent border-none focus:outline-none drop-shadow-lg"
    type="button"
  >
    {icon}
    {label !== undefined && label !== null && label !== "" && (
      <span className="text-xs font-medium leading-none drop-shadow">
        {label}
      </span>
    )}
  </button>
);

// ---------------------------------------------------------------------------
// Individual short card
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Comments drawer — fetches + displays comments for a short
// ---------------------------------------------------------------------------
const CommentsDrawer = ({ videoId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;
    setComments([]);
    setLoading(true);
    const fetch_ = async () => {
      const res = await fetch(
        `/api/youtube/commentThreads?part=snippet&maxResults=50&videoId=${videoId}`,
      );
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const json = await res.json();
      setComments(json.items || []);
      setLoading(false);
    };
    fetch_();
  }, [videoId]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#212121] rounded-t-2xl flex flex-col"
        style={{ height: "70vh" }}
      >
        {/* Handle + header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#303030] flex-shrink-0">
          <div className="w-10 h-1 bg-[#555] rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          <h3 className="text-[#f1f1f1] font-semibold text-sm">
            {comments.length > 0 ? `${comments.length} Comments` : "Comments"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#aaaaaa] hover:text-white p-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Comment list */}
        <div className="overflow-y-auto flex-1 px-4 py-3 flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center pt-8">
              <div className="w-7 h-7 border-2 border-[#3ea6ff] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-[#aaaaaa] text-sm text-center pt-8">
              Comments are turned off.
            </p>
          ) : (
            comments.map((item) => {
              const c = item.snippet?.topLevelComment?.snippet;
              return (
                <div key={item.id} className="flex gap-3">
                  {c?.authorProfileImageUrl ? (
                    <img
                      src={c.authorProfileImageUrl}
                      alt={c?.authorDisplayName}
                      className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 bg-[#3ea6ff] flex items-center justify-center text-black text-xs font-bold">
                      {c?.authorDisplayName?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#f1f1f1] text-xs font-semibold">
                        {c?.authorDisplayName}
                      </span>
                      <span className="text-[#aaaaaa] text-xs">
                        {new Date(c?.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p
                      className="text-[#f1f1f1] text-sm leading-relaxed break-words [&_a]:text-[#3ea6ff] [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: c?.textDisplay }}
                    />
                    <div className="flex items-center gap-1 text-[#aaaaaa] text-xs mt-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                      </svg>
                      <span>{prettifyNumber(Number(c?.likeCount || 0))}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

// ---------------------------------------------------------------------------
// Individual short card
// ---------------------------------------------------------------------------
const ShortCard = ({
  short,
  index,
  totalCount,
  onNavigate,
  isActive,
  isAdjacent,
}) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const { snippet, statistics } = short;
  const videoId = short.id?.videoId || short.id;
  const channelId = snippet?.channelId;
  const channelTitle = decodeHtml(snippet?.channelTitle || "");
  const title = decodeHtml(snippet?.title || "");
  const description = decodeHtml(snippet?.description || "");

  const likeCount = statistics?.likeCount
    ? prettifyNumber(Number(statistics.likeCount))
    : null;
  const commentCount = statistics?.commentCount
    ? prettifyNumber(Number(statistics.commentCount))
    : null;

  const avatarInitial = channelTitle.charAt(0).toUpperCase() || "?";
  const bg = avatarColor(channelTitle);

  // Only render iframe for active + 1 adjacent short to limit WebGL contexts
  const shouldRender = isActive || isAdjacent;
  const iframeSrc = isActive
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`
    : `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;

  return (
    <div
      className="relative h-[calc(100vh-56px)] w-full bg-black"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Full-screen video — only rendered when active or adjacent to save WebGL contexts */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        {shouldRender && (
          <iframe
            key={isActive ? "active" : "inactive"}
            src={iframeSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; compute-pressure"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        )}
      </div>

      {/* Bottom-left overlay: channel + title + description */}
      <div
        className="absolute bottom-0 left-0 right-16 px-4 pb-6 pt-20 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
        }}
      >
        <Link
          to={`/channel/${channelId}`}
          className="pointer-events-auto block text-white font-bold text-sm leading-snug hover:underline truncate"
        >
          {channelTitle}
        </Link>
        <p className="text-white text-xs mt-1 leading-snug line-clamp-2">
          {title}
        </p>
        {description && (
          <p className="text-[#aaaaaa] text-xs mt-1 leading-snug line-clamp-1">
            {description}
          </p>
        )}
      </div>

      {/* Right-side action buttons — outside overflow-hidden, never clipped */}
      <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-10">
        <ActionButton icon={<ThumbUpIcon />} label={likeCount} />
        <ActionButton icon={<ThumbDownIcon />} />
        <ActionButton
          icon={<CommentIcon />}
          label={commentCount}
          onClick={() => setCommentsOpen(true)}
        />
        <ActionButton icon={<ShareIcon />} label="Share" />
        <Link
          to={`/channel/${channelId}`}
          className="mt-2 w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#f1f1f1]"
          style={{ backgroundColor: bg }}
          title={channelTitle}
        >
          <div
            className="w-full h-full flex items-center justify-center text-white text-sm font-bold select-none"
            style={{ backgroundColor: bg }}
          >
            {avatarInitial}
          </div>
        </Link>
      </div>

      {/* Comments drawer */}
      {commentsOpen && (
        <CommentsDrawer
          videoId={videoId}
          onClose={() => setCommentsOpen(false)}
        />
      )}

      {/* Navigation arrows — top-right */}
      <div className="absolute top-4 right-3 flex flex-col gap-2 z-10">
        <button
          type="button"
          onClick={() => onNavigate(index - 1)}
          disabled={index === 0}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors focus:outline-none backdrop-blur-sm"
          aria-label="Previous short"
        >
          <ChevronUpIcon />
        </button>
        <button
          type="button"
          onClick={() => onNavigate(index + 1)}
          disabled={index === totalCount - 1}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors focus:outline-none backdrop-blur-sm"
          aria-label="Next short"
        >
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main ShortsPage component
// ---------------------------------------------------------------------------
const ShortsPage = () => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // One ref per short card for programmatic scroll
  const cardRefs = useRef([]);

  // ------------------------------------------------------------------
  // Data fetching: search for #shorts then enrich with statistics
  // ------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    const fetchShorts = async () => {
      try {
        setLoading(true);
        setError(null);

        const searchRes = await fetch(
          `/api/youtube/search?part=snippet&q=%23shorts&type=video&videoDuration=short&maxResults=20&regionCode=IN`,
        );

        if (!searchRes.ok) {
          throw new Error(`YouTube API error: ${searchRes.status}`);
        }

        const searchJson = await searchRes.json();
        const items = searchJson.items || [];

        if (items.length === 0) {
          if (!cancelled) {
            setShorts([]);
            setLoading(false);
          }
          return;
        }

        // Collect video IDs — search result items have id.videoId
        const videoIds = items
          .map((item) => item.id?.videoId)
          .filter(Boolean)
          .join(",");

        const statsRes = await fetch(
          `/api/youtube/videos?part=statistics&id=${videoIds}`,
        );

        if (!statsRes.ok) {
          // Stats are non-critical; proceed without them
          if (!cancelled) {
            setShorts(items);
            setLoading(false);
          }
          return;
        }

        const statsJson = await statsRes.json();

        // Build a lookup map: videoId -> statistics
        const statsMap = {};
        for (const v of statsJson.items || []) {
          statsMap[v.id] = v.statistics;
        }

        // Merge statistics into the search result items
        const enriched = items.map((item) => {
          const vid = item.id?.videoId;
          return {
            ...item,
            statistics: vid ? statsMap[vid] || null : null,
          };
        });

        if (!cancelled) {
          setShorts(enriched);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load Shorts.");
          setLoading(false);
        }
      }
    };

    fetchShorts();

    return () => {
      cancelled = true;
    };
  }, []);

  // ------------------------------------------------------------------
  // IntersectionObserver — track which card is visible
  // ------------------------------------------------------------------
  useEffect(() => {
    if (shorts.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.6 },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [shorts]);

  // ------------------------------------------------------------------
  // Navigation helpers
  // ------------------------------------------------------------------
  const navigateTo = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= shorts.length) return;
    const el = cardRefs.current[targetIndex];
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        // Find the card closest to the viewport center and navigate down
        const current = getCurrentIndex();
        navigateTo(current + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const current = getCurrentIndex();
        navigateTo(current - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shorts]);

  // Determine which card index is currently closest to the center of the
  // scroll container so keyboard navigation is relative to the visible card.
  const getCurrentIndex = () => {
    let closestIndex = 0;
    let closestDistance = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = Math.abs(
        rect.top + rect.height / 2 - window.innerHeight / 2,
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    return closestIndex;
  };

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  if (loading) {
    return (
      <div className="bg-[#0f0f0f] h-[calc(100vh-56px)] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#3ea6ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0f0f0f] h-[calc(100vh-56px)] flex flex-col items-center justify-center gap-3">
        <p className="text-[#aaaaaa] text-sm">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-[#3ea6ff] text-sm hover:underline focus:outline-none"
        >
          Retry
        </button>
      </div>
    );
  }

  if (shorts.length === 0) {
    return (
      <div className="bg-[#0f0f0f] h-[calc(100vh-56px)] flex items-center justify-center">
        <p className="text-[#aaaaaa] text-sm">No Shorts found.</p>
      </div>
    );
  }

  return (
    <div
      className="bg-[#0f0f0f] h-[calc(100vh-56px)] overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {shorts.map((short, index) => (
        <div
          key={short.id?.videoId || index}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
        >
          <ShortCard
            short={short}
            index={index}
            totalCount={shorts.length}
            onNavigate={navigateTo}
            isActive={index === activeIndex}
            isAdjacent={Math.abs(index - activeIndex) === 1}
          />
        </div>
      ))}
    </div>
  );
};

export default ShortsPage;

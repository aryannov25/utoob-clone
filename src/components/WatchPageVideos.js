import React, { useEffect, useState } from "react";
import VideoSuggestionsCard from "./VideoSuggestionsCard";
import { useSearchParams } from "react-router-dom";

const WatchPageVideos = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [relatedVideoData, setRelatedVideoData] = useState([]);
  const [durations, setDurations] = useState({});
  const [viewCounts, setViewCounts] = useState({});

  useEffect(() => {
    if (!videoId) return;
    let cancelled = false;

    const getRelatedVideos = async () => {
      try {
        const videoRes = await fetch(
          `/api/youtube/videos?part=snippet&id=${videoId}`,
        );
        const videoData = await videoRes.json();
        const title = videoData.items?.[0]?.snippet?.title;
        if (!title || cancelled) return;

        const searchRes = await fetch(
          `/api/youtube/search?part=snippet&maxResults=20&q=${encodeURIComponent(title)}&type=video`,
        );
        const searchData = await searchRes.json();
        if (cancelled || !searchData.items) return;

        setRelatedVideoData(searchData.items);

        // Enrich with contentDetails (duration) + statistics (views)
        const ids = searchData.items
          .map((v) => v.id?.videoId)
          .filter(Boolean)
          .join(",");
        if (!ids) return;

        const detailsRes = await fetch(
          `/api/youtube/videos?part=contentDetails,statistics&id=${ids}`,
        );
        const detailsData = await detailsRes.json();
        if (cancelled || !detailsData.items) return;

        const dMap = {};
        const vMap = {};
        detailsData.items.forEach((it) => {
          if (it.contentDetails?.duration) dMap[it.id] = it.contentDetails.duration;
          if (it.statistics?.viewCount) vMap[it.id] = it.statistics.viewCount;
        });
        setDurations(dMap);
        setViewCounts(vMap);
      } catch {
        // swallow — related videos are non-critical
      }
    };

    setDurations({});
    setViewCounts({});
    getRelatedVideos();
    return () => {
      cancelled = true;
    };
  }, [videoId]);

  if (!relatedVideoData?.length) {
    return null;
  }

  const currentVideo = relatedVideoData.find((v) => v.id?.videoId === videoId);
  const related = relatedVideoData.filter((v) => v.id?.videoId !== videoId);

  return (
    <div className="flex flex-col gap-2">
      {currentVideo && (
        <>
          <p className="text-[#71717a] text-[11px] font-semibold uppercase tracking-[0.08em] px-2 pb-1">
            Now Playing
          </p>
          <VideoSuggestionsCard
            info={currentVideo}
            duration={durations[currentVideo.id?.videoId]}
            viewCount={viewCounts[currentVideo.id?.videoId]}
            isPlaying
          />
          <div className="border-t border-white/5 my-1" />
          <p className="text-[#71717a] text-[11px] font-semibold uppercase tracking-[0.08em] px-2 pb-1">
            Up Next
          </p>
        </>
      )}
      {related.map((v) => (
        <VideoSuggestionsCard
          key={v.id?.videoId}
          info={v}
          duration={durations[v.id?.videoId]}
          viewCount={viewCounts[v.id?.videoId]}
        />
      ))}
    </div>
  );
};

export default WatchPageVideos;

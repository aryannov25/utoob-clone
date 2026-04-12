import React, { useEffect, useState } from "react";
import VideoSuggestionsCard from "./VideoSuggestionsCard";
import { useSearchParams } from "react-router-dom";

const WatchPageVideos = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [relatedVideoData, setRelatedVideoData] = useState([]);

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
        if (!cancelled && searchData.items) {
          setRelatedVideoData(searchData.items);
        }
      } catch {
        // swallow — related videos are non-critical
      }
    };

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
          <p className="text-[#aaaaaa] text-xs font-semibold uppercase tracking-wider px-2 pb-1">
            Now Playing
          </p>
          <VideoSuggestionsCard info={currentVideo} isPlaying />
          <div className="border-t border-[#272727] my-1" />
          <p className="text-[#aaaaaa] text-xs font-semibold uppercase tracking-wider px-2 pb-1">
            Up Next
          </p>
        </>
      )}
      {related.map((v) => (
        <VideoSuggestionsCard key={v.id?.videoId} info={v} />
      ))}
    </div>
  );
};

export default WatchPageVideos;

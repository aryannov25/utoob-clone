import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";
import { bestChannelThumb } from "../utils/thumbnail";

const CHUNK_SIZE = 25;
const BASE_URL =
  "/api/youtube/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN";

const fetchChannelThumbs = async (items) => {
  const channelIds = [...new Set(items.map((v) => v.snippet.channelId))];
  const chunks = [];
  for (let i = 0; i < channelIds.length; i += CHUNK_SIZE)
    chunks.push(channelIds.slice(i, i + CHUNK_SIZE));

  const results = await Promise.allSettled(
    chunks.map((chunk) =>
      fetch(`/api/youtube/channels?part=snippet&id=${chunk.join(",")}`).then(
        (r) => r.json(),
      ),
    ),
  );
  const map = {};
  results.forEach((r) => {
    if (r.status === "fulfilled" && r.value?.items)
      r.value.items.forEach((ch) => {
        map[ch.id] = bestChannelThumb(ch.snippet?.thumbnails);
      });
  });
  return map;
};

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [channelThumbs, setChannelThumbs] = useState({});
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPage = async (pageToken) => {
    setLoading(true);
    try {
      const url = pageToken ? `${BASE_URL}&pageToken=${pageToken}` : BASE_URL;
      const res = await fetch(url);
      const json = await res.json();
      if (!json.items) return;

      setNextPageToken(json.nextPageToken || null);
      const thumbs = await fetchChannelThumbs(json.items);
      setChannelThumbs((prev) => ({ ...prev, ...thumbs }));
      setVideos((prev) => (pageToken ? [...prev, ...json.items] : json.items));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!videos.length) return <Shimmer />;

  return (
    <div className="px-5 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
        {videos.map((video) => (
          <div
            key={video.id}
            className="cursor-pointer"
            onClick={() => navigate("/watch?v=" + video.id)}
          >
            <VideoCard
              info={video}
              channelThumb={channelThumbs[video.snippet.channelId]}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        {loading ? (
          <div className="flex items-center gap-2 text-[#a1a1aa] text-sm">
            <div className="w-5 h-5 border-2 border-[#ff2e4d] border-t-transparent rounded-full animate-spin" />
            Loading more videos…
          </div>
        ) : nextPageToken ? (
          <button
            onClick={() => fetchPage(nextPageToken)}
            className="press bg-gradient-to-br from-[#ff2e4d] to-[#ff5d7a] text-white text-sm font-semibold px-7 py-3 rounded-full shadow-[0_10px_30px_-12px_rgba(255,46,77,0.6)] hover:shadow-[0_14px_36px_-12px_rgba(255,46,77,0.8)] transition-shadow"
          >
            Load more
          </button>
        ) : (
          <p className="text-[#52525b] text-sm">You're all caught up ✨</p>
        )}
      </div>
    </div>
  );
};

export default VideoContainer;

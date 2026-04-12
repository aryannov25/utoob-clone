import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";

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
        map[ch.id] = ch.snippet?.thumbnails?.default?.url;
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
    <div className="bg-[#0f0f0f] px-4 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
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

      <div className="flex justify-center mt-10">
        {loading ? (
          <div className="flex items-center gap-2 text-[#aaaaaa] text-sm">
            <div className="w-5 h-5 border-2 border-[#aaaaaa] border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        ) : nextPageToken ? (
          <button
            onClick={() => fetchPage(nextPageToken)}
            className="bg-[#272727] hover:bg-[#3f3f3f] text-[#f1f1f1] text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
          >
            Load more
          </button>
        ) : (
          <p className="text-[#717171] text-sm">You're all caught up</p>
        )}
      </div>
    </div>
  );
};

export default VideoContainer;

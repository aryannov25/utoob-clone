import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";

const CHUNK_SIZE = 25;

// Map slug → YouTube API config
const CATEGORY_CONFIG = {
  trending: { label: "Trending", chart: true },
  music: { label: "Music", chart: true, videoCategoryId: "10" },
  gaming: { label: "Gaming", chart: true, videoCategoryId: "20" },
  sports: { label: "Sports", chart: true, videoCategoryId: "17" },
  movies: { label: "Movies", search: "movies trailer" },
  shopping: { label: "Shopping", search: "shopping haul" },
  live: { label: "Live", live: true },
};

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const config = CATEGORY_CONFIG[slug];
  const [videos, setVideos] = useState([]);
  const [channelThumbs, setChannelThumbs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!config) return;
    setVideos([]);
    setChannelThumbs({});
    setLoading(true);

    const fetchVideos = async () => {
      let items = [];

      if (config.chart) {
        const params = new URLSearchParams({
          part: "snippet,statistics",
          chart: "mostPopular",
          maxResults: "50",
          regionCode: "IN",
          ...(config.videoCategoryId && {
            videoCategoryId: config.videoCategoryId,
          }),
        });
        const res = await fetch(`/api/youtube/videos?${params}`);
        const json = await res.json();
        items = json.items || [];
      } else if (config.live) {
        const params = new URLSearchParams({
          part: "snippet",
          type: "video",
          eventType: "live",
          maxResults: "50",
          regionCode: "IN",
        });
        const res = await fetch(`/api/youtube/search?${params}`);
        const json = await res.json();
        // Normalise search results to video shape
        items = (json.items || []).map((i) => ({
          id: i.id?.videoId,
          snippet: i.snippet,
          statistics: {},
        }));
      } else if (config.search) {
        const params = new URLSearchParams({
          part: "snippet",
          type: "video",
          q: config.search,
          maxResults: "50",
          regionCode: "IN",
        });
        const res = await fetch(`/api/youtube/search?${params}`);
        const json = await res.json();
        items = (json.items || []).map((i) => ({
          id: i.id?.videoId,
          snippet: i.snippet,
          statistics: {},
        }));
      }

      setVideos(items);

      // Batch-fetch channel thumbnails in chunks to avoid 403
      const channelIds = [
        ...new Set(items.map((v) => v.snippet?.channelId).filter(Boolean)),
      ];
      if (channelIds.length > 0) {
        const chunks = [];
        for (let i = 0; i < channelIds.length; i += CHUNK_SIZE) {
          chunks.push(channelIds.slice(i, i + CHUNK_SIZE));
        }
        const results = await Promise.allSettled(
          chunks.map((chunk) =>
            fetch(
              `/api/youtube/channels?part=snippet&id=${chunk.join(",")}`,
            ).then((r) => r.json()),
          ),
        );
        const map = {};
        results.forEach((r) => {
          if (r.status === "fulfilled" && r.value?.items) {
            r.value.items.forEach((ch) => {
              map[ch.id] = ch.snippet?.thumbnails?.default?.url;
            });
          }
        });
        setChannelThumbs(map);
      }

      setLoading(false);
    };

    fetchVideos();
  }, [slug]); // eslint-disable-line

  if (!config) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
        <p className="text-[#aaaaaa]">Page not found.</p>
      </div>
    );
  }

  if (loading) return <Shimmer />;

  return (
    <div className="bg-[#0f0f0f] min-h-screen px-4 py-5">
      <h1 className="text-[#f1f1f1] text-xl font-bold mb-5">{config.label}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {videos.map((video) => {
          const id = video.id;
          return (
            <div
              key={id}
              className="cursor-pointer"
              onClick={() => navigate(`/watch?v=${id}`)}
            >
              <VideoCard
                info={video}
                channelThumb={channelThumbs[video.snippet?.channelId]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { prettifyNumber } from "../utils/number";

const ChannelPage = () => {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [tab, setTab] = useState("videos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!channelId) return;
    setChannel(null);
    setVideos([]);
    setLoading(true);

    const fetchAll = async () => {
      const [chRes, vRes] = await Promise.all([
        fetch(
          `/api/youtube/channels?part=snippet,brandingSettings,statistics&id=${channelId}`,
        ),
        fetch(
          `/api/youtube/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=30`,
        ),
      ]);
      const chJson = await chRes.json();
      const vJson = await vRes.json();
      setChannel(chJson.items?.[0] || null);
      setVideos(vJson.items || []);
      setLoading(false);
    };

    fetchAll();
  }, [channelId]);

  if (loading) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#3ea6ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
        <p className="text-[#aaaaaa]">Channel not found.</p>
      </div>
    );
  }

  const { snippet, statistics, brandingSettings } = channel;
  const banner = brandingSettings?.image?.bannerExternalUrl;
  const avatar =
    snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url;

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      {/* Banner */}
      {banner ? (
        <div className="w-full h-32 md:h-48 overflow-hidden">
          <img
            src={`${banner}=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
            alt="channel banner"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-32 md:h-48 bg-[#272727]" />
      )}

      {/* Channel info */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5 py-5 border-b border-[#303030]">
          {/* Avatar */}
          {avatar ? (
            <img
              src={avatar}
              alt={snippet?.title}
              className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-[#303030]"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#3ea6ff] flex items-center justify-center text-black font-bold text-3xl flex-shrink-0">
              {snippet?.title?.[0]?.toUpperCase()}
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <h1 className="text-[#f1f1f1] text-2xl font-bold truncate">
              {snippet?.title}
            </h1>
            <div className="flex items-center gap-3 text-[#aaaaaa] text-sm flex-wrap">
              <span>
                @{snippet?.customUrl?.replace("@", "") || snippet?.title}
              </span>
              <span>·</span>
              <span>
                {prettifyNumber(statistics?.subscriberCount)} subscribers
              </span>
              <span>·</span>
              <span>{prettifyNumber(statistics?.videoCount)} videos</span>
            </div>
            {snippet?.description && (
              <p className="text-[#aaaaaa] text-sm line-clamp-2 mt-1 max-w-2xl">
                {snippet.description}
              </p>
            )}
          </div>

          {/* Subscribe */}
          <button className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto flex-shrink-0 bg-white text-[#0f0f0f] font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-[#d9d9d9] transition-colors">
            Subscribe
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-[#303030] mt-1">
          {["videos", "about"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                tab === t
                  ? "text-[#f1f1f1] border-[#f1f1f1]"
                  : "text-[#aaaaaa] border-transparent hover:text-[#f1f1f1]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-6">
          {tab === "videos" &&
            (videos.length === 0 ? (
              <p className="text-[#aaaaaa] text-sm">No videos found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map((video) => {
                  const { title, thumbnails, publishedAt } = video.snippet;
                  const vid = video.id?.videoId;
                  return (
                    <Link key={vid} to={`/watch?v=${vid}`}>
                      <div className="group flex flex-col cursor-pointer">
                        <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                          <img
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                            src={thumbnails?.medium?.url}
                            alt={title}
                          />
                        </div>
                        <div className="flex gap-3 mt-3">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={snippet?.title}
                              className="flex-shrink-0 w-9 h-9 rounded-full object-cover mt-0.5"
                            />
                          ) : (
                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3ea6ff] flex items-center justify-center text-black font-bold text-sm mt-0.5">
                              {snippet?.title?.[0]}
                            </div>
                          )}
                          <div className="flex flex-col gap-1 min-w-0">
                            <p className="text-[#f1f1f1] text-sm font-semibold leading-tight line-clamp-2">
                              {title}
                            </p>
                            <p className="text-[#aaaaaa] text-xs">
                              {snippet?.title}
                            </p>
                            <p className="text-[#aaaaaa] text-xs">
                              {new Date(publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}

          {tab === "about" && (
            <div className="max-w-xl flex flex-col gap-4">
              <div>
                <h3 className="text-[#f1f1f1] font-semibold mb-2">
                  Description
                </h3>
                <p className="text-[#aaaaaa] text-sm whitespace-pre-line leading-relaxed">
                  {snippet?.description || "No description provided."}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm text-[#aaaaaa]">
                <div className="flex gap-3">
                  <span className="text-[#f1f1f1] font-medium w-28">
                    Subscribers
                  </span>
                  <span>{prettifyNumber(statistics?.subscriberCount)}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#f1f1f1] font-medium w-28">
                    Videos
                  </span>
                  <span>{prettifyNumber(statistics?.videoCount)}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#f1f1f1] font-medium w-28">
                    Total views
                  </span>
                  <span>{prettifyNumber(statistics?.viewCount)}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#f1f1f1] font-medium w-28">
                    Joined
                  </span>
                  <span>
                    {new Date(snippet?.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
                {snippet?.country && (
                  <div className="flex gap-3">
                    <span className="text-[#f1f1f1] font-medium w-28">
                      Country
                    </span>
                    <span>{snippet.country}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResultCard from "./ResultCard";
import { useDispatch } from "react-redux";
import { showSuggestionsContainer } from "../utils/showSearchSuggestionsSlice";
import { CardShimmer } from "./Shimmer";
import { capitalizeTheFirstLetterOfEachWord } from "../utils/constants";
import { bestChannelThumb } from "../utils/thumbnail";

const decodeHtml = (str = "") => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [channelThumbs, setChannelThumbs] = useState({});
  const [durations, setDurations] = useState({});
  const dispatch = useDispatch();
  const query = searchParams.get("search_query");

  useEffect(() => {
    if (!query) return;
    setSearchResults([]);
    setChannelThumbs({});
    setDurations({});

    const fetchSearchResults = async () => {
      const data = await fetch(
        `/api/youtube/search?part=snippet&maxResults=25&q=${query}&safeSearch=moderate`
      );
      const jsonData = await data.json();
      const items = jsonData?.items || [];
      setSearchResults(items);
      dispatch(showSuggestionsContainer(false));

      const videoItems = items.filter((i) => i.id?.kind === "youtube#video");
      const videoIds = videoItems.map((i) => i.id.videoId).filter(Boolean);
      // Include both video channel IDs and direct channel result IDs
      const channelIds = [...new Set([
        ...videoItems.map((i) => i.snippet?.channelId),
        ...items.filter((i) => i.id?.kind === "youtube#channel").map((i) => i.id?.channelId),
      ].filter(Boolean))];

      // Parallel: channel thumbs + video durations
      const [chRes, vRes] = await Promise.all([
        channelIds.length
          ? fetch(`/api/youtube/channels?part=snippet&id=${channelIds.join(",")}`)
          : Promise.resolve(null),
        videoIds.length
          ? fetch(`/api/youtube/videos?part=contentDetails&id=${videoIds.join(",")}`)
          : Promise.resolve(null),
      ]);

      if (chRes) {
        const chJson = await chRes.json();
        const map = {};
        (chJson.items || []).forEach((ch) => { map[ch.id] = bestChannelThumb(ch.snippet?.thumbnails); });
        setChannelThumbs(map);
      }

      if (vRes) {
        const vJson = await vRes.json();
        const map = {};
        (vJson.items || []).forEach((v) => { map[v.id] = v.contentDetails?.duration; });
        setDurations(map);
      }
    };

    fetchSearchResults();
    // eslint-disable-next-line
  }, [query]);

  if (!searchResults) return null;

  return searchResults.length === 0 ? (
    <CardShimmer />
  ) : (
    <div className="min-h-screen px-4 sm:px-6 pt-8 pb-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-[#a1a1aa] text-sm font-medium mb-5">
          Results for{" "}
          <span className="text-[#f4f4f5] font-bold tracking-tight">
            {capitalizeTheFirstLetterOfEachWord(query)}
          </span>
        </h1>
        <div className="flex flex-col gap-3">
          {searchResults.map((result) => (
            <ResultCard
              key={result?.id?.videoId || result?.id?.channelId}
              data={result}
              isChannel={result?.id?.kind === "youtube#channel"}
              channelThumb={channelThumbs[result?.snippet?.channelId] || channelThumbs[result?.id?.channelId]}
              duration={durations[result?.id?.videoId]}
              decodeHtml={decodeHtml}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

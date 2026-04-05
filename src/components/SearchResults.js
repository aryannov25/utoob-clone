import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResultCard from "./ResultCard";
import { useDispatch } from "react-redux";
import { showSuggestionsContainer } from "../utils/showSearchSuggestionsSlice";
import { CardShimmer } from "./Shimmer";
import { capitalizeTheFirstLetterOfEachWord } from "../utils/constants";

const decodeHtml = (str = "") => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [channelThumbs, setChannelThumbs] = useState({});
  const dispatch = useDispatch();
  const query = searchParams.get("search_query");

  useEffect(() => {
    if (!query) return;
    setSearchResults([]);
    setChannelThumbs({});
    window.scrollTo(0, 0);
    const fetchSearchResults = async () => {
      const data = await fetch(
        `/api/youtube/search?part=snippet&maxResults=25&q=${query}&safeSearch=moderate`,
      );
      const jsonData = await data.json();
      const items = jsonData?.items || [];
      setSearchResults(items);
      dispatch(showSuggestionsContainer(false));

      // Batch-fetch channel thumbnails for video results
      const channelIds = [
        ...new Set(
          items
            .filter((i) => i.id?.kind === "youtube#video")
            .map((i) => i.snippet?.channelId)
            .filter(Boolean),
        ),
      ];
      if (channelIds.length === 0) return;
      const chRes = await fetch(
        `/api/youtube/channels?part=snippet&id=${channelIds.join(",")}`,
      );
      const chJson = await chRes.json();
      const map = {};
      (chJson.items || []).forEach((ch) => {
        map[ch.id] = ch.snippet?.thumbnails?.default?.url;
      });
      setChannelThumbs(map);
    };
    fetchSearchResults();
    // eslint-disable-next-line
  }, [query]);

  if (!searchResults) return null;

  return searchResults.length === 0 ? (
    <CardShimmer />
  ) : (
    <div className="bg-[#0f0f0f] min-h-screen px-6 py-4">
      <h1 className="text-[#f1f1f1] text-lg font-semibold mb-5">
        Results for:{" "}
        <span className="font-bold">
          {capitalizeTheFirstLetterOfEachWord(query)}
        </span>
      </h1>
      <div className="flex flex-col gap-3 max-w-4xl">
        {searchResults.map((result) => (
          <ResultCard
            key={result?.id?.videoId || result?.id?.channelId}
            data={result}
            isChannel={result?.id?.kind === "youtube#channel"}
            channelThumb={channelThumbs[result?.snippet?.channelId]}
            decodeHtml={decodeHtml}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

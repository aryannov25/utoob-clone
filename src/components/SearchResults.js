import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResultCard from "./ResultCard";
import { useDispatch } from "react-redux";
import { showSuggestionsContainer } from "../utils/showSearchSuggestionsSlice";
import { CardShimmer } from "./Shimmer";
import { capitalizeTheFirstLetterOfEachWord } from "../utils/constants";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const query = searchParams.get("search_query");

  useEffect(() => {
    const SEARCH_RESULTS_URL =
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&safeSearch=moderate&key=` +
      process.env.REACT_APP_GOOGLE_API_KEY;
    fetchSearchResults(SEARCH_RESULTS_URL);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [query]);

  const fetchSearchResults = async (SEARCH_RESULTS_URL) => {
    const data = await fetch(SEARCH_RESULTS_URL);
    const jsonData = await data.json();
    setSearchResults(jsonData?.items);
    // console.log(jsonData?.items)
    dispatch(showSuggestionsContainer(false));
  };

  //early return
  if (!searchResults) return null;
  return searchResults.length === 0 ? (
    <CardShimmer />
  ) : (
    <>
      <div className="w-10/12">
        <h1 className="p-5 text-xl font-bold">
          Here are the search results for:
          <span className="font-extrabold text-xl ">
            {" "}
            {capitalizeTheFirstLetterOfEachWord(query)}
          </span>
        </h1>
        {searchResults.map((result) => (
          <ResultCard
            key={
              result?.id?.videoId ? result?.id?.videoId : result?.id?.channelId
            }
            data={result}
            isChannel={result?.id?.kind === "youtube#channel" ? true : false}
          />
        ))}
      </div>
    </>
  );
};

export default SearchResults;

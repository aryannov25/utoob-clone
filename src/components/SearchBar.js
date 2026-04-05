import { useState, useEffect } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addToCache } from "../utils/CacheSlice";
import ResultsSuggestionContainer from "./ResultsSuggestionContainer";
import { Link } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const cache = useSelector((store) => store.searchSuggestionCache.cache);

  const handleClickAway = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchSuggestions(searchQuery);
    }, 200);

    // eslint-disable-next-line
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchSearchSuggestions = async (searchQuery) => {
    if (cache[searchQuery]) {
      setSuggestions(cache[searchQuery]);
    } else {
      const data = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
      const jsonData = await data.json();
      console.log(jsonData[1]);
      setSuggestions(jsonData[1]);

      dispatch(
        addToCache({
          [searchQuery]: jsonData[1],
        }),
      );
    }
  };

  if (searchQuery !== "" && !suggestions) return null;
  if (!suggestions) return null;

  return (
    <div className="relative w-full max-w-[600px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="relative">
            {/* Input + search button row */}
            <div className="flex h-10">
              <input
                type="text"
                placeholder="Search"
                className="w-full flex-1 bg-[#121212] border border-[#303030] border-r-0 rounded-l-full px-5 text-[#f1f1f1] placeholder-[#aaaaaa] text-sm focus:outline-none focus:border-[#3ea6ff] transition-colors"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value === "") setMenuOpen(false);
                }}
                onFocus={() => setMenuOpen(true)}
              />
              <Link to={`/results?search_query=${searchQuery}`}>
                <button
                  type="button"
                  className="h-10 px-5 bg-[#272727] border border-[#303030] rounded-r-full hover:bg-[#3f3f3f] transition-colors flex items-center justify-center"
                  aria-label="Search"
                >
                  <svg
                    className="w-5 h-5 text-[#f1f1f1]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Suggestions dropdown */}
            {menuOpen && suggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 z-50 mt-1 w-full bg-[#212121] border border-[#303030] rounded-xl shadow-2xl overflow-hidden">
                {suggestions.map((suggestion) => (
                  <ResultsSuggestionContainer
                    suggestion={suggestion}
                    key={suggestion}
                    handleClickAway={() => handleClickAway()}
                  />
                ))}
              </div>
            )}
          </div>
        </ClickAwayListener>
      </form>
    </div>
  );
};

export default SearchBar;

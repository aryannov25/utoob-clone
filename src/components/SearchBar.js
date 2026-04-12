import { useCallback, useEffect, useState } from "react";
import { SEARCH_MAX_LENGTH, YOUTUBE_SEARCH_API } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addToCache } from "../utils/CacheSlice";
import ResultsSuggestionContainer from "./ResultsSuggestionContainer";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const cache = useSelector((store) => store.searchSuggestionCache.cache);

  const handleClickAway = useCallback(() => setSuggestionsOpen(false), []);

  const runSearch = useCallback(
    (raw) => {
      const q = raw.trim().slice(0, SEARCH_MAX_LENGTH);
      if (!q) return;
      setSuggestionsOpen(false);
      navigate(`/results?search_query=${encodeURIComponent(q)}`);
    },
    [navigate],
  );

  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    if (cache[searchQuery]) {
      setSuggestions(cache[searchQuery]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${YOUTUBE_SEARCH_API}${encodeURIComponent(searchQuery)}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        const list = Array.isArray(json?.[1]) ? json[1] : [];
        setSuggestions(list);
        dispatch(addToCache({ [searchQuery]: list }));
      } catch (err) {
        if (err.name !== "AbortError") {
          setSuggestions([]);
        }
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery, cache, dispatch]);

  return (
    <div className="relative w-full max-w-[600px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(searchQuery);
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="relative">
            {/* Input + search button row */}
            <div className="flex h-10">
              <label htmlFor="yt-search" className="sr-only">
                Search YouTube
              </label>
              <input
                id="yt-search"
                type="text"
                placeholder="Search"
                maxLength={SEARCH_MAX_LENGTH}
                aria-label="Search YouTube"
                className="w-full flex-1 bg-[#121212] border border-[#303030] border-r-0 rounded-l-full px-5 text-[#f1f1f1] placeholder-[#aaaaaa] text-sm focus:outline-none focus:border-[#3ea6ff] transition-colors"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value === "") setSuggestionsOpen(false);
                  else setSuggestionsOpen(true);
                }}
                onFocus={() => searchQuery && setSuggestionsOpen(true)}
              />
              <button
                type="submit"
                className="h-10 px-5 bg-[#272727] border border-[#303030] rounded-r-full hover:bg-[#3f3f3f] transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5 text-[#f1f1f1]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </button>
            </div>

            {/* Suggestions dropdown */}
            {suggestionsOpen && suggestions.length > 0 && (
              <ul
                role="listbox"
                className="absolute top-full left-0 z-50 mt-1 w-full bg-[#212121] border border-[#303030] rounded-xl shadow-2xl overflow-hidden"
              >
                {suggestions.map((suggestion) => (
                  <ResultsSuggestionContainer
                    suggestion={suggestion}
                    key={suggestion}
                    handleClickAway={handleClickAway}
                  />
                ))}
              </ul>
            )}
          </div>
        </ClickAwayListener>
      </form>
    </div>
  );
};

export default SearchBar;

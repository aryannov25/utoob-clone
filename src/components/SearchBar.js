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

  const [focused, setFocused] = useState(false);
  const showSuggestions = suggestionsOpen && suggestions.length > 0;

  return (
    <div className="relative w-full max-w-[640px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(searchQuery);
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <div
            className={`relative bg-[#17171c]/90 backdrop-blur-xl rounded-[22px] ring-1 transition-[box-shadow,border-color] duration-150 ${
              focused || showSuggestions
                ? "ring-[#ff2e4d]/50 shadow-[0_0_0_4px_rgba(255,46,77,0.08),0_20px_50px_-20px_rgba(0,0,0,0.8)]"
                : "ring-white/10 hover:ring-white/20"
            }`}
          >
            <div className="flex h-11">
              <label htmlFor="yt-search" className="sr-only">
                Search YouTube
              </label>
              <div className="flex items-center pl-5 pr-2 text-[#71717a]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </div>
              <input
                id="yt-search"
                type="text"
                placeholder="Search videos, channels, topics…"
                maxLength={SEARCH_MAX_LENGTH}
                aria-label="Search YouTube"
                autoComplete="off"
                className="flex-1 min-w-0 bg-transparent text-[#f4f4f5] placeholder-[#71717a] text-sm focus:outline-none pr-2"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value === "") setSuggestionsOpen(false);
                  else setSuggestionsOpen(true);
                }}
                onFocus={() => {
                  setFocused(true);
                  if (searchQuery) setSuggestionsOpen(true);
                }}
                onBlur={() => setFocused(false)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSuggestions([]);
                  }}
                  className="px-2 text-[#71717a] hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="press mx-1 my-1 px-4 rounded-full text-sm font-semibold text-white bg-gradient-to-br from-[#ff2e4d] to-[#ff5d7a] shadow-[0_4px_16px_-6px_rgba(255,46,77,0.55)] hover:shadow-[0_6px_20px_-6px_rgba(255,46,77,0.75)] transition-shadow flex items-center justify-center"
                aria-label="Search"
              >
                Search
              </button>
            </div>

            {showSuggestions && (
              <>
                <div className="mx-4 border-t border-white/10" />
                <ul role="listbox" className="py-2">
                  {suggestions.map((suggestion) => (
                    <ResultsSuggestionContainer
                      suggestion={suggestion}
                      key={suggestion}
                      handleClickAway={handleClickAway}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        </ClickAwayListener>
      </form>
    </div>
  );
};

export default SearchBar;

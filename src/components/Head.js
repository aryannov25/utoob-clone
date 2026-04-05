import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Head() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLight, setIsLight] = useState(
    () => localStorage.getItem("yt_theme") === "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", isLight);
    localStorage.setItem("yt_theme", isLight ? "light" : "dark");
  }, [isLight]);

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-[#303030]">
      {/* ── Mobile search-open state: full-width search bar row ── */}
      {searchOpen && (
        <div className="flex items-center gap-2 px-2 h-14 md:hidden">
          {/* Back arrow */}
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 rounded-full hover:bg-[#272727] transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            <svg
              className="w-6 h-6 text-[#f1f1f1]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Full-width search bar */}
          <div className="flex-1 min-w-0">
            <SearchBar />
          </div>
        </div>
      )}

      {/* ── Default header row ── */}
      <div
        className={`flex items-center justify-between px-4 h-14 ${
          searchOpen ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => toggleMenuHandler()}
            className="p-2 rounded-full hover:bg-[#272727] transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6 text-[#f1f1f1]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-1">
            <svg
              height="20"
              viewBox="0 0 90 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Play button icon */}
              <rect x="0" y="0" width="28" height="20" rx="5" fill="#FF0000" />
              <polygon points="11,6 11,14 20,10" fill="white" />
              {/* YouTube wordmark */}
              <text
                x="32"
                y="15"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
                fontSize="14"
                fill="#f1f1f1"
              >
                UToob
              </text>
            </svg>
          </Link>
        </div>

        {/* Center: search bar — hidden on mobile, visible on desktop */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <SearchBar />
        </div>

        {/* Right: search icon (mobile only) + avatar */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Search icon button — mobile only */}
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-[#272727] transition-colors"
            aria-label="Open search"
          >
            <svg
              className="w-6 h-6 text-[#f1f1f1]"
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
          {/* Dark/light toggle */}
          <button
            onClick={() => setIsLight((v) => !v)}
            title={isLight ? "Switch to dark mode" : "Switch to light mode"}
            className="p-2 rounded-full hover:bg-[#272727] transition-colors text-[#f1f1f1]"
          >
            {isLight ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0zM7.05 18.36l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0z" />
              </svg>
            )}
          </button>

          {/* User avatar */}
          <div className="w-9 h-9 rounded-full bg-[#3ea6ff] flex items-center justify-center text-[#0f0f0f] font-bold text-sm select-none">
            U
          </div>
        </div>
      </div>
    </div>
  );
}

export default Head;

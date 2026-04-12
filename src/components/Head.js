import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const IconButton = ({ onClick, label, children, className = "" }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`press p-2.5 rounded-full text-[#f4f4f5] hover:bg-white/10 active:bg-white/15 transition-colors ${className}`}
  >
    {children}
  </button>
);

function Head() {
  const [searchOpen, setSearchOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      {searchOpen && (
        <div className="flex items-start gap-2 px-3 h-14 pt-[6px] md:hidden">
          <IconButton onClick={() => setSearchOpen(false)} label="Close search">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </IconButton>
          <div className="flex-1 min-w-0">
            <SearchBar />
          </div>
        </div>
      )}

      <div
        className={`flex items-center justify-between px-4 h-14 gap-4 ${
          searchOpen ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <IconButton onClick={() => dispatch(toggleMenu())} label="Toggle sidebar">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </IconButton>
          <Link to="/" className="flex items-center gap-2 group" aria-label="UToob home">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff2e4d] to-[#ff5d7a] shadow-[0_6px_20px_-6px_rgba(255,46,77,0.6)] group-hover:shadow-[0_8px_24px_-6px_rgba(255,46,77,0.85)] transition-shadow">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-[17px] font-extrabold tracking-tight text-[#f4f4f5]">
              U<span className="accent-gradient">Toob</span>
            </span>
          </Link>
        </div>

        {/* Center: search bar — anchored to top so it grows downward when suggestions open */}
        <div className="hidden md:flex flex-1 justify-center px-4 self-start mt-[6px]">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <IconButton
            onClick={() => setSearchOpen(true)}
            label="Open search"
            className="md:hidden"
          >
            <svg
              className="w-6 h-6"
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
          </IconButton>

          <div
            className="ml-1 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm select-none bg-gradient-to-br from-[#ff2e4d] to-[#8250ff] ring-2 ring-white/10"
            title="You"
          >
            U
          </div>
        </div>
      </div>
    </header>
  );
}

export default Head;

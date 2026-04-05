import React, { useRef, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const CATEGORIES = [
  { label: "All", query: null },
  { label: "Gaming", query: "Games" },
  { label: "Music", query: "Music" },
  { label: "Live", query: "Live" },
  { label: "Comedy", query: "Comedy" },
  { label: "Movies", query: "Movies" },
  { label: "Tech", query: "Technology" },
  { label: "News", query: "News" },
  { label: "Gadgets", query: "Gadgets" },
  { label: "Hip-Hop", query: "Hip-Hop" },
  { label: "Motivation", query: "Motivation" },
  { label: "Trending", query: "Trending" },
  { label: "Drama", query: "Drama" },
  { label: "Reality Shows", query: "Reality+Shows" },
  { label: "Lectures", query: "Lectures" },
  { label: "JavaScript", query: "Javascript" },
  { label: "Tailwind CSS", query: "Tailwindcss" },
];

const ButtonList = () => {
  const sliderRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("search_query");

  const updateFades = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateFades();
    const el = sliderRef.current;
    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "auto" });
    };
    el?.addEventListener("scroll", updateFades, { passive: true });
    el?.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", updateFades);
    return () => {
      el?.removeEventListener("scroll", updateFades);
      el?.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateFades);
    };
  }, []);

  const slide = (dir) =>
    sliderRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });

  return (
    <div className="bg-[#0f0f0f] border-b border-[#303030] sticky top-14 z-40 flex items-center">
      {/* Left arrow — zero width when hidden so it doesn't shift layout */}
      <button
        onClick={() => slide(-1)}
        aria-label="Scroll left"
        className={`flex-shrink-0 rounded-full transition-all duration-200 overflow-hidden text-[#f1f1f1] hover:bg-[#272727] ${
          canLeft
            ? "w-7 h-7 opacity-100 mx-1"
            : "w-0 h-7 opacity-0 pointer-events-none"
        }`}
      >
        <MdChevronLeft size={22} />
      </button>

      {/* Pill row in its own overflow-hidden wrapper — fades are clipped here */}
      <div className="relative flex-1 overflow-hidden">
        {/* Left fade — inside the pill wrapper so it clips correctly */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-12 z-10 transition-opacity duration-200"
          style={{
            background: "linear-gradient(to right, #0f0f0f 40%, transparent)",
            opacity: canLeft ? 1 : 0,
          }}
        />

        <div
          ref={sliderRef}
          className="flex gap-2 overflow-x-auto px-3 py-1.5 scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {CATEGORIES.map(({ label, query }) => {
            const isActive =
              query === null ? !currentQuery : currentQuery === query;
            const to = query ? `/results?search_query=${query}` : "/";

            return (
              <Link key={label} to={to} className="flex-shrink-0">
                <span
                  className={`inline-block text-sm font-medium rounded-lg px-3 py-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#f1f1f1] text-[#0f0f0f]"
                      : "bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f]"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-12 z-10 transition-opacity duration-200"
          style={{
            background: "linear-gradient(to left, #0f0f0f 40%, transparent)",
            opacity: canRight ? 1 : 0,
          }}
        />
      </div>

      {/* Right arrow */}
      <button
        onClick={() => slide(1)}
        aria-label="Scroll right"
        className={`flex-shrink-0 rounded-full transition-all duration-200 overflow-hidden text-[#f1f1f1] hover:bg-[#272727] ${
          canRight
            ? "w-7 h-7 opacity-100 mx-1"
            : "w-0 h-7 opacity-0 pointer-events-none"
        }`}
      >
        <MdChevronRight size={22} />
      </button>
    </div>
  );
};

export default ButtonList;

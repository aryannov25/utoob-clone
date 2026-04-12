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
    <div className="glass border-b border-white/5 sticky top-14 z-40 flex items-center">
      <button
        onClick={() => slide(-1)}
        aria-label="Scroll left"
        className={`press flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-200 overflow-hidden text-white bg-white/5 hover:bg-white/10 backdrop-blur ${
          canLeft ? "w-8 h-8 opacity-100 mx-1.5" : "w-0 h-8 opacity-0 pointer-events-none"
        }`}
      >
        <MdChevronLeft size={22} />
      </button>

      <div className="relative flex-1 overflow-hidden">
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-14 z-10 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,12,0.95) 20%, transparent)",
            opacity: canLeft ? 1 : 0,
          }}
        />

        <div
          ref={sliderRef}
          className="flex gap-2 overflow-x-auto px-3 py-2.5 scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {CATEGORIES.map(({ label, query }) => {
            const isActive =
              query === null ? !currentQuery : currentQuery === query;
            const to = query ? `/results?search_query=${query}` : "/";

            return (
              <Link key={label} to={to} className="flex-shrink-0">
                <span
                  className={`press inline-block text-[13px] font-semibold rounded-full px-4 py-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-br from-[#ff2e4d] to-[#ff5d7a] text-white shadow-[0_6px_20px_-8px_rgba(255,46,77,0.6)]"
                      : "bg-white/5 text-[#e5e5e7] hover:bg-white/10 ring-1 ring-white/10"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-14 z-10 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to left, rgba(10,10,12,0.95) 20%, transparent)",
            opacity: canRight ? 1 : 0,
          }}
        />
      </div>

      <button
        onClick={() => slide(1)}
        aria-label="Scroll right"
        className={`press flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-200 overflow-hidden text-white bg-white/5 hover:bg-white/10 backdrop-blur ${
          canRight ? "w-8 h-8 opacity-100 mx-1.5" : "w-0 h-8 opacity-0 pointer-events-none"
        }`}
      >
        <MdChevronRight size={22} />
      </button>
    </div>
  );
};

export default ButtonList;

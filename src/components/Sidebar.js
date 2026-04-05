import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NAV_ITEMS = [
  {
    label: "Home",
    to: "/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    label: "Shorts",
    to: "/shorts",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.56-3.22 1.6-5.06s-3.22-2.56-5.06-1.6L6 6.94c-1.29.68-2.07 2.01-2 3.44.07 1.29.75 2.43 1.79 3.06l1.2.5L5.56 14.9c-1.84.96-2.56 3.22-1.6 5.06.96 1.84 3.22 2.56 5.06 1.6l8.54-4.54c1.29-.68 2.07-2.01 2-3.44-.07-1.29-.75-2.43-1.79-3.06zM10 14.65V9.35L15 12l-5 2.65z" />
      </svg>
    ),
  },
  {
    label: "Subscriptions",
    to: null,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 18v-2h4v2h-4zm-4-4v-2h12v2H6zm-2-4V8h16v2H4z" />
      </svg>
    ),
  },
];

const LIBRARY_ITEMS = [
  {
    label: "Library",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
  },
  {
    label: "History",
    to: "/history",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
      </svg>
    ),
  },
  {
    label: "Your videos",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 8l6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z" />
      </svg>
    ),
  },
  {
    label: "Watch later",
    to: "/watch-later",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm0 16H2V5h20v14zm-8-8.5v-2h-2v2H8v2h4v2h2v-2h4v-2h-4z" />
      </svg>
    ),
  },
  {
    label: "Liked videos",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
      </svg>
    ),
  },
];

const EXPLORE_ITEMS = [
  {
    label: "Trending",
    to: "/explore/trending",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.53 11.2c-.23-.3-.5-.56-.76-.82-.81-.83-1.75-1.46-2.37-2.55-.37-.65-.5-1.33-.45-2.06.05-.52.21-1.02.5-1.47-.23.13-.45.28-.65.44-1.13.95-1.81 2.4-1.85 3.82-.02.53-.01 1.06.08 1.58.03.2.02.41-.05.61-.13.35-.38.65-.74.74-.6.14-1.14-.22-1.32-.73a2.84 2.84 0 0 1-.1-.37c-.55.87-.83 1.89-.83 2.93 0 1.57.62 3.01 1.64 4.07l.17.17c.12.12.26.23.39.34.44.35.93.65 1.46.86.27.1.55.18.84.23.33.05.66.08 1 .08 3.3 0 6-2.7 6-6 0-1.31-.37-2.54-1.02-3.57-.23.45-.58.82-.94 1.13z" />
      </svg>
    ),
  },
  {
    label: "Shopping",
    to: "/explore/shopping",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.44 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    label: "Music",
    to: "/explore/music",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
  },
  {
    label: "Movies",
    to: "/explore/movies",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
      </svg>
    ),
  },
  {
    label: "Live",
    to: "/explore/live",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    ),
  },
  {
    label: "Gaming",
    to: "/explore/gaming",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 10 18.5 10s1.5.67 1.5 1.5S19.33 12 18.5 12z" />
      </svg>
    ),
  },
  {
    label: "Sports",
    to: "/explore/sports",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
  },
];

const NavItem = ({ label, to, icon, open }) => {
  const inner = (
    <div
      className={`flex items-center gap-5 px-3 py-2.5 rounded-xl cursor-pointer text-[#f1f1f1] hover:bg-[#272727] transition-colors ${
        open ? "" : "justify-center"
      }`}
      title={!open ? label : undefined}
    >
      <span className="flex-shrink-0">{icon}</span>
      {open && <span className="text-sm font-medium">{label}</span>}
    </div>
  );

  if (to) {
    return <Link to={to}>{inner}</Link>;
  }
  return inner;
};

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div
      className={`
        bg-[#0f0f0f] overflow-y-auto overflow-x-hidden flex-shrink-0 scrollbar-hide
        transition-transform duration-200
        fixed left-0 top-14 h-[calc(100vh-56px)] z-50 w-64
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0
        ${isMenuOpen ? "md:w-60" : "md:w-[72px]"}
      `}
    >
      <div className="py-3 px-2">
        {/* Primary nav */}
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} {...item} open={isMenuOpen} />
        ))}

        <div className="my-3 border-t border-[#303030]" />

        {/* Library */}
        {isMenuOpen && (
          <p className="px-3 py-1 text-sm font-semibold text-[#f1f1f1]">You</p>
        )}
        {LIBRARY_ITEMS.map((item) => (
          <NavItem key={item.label} {...item} open={isMenuOpen} />
        ))}

        <div className="my-3 border-t border-[#303030]" />

        {/* Explore */}
        {isMenuOpen && (
          <p className="px-3 py-1 text-sm font-semibold text-[#f1f1f1]">
            Explore
          </p>
        )}
        {EXPLORE_ITEMS.map((item) => (
          <NavItem key={item.label} {...item} open={isMenuOpen} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

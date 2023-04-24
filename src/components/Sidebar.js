import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;
  return (
    <div className="p-8  shadow-lg  w-60 bg-white">
      <ul>
        <Link to={"/"}>
          <li className="py-3 font-bold cursor-pointer">
            <i class="fa fa-home mr-3" aria-hidden="true"></i> Home
          </li>
        </Link>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-play mr-3" aria-hidden="true"></i> Shorts
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-archive mr-3" aria-hidden="true"></i> Subscriptions
        </li>
      </ul>
      <h1 className="mt-5 border border-slate-200"><hr/></h1>
      <ul>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-youtube-play mr-3" aria-hidden="true"></i> Library
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-history mr-3" aria-hidden="true"></i> History
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-youtube mr-3" aria-hidden="true"></i> Your videos
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-clock-o mr-3" aria-hidden="true"></i> Watch later
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-thumbs-up mr-3" aria-hidden="true"></i> Liked videos
        </li>
      </ul>
      <h1 className="mt-5 border border-slate-200"><hr/></h1>
      <h1 className="mt-3 font-semibold">Explore</h1>
      <ul>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-fire mr-3" aria-hidden="true"></i> Trending
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-shopping-bag mr-3" aria-hidden="true"></i> Shopping
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-music mr-3" aria-hidden="true"></i> Music
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-film mr-3" aria-hidden="true"></i> Movies
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-podcast mr-3" aria-hidden="true"></i> Live
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-gamepad mr-3" aria-hidden="true"></i> Gaming
        </li>
        <li className="py-3 cursor-pointer">
          <i class="fa fa-trophy mr-3" aria-hidden="true"></i> Sports
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

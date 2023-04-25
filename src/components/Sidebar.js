import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;
  return (
    <>
      <div className="p-8 pt-3 shadow-lg w-60 bg-white">
        <ul className="mb-3">
          <Link to={"/"}>
            <li className="py-3 font-bold cursor-pointer">
              <i className="fa fa-home mr-3" aria-hidden="true"></i> Home
            </li>
          </Link>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-play mr-3" aria-hidden="true"></i>Shorts
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-archive mr-3" aria-hidden="true"></i>
            Subscriptions
          </li>
        </ul>
        <hr />
        <ul className="mb-3 mt-3">
          <li className="py-3 cursor-pointer">
            <i className="fa fa-youtube-play mr-3" aria-hidden="true"></i>
            Library
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-history mr-3" aria-hidden="true"></i>History
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-youtube mr-3" aria-hidden="true"></i>Your videos
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-clock-o mr-3" aria-hidden="true"></i>Watch later
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-thumbs-up mr-3" aria-hidden="true"></i>Liked videos
          </li>
        </ul>
        <hr />
        <h1 className="mt-3 mb-3 font-semibold">Explore</h1>
        <ul>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-fire mr-3" aria-hidden="true"></i>Trending
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-shopping-bag mr-3" aria-hidden="true"></i>
            Shopping
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-music mr-3" aria-hidden="true"></i>Music
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-film mr-3" aria-hidden="true"></i>Movies
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-podcast mr-3" aria-hidden="true"></i>Live
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-gamepad mr-3" aria-hidden="true"></i>Gaming
          </li>
          <li className="py-3 cursor-pointer">
            <i className="fa fa-trophy mr-3" aria-hidden="true"></i>Sports
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

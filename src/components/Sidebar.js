import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;
  return (
    <>
      <div className="p-8 pt-3 shadow-lg max-w-fit bg-white">
        <ul className="mb-3">
          <Link to={"/"}>
            <li className="py-3 font-bold cursor-pointer">
              <i className="fa fa-home mr-3" aria-hidden="true"></i> Home
            </li>
          </Link>
          <li className="py-3 cursor-pointer">Shorts</li>
          <li className="py-3 cursor-pointer">Subscriptions</li>
        </ul>
        <hr />
        <ul className="mb-3 mt-3">
          <li className="py-3 cursor-pointer">Library</li>
          <li className="py-3 cursor-pointer">History</li>
          <li className="py-3 cursor-pointer">Uploaded</li>
          <li className="py-3 cursor-pointer">Watch later</li>
          <li className="py-3 cursor-pointer">Liked</li>
        </ul>
        <hr />
        <h1 className="mt-3 mb-3 font-semibold">Explore</h1>
        <ul>
          <li className="py-3 cursor-pointer">Trending</li>
          <li className="py-3 cursor-pointer">Shopping</li>
          <li className="py-3 cursor-pointer">Music</li>
          <li className="py-3 cursor-pointer">Movies</li>
          <li className="py-3 cursor-pointer">Live</li>
          <li className="py-3 cursor-pointer">Gaming</li>
          <li className="py-3 cursor-pointer">Sports</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

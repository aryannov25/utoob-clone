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
          <li className="py-3 font-bold">Home</li>
        </Link>
        <li className="py-3  ">Shorts</li>
        <li className="py-3 ">Subscriptions</li>
      </ul>
      <h1 className="mt-5 border border-slate-200">{""}</h1>
      <ul>
        <li className="py-3 ">Library</li>
        <li className="py-3 ">History</li>
        <li className="py-3 ">Your videos</li>
        <li className="py-3 ">Watch later</li>
        <li className="py-3 ">Liked videos</li>
      </ul>
      <h1 className="mt-5 border border-slate-200">{""}</h1>
      <ul>
        <li className="py-3 ">Trending</li>
        <li className="py-3 ">Shopping</li>
        <li className="py-3 ">Music</li>
        <li className="py-3 ">Movies </li>
        <li className="py-3 ">Live</li>
        <li className="py-3 ">Gaming</li>
        <li className="py-3 ">Sports</li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import Logo from "../img/logo.png";
import HamMenu from "../img/menu.svg";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

function Head() {
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  //https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=faded

  return (
    <div className="grid grid-flow-col p-4 m-1 shadow-md">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src={HamMenu}
        />
        <a href="/">
          <img className="h-8 mx-2" alt="logo" src={Logo} />
        </a>
      </div>
      <div className="col-span-10 text-center mr-20">
        <input
          className="w-1/2 p-1 px-4 border border-gray-400 rounded-l-full"
          type="text"
          placeholder="Search"
        />
        <button className="p-1 px-4 border bg-gray-200 border-gray-400 rounded-r-full">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <div className="col-span-1 text-end">
        <img
          className="h-8"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
}

export default Head;

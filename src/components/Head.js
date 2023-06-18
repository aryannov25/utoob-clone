import React, { useState, useEffect } from "react";
import Logo from "../img/YouTube-Logo.svg";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "./../utils/constants";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Head() {
  // eslint-disable-next-line
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // console.log(searchQuery);

    const timer = setTimeout(() => getSearchSuggestions(), 600);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json);
    setSuggestions(json[1]);
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  //https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=faded

  return (
    <div className="flex bg-white justify-between dark:bg-zinc-900">
      <div className="flex p-1 m-1 ml-3">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 w-11 px-3 pt-4 cursor-pointer "
          alt="side bar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyFGZmFfQWrVXrdtp54fXbrvWy26g5G7LRol7MYwL2DMPv4LmFzZME_4lQRLT_fIqSTTU&usqp=CAU"
        />
        <Link to="/">
          <img className="h-12 px-2 w-40 " alt="logo" src={Logo} />
        </Link>
      </div>
      <SearchBar />

      <div className="w-20">
        <img
          className="h-12 px-3 pt-4"
          alt="user icon"
          src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
        />
      </div>
    </div>
  );
}

export default Head;

//dark:bg-black

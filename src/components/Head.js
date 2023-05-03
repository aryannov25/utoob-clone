import React, { useState, useEffect } from "react";
import Logo from "../img/logo.png";
import HamMenu from "../img/menu.svg";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "./../utils/constants";

function Head() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    console.log(searchQuery);

    const timer = setTimeout(() => getSearchSuggestions(), 600);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  //https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=faded

  return (
    // <div className="grid grid-flow-col p-4 m-1 shadow-md">
    //   <div className="flex col-span-1">
    //     <img
    //       onClick={() => toggleMenuHandler()}
    //       className="h-8 cursor-pointer"
    //       alt="menu"
    //       src={HamMenu}
    //     />
    //     <a href="/">
    //       <img className="h-8 mx-2" alt="logo" src={Logo} />
    //     </a>
    //   </div>
    //   <div className="col-span-10">
    //     <input
    //       className="px-5 py-1 h-9 ml-32 w-1/2 border border-gray-300 rounded-l-full "
    //       type="text"
    //       value={searchQuery}
    //       onChange={(e) => setSearchQuery(e.target.value)}
    //     />
    //     <button className="bg-gray-100 h-9 fixed border border-gray-300  w-16 rounded-r-full ">
    //     <i class="fa fa-search"></i>
    //     </button>
    //     <div className="flex fixed bg-white  ml-32  ">
    //       <ul className="w-72 ">
    //         {suggestions.map((s) => (
    //           <li
    //             key={s}
    //             className="hover:bg-slate-100 rounded-lg shadow-sm border border-slate-50 px-5 py-1"
    //           >
    //               <i class="fa fa-search"></i>
    //               &nbsp;&nbsp;
    //             {s}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    //   <div className="col-span-1 text-end">
    //     <img
    //       className="h-8"
    //       alt="user"
    //       src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
    //     />
    //   </div>
    // </div>

    <div className="flex bg-white justify-between">
      <div className="flex p-1 m-1 ml-3">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 w-11 px-3 pt-4 cursor-pointer"
          alt="side bar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyFGZmFfQWrVXrdtp54fXbrvWy26g5G7LRol7MYwL2DMPv4LmFzZME_4lQRLT_fIqSTTU&usqp=CAU"
        />
        <a href="/">
          <img className="h-10 px-2 w-40" alt="logo" src={Logo} />
        </a>
      </div>
      <form
        className="font-medium mx-2 p-1"
        onSubmit={(e) => {
          e.preventDefault();
          setSearchQuery("");
        }}
      >
        <div className="flex h-10 mt-2 pt-[2px] pr-20">
          <input
            type="text"
            placeholder="Search..."
            className="w-[550px] border rounded-s-full px-7 shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>
            <img
              className="h-[39px] py-2 px-5 border rounded-e-full hover:bg-gray-200 shadow-lg bg-gray-100"
              alt="search"
              src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png"
            />
          </button>
        </div>
        {
          <div className="absolute bg-white w-[590px] border rounded-lg shadow-lg  font-semibold mx-1 my-[2px]">
            <ul>
              {suggestions.map((sug, index) => (
                <li key={index} className="py-1 px-6 hover:bg-gray-200">
                  {sug}
                </li>
              ))}
            </ul>
          </div>
        }
      </form>

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

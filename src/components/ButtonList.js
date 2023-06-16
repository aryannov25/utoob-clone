import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

const ButtonList = () => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="grid grid-flow-col dark:bg-zinc-900">
      <MdChevronLeft
        className="hover:scale-150 my-auto opacity-50 "
        size={30}
        onClick={slideLeft}
        aria-hidden="true"
      />
      <div
        id="slider"
        className="flex h-18 m-2 overflow-hidden whitespace-nowrap scroll-smooth"
      >
        <div>
          <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
            All
          </button>
        </div>
        <Link to={"/results?search_query=Games"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Games
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Music"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Music
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Live"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Live
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Comedy"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Comedy
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Movies"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Movies
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Gadgets"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Gadgets
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=News"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              News
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Musicals"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Musicals
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Trending"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Trending
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Raftaar"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Raftaar
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Drama"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Drama
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Yo+Yo+Honey+Singh"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Yo Yo Honey Singh
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Theater"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Theater
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Cinema"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Cinema
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Reality+Shows"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Reality Shows
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Accounting"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Accounting
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Motivation"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Motivation
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Hip-Hop"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Hip-Hop
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Laptops"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Laptops
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Technology"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Technology
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=New+to+you"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              New to you
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Tailwindcss"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Tailwindcss
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Recently+uploaded"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Recently uploaded
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Leatures"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Leatures
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Random+Things"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Random Things
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Javascript"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Javascript
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Bella"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Bella
            </button>
          </div>
        </Link>
        <Link to={"/results?search_query=Top+50"}>
          <div>
            <button className="bg-slate-100 dark:bg-zinc-500 rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3">
              Top 50
            </button>
          </div>
        </Link>
      </div>
      <MdChevronRight
        className="hover:scale-150 my-auto opacity-50 "
        size={30}
        onClick={slideRight}
        aria-hidden="true"
      />
    </div>
  );
};

export default ButtonList;

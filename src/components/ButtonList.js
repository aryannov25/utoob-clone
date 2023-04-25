import React from "react";
import Button from "./Button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const ButtonList = () => {
  const buttonlist = [
    "All",
    "Games",
    "Music",
    "Live",
    "Comedy",
    "Movies",
    "Gadgets",
    "News",
    "Musicals",
    "Trending",
    "Raftaar",
    "Drama",
    "Yo Yo Honey Singh",
    "Theater",
    "Cinema",
    "Reality Shows",
    "Accounting",
    "Motivation",
    "Hip-Hop",
    "Laptops",
    "Technology",
    "New to you",
    "Tailwindcss",
    "Recently uploaded",
    "Leatures",
    "Random Things",
    "Javascript",
    "Bella",
    "Top 50",
  ];

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="grid grid-flow-col ">
      <MdChevronLeft
        class="hover:scale-150 my-auto opacity-50 "
        size={30}
        onClick={slideLeft}
        aria-hidden="true"
      />
      <div
        id="slider"
        className="flex h-18 m-2 overflow-hidden whitespace-nowrap"
      >
        {buttonlist.map((name) => (
          <Button name={name} />
        ))}
      </div>
      <MdChevronRight
        class="hover:scale-150 my-auto opacity-50 "
        size={30}
        onClick={slideRight}
        aria-hidden="true"
      />
    </div>
  );
};

export default ButtonList;

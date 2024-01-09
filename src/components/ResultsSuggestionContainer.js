import React from "react";
import { FaSearch } from "react-icons/fa";

const ResultsSuggestionContainer = ({ suggestion }) => {
  if (!suggestion) return null;
  // console.log(suggestion)
  return (
    <a href={`/results?search_query=${suggestion}`}>
      <div className="dark:bg-zinc-900">
        <p
          className="p-1 px-2 hover:bg-gray-700 
             cursor-pointer"
        >
          <FaSearch className="inline mr-2 font-thin text-sm text-gray-600" />
          {suggestion}
        </p>
      </div>
    </a>
  );
};

export default ResultsSuggestionContainer;

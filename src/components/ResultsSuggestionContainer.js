import React from "react";
import { FaSearch } from "react-icons/fa";

const ResultsSuggestionContainer = ({ suggestion }) => {
  if (!suggestion) return null;
  return (
    <div>
      <a href={`/results?search_query=${suggestion}`}>
        <p
          className="p-1 px-2 hover:bg-gray-300 
             cursor-pointer"
        >
          <FaSearch className="inline mr-2 font-thin text-sm text-gray-600" />
          {suggestion}
        </p>
      </a>
    </div>
  );
};

export default ResultsSuggestionContainer;

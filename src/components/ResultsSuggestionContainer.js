import React from "react";
import { FaSearch } from "react-icons/fa";

const ResultsSuggestionContainer = ({ suggestion, handleClickAway }) => {
  if (!suggestion) return null;

  return (
    <a
      href={`/results?search_query=${suggestion}`}
      onClick={() => handleClickAway()}
    >
      <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#272727] cursor-pointer transition-colors">
        <FaSearch className="flex-shrink-0 text-[#aaaaaa] text-sm" />
        <span className="text-[#f1f1f1] text-sm">{suggestion}</span>
      </div>
    </a>
  );
};

export default ResultsSuggestionContainer;

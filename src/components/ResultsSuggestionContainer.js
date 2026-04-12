import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResultsSuggestionContainer = ({ suggestion, handleClickAway }) => {
  if (!suggestion) return null;

  return (
    <li role="option" aria-selected="false">
      <Link
        to={`/results?search_query=${encodeURIComponent(suggestion)}`}
        onClick={handleClickAway}
        className="block"
      >
        <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#272727] cursor-pointer transition-colors">
          <FaSearch className="flex-shrink-0 text-[#aaaaaa] text-sm" aria-hidden="true" />
          <span className="text-[#f1f1f1] text-sm">{suggestion}</span>
        </div>
      </Link>
    </li>
  );
};

export default React.memo(ResultsSuggestionContainer);

import React from "react";
import { Link } from "react-router-dom";

const ResultCard = ({ data }) => {
  if (!data) return null;
  // console.log(data)

  const { snippet, id } = data;
  return (
    <Link to={`/watch?v=${id.videoId}`}>
      <div className="flex scroll-smooth m-1 mt-4 justify-around my-2 p-2 rounded-lg shadow-xl transition duration-400 ease-in-out hover:scale-[1.02] hover:shadow-slate-400">
        <img
          className="h-44 w-96 shadow-lg rounded-lg"
          src={snippet?.thumbnails?.medium?.url}
          alt={snippet?.title}
        />
        <div className="w-2/3 mx-4 ">
          <p className="text-xl font-bold mb-2 ">{snippet?.title}</p>
          <p className="text-md font-bold mb-2">{snippet?.channelTitle}</p>
          <p className="text-sm ">{snippet?.description}</p>
          {/* <p className="text-sm ">{statistics.viewCount} views</p> */}
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;

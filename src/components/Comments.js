import React from "react";

const Comments = ({ authorDisplayName, textDisplay }) => {
  return (
    <div className="m-5 p-2">
      <h1 className="font-extrabold ">Comments</h1>
      <div>
        <h2>{authorDisplayName}</h2>
      </div>
      <h3 className="">{textDisplay}</h3>
    </div>
  );
};

export default Comments;

import React from "react";

const Comments = ({ name, text }) => {
  return (
    <div className="m-5 p-2">
      <h1 className="font-extrabold ">Comments</h1>
      <div>
        <h2>{name}</h2>
      </div>
      <h3 className="">{text}</h3>
    </div>
  );
};

export default Comments;

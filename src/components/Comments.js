import React from "react";

const Comments = ({ name, text, imglink }) => {
    // console.log(imglink)
  return (
    <div className="m-5 p-2">
      <div className="flex">
        <img className="rounded-full" src={imglink} />
        <h2>{name}</h2>
      </div>
      <h3 className="">{text}</h3>
    </div>
  );
};

export default Comments;

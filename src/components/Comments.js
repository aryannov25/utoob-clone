import React from "react";

const Comments = ({ name, text, imglink }) => {
  // console.log(imglink)
  return (
    <div className="m-5 p-2">
      <div className="flex">
        <img className="rounded-full" src={imglink} />
        <div className="px-3">
          <h2 className="font-bold">{name}</h2>
          <h3 className="">{text}</h3>
        </div>
      </div>
    </div>
  );
};

export default Comments;

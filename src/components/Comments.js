import React from "react";

const Comments = ({ name, text, imglink }) => {
  // console.log(imglink)
  return (
    <div className="m-5 p-2 shadow-md rounded-lg">
      <div className="flex">
        <div>
          <img className="rounded-full" alt="img" src={imglink} />
        </div>
        <div className="px-3">
          <h2 className="font-bold">{name}</h2>
          <h3 className="">{text}</h3>
        </div>
      </div>
    </div>
  );
};

export default Comments;

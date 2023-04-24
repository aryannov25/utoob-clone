import React from "react";

const Button = ({name}) => {
  return (
    <div>
      <button className="bg-slate-100  rounded-full font-normal m-3 py-1 px-3" >{name}</button>
    </div>
  );
};

export default Button;

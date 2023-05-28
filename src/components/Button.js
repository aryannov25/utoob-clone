import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button className="bg-white rounded-full shadow-md hover:scale-110 inline-block font-normal m-2 py-1 px-3 ">
        {name}
      </button>
    </div>
  );
};

export default Button;

import React from "react";
import Logo from "../img/logo.png";

function Head() {
  return (
    <div>
      <div>
        <img
          alt="menu"
          src="https://www.svgrepo.com/show/312300/hamburger-menu.svg"
        />
        <img alt="logo" src={Logo} />
      </div>
      <div>
        <input type="text" />
        <button>Search</button>
      </div>
      <div>
        <img
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
}

export default Head;

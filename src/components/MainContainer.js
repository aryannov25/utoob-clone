import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;

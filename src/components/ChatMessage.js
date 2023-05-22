import React from "react";

const ChatMessage = ({ name, message, profile }) => {
  return (
    <div className="flex items-center p-2 shadow-md rounded-md">
      <img className="h-8 rounded-full " alt="user icon" src={profile} />
      <span className="font-bold px-2">{name}</span>
      <span>{message}</span>
    </div>
  );
};

export default ChatMessage;

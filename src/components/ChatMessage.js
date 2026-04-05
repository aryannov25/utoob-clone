import React from "react";

const ChatMessage = ({ name, message, profile }) => {
  return (
    <div className="flex items-start gap-2 py-1.5">
      <img
        className="w-7 h-7 rounded-full flex-shrink-0 object-cover"
        alt={name}
        src={profile}
      />
      <div className="flex flex-wrap items-baseline gap-1.5 min-w-0">
        <span className="text-[#3ea6ff] text-xs font-bold flex-shrink-0">
          {name}
        </span>
        <span className="text-[#f1f1f1] text-xs break-words">{message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;

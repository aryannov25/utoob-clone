import React from "react";

const ChatMessage = ({ name, message, profile }) => {
  return (
    <div className="flex items-start gap-2 py-1 px-1 rounded-lg hover:bg-white/5 transition-colors">
      <img
        className="w-7 h-7 rounded-full flex-shrink-0 object-cover ring-1 ring-white/10"
        alt={name}
        src={profile}
        referrerPolicy="no-referrer"
      />
      <div className="flex flex-wrap items-baseline gap-1.5 min-w-0">
        <span className="text-[#ff5d7a] text-xs font-bold flex-shrink-0">
          {name}
        </span>
        <span className="text-[#e5e5e7] text-xs break-words">{message}</span>
      </div>
    </div>
  );
};

export default React.memo(ChatMessage);

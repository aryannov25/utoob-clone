import React from "react";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  return (
    <div>
      <div className="w-full h-[600px] p-2 border border-black bg-slate-100 rounded-lg space-y-1">
        <h1 className="font-bold border-b-2 border-black">Live Chat</h1>
        <ChatMessage name="Aryan" message="aryqanahsapdajsldasdil" />
        <ChatMessage name="Aryan" message="aryqanahsapdajsldasdil" />
        <ChatMessage name="Aryan" message="aryqanahsapdajsldasdil" />
        <ChatMessage name="Aryan" message="aryqanahsapdajsldasdil" />
        <ChatMessage name="Aryan" message="aryqanahsapdajsldasdil" />
      </div>
    </div>
  );
};

export default LiveChat;

import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  useEffect(() => {
    const i = setInterval(() => {
      //   console.log("abc");
    }, 2000);
    return () => clearInterval(i);
  }, []);
  return (
    <div>
      <div className="w-full h-[600px] p-2 border border-black bg-slate-100 rounded-lg space-y-1">
        <h1 className="font-bold border-b-2 border-black">Live Chat</h1>
        <ChatMessage name="Aryan" message="aryqanahsapdajsldasdil" />
      </div>
    </div>
  );
};

export default LiveChat;

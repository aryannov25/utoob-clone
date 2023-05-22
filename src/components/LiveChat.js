import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generate } from "../utils/generateName";


const LiveChat = () => {
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      //   console.log("abc");
      dispatch(
        addMessage({
          name: generate(),
          message: "abcasdbkasjdbkasd",
        })
      );
    }, 2000);
    return () => clearInterval(i);
  }, []);
  return (
    <div>
      <div className="w-full h-[600px] p-2 border border-black bg-slate-100 rounded-lg space-y-1 overflow-y-scroll">
        <h1 className="font-bold border-b-2 border-black">Live Chat</h1>
        {chatMessages.map((c, i) => (
          <ChatMessage key={i} name={c.name} message={c.message} />
        ))}{" "}
      </div>
    </div>
  );
};

export default LiveChat;

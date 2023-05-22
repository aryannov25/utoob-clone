import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generate } from "../utils/generateName";
import { generateMessage } from "./../utils/generateMessage";
import { generateProfileImage } from "./../utils/generateProfileImages";

const LiveChat = () => {
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      //   console.log("abc");
      dispatch(
        addMessage({
          name: generate(),
          message: generateMessage(),
          profile: generateProfileImage(),
        })
      );
    }, 2000);
    return () => clearInterval(i);
  }, []);
  return (
    <div>
      <div className="w-full border h-[600px] border-black bg-slate-100 rounded-lg ">
        <h1 className="font-bold border-b-2 border-black p-2">Live Chat</h1>
        <div className="space-y-2 overflow-y-scroll p-2 flex flex-col-reverse h-[550px]  ">
          {chatMessages.map((c, i) => (
            <ChatMessage
              key={i}
              name={c.name}
              message={c.message}
              profile={c.profile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveChat;

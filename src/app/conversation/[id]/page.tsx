"use client";

import RenderTree from "@/components/Tree/Tree";

import useChat from "@/hooks/useChat";
import { setActiveConversation } from "@/redux/conversation/conversation.slice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
const querytw = "text-3xl text-[#A2BCE4] font-semibold";
const responsetw = "text-lg font-light text-[#E8E8E6]";

const Page = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const { activeConversation } = useChat();
  useEffect(() => {
    dispatch(setActiveConversation(params.id));
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center py-5">
      <div className="flex flex-col w-3/4 gap-3">
        {activeConversation?.chats.map((chat, idx) => {
          return (
            <div
              key={idx + chat.order}
              className={chat.role === "RAG" ? responsetw : querytw}
            >
              {chat.message}
            </div>
          );
        })}
      </div>
      <div className="w-3/4 h-[10rem] border">
        <RenderTree />
      </div>
    </div>
  );
};

export default Page;

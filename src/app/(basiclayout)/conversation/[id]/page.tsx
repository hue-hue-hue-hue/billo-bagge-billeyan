"use client";

import ChatInput from "@/components/chat/chatInput";
import TreeContainer from "@/components/Tree/TreeContainer";

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
    <div className="relative h-screen flex flex-col items-center justify-between py-5 w-full">
      <div className="flex flex-col h-full overflow-y-scroll gap-3 w-3/4">
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
        <div>
          <TreeContainer />
        </div>
      </div>
      <div className="w-3/4">
        <ChatInput />
      </div>
    </div>
  );
};

export default Page;

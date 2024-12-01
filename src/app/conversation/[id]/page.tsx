"use client";
import ChatInput from "@/components/chat/chatInput";
import FlowDiagram from "@/components/chat/trying";
import useChat from "@/hooks/useChat";
import { setActiveConversation } from "@/redux/conversation/conversation.slice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";

const querytw = "text-3xl text-[#A2BCE4] font-semibold";
const responsetw = "text-lg font-light text-[#E8E8E6]";

const Page = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const { activeConversation, activeConversationId } = useChat();
  useEffect(() => {
    dispatch(setActiveConversation(params.id));
  }, []);
  console.log("Active Conversation id >>>>>>> ", activeConversationId);
  console.log("Active Conversation >>>>> ", activeConversation);

  return (
    <div className="relative w-full h-screen flex flex-col items-center py-5">
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
      <div className="absolute w-3/4 bottom-10">
        <ChatInput />
      </div>
    </div>
  );
};

export default Page;

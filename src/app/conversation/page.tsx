"use client";
import ChatInput from "@/components/chat/chatInput";

const ChatPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-5">
      <h1 className="text-4xl text-[#ABC3FF]"> What can I dig up?</h1>
      <div className="w-[32rem]">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;

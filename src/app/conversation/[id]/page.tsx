"use client";
import ChatInput from "@/components/chat/chatInput";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="relative w-full flex flex-col items-center">
      {params.id.length}
      <div className="absolute w-3/4 bottom-10">
        <ChatInput />
      </div>
    </div>
  );
};

export default Page;

"use client";

import Image from "next/image";
import UPARRSVG from "@/assets/icons/uparr.svg";
import { useState } from "react";
import { createChat } from "@/utils/apiFunctions";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/zustand/chat";

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { addSidebarChat } = useChatStore();
  const [prompt, setPrompt] = useState("");

  const handleSend = async () => {
    if (!prompt.trim()) return;
    console.log("Sending prompt: ", prompt);
    const response = await createChat(prompt);
    console.log("Response: ", response.data);
    addSidebarChat(response.data);
    router.push(`/chat/${response.data.id}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full gap-5">
      <h1 className="text-4xl text-[#ABC3FF]"> What can I dig up?</h1>
      <div className="w-[32rem]">
        <div className="flex flex-col bg-[#141415] border border-[#313131] p-4 rounded-lg shadow-lg w-full mx-auto">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Write your prompt..."
            className="relative flex items-center bg-transparent rounded-lg outline-none resize-none min-h-[40px] max-h-[200px]"
          />

          <div className="flex items-center justify-end mt-2">
            <button
              onClick={handleSend}
              disabled={!prompt.trim()}
              className="border border-[#313131] rounded-lg p-[9px] hover:border-[#5b5b5b] text-[#5b5b5b] transition-all"
            >
              <Image src={UPARRSVG} alt="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

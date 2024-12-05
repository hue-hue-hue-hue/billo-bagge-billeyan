import { useState } from "react";

import UPARRSVG from "@/assets/icons/uparr.svg";
import Image from "next/image";
import useChat from "@/hooks/useChat";

const ChatInput: React.FC = () => {
  const { sendMessage } = useChat();
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (!prompt.trim()) return;
    sendMessage(prompt);
    setPrompt("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col bg-[#141415] border border-[#313131] p-4 rounded-lg shadow-lg w-full mx-auto">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={handleKeyPress}
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
  );
};

export default ChatInput;

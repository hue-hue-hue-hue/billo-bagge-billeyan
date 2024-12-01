import { usePrompt } from "@/hooks/usePrompt";
import { useRef } from "react";
import ATTACHSVG from "@/assets/icons/attachment.svg";
import UPARRSVG from "@/assets/icons/uparr.svg";
import Image from "next/image";

const ChatInput: React.FC = () => {
  const { prompt, attachments, updatePrompt, uploadFile, deleteAttachment } =
    usePrompt();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => uploadFile(file));
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleSend = () => {
    if (!prompt.trim()) return;
    console.log("Prompt sent:", prompt);
    console.log("Attached files:", attachments);
    updatePrompt("");
  };

  return (
    <div className="flex flex-col bg-[#141415] border border-[#313131] p-4 rounded-lg shadow-lg w-full mx-auto">
      <div className="mb-2">
        {attachments.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between bg-gray-200 px-3 py-1 mb-1 rounded"
          >
            <span className="text-sm truncate">{file.name}</span>
            <button
              onClick={() => deleteAttachment(file.id)}
              className="text-red-500 text-xs hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <textarea
        value={prompt}
        onChange={(e) => updatePrompt(e.target.value)}
        placeholder="Write your prompt..."
        className="relative flex items-center bg-transparent rounded-lg outline-none resize-none"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="border border-[#313131] rounded-lg p-2"
        >
          <Image src={ATTACHSVG} alt="attach" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleSend}
          className="border border-[#313131] rounded-lg p-[9px] hover:border-[#5b5b5b] text-[#5b5b5b] transition-all"
        >
          <Image src={UPARRSVG} alt="enter" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

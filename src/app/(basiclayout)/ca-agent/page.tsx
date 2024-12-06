"use client";
import { useState } from "react";

const CAAgent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className=" p-4 flex flex-col gap-8">
        <h1 className="text-4xl">Maximize Your Tax Savings</h1>
        <div className="border rounded-lg flex flex-col p-8 gap-5">
          <h1>Upload Document</h1>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            max={1}
            accept=".pdf,.doc,.docx,.md"
          />
          <input
            type="text"
            placeholder="Prompt"
            className="decoration-none outline-none bg-black text-white/70 p-3 border rounded-xl"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CAAgent;

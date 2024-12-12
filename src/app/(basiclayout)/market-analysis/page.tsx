"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const MacroAgent = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setMessage("Please enter a prompt for analysis.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Create FormData to send file and prompt
      const formData = new FormData();
      formData.append("query", prompt);

      // Send request to backend
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL123 || "http://127.0.0.1:8230"
        }/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle successful response
      console.log(response.data);
      setMessage(response.data.message || "Analysis complete");

      // Navigate to results page if conversation ID is returned
      if (response.data.conversation_id) {
        router.push(`/market-analysis/${response.data.conversation_id}`);
      }
    } catch (error) {
      console.error("Error submitting document:", error);
      setMessage("Failed to analyze the document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="p-4 flex flex-col gap-8 w-full max-w-md">
        <h1 className="text-4xl text-center">Analyse market trends </h1>
        <div className="border rounded-lg flex flex-col p-8 gap-5">
          <h2 className="text-xl font-semibold text-center">Type your query</h2>

          <textarea
            placeholder="Enter your query here..."
            className="w-full p-3 border rounded-xl mb-4 min-h-[100px] resize-y text-black outline-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#141415] text-white rounded-lg border border-white/20  transition-colors"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Market"}
          </button>

          {message && (
            <p
              className={`text-sm text-center mt-4 ${
                message.includes("Failed") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MacroAgent;

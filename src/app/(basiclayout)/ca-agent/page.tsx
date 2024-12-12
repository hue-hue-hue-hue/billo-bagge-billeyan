"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CAAgent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // Validate inputs
    if (!file) {
      setMessage("Please select a document to analyze.");
      return;
    }

    if (!prompt.trim()) {
      setMessage("Please enter a prompt for analysis.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Create FormData to send file and prompt
      const formData = new FormData();
      formData.append("file", file);
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
        router.push(`/ca-agent/${response.data.conversation_id}`);
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
        <h1 className="text-4xl text-center">Maximize Your Tax Savings</h1>
        <div className="border rounded-lg flex flex-col p-8 gap-5">
          <h2 className="text-xl font-semibold">Upload Document</h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx,.md"
            className="mb-4"
          />

          <textarea
            placeholder="Enter your tax-related prompt (e.g., 'Identify potential tax deductions')"
            className="w-full p-3 border rounded-xl mb-4 min-h-[100px] resize-y text-black"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Document"}
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

export default CAAgent;

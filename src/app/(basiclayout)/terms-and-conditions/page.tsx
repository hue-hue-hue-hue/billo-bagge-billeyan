"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const TermsAndConditions = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file before uploading.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file); 

      const response = await axios.post(
        `${"http://127.0.0.1:8230"}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      console.log(response.data);
      setMessage(response.data.message);
      router.push(`/terms-and-conditions/${response.data.conversation_id}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="p-4 flex flex-col gap-8">
        <h1 className="text-4xl">Analyse TnC</h1>
        <div className="border rounded-lg flex flex-col p-8 gap-5">
          <h1>Upload Document</h1>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx,.md"
          />
          <button
            onClick={handleFileUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
          {message && <p className="text-sm text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

import React, { useState } from "react";
import axios from "axios";

const MergerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyALegalDocuments: [] as File[],
    companyBLegalDocuments: [] as File[],
    companyAFinancialStatements: [] as File[],
    companyBFinancialStatements: [] as File[],
    specificRequirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileChange = (
    field: keyof typeof formData,
    files: FileList | null
  ) => {
    if (!files) return;
    const fileArray = Array.from(files).slice(0, 10); // Limit to 10 files
    setFormData((prev) => ({ ...prev, [field]: fileArray }));
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      formData.companyALegalDocuments.forEach((file) =>
        payload.append("companyALegalDocuments", file)
      );
      formData.companyBLegalDocuments.forEach((file) =>
        payload.append("companyBLegalDocuments", file)
      );
      formData.companyAFinancialStatements.forEach((file) =>
        payload.append("companyAFinancialStatements", file)
      );
      formData.companyBFinancialStatements.forEach((file) =>
        payload.append("companyBFinancialStatements", file)
      );
      payload.append("specificRequirements", formData.specificRequirements);

      const response = await axios.post("/api/merger", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPdfUrl(response.data.pdfUrl); // Assume response contains the PDF URL
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-neutral-900 text-white rounded-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Upload Documents and Specify Requirements
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          {
            label: "Company A Legal Documents",
            field: "companyALegalDocuments",
          },
          {
            label: "Company B Legal Documents",
            field: "companyBLegalDocuments",
          },
          {
            label: "Company A Financial Statements",
            field: "companyAFinancialStatements",
          },
          {
            label: "Company B Financial Statements",
            field: "companyBFinancialStatements",
          },
        ].map(({ label, field }) => (
          <div key={field}>
            <label className="block mb-2">{label} (Max 10 files)*</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={(e) =>
                handleFileChange(field as keyof typeof formData, e.target.files)
              }
              className="block w-full text-sm file:bg-purple-600 file:text-white file:py-2 file:px-4 file:border-none rounded"
            />
            {formData[field as keyof typeof formData].length > 0 && (
              <div className="mt-2 text-sm text-gray-400">
                {formData[field as keyof typeof formData].length} file(s)
                selected.
              </div>
            )}
          </div>
        ))}

        <div>
          <label className="block mb-2">
            Specific Requirements or Concerns
          </label>
          <textarea
            value={formData.specificRequirements}
            onChange={(e) =>
              handleInputChange("specificRequirements", e.target.value)
            }
            className="w-full p-2 rounded bg-neutral-800 text-white"
            placeholder="Enter specific requirements, concerns, or considerations..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-semibold"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {pdfUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">Download Generated PDF:</h2>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 underline"
          >
            View PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default MergerForm;

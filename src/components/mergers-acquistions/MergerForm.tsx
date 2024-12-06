import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const MergerForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyAName: "",
    companyBName: "",
    companyALegalDocuments: [] as File[],
    companyBLegalDocuments: [] as File[],
    companyAFinancialStatements: [] as File[],
    companyBFinancialStatements: [] as File[],
    specificRequirements: "",
  });

  const [objectId, setObjectId] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pollingStatus, setPollingStatus] = useState<
    "idle" | "polling" | "completed"
  >("idle");

  const handleFileChange = (
    field: keyof typeof formData,
    files: FileList | null
  ) => {
    if (!files) return;
    const fileArray = Array.from(files).slice(0, 10); 
    setFormData((prev) => ({ ...prev, [field]: fileArray }));
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDocumentData(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append("company1", formData.companyAName);
      formDataObj.append("company2", formData.companyBName);

      formData.companyALegalDocuments.forEach((file) => {
        formDataObj.append("files", file);
      });
      formData.companyBLegalDocuments.forEach((file) => {
        formDataObj.append("files", file);
      });
      formData.companyAFinancialStatements.forEach((file) => {
        formDataObj.append("files", file);
      });
      formData.companyBFinancialStatements.forEach((file) => {
        formDataObj.append("files", file);
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MA_AGENT_URL}/submit`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.conversation_id);
      setObjectId(response.data.conversation_id);
      router.push(`/mergers-acquisitions/${response.data.conversation_id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-neutral-900 text-white rounded-lg max-w-3xl">
      {}
      <h1 className="text-2xl font-semibold mb-4">
        Merger & Acquisition Document Generation
      </h1>

      {!objectId ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Company A Name</label>
            <input
              type="text"
              value={formData.companyAName}
              onChange={(e) =>
                handleInputChange("companyAName", e.target.value)
              }
              className="w-full p-2 rounded bg-neutral-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Company B Name</label>
            <input
              type="text"
              value={formData.companyBName}
              onChange={(e) =>
                handleInputChange("companyBName", e.target.value)
              }
              className="w-full p-2 rounded bg-neutral-800 text-white"
              required
            />
          </div>

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
                accept=".pdf,.doc,.docx,.md"
                multiple
                onChange={(e) =>
                  handleFileChange(
                    field as keyof typeof formData,
                    e.target.files
                  )
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
      ) : (
        <div>
          {pollingStatus === "polling" && (
            <div className="text-center">
              <p>Processing documents...</p>
              <div className="animate-spin">🔄</div>
            </div>
          )}

          {pollingStatus === "completed" && documentData && (
            <div>
              <h2 className="text-xl font-bold mb-4">Generated Documents</h2>

              {Object.entries(documentData)
                .filter(
                  ([key]) => key !== "conversation_id" && key !== "insights"
                )
                .map(([docType, content]) => (
                  <div key={docType} className="mb-4">
                    <h3 className="font-semibold">{docType}</h3>
                    <pre className="bg-neutral-800 p-3 rounded overflow-x-auto text-sm">
                      {content as string}
                    </pre>
                  </div>
                ))}

              {documentData.insights && (
                <div className="mt-4">
                  <h3 className="font-semibold">Insights</h3>
                  <pre className="bg-neutral-800 p-3 rounded text-sm">
                    {JSON.stringify(documentData.insights, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MergerForm;

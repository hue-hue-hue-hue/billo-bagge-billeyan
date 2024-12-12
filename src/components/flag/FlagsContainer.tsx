import { useState } from "react";
import { FlagCard } from "./FlagCard";
import { Flag } from "lucide-react";
import { FlagAgentEvaluations } from "@prisma/client";

const FlagContainer = ({ flags }: { flags: FlagAgentEvaluations[] }) => {
  const [selectedFlags, setSelectedFlags] = useState<string[]>([
    "caution",
    "safe",
  ]);

  const toggleFlag = (flag: "safe" | "risk") => {
    setSelectedFlags((prev) =>
      prev && prev.includes(flag)
        ? prev.filter((f) => f !== flag)
        : prev
        ? [...prev, flag]
        : [flag]
    );
  };

  const filteredData = flags.filter((item) => {
    const type = item.isMet > 4 ? "safe" : "risk";
    return selectedFlags.includes(type);
  });

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-between h-screen">
      <div className="flex mb-6 px-4 my-2 pt-2 pb-3 border-b-2">
        <button
          className={`px-4 py-2 text-lg flex items-center gap-3 w-1/2 font-medium border-2 rounded-l-lg
${
  selectedFlags.includes("safe")
    ? "bg-[#0A4A2C] text-[#E6F4ED] border-[#165B3D] hover:bg-[#165B3D]"
    : " text-gray-500 hover:bg-[#0A4A2C]"
} transition-all`}
          onClick={() => toggleFlag("safe")}
        >
          <Flag />
          Safe Flag
        </button>
        <button
          className={`px-4 py-2 text-lg flex items-center gap-3 w-1/2 font-medium border-2 rounded-r-lg
            ${
              selectedFlags.includes("risk")
                ? "bg-[#3C1618] text-[#FF6166] border-[#561A1E] hover:bg-[#561A1E]"
                : "text-gray-500 hover:bg-[#3C1618]"
            } transition-all`}
          onClick={() => toggleFlag("risk")}
        >
          <Flag />
          Critical Risk Flag
        </button>
      </div>

      <div className="h-full overflow-y-scroll px-4">
        {filteredData.map((flag, idx) => (
          <FlagCard
            key={flag.id}
            type={flag.isMet > 4 ? "safe" : "risk"}
            title={""}
            fault={flag.item}
            description={flag.explanation}
            order={idx + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default FlagContainer;

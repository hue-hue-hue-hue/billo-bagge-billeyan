import { dummyFlags } from "@/utils/dummy";
import { useState } from "react";
import { FlagCard } from "./FlagCard";
import { Flag } from "lucide-react";

const FlagContainer: React.FC = () => {
  const [selectedFlags, setSelectedFlags] = useState<string[]>([
    "caution",
    "risk",
  ]);

  const toggleFlag = (flag: "caution" | "risk") => {
    setSelectedFlags((prev) =>
      prev && prev.includes(flag)
        ? prev.filter((f) => f !== flag)
        : prev
        ? [...prev, flag]
        : [flag]
    );
  };

  const filteredData = dummyFlags.filter((item) =>
    selectedFlags ? selectedFlags.includes(item.type) : true
  );

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-between h-screen">
      <div className="flex mb-6 px-4 my-2 pt-2 pb-3 border-b-2">
        <button
          className={`px-4 py-2 text-lg flex items-center gap-3 w-1/2 font-medium border-2 rounded-l-lg
            ${
              selectedFlags.includes("caution")
                ? "bg-[#331B00] text-[#F2A20D] border-[#4D2A00] hover:bg-[#4D2A00]"
                : " text-gray-500 hover:bg-[#331B00]"
            } transition-all`}
          onClick={() => toggleFlag("caution")}
        >
          <Flag />
          Cautionary Flag
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
        {filteredData.map((flag) => (
          <FlagCard key={flag.order} {...flag} />
        ))}
      </div>
    </div>
  );
};

export default FlagContainer;

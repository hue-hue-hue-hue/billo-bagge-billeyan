import { InsightDetails } from "@/utils/types";
import React from "react";

const InsightsSections = ({ insights }: { insights: InsightDetails[] }) => {
  const renderInsightItems = (items: string[] | undefined) => {
    if (!items || items.length === 0) return null;

    return (
      <ul className="list-disc pl-5 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm">
            {item}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      {insights.map((insight, idx) => (
        <div key={insight.type}>
          <div className="flex gap-3 border-[#313131]">
            <span className="border-2 h-fit px-2 rounded-sm border-[#313131]">
              {idx + 1}
            </span>
            <h1 className="font-semibold">{insight.type}</h1>
          </div>
          <p className="text-[#E8E8E6] font-thin font-sans">
            {insight.description}
          </p>
          <div className="grid grid-cols-2 grid-rows-1 gap-5 py-3">
            {Object.entries(insight)
              .filter(([key]) => !["type", "description"].includes(key))
              .map(([key, value]) => (
                <div
                  key={key}
                  className="mb-3 border border-[#37373A] rounded-lg p-4 space-y-5"
                >
                  <h4 className="font-semibold text-sm mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </h4>
                  {renderInsightItems(value as string[])}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsightsSections;

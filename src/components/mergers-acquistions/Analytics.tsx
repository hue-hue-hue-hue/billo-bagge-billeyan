import React from "react";

const AnalyticsCard = ({
  color,
  name,
  value,
}: {
  color: string;
  name: string;
  value: number;
}) => {
  return (
    <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">{name}</h3>
          <div className="text-4xl font-bold text-white">{value}/5</div>
        </div>
        <div className="h-4 rounded-full bg-gray-700 mt-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300`}
            style={{
              width: `${(value / 5) * 100}%`,
              backgroundColor: color,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;

/**
 * <div className="flex flex-wrap">
              <AnalyticsCard
                color="#fbbf24"
                name="Accountability & Oversight"
                value={1.5}
              />
              <AnalyticsCard
                color="#34d399"
                name="Accountability & Oversight"
                value={0.5}
              />
              <AnalyticsCard
                color="#3b82f6"
                name="Accountability & Oversight"
                value={3.5}
              />
              <AnalyticsCard
                color="#a855f7"
                name="Accountability & Oversight"
                value={4.5}
              />
            </div>
 */

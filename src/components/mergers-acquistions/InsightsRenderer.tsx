import { MergerAcquisitionInsights } from "@prisma/client";
import { formatString } from "@/utils/helpers";
const InsightsRenderer = ({
  insightData,
}: {
  insightData: MergerAcquisitionInsights;
}) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* <h1 className="text-2xl font-semibold py-2">{insightData.title}</h1> */}

      <div className="flex flex-wrap gap-8 justify-center">
        {Object.entries(insightData).map(([key, value]) => {
          return (
            <div
              key={key}
              className="flex flex-col w-2/5 font-sans border p-2 border-gray-600 rounded-xl"
            >
              <h1 className="text-3xl mb-2 w-full text-center">
                {formatString(key)}
              </h1>
              <p className="font-extralight">{value}</p>
            </div>
          );
        })}
      </div>
      {/* <p className="text-lg text-[#E8E8E6] font-extralight">
        {insightData.summary}
      </p>
      <div>yaha analytics aayenge</div>
      <div>
        <InsightsSections insights={insightData.insights} />
      </div>
      <div>
        <h1 className="text-red-500 text-xl">Recommended Actions</h1>
        <ul className="list-disc pl-5 space-y-2">
          {insightData.recommendedActions.map((action, idx) => (
            <li key={idx} className="text-sm">
              {action}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default InsightsRenderer;

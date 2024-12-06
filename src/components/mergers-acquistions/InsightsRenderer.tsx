import { InsigtsAnalysis } from "@/utils/types";
import AnswerSVG from "@/assets/icons/chat.svg";
import Image from "next/image";
import InsightsSections from "./InsightsSections";
const InsightsRenderer = ({
  insightData,
}: {
  insightData: InsigtsAnalysis;
}) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <h1 className="text-2xl font-semibold py-2">{insightData.title}</h1>
      <h1 className="flex items-center gap-2">
        <Image src={AnswerSVG} alt="answer" />
        <p>Answer</p>
      </h1>
      <p className="text-lg text-[#E8E8E6] font-extralight">
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
      </div>
    </div>
  );
};

export default InsightsRenderer;

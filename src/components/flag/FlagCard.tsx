import { FlagCardProps } from "@/utils/types";
import { Flag } from "lucide-react";

export const FlagCard: React.FC<FlagCardProps> = ({
  type,
  title,
  fault,
  description,
  order,
}) => {
  return (
    <div
      className={`border py-2 px-4 rounded-lg mb-4 flex flex-col gap-3 border-[#313131] bg-[#0F0F10]`}
    >
      <div className="text-lg font-semibold flex items-center justify-between border-b pb-1">
        <div className="flex gap-3 border-[#313131] ">
          <span className="border-2 h-fit px-2 rounded-sm border-[#313131]">
            {order}
          </span>
          <h1>{title}</h1>
        </div>
        <Flag color={type == "caution" ? "#F2A20D" : "#FF6166"} />
      </div>
      <div className="font-extralight">
        <p className={`text-[${type == "caution" ? "#F2A20D" : "#FF6166"}]`}>
          {fault}
        </p>
        <p className="text-sm text-[#A1A1AA]">{description}</p>
      </div>
    </div>
  );
};

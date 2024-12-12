"use client";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useCA } from "@/hooks/useCA";
import { MacroAgent } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const MarketAgentPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<MacroAgent | null>(null);
  const { isConnected, isCompleted } = useCA();

  useEffect(() => {
    if ((isConnected && isCompleted) || !data) {
      console.log(" me request maar raha hu");
      axios
        .get(`/api/macro/${params.id}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching flag data:", error);
        });
    }
  }, [params.id, isCompleted, isConnected]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="h-screen selfce mx-auto w-[80%]">
      <MarkdownRenderer content={data.response} />
    </div>
  );
};

export default MarketAgentPage;

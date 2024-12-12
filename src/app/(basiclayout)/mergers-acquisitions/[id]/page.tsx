"use client";
import ChatInput from "@/components/chat/chatInput";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AnswerSVG from "@/assets/icons/chat.svg";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { formatString, something } from "@/utils/helpers";
import { MergerAcquisition } from "@prisma/client";
import InsightsRenderer from "@/components/mergers-acquistions/InsightsRenderer";
import AnalyticsCard from "@/components/mergers-acquistions/Analytics";
import Image from "next/image";
import { useMA } from "@/hooks/useMA";

const Page = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<MergerAcquisition | null>(null);
  const { isCompleted, isConnected } = useMA();
  useEffect(() => {
    if ((isConnected && isCompleted) || !data) {
      console.log(" me request maar raha hu");
      axios
        .get(`/api/MA/documents/${params.id}`)
        .then((response) => {
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching flag data:", error);
        });
    }
  }, [params.id, isCompleted, isConnected]);
  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen font-sans">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          minSize={30}
          className="flex flex-col justify-between h-screen gap-2 p-5"
          defaultSize={60}
        >
          <h1 className="border-b-2 pb-1 text-lg">Document Analysis</h1>
          <div className="h-full overflow-y-scroll">
            <h1 className="flex items-center gap-2">
              <Image src={AnswerSVG} alt="answer" />
              <p>Answer</p>
            </h1>
            {data && data.metrics && (
              <div className="flex flex-wrap">
                <AnalyticsCard
                  color="#fbbf24"
                  name="Overall Alignment"
                  value={parseFloat(data.metrics.overall_alignment)}
                />
                <AnalyticsCard
                  color="#34d399"
                  name="Accountability & Oversight"
                  value={parseFloat(data.metrics.accountability_oversight)}
                />
                <AnalyticsCard
                  color="#3b82f6"
                  name="Culture & Compatibility"
                  value={parseFloat(data.metrics.cultural_compatibility)}
                />
                <AnalyticsCard
                  color="#a855f7"
                  name="Ethical Standards"
                  value={parseFloat(data.metrics.ethical_standards)}
                />
              </div>
            )}
            <InsightsRenderer insightData={data.insights || {}} />
          </div>
          <ChatInput />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30} defaultSize={35} className="h-full">
          <Tabs
            defaultValue={"samosa"}
            className="w-full flex flex-col p-4 h-full gap-4 max-h-screen"
          >
            <TabsList className="flex flex-wrap gap-2 rounded-none w-full bg-transparent h-fit">
              {Object.entries(data)
                .filter(
                  ([key]) =>
                    key !== "id" &&
                    key !== "conversation_id" &&
                    key !== "insights" &&
                    key !== "metrics"
                )
                .map(([key, value]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="border px-2 rounded-lg border-[#484851] hover:bg-[#18181B] transition-all duration-150 w-40"
                  >
                    {formatString(key)}
                  </TabsTrigger>
                ))}
            </TabsList>
            {Object.entries(data)
              .filter(
                ([key]) =>
                  key !== "id" &&
                  key !== "conversation_id" &&
                  key !== "insights" &&
                  key !== "metrics"
              )
              .map(([key, value]) => (
                <TabsContent
                  key={key}
                  value={key}
                  className="border px-2 rounded-lg border-[#484851] hover:bg-[#18181B] transition-all duration-150 prose text-white w-full h-full overflow-y-scroll"
                >
                  <MarkdownRenderer content={something(value)} />
                </TabsContent>
              ))}
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;

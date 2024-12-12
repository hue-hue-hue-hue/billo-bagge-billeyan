"use client";
import ChatInput from "@/components/chat/chatInput";
import FlagContainer from "@/components/flag/FlagsContainer";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import AnalyticsCard from "@/components/mergers-acquistions/Analytics";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useFlags } from "@/hooks/useFlags";
import { FlagAgent } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
const FlagAnalysis = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<FlagAgent | null>(null);
  const { isConnected, isCompleted } = useFlags();

  useEffect(() => {
    if ((isConnected && isCompleted) || !data) {
      console.log(" me request maar raha hu");
      axios
        .get(`/api/flags/${params.id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching flag data:", error);
        });
    }
  }, [params.id, isCompleted, isConnected]);

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          className="p-4 flex flex-col justify-between"
          defaultSize={65}
        >
          <h1 className="text-xl border-b-2">Terms and Condition Analysis</h1>
          <div className="h-full my-2 py-3 overflow-y-scroll">
            {/* {data && (
              <div className="flex flex-col">
                <p>Category: {data.category}</p>
                <p>Checklist Relevance: {data.checklistRelevance}</p>
                <p>FlagID: {data.flagID}</p>
              </div>
            )} */}

            {data && <MarkdownRenderer content={data.file} />}
          </div>
          <ChatInput />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="h-full">
          {!data && <h1>Loading...</h1>}
          {data && <FlagContainer flags={data.evaluations} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default FlagAnalysis;

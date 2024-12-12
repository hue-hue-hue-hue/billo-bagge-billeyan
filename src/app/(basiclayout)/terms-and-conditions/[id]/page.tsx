"use client";
import ChatInput from "@/components/chat/chatInput";
import FlagContainer from "@/components/flag/FlagsContainer";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useFlags } from "@/hooks/useFlags";
import { FlagAgent } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
const FlagAnalysis = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<FlagAgent | null>(null);
  const { isConnected, isCompleted } = useFlags();

  useEffect(() => {
    if ((isConnected && isCompleted) || !data) {
      console.log(" me request maar raha hu");
      axios
        .get(`/api/flags/${params.id}`)
        .then((response) => {
          console.log(!!response.data.evaluations);
          console.log(response.data);
          if (!!response.data.checklistRelevance) setData(response.data);
          // setData(response.data);
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

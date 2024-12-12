"use client";
import ChatInput from "@/components/chat/chatInput";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCA } from "@/hooks/useCA";
import { CA_agent } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const CAAgentPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<CA_agent | null>(null);
  const { isConnected, isCompleted } = useCA();

  useEffect(() => {
    if ((isConnected && isCompleted) || !data) {
      console.log(" me request maar raha hu");
      axios
        .get(`/api/ca/${params.id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching flag data:", error);
        });
    }
  }, [params.id, isCompleted, isConnected]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          className="p-4 flex flex-col justify-between"
          defaultSize={65}
        >
          <h1 className="text-xl border-b-2">Tax Analysis</h1>
          <div className="h-full my-2 py-3 overflow-y-scroll">
            {/* {data.analysis && (
              <pre>{JSON.stringify(data.analysis, null, 2)}</pre>
            )} */}
            {data && <h1>{data.CAID}</h1>}
          </div>
          <ChatInput />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="h-full">
          {/* {data.document && (
            <object
              data={data.document.url}
              type="application/pdf"
              width="100%"
              height="100%"
            ></object>
          )} */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CAAgentPage;

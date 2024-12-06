"use client";
import ChatInput from "@/components/chat/chatInput";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import axios from "axios";
import { useEffect, useState } from "react";

const CAAgentPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/ca/${params.id}`
        );
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error(
            "Failed to fetch data, establishing WebSocket connection..."
          );
          establishWebSocketConnection();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        establishWebSocketConnection();
      }
    };

    const establishWebSocketConnection = () => {
      const socket = new WebSocket("ws://localhost:8230/ws/check");

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        if (message.result === "OK") {
          console.log("Received OK from WebSocket, fetching data again...");
          fetchData();
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
    };

    fetchData();
  }, [params.id]);

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
            {data.analysis && (
              <pre>{JSON.stringify(data.analysis, null, 2)}</pre>
            )}
          </div>
          <ChatInput />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="h-full">
          {data.document && (
            <object
              data={data.document.url}
              type="application/pdf"
              width="100%"
              height="100%"
            ></object>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CAAgentPage;

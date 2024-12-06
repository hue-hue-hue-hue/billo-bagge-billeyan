"use client";
import ChatInput from "@/components/chat/chatInput";
import FlagContainer from "@/components/flag/FlagsContainer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
const FlagAnalysis = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/flags/${params.id}`
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

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          className="p-4 flex flex-col justify-between"
          defaultSize={65}
        >
          <h1 className="text-xl border-b-2">Terms and Condition Analysis</h1>
          <div className="h-full my-2 py-3 overflow-y-scroll">
            <p>adsfasdfasd</p>
            <div className="prose">
              <Markdown remarkPlugins={[remarkGfm]}>{`markdown`}</Markdown>
            </div>
          </div>
          <ChatInput />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="h-full">
          <FlagContainer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default FlagAnalysis;

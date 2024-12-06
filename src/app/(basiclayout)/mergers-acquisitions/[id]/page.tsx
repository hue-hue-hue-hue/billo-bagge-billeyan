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
import { useEffect, useState } from "react";
import { Documents } from "@/utils/types";
import ReactMarkdown from "react-markdown";

const Page = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<Documents | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/MA/documents/${params.id}`
        );
        if (response.status === 200) {
          console.log(response.data.data);
          console.log(response.data.data.insights);
          setData(response.data.data);
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
    <div className="w-full h-screen font-sans">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          minSize={30}
          className="flex flex-col justify-between h-screen gap-2 p-5"
          defaultSize={60}
        >
          <h1 className="border-b-2 pb-1 text-lg">Document Analysis</h1>
          <div className="h-full overflow-y-scroll">
            {/* <InsightsRenderer insightData={data.insights || {}} /> */}
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
                    key !== "insights"
                )
                .map(([key, value]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="border px-2 rounded-lg border-[#484851] hover:bg-[#18181B] transition-all duration-150 w-40"
                  >
                    {key}
                  </TabsTrigger>
                ))}
            </TabsList>
            {Object.entries(data)
              .filter(
                ([key]) =>
                  key !== "id" &&
                  key !== "conversation_id" &&
                  key !== "insights"
              )
              .map(([key, value]) => (
                <TabsContent
                  key={key}
                  value={key}
                  className="border px-2 rounded-lg border-[#484851] hover:bg-[#18181B] transition-all duration-150 prose text-white w-full h-full overflow-y-scroll"
                >
                  <ReactMarkdown
                    className={`prose dark:prose-invert
  prose-h1:font-bold prose-h1:text-xl
  prose-a:text-blue-600 prose-p:text-justify prose-img:rounded-xl
  prose-headings:underline`}
                  >
                    {value}
                  </ReactMarkdown>
                </TabsContent>
              ))}
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;

"use client";

import TreeContainer from "@/components/Tree/TreeContainer";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import AnswerSVG from "@/assets/icons/chat.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getChatMessages } from "@/utils/apiFunctions";
import { useChatStore } from "@/zustand/chat";
import ChatComponent from "./Chat";
import { useQueryWebSocket } from "@/hooks/useQueryWebSocket";
import ReactMarkdown from "react-markdown";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

const querytw = "text-4xl text-[#A2BCE4] font-semibold";
const responsetw = "text-lg font-light text-[#E8E8E6]";

const Page = ({ params }: { params: { id: string } }) => {
  const { setActiveChatId, activeChat, setActiveChat } = useChatStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveChatId(params.id);
    const fetchChat = async () => {
      try {
        const response = await getChatMessages(params.id);

        setActiveChat(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChat();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-2xl text-[#A2BCE4] font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="h-screen w-full ">
      <ResizablePanelGroup direction="horizontal" className=" w-full">
        <ResizablePanel className="w-full flex flex-col items-center justify-between gap-5 px-24 py-5">
          <h1 className="w-full text-lg border-b-2 py-1 text-white! font-sans">
            Conversation ID : {params.id}
          </h1>
          <div className="flex flex-col h-full overflow-y-scroll w-full gap-5">
            {activeChat &&
              activeChat.messages.map((message, _) => {
                return (
                  <div
                    key={message.id}
                    className={`${
                      message.role === "ASSISTANT" ? responsetw : querytw
                    }`}
                  >
                    {" "}
                    {message.role == "ASSISTANT" && (
                      <>
                        <h1 className="flex items-center gap-2">
                          <Image src={AnswerSVG} alt="answer" />
                          <p>Answer</p>
                        </h1>
                        <MarkdownRenderer
                          content={message.content}
                          className=" text-white" // Optional additional classes
                        />
                      </>
                    )}
                    {message.role == "USER" && <>{message.content}</>}
                  </div>
                );
              })}
            {/* {isConnected && <h1>Connected</h1>}
            {readyState && <h1>Ready State: {readyState}</h1>}
            {connectionStatus && <h1>Connection Status: {connectionStatus}</h1>} */}
            <div className="w-full mt-4">
              <TreeContainer />
            </div>
          </div>
          <ChatComponent chatId={params.id} />
        </ResizablePanel>
        {/* {webSearchContent && retrievedContext && (
          <>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={40}
              minSize={30}
              maxSize={55}
              className="flex flex-col items-center justify-between gap-2 px-3 py-5"
            >
              <h1 className="w-full text-lg border-b-2 py-1 font-semibold">
                Playground
              </h1>
              <Tabs
                defaultValue="account"
                className="w-full flex flex-col p-4 h-full max-h-screen"
              >
                {(webSearchContent || retrievedContext) && (
                  <TabsList className="w-fit">
                    {webSearchContent && (
                      <TabsTrigger value="retrievedcontext">
                        Retrieved Context
                      </TabsTrigger>
                    )}
                    {retrievedContext && (
                      <TabsTrigger value="websearch">
                        WebSearch Response
                      </TabsTrigger>
                    )}
                  </TabsList>
                )}
                <TabsContent value="retrievedcontext">
                  {retrievedContext}
                </TabsContent>
                <TabsContent value="websearch">{webSearchContent}</TabsContent>
              </Tabs>
              {toolCalls.map((toolCall, idx) => (
                <div key={idx} className="text-sm text-[#A2BCE4]">
                  {toolCall}
                </div>
              ))}
            </ResizablePanel>
          </>
        )} */}
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;
function addSidebarChat(data: any) {
  throw new Error("Function not implemented.");
}

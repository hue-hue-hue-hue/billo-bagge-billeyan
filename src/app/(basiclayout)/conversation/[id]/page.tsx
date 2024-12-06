"use client";

import ChatInput from "@/components/chat/chatInput";
import TreeContainer from "@/components/Tree/TreeContainer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnswerSVG from "@/assets/icons/chat.svg";
import useChat from "@/hooks/useChat";
import { useWebSocketLogs } from "@/hooks/useSocketState";
import {
  setActiveConversation,
  setActiveConversationId,
} from "@/redux/conversation/conversation.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useEffect } from "react";
const querytw = "text-4xl text-[#A2BCE4] font-semibold";
const responsetw = "text-lg font-light text-[#E8E8E6]";

const Page = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const {
    activeConversation,
    webSearchContent,
    retrievedContext,
    activeConversationId,
    conversations,
  } = useChat();

  useEffect(() => {
    dispatch(setActiveConversationId(params.id));
  }, [params.id, dispatch, activeConversation?.chats.length]);

  return (
    <div className="h-screen w-full ">
      {activeConversation?.chats.length}
      <ResizablePanelGroup direction="horizontal" className=" w-full">
        <ResizablePanel className="w-full flex flex-col items-center justify-between gap-5 px-24 py-5">
          <h1 className="w-full text-lg border-b-2 py-1 text-white! font-sans">
            Conversation ID : {activeConversationId}
          </h1>
          <div className="flex flex-col h-full overflow-y-scroll gap-5">
            {activeConversation?.chats.map((chat, idx) => {
              return (
                <div
                  key={idx + chat.order}
                  className={`${chat.role === "RAG" ? responsetw : querytw}`}
                >
                  {" "}
                  {chat.role == "RAG" && (
                    <h1 className="flex items-center gap-2">
                      <Image src={AnswerSVG} alt="answer" />
                      <p>Answer</p>
                    </h1>
                  )}
                  {chat.message}
                </div>
              );
            })}
            <div className="w-full mt-4">
              <TreeContainer />
            </div>
          </div>
          <ChatInput />
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
      {/* <div className="flex flex-col h-full overflow-y-scroll gap-3 w-3/4">
        {activeConversation?.chats.map((chat, idx) => {
          return (
            <div
              key={idx + chat.order}
              className={chat.role === "RAG" ? responsetw : querytw}
            >
              {chat.message}
            </div>
          );
        })}
        <div>
          <TreeContainer />
        </div>
      </div>
      <div className="w-3/4">
        <ChatInput />
      </div> */}
    </div>
  );
};

export default Page;

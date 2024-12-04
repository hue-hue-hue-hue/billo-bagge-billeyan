"use client";
import ChatInput from "@/components/chat/chatInput";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { documentsToRender } from "@/utils/dummy";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { expandedDummyAnalysis } from "@/utils/dummy";
import InsightsRenderer from "@/components/mergers-acquistions/InsightsRenderer";
const Page = ({ params }: { params: { id: string } }) => {
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
            <InsightsRenderer insightData={expandedDummyAnalysis} />
          </div>
          <ChatInput />
        </ResizablePanel>

        <ResizableHandle />
        <ResizablePanel minSize={30} defaultSize={35} className="h-full">
          <Tabs
            defaultValue="Document 1"
            className="w-full flex flex-col p-4 h-full gap-4 max-h-screen"
          >
            <TabsList className="flex flex-wrap gap-2 rounded-none w-full bg-transparent h-fit">
              {documentsToRender.map((document) => (
                <TabsTrigger
                  key={document.title}
                  value={document.title}
                  className="border px-2 rounded-lg border-[#484851] hover:bg-[#18181B] transition-all duration-150 w-40"
                >
                  {document.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {documentsToRender.map((document) => (
              <TabsContent
                key={document.title}
                value={document.title}
                className="h-full"
              >
                <object
                  data={document.url}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                ></object>
              </TabsContent>
            ))}
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;

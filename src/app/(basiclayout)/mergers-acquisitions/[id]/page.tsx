"use client";
import ChatInput from "@/components/chat/chatInput";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";

const documentsToRender = [
  {
    title: "Document 1",
    url: "https://arxiv.org/pdf/2005.11405",
  },
  {
    title: "Document 2",
    url: "https://arxiv.org/pdf/2005.11402",
  },
  {
    title: "Document 3",
    url: "https://arxiv.org/pdf/2005.11403",
  },
  {
    title: "Document 4",
    url: "https://arxiv.org/pdf/2005.11404",
  },
];

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={30} className="flex flex-col gap-4 p-5">
          <div className="border-b-2 pb-2 text-lg">Document Analysis</div>
          <div className="h-full border">samosa</div>
          <ChatInput />
        </ResizablePanel>

        <ResizableHandle />
        <ResizablePanel minSize={30} defaultSize={35} className="h-full">
          <Tabs
            defaultValue="Document 1"
            className="w-full flex flex-col p-4 h-full gap-4 max-h-screen"
          >
            <TabsList className="w-fit gap-5 rounded-none bg-transparent">
              {documentsToRender.map((document) => (
                <TabsTrigger
                  key={document.title}
                  value={document.title}
                  className="border px-2 rounded-lg border-[#484851] hover:bg-[#18181B] transition-all duration-150"
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

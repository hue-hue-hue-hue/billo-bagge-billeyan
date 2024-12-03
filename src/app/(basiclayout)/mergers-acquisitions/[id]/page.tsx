"use client";
import ChatInput from "@/components/chat/chatInput";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
        <ResizablePanel minSize={30} defaultSize={35}>
          <object
            data="https://arxiv.org/pdf/2005.11401"
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Alternative text - include a link{" "}
              <a href="https://arxiv.org/pdf/2005.11401">to the PDF!</a>
            </p>
          </object>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;

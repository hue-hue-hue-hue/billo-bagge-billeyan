"use client";
import ChatInput from "@/components/chat/chatInput";
import FlagContainer from "@/components/flag/FlagsContainer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const TermsAndConditions = () => {
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

export default TermsAndConditions;

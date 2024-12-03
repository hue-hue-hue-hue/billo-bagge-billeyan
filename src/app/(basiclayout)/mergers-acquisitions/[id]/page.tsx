import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={50}>
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
        <ResizableHandle />
        <ResizablePanel minSize={30} defaultSize={40}>
          id: {params.id}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;

import { useCallback, useState, useRef, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  EdgeTypes,
  Node,
  Edge,
  NodeAddChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
// import { initialNodes } from "./nodes";
import CustomNode from "./CustomNode";
// import { initialEdges } from "./edges";
import GradientEdge from "./GradientEdge";

const nodeTypes = { customNode: CustomNode };

const edgeTypes: EdgeTypes = {
  gradient: GradientEdge,
};

function RenderTree({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Node[];
  initialEdges: Edge[];
}) {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );

  const DynamicFlowContent = () => {
    const { fitView } = useReactFlow();

    // Adjust view on resize
    const handleResize = useCallback(() => {
      fitView({
        padding: 0.1,
        includeHiddenNodes: false,
        duration: 300, // Smooth transition
      });
    }, [fitView]);

    useEffect(() => {
      // Fit view immediately after initial render
      handleResize();

      // Add resize listener
      window.addEventListener("resize", handleResize);

      // Cleanup listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [handleResize]);

    return (
      <ReactFlow
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{
          padding: 0.1,
          duration: 300, // Smooth transition
        }}
        nodesDraggable={false}
        panOnDrag={false}
        zoomOnScroll={false}
      />
    );
  };

  return (
    <div className="h-full border">
      <ReactFlowProvider>
        <DynamicFlowContent />
      </ReactFlowProvider>
    </div>
  );
}

export default RenderTree;

import { useEffect } from "react";
import { Edge, EdgeTypes, Node, ReactFlow, useReactFlow } from "@xyflow/react";
import { TreeState } from "@/utils/types";
import CustomNode from "./CustomNode";
import GradientEdge from "./GradientEdge";

interface TreeProps {
  nodes: Node[];
  edges: Edge[];
  state: TreeState;
}

const nodeTypes = { customNode: CustomNode };

const edgeTypes: EdgeTypes = {
  gradient: GradientEdge,
};

const StateTree: React.FC<TreeProps> = ({ nodes, edges, state }) => {
  const { fitView } = useReactFlow();

  useEffect(() => {
    fitView({ duration: 300, padding: 0.1 });
  }, [nodes, edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      nodesDraggable={false}
      panOnDrag={false}
      zoomOnScroll={false}
    />
  );
};

export default StateTree;

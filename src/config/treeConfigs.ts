import { qrecievedNodes } from "@/components/Tree/statesConfig/QRECEIVED/nodes";
import { qrecievedEdges } from "@/components/Tree/statesConfig/QRECEIVED/edges";
import { retrievingNodes } from "@/components/Tree/statesConfig/RETRIEVING/nodes";
import { retrievingEdges } from "@/components/Tree/statesConfig/RETRIEVING/edges";
import { TreeState } from "@/utils/types";
import { qrecievingNodes } from "@/components/Tree/statesConfig/QRECEIVING/nodes";
import { qrecievingEdges } from "@/components/Tree/statesConfig/QRECEIVING/edges";

import { retrievedNodes } from "@/components/Tree/statesConfig/RETRIEVED/nodes";
import { retrievedEdges } from "@/components/Tree/statesConfig/RETRIEVED/edges";
import { formatString } from "@/utils/helpers";

function removeNumbers(str: string): string {
  return str.replace(/\d+/g, "");
}

const giveSingleNode = (label: string, x?: number, y?: number) => {
  return {
    id: label,
    type: "customNode",
    data: {
      label: formatString(removeNumbers(label)),
      rippleColor: getColorForTreeState(label),
      hierarchy: "CHILD",
    },
    position: { x: x ? x : 10, y: y ? y : 25 },
  };
};

const edgeBetweenTwoNodes = (
  node1: string,
  node2: string,
  animated?: boolean
) => {
  return {
    id: node1 + "-" + node2,
    source: node1,
    target: node2,
    type: "gradient",
    animated: animated ? animated : true,
    data: {
      color: getColorForTreeState(node1),
    },
    style: {
      strokeWidth: 2,
    },
  };
};

const RRF_NODES = giveSingleNode(TreeState.RRF_CALL);

function getColorForTreeState(label: string): string {
  // Color mapping object with new string labels
  const stateColors: { [key: string]: string } = {
    "Single Retrieval Call": "#95A5A6",
    "Expanded Query": "#9B59B6",
    "Retrieval Call": "#3498DB",
    Retrieved: "#2ECC71",
    "RRF (K docs)": "#34ED62",
    Metrag: "#FF6B6B",
    CRAG: "#4ECDC4",
    "Cohere Rerank": "#FFD93D",
    QRECEIVING: "#E74C3C",
    QRECEIVED: "#F1C40F",
    RETRIEVING: "#1ABC9C",
  };

  return stateColors[label] || "#34ED62"; // Default color if state not found
}

export const getTreeConfig = (state: TreeState) => {
  switch (state) {
    case TreeState.MULTI_RETRIEVAL:
      return {
        nodes: [giveSingleNode(TreeState.MULTI_RETRIEVAL)],
        edges: [],
      };
    case TreeState.SINGLE_RETRIEVAL:
      return {
        nodes: [giveSingleNode(TreeState.SINGLE_RETRIEVAL)],
        edges: [],
      };
    // case TreeState.:
    //   return {
    //     nodes: [giveSingleNode(TreeState.EXPANDED_QUERY)],
    //     edges: [],
    //   };
    // case TreeState.:
    //   return {
    //     nodes: retrievingNodes,
    //     edges: retrievingEdges,
    //   };
    // case TreeState.RETRIEVED:
    //   return {
    //     nodes: retrievedNodes,
    //     edges: retrievedEdges,
    //   };
    case TreeState.RRF_CALL:
      return {
        nodes: [RRF_NODES],
        edges: [],
      };
    case TreeState.METRAG_CALL:
      const node1 = giveSingleNode(TreeState.RRF_CALL.toString() + "1", 10);
      const node2 = giveSingleNode(TreeState.METRAG_CALL.toString() + "1", 240);
      return {
        nodes: [node1, node2],
        edges: [edgeBetweenTwoNodes(node1.id, node2.id, true)],
      };
    case TreeState.CRAG_CALL:
      const node11 = giveSingleNode(TreeState.RRF_CALL.toString() + "11", 100);
      const node12 = giveSingleNode(TreeState.METRAG_CALL + "11", 350, 20);
      const node13 = giveSingleNode(TreeState.CRAG_CALL + "11", 550, 25);

      return {
        nodes: [node11, node12, node13],
        edges: [
          edgeBetweenTwoNodes(node11.id, node12.id, false),
          edgeBetweenTwoNodes(node12.id, node13.id, true),
        ],
      };
    case TreeState.COHERE_RERANK:
      const node111 = giveSingleNode(
        TreeState.RRF_CALL.toString() + "111",

        50
      );
      const node112 = giveSingleNode(
        TreeState.METRAG_CALL + "111",

        250,
        20
      );
      const node113 = giveSingleNode(
        TreeState.CRAG_CALL + "111",

        400,
        25
      );

      const node114 = giveSingleNode(
        TreeState.COHERE_RERANK + "111",

        550,
        20
      );

      return {
        nodes: [node111, node112, node113, node114],
        edges: [
          edgeBetweenTwoNodes(node111.id, node112.id, false),
          edgeBetweenTwoNodes(node112.id, node113.id, false),
          edgeBetweenTwoNodes(node113.id, node114.id, true),
        ],
      };
    // case TreeState.QRECEIVING:
    //   return {
    //     nodes: qrecievingNodes,
    //     edges: qrecievingEdges,
    //   };
    // case TreeState.QRECEIVED:
    //   return {
    //     nodes: qrecievedNodes,
    //     edges: qrecievedEdges,
    //   };
    case TreeState.RETRIEVING:
      return {
        nodes: retrievingNodes,
        edges: retrievingEdges,
      };
    default:
      return {
        nodes: [giveSingleNode(state as TreeState)],
        edges: [],
      };
  }
};

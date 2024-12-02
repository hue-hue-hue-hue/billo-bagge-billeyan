import { qrecievedNodes } from "@/components/Tree/statesConfig/QRECEIVED/nodes";
import { qrecievedEdges } from "@/components/Tree/statesConfig/QRECEIVED/edges";
import { retrievingNodes } from "@/components/Tree/statesConfig/RETRIEVING/nodes";
import { retrievingEdges } from "@/components/Tree/statesConfig/RETRIEVING/edges";
import { qanalysingNodes } from "@/components/Tree/statesConfig/QANALYSING/nodes";
import { qanalysingEdges } from "@/components/Tree/statesConfig/QANALYSING/edges";
import { TreeState } from "@/utils/types";
import { qrecievingNodes } from "@/components/Tree/statesConfig/QRECEIVING/nodes";
import { qrecievingEdges } from "@/components/Tree/statesConfig/QRECEIVING/edges";

export const getTreeConfig = (state: TreeState) => {
  switch (state) {
    case TreeState.QRECEIVING:
      return {
        nodes: qrecievingNodes,
        edges: qrecievingEdges,
      };
    case TreeState.QRECEIVED:
      return {
        nodes: qrecievedNodes,
        edges: qrecievedEdges,
      };
    case TreeState.RETRIEVING:
      return {
        nodes: retrievingNodes,
        edges: retrievingEdges,
      };
    case TreeState.QANALYSING:
      return {
        nodes: qanalysingNodes,
        edges: qanalysingEdges,
      };
    default:
      return null;
  }
};

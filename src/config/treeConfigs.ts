import { qrecievingNodes } from "@/components/Tree/statesConfig/QRECEIVING/nodes";
import { qrecievingEdges } from "@/components/Tree/statesConfig/QRECEIVING/edges";
import { retrievingNodes } from "@/components/Tree/statesConfig/RETRIEVING/nodes";
import { retrievingEdges } from "@/components/Tree/statesConfig/RETRIEVING/edges";
import { qanalysingNodes } from "@/components/Tree/statesConfig/QANALYSING/nodes";
import { qanalysingEdges } from "@/components/Tree/statesConfig/QANALYSING/edges";
import { TreeState } from "@/utils/types";

export const getTreeConfig = (state: TreeState) => {
  switch (state) {
    case TreeState.QRECEIVING:
      return {
        nodes: qrecievingNodes,
        edges: qrecievingEdges,
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

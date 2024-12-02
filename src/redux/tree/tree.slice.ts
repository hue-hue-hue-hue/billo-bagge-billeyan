import { getTreeConfig } from "@/config/treeConfigs";
import { TreeData, TreeState } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TreeSliceState {
  currentState: TreeState;
  treeHistory: TreeData[];
  activeTreeIndex: number;
}

// const initialState: TreeSliceState = {
//   currentState: TreeState.IDEAL,
//   treeHistory: [],
//   activeTreeIndex: -1,
// };
const recievingTreeConfig = getTreeConfig(TreeState.QRECEIVING);
const retrievingTreeConfig = getTreeConfig(TreeState.RETRIEVING);
const history: TreeData[] = [];
if (recievingTreeConfig) {
  history.push({
    state: TreeState.QRECEIVING,
    nodes: recievingTreeConfig.nodes,
    edges: recievingTreeConfig.edges,
    timestamp: Date.now(),
  });
}
if (retrievingTreeConfig) {
  history.push({
    state: TreeState.RETRIEVING,
    nodes: retrievingTreeConfig.nodes,
    edges: retrievingTreeConfig.edges,
    timestamp: Date.now(),
  });
}
const initialState: TreeSliceState = {
  currentState: TreeState.RETRIEVING,
  treeHistory: history,
  activeTreeIndex: 1,
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    setTreeState(state, action: PayloadAction<TreeState>) {
      state.currentState = action.payload;
    },
    addTree(state, action: PayloadAction<TreeData>) {
      state.treeHistory.push(action.payload);
      state.activeTreeIndex = state.treeHistory.length - 1;
    },
    setActiveTreeIndex(state, action: PayloadAction<number>) {
      state.activeTreeIndex = action.payload;
    },
  },
});

export const { setTreeState, addTree, setActiveTreeIndex } = treeSlice.actions;
export default treeSlice.reducer;

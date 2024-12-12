import { getTreeConfig } from "@/config/treeConfigs";
import { TreeData, TreeState } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TreeSliceState {
  currentState: TreeState;
  treeHistory: TreeData[];
  activeTreeIndex: number;
}

const initialTreeConfig = getTreeConfig(TreeState.IDEAL);

const initialState: TreeSliceState = {
  currentState: TreeState.IDEAL,
  treeHistory: initialTreeConfig
    ? [
        {
          nodes: initialTreeConfig.nodes,
          edges: initialTreeConfig.edges,
          state: TreeState.IDEAL,
          timestamp: Date.now(),
        },
      ]
    : [],
  activeTreeIndex: 0,
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
    resetTree(state) {
      state.currentState = initialState.currentState;
      state.treeHistory = initialState.treeHistory;
      state.activeTreeIndex = initialState.activeTreeIndex;
    },
  },
});

export const { setTreeState, addTree, setActiveTreeIndex, resetTree } =
  treeSlice.actions;
export default treeSlice.reducer;

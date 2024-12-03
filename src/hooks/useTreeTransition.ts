import { getTreeConfig } from "@/config/treeConfigs";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addTree, setTreeState } from "@/redux/tree/tree.slice";
import { TreeData, TreeState } from "@/utils/types";
import { useCallback } from "react";

export const useTreeTransition = () => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector((state) => state.tree.currentState);
  const treeHistory = useAppSelector((state) => state.tree.treeHistory);
  const activeTreeIndex = useAppSelector((state) => state.tree.activeTreeIndex);
  const transition = useCallback(
    (newState: TreeState) => {
      const treeConfig = getTreeConfig(newState);

      if (treeConfig) {
        const newTreeData: TreeData = {
          state: newState,
          nodes: treeConfig.nodes,
          edges: treeConfig.edges,
          timestamp: Date.now(),
        };

        dispatch(setTreeState(newState));
        dispatch(addTree(newTreeData));
      }
    },
    [dispatch]
  );

  return { transition, currentState, treeHistory, activeTreeIndex };
};

"use client";

import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTreeTransition } from "@/hooks/useTreeTransition";
import { useAppDispatch } from "@/redux/store";
import {
  setActiveTreeIndex,
  addTree,
  setTreeState,
} from "@/redux/tree/tree.slice";
import { getTreeConfig } from "@/config/treeConfigs";
import { TreeState } from "@/utils/types";
import RenderTree from "./Tree";
import { ChevronUp, ChevronDown } from "lucide-react";

const STATES_TO_ADD = [
  TreeState.QRECEIVED,
  TreeState.RETRIEVING,
  TreeState.QANALYSING,
];

const TreeContainer = () => {
  const dispatch = useAppDispatch();
  const { treeHistory, activeTreeIndex } = useTreeTransition();

  // Simulate state additions
  useEffect(() => {
    let currentIndex = -1;

    const addNextState = () => {
      if (currentIndex < STATES_TO_ADD.length) {
        const nextState = STATES_TO_ADD[currentIndex];
        const treeConfig = getTreeConfig(nextState);

        if (treeConfig) {
          // Check if the state is already in the history
          const isStateAlreadyAdded = treeHistory.some(
            (tree) => tree.state === nextState
          );

          if (!isStateAlreadyAdded) {
            // Add new tree to history
            dispatch(
              addTree({
                state: nextState,
                nodes: treeConfig.nodes,
                edges: treeConfig.edges,
                timestamp: Date.now() + currentIndex,
              })
            );

            // Update current state
            dispatch(setTreeState(nextState));
          }
        }

        currentIndex++;
      }
    };

    // Add first state immediately
    addNextState();

    // Add subsequent states with interval
    const interval = setInterval(() => {
      addNextState();

      // Clear interval when all states are added
      if (currentIndex >= STATES_TO_ADD.length) {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, treeHistory]);

  const handleNavigation = useCallback(
    (direction: "up" | "down") => {
      const newIndex =
        direction === "up"
          ? Math.max(0, activeTreeIndex - 1)
          : Math.min(treeHistory.length - 1, activeTreeIndex + 1);

      dispatch(setActiveTreeIndex(newIndex));
    },
    [activeTreeIndex, treeHistory.length, dispatch]
  );

  // Variants for tree animations
  const treeVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative w-3/4 h-[15rem] min-h-[10rem]">
      {/* Navigation Buttons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        <button
          onClick={() => handleNavigation("up")}
          disabled={activeTreeIndex === 0}
          className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors
            ${
              activeTreeIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          aria-label="Previous tree"
        >
          <ChevronUp className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={() => handleNavigation("down")}
          disabled={activeTreeIndex === treeHistory.length - 1}
          className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors
            ${
              activeTreeIndex === treeHistory.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          aria-label="Next tree"
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="h-full w-full border rounded-lg overflow-hidden relative">
        <AnimatePresence initial={false} custom={activeTreeIndex}>
          <motion.div
            key={treeHistory[activeTreeIndex]?.state}
            custom={activeTreeIndex}
            variants={treeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="h-full w-full absolute top-0 left-0"
          >
            <RenderTree
              initialNodes={treeHistory[activeTreeIndex]?.nodes || []}
              initialEdges={treeHistory[activeTreeIndex]?.edges || []}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-2 right-2 bg-gray-800 px-2 py-1 rounded text-xs text-white">
          {activeTreeIndex + 1} / {treeHistory.length}
        </div>
      </div>
    </div>
  );
};

export default TreeContainer;

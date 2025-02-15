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
import { useWebSocketLogs } from "@/hooks/useSocketState";
import StateHandler from "./StateHandler";

const STATES_TO_ADD = [
  TreeState.SINGLE_RETRIEVAL,
  // TreeState.EXPANDED_QUERY,
  TreeState.RETRIEVING,
  // TreeState.RETRIEVED,
  TreeState.RRF_CALL,
  TreeState.METRAG_CALL,
  TreeState.CRAG_CALL,
  TreeState.COHERE_RERANK,
];

const TreeContainer = () => {
  const dispatch = useAppDispatch();
  const { treeHistory, activeTreeIndex } = useTreeTransition();

  // Simulate state additions
  useEffect(() => {}, [treeHistory]);

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
    <div className="relative h-64 flex items-center border px-2 rounded-sm w-full">
      <div className="h-full w-full rounded-lg overflow-hidden relative">
        <AnimatePresence initial={false} custom={activeTreeIndex}>
          <StateHandler />
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
            className="h-full w-fullabsolute top-0 left-0"
          >
            <RenderTree
              initialNodes={treeHistory[activeTreeIndex]?.nodes || []}
              initialEdges={treeHistory[activeTreeIndex]?.edges || []}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className=" right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
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
      <div className="absolute bottom-2 right-2 bg-gray-800 px-2 py-1 rounded text-xs text-white">
        {activeTreeIndex + 1} / {treeHistory.length}
      </div>
    </div>
  );
};

export default TreeContainer;

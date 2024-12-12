"use client";
import { getTreeConfig } from "@/config/treeConfigs";
import { useWebSocketLogs } from "@/hooks/useSocketState";
import { useTreeTransition } from "@/hooks/useTreeTransition";
import { useAppDispatch } from "@/redux/store";
import {
  addTree,
  setActiveTreeIndex,
  setTreeState,
} from "@/redux/tree/tree.slice";
import { TreeState } from "@/utils/types";
import React, { useEffect } from "react";
function stringToTreeState(stateString: string): TreeState {
  // Trim the input string
  const normalizedState = stateString.trim().toUpperCase();

  // Use switch case to map the input to TreeState
  switch (normalizedState) {
    case "IDEAL":
      return TreeState.IDEAL;
    case "GUARDRAIL":
      return TreeState.GUARDRAIL;
    case "ADARAG":
      return TreeState.ADARAG;
    case "SINGLE_RETRIEVAL":
      return TreeState.SINGLE_RETRIEVAL;
    case "MULTI_RETRIEVAL":
      return TreeState.MULTI_RETRIEVAL;
    case "FINANCE_QUERY":
      return TreeState.FINANCE_QUERY;
    case "LEGAL_QUERY":
      return TreeState.LEGAL_QUERY;
    case "GENERAL_QUERY":
      return TreeState.GENERAL_QUERY;
    case "PLAN_RAG":
      return TreeState.PLAN_RAG;
    case "RETRIEVING":
      return TreeState.RETRIEVING;
    case "RRF (K DOCS)":
      return TreeState.RRF_CALL;
    case "METRAG":
      return TreeState.METRAG_CALL;
    case "CRAG":
      return TreeState.CRAG_CALL;
    case "COHERE RERANK":
      return TreeState.COHERE_RERANK;
    case "FINAL RAG RESPONSE":
      return TreeState.FINAL_RAG_RESPONSE;
    default:
      // Return a default state if no match is found
      return TreeState.IDEAL;
  }
}

const StateHandler = () => {
  const { toolCalls, isConnected } = useWebSocketLogs();
  const { treeHistory } = useTreeTransition();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (toolCalls.length === 0) return;
    const state = stringToTreeState(toolCalls[toolCalls.length - 1]);
    console.log("state >>> ", state);
    const treeConfig = getTreeConfig(state as TreeState);
    console.log("treeconfic asdf asdf >>> ", treeConfig);
    if (treeConfig) {
      console.log("me izz here");
      // Check if the state is already in the history
      const isStateAlreadyAdded = treeHistory.some(
        (tree) => tree.state === state
      );
      console.log("isStateAlreadyAdded", isStateAlreadyAdded);
      if (!isStateAlreadyAdded) {
        // Add new tree to history
        dispatch(
          addTree({
            state: state,
            nodes: treeConfig.nodes,
            edges: treeConfig.edges,
            timestamp: Date.now(),
          })
        );

        // Update current state
        dispatch(setTreeState(state));
        dispatch(setActiveTreeIndex(treeHistory.length));
        //   dispatch(set(state));
      }
    }
  }, [isConnected, toolCalls.length]);

  return (
    <div className="w-fit text-sm">
      <h1>State Handler</h1>
      <p>Tool Calls: {toolCalls[toolCalls.length - 1]} </p>
    </div>
  );
};

export default StateHandler;

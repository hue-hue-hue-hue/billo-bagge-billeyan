import { TreeState } from "./types";

export function getTreeStateFromName(functionName: string): TreeState {
  const stateKey = functionName.toUpperCase().replace(/\./g, "_");

  if (stateKey in TreeState) {
    return TreeState[stateKey as keyof typeof TreeState];
  }

  return TreeState.IDEAL;
}

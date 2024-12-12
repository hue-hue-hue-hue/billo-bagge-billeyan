import { TreeState } from "./types";

export function getTreeStateFromName(functionName: string): TreeState {
  const stateKey = functionName.toUpperCase().replace(/\./g, "_");

  if (stateKey in TreeState) {
    return TreeState[stateKey as keyof typeof TreeState];
  }

  return TreeState.IDEAL;
}

export function something(rawString: string) {
  // console.log("hakuna >>>>", rawString);
  let final = rawString.replace(/`/g, " ").replace(/markdown/g, "");
  return final;
}

export const formatString = (str: string) =>
  str
    .replace(/_/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

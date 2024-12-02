export const qanalysingNodes = [
  {
    id: "21",
    type: "customNode",
    data: {
      label: "Analysing Query",
      rippleColor: "#FF6B6B",
      hierarchy: "PARENT",
    },
    position: { x: 10, y: 25 },
  },
  {
    id: "22",
    type: "customNode",
    data: {
      label: "Semantic Analysis",
      color: "#FF8F8F",
      hierarchy: "CHILD",
    },
    position: { x: 360, y: -25 },
  },
  {
    id: "23",
    type: "customNode",
    data: {
      label: "Context Mapping",
      color: "#FF6B6B",
      hierarchy: "CHILD",
    },
    position: { x: 360, y: 26 },
  },
  {
    id: "24",
    type: "customNode",
    data: {
      label: "Intent Detection",
      color: "#FF4F4F",
      hierarchy: "LASTCHILD",
    },
    position: { x: 360, y: 75 },
  },
];

import React from "react";
import { BaseEdge, EdgeProps, getBezierPath, Position } from "@xyflow/react";

const GradientEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  data,
}) => {
  const strokeColor: string = (data?.color as string) || "#000000";

  const getLighterColor = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const lighten = (val: number) =>
      Math.min(255, Math.round(val + (255 - val) * 0.5));
    const lighterColor = `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;

    return lighterColor;
  };

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={strokeColor}>
            <animate
              attributeName="stop-color"
              values={`${strokeColor};${getLighterColor(
                strokeColor
              )};${strokeColor}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor={getLighterColor(strokeColor)}>
            <animate
              attributeName="stop-color"
              values={`${getLighterColor(
                strokeColor
              )};${strokeColor};${getLighterColor(strokeColor)}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      <BaseEdge
        path={edgePath}
        style={{
          stroke: `url(#gradient-${id})`,
          strokeWidth: style?.strokeWidth || 2,
          ...style,
        }}
      />
    </>
  );
};

export default GradientEdge;

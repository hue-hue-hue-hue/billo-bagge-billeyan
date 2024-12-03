import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import Ripple from "./Ripple";

function CustomNode({
  data,
  isConnectable,
}: {
  data: {
    label?: string;
    rippleColor?: string;
    color?: string;
    hierarchy: "PARENT" | "CHILD" | "LASTCHILD" | "NONE";
  };
  isConnectable: boolean;
}) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  const DEFAULT_HANDLE_STYLE = {
    width: 5,
    height: 5,
    bottom: -5,
    border: 0,
  };

  return (
    <div className="border border-[#313131] px-5 py-1 rounded-full">
      {data.hierarchy != "PARENT" && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ ...DEFAULT_HANDLE_STYLE, background: data.color }}
          id={`a-${data.label}`}
          isConnectable={isConnectable}
        />
      )}
      <div className="flex gap-5">
        {data.rippleColor && <Ripple color={data.rippleColor} />}
        <p className="font-light text-sm">{data.label}</p>
      </div>
      {data.hierarchy != "LASTCHILD" && (
        <Handle
          type="source"
          position={Position.Right}
          id={`b-${data.label}`}
          style={{ ...DEFAULT_HANDLE_STYLE, background: data.color }}
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
}

export default CustomNode;

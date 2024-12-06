import { useAppDispatch } from "@/redux/store";
import { setTreeState } from "@/redux/tree/tree.slice";
import { getTreeStateFromName } from "@/utils/helpers";
import { useState, useEffect, useCallback, useRef } from "react";

interface UseWebSocketLogsOptions {
  url?: string;
  onToolCall?: (toolName: string) => void;
}

export const useWebSocketLogs = ({
  url = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:6060/ws/logs",
  onToolCall,
}: UseWebSocketLogsOptions = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [toolCall, setToolCall] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  // Use useRef to avoid dependency cycles
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    // Close existing connection if any
    if (socketRef.current) {
      socketRef.current.close();
    }

    try {
      const newSocket = new WebSocket(url);

      newSocket.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      newSocket.onclose = () => {
        setIsConnected(false);
        socketRef.current = null;
      };

      newSocket.onerror = (event) => {
        console.error("WebSocket error:", event);
        setError(new Error("WebSocket connection error"));
        setIsConnected(false);
        socketRef.current = null;
      };

      newSocket.onmessage = (event) => {
        const info = JSON.parse(event.data);
        console.log(info);
        if (info.type == "function") {
          const toolName = info.name;
          // Update tool calls state
          setToolCall(toolCall);

          // Call optional callback if provided
          if (onToolCall) {
            onToolCall(toolName);
          }
        } else if (info.type === "treeState") {
          const state = info.name;
          dispatch(setTreeState(getTreeStateFromName(state)));
        }
      };

      socketRef.current = newSocket;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to connect"));
      setIsConnected(false);
    }
  }, [url, onToolCall]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []); // Remove socket dependency

  // Auto-connect on mount
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    error,
    toolCall,
    connect,
    disconnect,
  };
};

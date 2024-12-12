import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface UseFlagsHook {
  sendFile: (file: File) => void;
  isCompleted: boolean;
  isConnected: boolean;
  connectionStatus: string;
}

export const useFlags = (): UseFlagsHook => {
  const [isCompleted, setIsCompleted] = useState(false);

  // WebSocket URL
  const socketUrl = "ws://localhost:8230/ws/check";

  // WebSocket hook
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
    retryOnError: true,
  });

  // Connection status helpers
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // Handle incoming messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const parsedMessage = JSON.parse(lastMessage.data);
        if (parsedMessage.result === "OK") {
          setIsCompleted(true);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  }, [lastMessage]);

  // Send file method
  const sendFile = useCallback(
    (file: File) => {
      if (readyState === ReadyState.OPEN) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const fileContent = event.target?.result;

          if (fileContent) {
            sendMessage(
              JSON.stringify({
                type: "file",
                file: {
                  name: file.name,
                  type: file.type,
                  content: fileContent,
                },
              })
            );
          }
        };

        reader.readAsDataURL(file);

        // Reset completed state when sending a new file
        setIsCompleted(false);
      }
    },
    [sendMessage, readyState]
  );

  return {
    sendFile,
    isCompleted,
    isConnected: readyState === ReadyState.OPEN,
    connectionStatus,
  };
};

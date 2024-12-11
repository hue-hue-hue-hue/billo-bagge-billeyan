import { useCallback, useEffect, useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { usePathname } from "next/navigation";
import { useChatStore } from "@/zustand/chat";
import { Message } from "@/utils/types";

interface WebSocketQueryMessage {
  type: string;
  message: Message;
}

export const useQueryWebSocket = () => {
  const { addMessageToActiveChat, activeChat } = useChatStore();
  const pathname = usePathname();

  // Extract conversation ID from pathname
  const conversationId = useMemo(() => {
    return pathname.startsWith("/chat/") ? pathname.split("/chat/")[1] : null;
  }, [pathname]);

  // WebSocket URL
  const socketUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_WEBSOCKET_QUERY_URL ||
      "ws://localhost:5050/ws/query",
    []
  );

  // WebSocket hook
  const { sendMessage, lastMessage, readyState, lastJsonMessage } =
    useWebSocket(socketUrl, {
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
  const handleIncomingMessage = useCallback(
    (message: WebSocketQueryMessage) => {
      if (message?.type === "response") {
        console.log("Received message:", message.message);
        addMessageToActiveChat(message.message as Message);
      }
    },
    [addMessageToActiveChat]
  );

  // Effect to process incoming messages
  useEffect(() => {
    if (lastJsonMessage) {
      handleIncomingMessage(lastJsonMessage as WebSocketQueryMessage);
    }
  }, [lastJsonMessage, handleIncomingMessage]);

  // Send query method
  const sendQuery = useCallback(
    (query: string, id: string) => {
      if (readyState === ReadyState.OPEN) {
        sendMessage(
          JSON.stringify({
            query: query,
            id: id || conversationId,
          })
        );
      }
    },
    [sendMessage, readyState, conversationId]
  );

  return {
    sendQuery,
    lastMessage,
    readyState,
    connectionStatus,
    isConnected: readyState === ReadyState.OPEN,
  };
};

import { useEffect, useRef, useCallback } from "react";

import { usePathname, useRouter } from "next/navigation";
import {
  addConversation,
  setActiveConversationId,
  updateConversation,
} from "@/redux/conversation/conversation.slice";
import { useAppDispatch } from "@/redux/store";

export const useQueryWebSocket = () => {
  const pathname = usePathname();
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const conversationId = pathname.startsWith("/conversation/")
    ? pathname.split("/conversation/")[1]
    : null;

  useEffect(() => {
    const wsUrl =
      process.env.NEXT_PUBLIC_WEBSOCKET_QUERY_URL ||
      "ws://localhost:5050/ws/query";
    console.log("conversationId", conversationId);
    ws.current = new WebSocket(wsUrl);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.conversation);
      if (data.type === "request") {
        dispatch(
          addConversation({
            conversation: {
              id: data.conversation._id,
              title: data.conversation.title,
              chats: data.conversation.chats,
            },
          })
        );
        if (!conversationId) {
          router.push(`/conversation/${data.conversation._id}`);
        }
      }

      if (data.type === "response") {
        dispatch(
          updateConversation({
            conversation: {
              id: data.conversation._id,
              title: data.conversation.title,
              chats: data.conversation.chats,
            },
          })
        );
      }
      dispatch(setActiveConversationId(data.conversation._id));
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [dispatch, router, conversationId]);

  const sendQuery = useCallback((query: string, conversationId?: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ query, id: conversationId }));
    }
  }, []);

  return { sendQuery };
};

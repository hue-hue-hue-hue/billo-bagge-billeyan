import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { useQueryWebSocket } from "./useQueryWebSocket";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { setActiveConversationId } from "@/redux/conversation/conversation.slice";

const useChat = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { sendQuery } = useQueryWebSocket();
  const webSearchContent = "";
  const retrievedContext = "";

  const activeConversationId = useSelector(
    (state: RootState) => state.conversation.activeConversationId
  );

  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  const sendMessage = (message: string) => {
    sendQuery(message, activeConversationId || undefined);
  };
  useEffect(() => {
    if (pathname.startsWith("/conversation/")) {
      const conversationId = pathname.split("/conversation/")[1];
      dispatch(setActiveConversationId(conversationId));
    }
  }, [pathname, activeConversationId]);

  return {
    sendMessage,
    activeConversation,
    activeConversationId,
    webSearchContent,
    retrievedContext,
    conversations,
  };
};

export default useChat;

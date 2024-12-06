import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { useQueryWebSocket } from "./useQueryWebSocket";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { setActiveConversationId } from "@/redux/conversation/conversation.slice";
import { Conversation } from "@/utils/types";

const useChat = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  // const { sendQuery } = useQueryWebSocket();
  const webSearchContent = "";
  const retrievedContext = "";

  const activeConversationId = useSelector(
    (state: RootState) => state.conversation.activeConversationId
  );

  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);

  // const sendMessage = (message: string) => {
  //   sendQuery(message, activeConversationId || undefined);
  // };
  useEffect(() => {
    if (pathname.startsWith("/conversation/")) {
      const conversationId = pathname.split("/conversation/")[1];
      console.log("pathname", conversationId);
      dispatch(setActiveConversationId(conversationId));
    }
    console.log(activeConversationId);
    console.log(conversations.length);
    console.log(activeConversation?.chats.length);
    setActiveConversation(
      conversations.find(
        (conv) => conv.id === activeConversationId
      ) as Conversation
    );
  }, [
    // sendMessage,
    pathname,
    activeConversationId,
    activeConversation?.chats.length,
    conversations,
    conversations.length,
  ]);

  return {
    // sendMessage,
    activeConversation,
    activeConversationId,
    webSearchContent,
    retrievedContext,
    conversations,
  };
};

export default useChat;

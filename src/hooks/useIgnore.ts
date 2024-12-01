import { dummyState } from "@/utils/dummy";
import { ChatState, Conversation, Chat } from "@/utils/types";
import { useState } from "react";

const useConversation = () => {
  const [chatState, setChatState] = useState<ChatState>(() => ({
    ...dummyState,
  }));

  const getConversations = (): Conversation[] => {
    return chatState.conversations;
  };

  const getActiveConversation = (): Conversation | null => {
    const { activeConversationId, conversations } = chatState;
    return (
      conversations.find((conv) => conv.id === activeConversationId) || null
    );
  };

  const setActiveConversation = (conversationId: string) => {
    setChatState((prev) => ({
      ...prev,
      activeConversationId: conversationId,
    }));
    // fetch(`/api/conversations/${conversationId}`, { method: "GET" });
  };

  const addConversation = (title: string) => {
    const newConversation: Conversation = {
      id: `conv${chatState.conversations.length + 1}`,
      title,
      chats: [],
    };
    setChatState((prev) => ({
      ...prev,
      conversations: [...prev.conversations, newConversation],
      activeConversationId: newConversation.id,
    }));
    // fetch("/api/conversations", {
    //   method: "POST",
    //   body: JSON.stringify(newConversation),
    // });
  };

  const addChat = (message: string, role: Chat["role"]) => {
    const activeConversation = getActiveConversation();
    if (!activeConversation) return;

    const newChat: Chat = {
      message,
      role,
      order: activeConversation.chats.length + 1,
    };

    setChatState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conv) =>
        conv.id === activeConversation.id
          ? { ...conv, chats: [...conv.chats, newChat] }
          : conv
      ),
    }));
    // fetch(`/api/conversations/${activeConversation.id}/chats`, {
    //   method: "POST",
    //   body: JSON.stringify(newChat),
    // });
  };

  const setCurrentState = (state: ChatState["currentState"]) => {
    setChatState((prev) => ({
      ...prev,
      currentState: state,
    }));
    // fetch("/api/currentState", {
    //   method: "PATCH",
    //   body: JSON.stringify({ currentState: state }),
    // });
  };

  const setWebSearchContent = (content: string | null) => {
    setChatState((prev) => ({
      ...prev,
      webSearchContent: content,
    }));
    // fetch("/api/webSearchContent", {
    //   method: "PATCH",
    //   body: JSON.stringify({ content }),
    // });
  };

  const setRetrievedContext = (context: string | null) => {
    setChatState((prev) => ({
      ...prev,
      retrievedContext: context,
    }));
    // fetch("/api/retrievedContext", {
    //   method: "PATCH",
    //   body: JSON.stringify({ context }),
    // });
  };

  return {
    getConversations,
    getActiveConversation,
    setActiveConversation,
    addConversation,
    addChat,
    setCurrentState,
    setWebSearchContent,
    setRetrievedContext,
    chatState,
  };
};

export default useConversation;

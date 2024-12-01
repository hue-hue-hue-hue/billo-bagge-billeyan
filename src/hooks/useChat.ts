import {
  setActiveConversation,
  setCurrentState,
  setWebSearchContent,
  setRetrievedContext,
} from "@/redux/conversation/conversation.slice";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";

const useChat = () => {
  const dispatch = useDispatch();

  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  const activeConversationId = useSelector(
    (state: RootState) => state.conversation.activeConversationId
  );
  const currentState = useSelector(
    (state: RootState) => state.conversation.currentState
  );
  const webSearchContent = useSelector(
    (state: RootState) => state.conversation.webSearchContent
  );
  const retrievedContext = useSelector(
    (state: RootState) => state.conversation.retrievedContext
  );

  const activeConversation =
    conversations.find((conv) => conv.id === activeConversationId) || null;
  const activeChats = activeConversation ? activeConversation.chats : [];

  const updateActiveConversation = (conversationId: string) => {
    dispatch(setActiveConversation(conversationId));
  };

  const updateCurrentState = (state: typeof currentState) => {
    dispatch(setCurrentState(state));
  };

  const updateWebSearchContent = (content: string | null) => {
    dispatch(setWebSearchContent(content));
  };

  const updateRetrievedContext = (context: string | null) => {
    dispatch(setRetrievedContext(context));
  };

  return {
    activeConversationId,
    conversations,
    activeConversation,
    activeChats,
    currentState,
    webSearchContent,
    retrievedContext,
    updateActiveConversation,
    updateCurrentState,
    updateWebSearchContent,
    updateRetrievedContext,
  };
};

export default useChat;

import { conversations } from "@/utils/dummy";
import { ChatState, Chat, Conversation } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ChatState = {
  conversations: conversations,
  activeConversationId: null,
  currentState: "WAIT",
  webSearchContent: null,
  retrievedContext: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addConversation(
      state,
      action: PayloadAction<{ conversation: Conversation }>
    ) {
      state.conversations.push(action.payload.conversation);
      state.activeConversationId = action.payload.conversation.id;
    },

    setActiveConversation(state, action: PayloadAction<string>) {
      state.activeConversationId = action.payload;
    },

    addChat(state, action: PayloadAction<Chat>) {
      const activeConversation = state.conversations.find(
        (conv) => conv.id === state.activeConversationId
      );
      if (activeConversation) {
        activeConversation.chats.push(action.payload);
      }
    },

    setCurrentState(state, action: PayloadAction<ChatState["currentState"]>) {
      state.currentState = action.payload;
    },

    setWebSearchContent(state, action: PayloadAction<string | null>) {
      state.webSearchContent = action.payload;
    },

    setRetrievedContext(state, action: PayloadAction<string | null>) {
      state.retrievedContext = action.payload;
    },

    clearActiveConversation(state) {
      const activeConversation = state.conversations.find(
        (conv) => conv.id === state.activeConversationId
      );
      if (activeConversation) {
        activeConversation.chats = [];
      }
      state.currentState = "WAIT";
      state.webSearchContent = null;
      state.retrievedContext = null;
    },
  },
});

export const {
  addConversation,
  setActiveConversation,
  addChat,
  setCurrentState,
  setWebSearchContent,
  setRetrievedContext,
  clearActiveConversation,
} = chatSlice.actions;

export default chatSlice.reducer;

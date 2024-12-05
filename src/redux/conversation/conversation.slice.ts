import { Chat, ChatState, Conversation } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversationId(state, action: PayloadAction<string>) {
      state.activeConversationId = action.payload;
    },
    addConversations(state, action: PayloadAction<Conversation[]>) {
      state.conversations = action.payload;
    },
    addConversation(
      state,
      action: PayloadAction<{ conversation: Conversation }>
    ) {
      state.conversations.push(action.payload.conversation);
      state.activeConversationId = action.payload.conversation.id;
    },

    updateConversation(
      state,
      action: PayloadAction<{ conversation: Conversation }>
    ) {
      const index = state.conversations.findIndex(
        (conv) => conv.id === action.payload.conversation.id
      );
      if (index !== -1) {
        state.activeConversationId = action.payload.conversation.id;
        state.conversations[index] = action.payload.conversation;
      }
    },

    setActiveConversation(state, action: PayloadAction<string>) {
      state.activeConversationId = action.payload;
    },
    addUserChat(state, action: PayloadAction<string>) {
      const conversation = state.conversations.find(
        (conv) => conv.id === state.activeConversationId
      );
      conversation?.chats.push({
        message: action.payload,
        order: conversation.chats.length,
        role: "USER",
      });
    },
  },
});

export const {
  addConversation,
  addConversations,
  updateConversation,
  setActiveConversation,
  setActiveConversationId,
} = chatSlice.actions;

export default chatSlice.reducer;

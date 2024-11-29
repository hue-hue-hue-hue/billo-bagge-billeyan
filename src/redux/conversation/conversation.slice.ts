import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Chat = {
  message: string;
  role: "USER" | "RAG" | "INTERMEDIATE";
  order: number;
};

interface ChatState {
  conversations: Chat[];
  currentState:
    | "WAIT"
    | "PROMPT"
    | "CLASSIFIER"
    | "ADARAG"
    | "PLANRAG"
    | "STEP1"
    | "STEP2"
    | "STEP3"
    | "STEP4"
    | "STEP5"
    | "RETRIEVAL"
    | "WEBSEARCH";
}

const initialState: ChatState = {
  conversations: [],
  currentState: "WAIT",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat(state, action: PayloadAction<Chat>) {
      state.conversations.push(action.payload);
      state.currentState = "PROMPT";
    },
  },
});

export const { addChat } = chatSlice.actions;

export default chatSlice.reducer;

import { FileAttachment, PromptState } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PromptState = {
  prompt: "",
  attachments: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPrompt(state, action: PayloadAction<string>) {
      state.prompt = action.payload;
    },
    addAttachment(state, action: PayloadAction<FileAttachment>) {
      state.attachments.push(action.payload);
    },
    removeAttachment(state, action: PayloadAction<string>) {
      state.attachments = state.attachments.filter(
        (file) => file.id !== action.payload
      );
    },
    clearPrompt(state) {
      state.prompt = "";
    },
    clearAttachments(state) {
      state.attachments = [];
    },
  },
});

export const {
  setPrompt,
  addAttachment,
  removeAttachment,
  clearPrompt,
  clearAttachments,
} = chatSlice.actions;

export default chatSlice.reducer;

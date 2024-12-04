import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import chatReducer from "./prompt/prompt.slice";
import conversationReducer from "./conversation/conversation.slice";
import treeReducer from "./tree/tree.slice";
import mergerFormReducer from "./mergers-acquisitions/form.slice";
const store = configureStore({
  reducer: {
    chat: chatReducer,
    conversation: conversationReducer,
    tree: treeReducer,
    mergerForm: mergerFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

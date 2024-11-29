import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import {
  addAttachment,
  removeAttachment,
  setPrompt,
} from "@/redux/chat/chat.slice";

export const useChat = () => {
  const dispatch = useDispatch();
  const { prompt, attachments } = useSelector((state: RootState) => state.chat);

  const updatePrompt = (value: string) => {
    dispatch(setPrompt(value));
  };

  const uploadFile = (file: File) => {
    const fileAttachment = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
    };
    dispatch(addAttachment(fileAttachment));
  };

  const deleteAttachment = (id: string) => {
    dispatch(removeAttachment(id));
  };

  return {
    prompt,
    attachments,
    updatePrompt,
    uploadFile,
    deleteAttachment,
  };
};

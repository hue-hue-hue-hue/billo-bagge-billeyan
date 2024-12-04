import { Conversation } from "@/utils/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: string;
}

export const conversationAPI = {
  getAllConversations: async () => {
    const response = await apiClient.get<Conversation[]>("/conversations");
    return response.data;
  },
  createNewConversation: async (query: string) => {
    const response = await apiClient.post<Conversation>("/conversations", {
      query,
    });
    return response.data;
  },
  prompt: async (conversationId: string, prompt: string) => {
    const response = await apiClient.post<Conversation>(
      `/conversations/${conversationId}/prompt`,
      {
        prompt,
      }
    );
    return response.data;
  },
};

import { Chat, Message } from "@/utils/types";
import { Chat as ChatDB } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Chat Store Interface
interface ChatStore {
  chats: Chat[];
  activeChatId: string | null;
  sidebarChats: ChatDB[];
  currentChatId: string | null;
  activeChat: Chat | null;
  setActiveChat: (messages: Chat) => void;
  //   addActiveChatMessage: (message: Message) => void;
  // Methods with strict type checking
  addMessageToActiveChat: (message: Message) => void;
  setActiveChatId: (chatId: string) => void;
  addSidebarChat: (chatDB: ChatDB) => void;
  addSidebarChats: (chatsDB: ChatDB[]) => void;
  addChat: (chat: Chat) => void;
  selectChat: (chatId: string) => void;
  updateChatMessages: (chatId: string, messages: Message[]) => void;

  // Additional type-safe methods
  getChatById: (chatId: string) => Chat | undefined;
  getMessagesForChat: (chatId: string) => Message[];
}

// Zustand Store Implementation
export const useChatStore = create<ChatStore, [["zustand/persist", ChatStore]]>(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,
      sidebarChats: [],
      currentChatId: null,
      activeChat: null,
      setActiveChat: (chat: Chat) => {
        set((state) => ({ activeChat: chat }));
      },
      addMessageToActiveChat: (message: Message) => {
        set((state) => {
          if (!state.activeChat) {
            throw new Error("No active chat found");
          }

          return {
            activeChat: {
              ...state.activeChat,
              messages: [...state.activeChat.messages, message],
            },
          };
        });
      },
      setActiveChatId: (chatId) => {
        set((state) => ({ activeChatId: chatId }));
      },
      addSidebarChat: (chatDB) => {
        set((state) => ({
          sidebarChats: [...state.sidebarChats, chatDB],
        }));
      },
      addSidebarChats: (chatsDB) => {
        set((state) => ({
          sidebarChats: [...chatsDB],
        }));
      },
      addChat: (chat) => {
        set((state) => ({
          chats: [...state.chats, chat],
          currentChatId: chat.id,
        }));
      },

      selectChat: (chatId) => {
        const chat = get().chats.find((c) => c.id === chatId);
        if (!chat) {
          throw new Error(`Chat with id ${chatId} not found`);
        }

        set({ currentChatId: chatId });
      },

      updateChatMessages: (chatId, messages) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, messages: messages } : chat
          ),
        }));
      },

      getChatById: (chatId) => {
        return get().chats.find((chat) => chat.id === chatId);
      },

      getMessagesForChat: (chatId) => {
        const chat = get().getChatById(chatId);
        return chat ? chat.messages : [];
      },
    }),
    {
      name: "chat-storage",
      storage: {
        getItem: (key) => {
          const value = localStorage.getItem(key);
          if (!value) return null;

          const parsed = JSON.parse(value);
          return {
            ...parsed,
            chats: parsed.chats.map((chat: Chat) => ({
              ...chat,
              createdAt: new Date(chat.createdAt),
              updatedAt: new Date(chat.updatedAt),
              messages: chat.messages.map((msg: Message) => ({
                ...msg,
                createdAt: new Date(msg.createdAt),
              })),
            })),
          };
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);

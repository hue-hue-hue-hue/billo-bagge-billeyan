export type Chat = {
  message: string;
  role: "USER" | "RAG" | "INTERMEDIATE";
  order: number;
};

export type Conversation = {
  id: string;
  title: string; // Title to display in the sidebar -> will use the first chat of the conversation for now.
  chats: Chat[];
};

export type ChatState = {
  conversations: Conversation[];
  activeConversationId: string | null;
  currentState:
    | "WAIT"
    | "QUERY_RECEIVED"
    | "CLASSIFYING_QUERY"
    | "CLASSIFIED_LEGAL"
    | "CLASSIFIED_FINANCE"
    | "CLASSIFIED_GENERAL"
    | "ANALYSING_QUERY"
    | "RETRIEVING_CONTEXT"
    | "WEBSEARCH";
  webSearchContent: string | null;
  retrievedContext: string | null;
};

// Prompt state
export type FileAttachment = {
  id: string;
  name: string;
  size: number;
};

export type PromptState = {
  prompt: string;
  attachments: FileAttachment[];
};

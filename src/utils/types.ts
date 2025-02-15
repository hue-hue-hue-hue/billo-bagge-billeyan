import { Edge, Node } from "@xyflow/react";

export enum MessageRole {
  USER = "USER",
  ASSISTANT = "ASSISTANT",
}

// Type for Chat
export type Chat = {
  id: string; // Corresponds to @db.ObjectId
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

// Type for Message
export type Message = {
  id: string; // Corresponds to @db.ObjectId
  chatId: string; // Corresponds to @db.ObjectId
  chat: Chat; // Relation to Chat
  role: MessageRole; // Enum
  content: string;
  createdAt: Date;
  metadata?: Record<string, any>; // Corresponds to Json? in Prisma
};

// export type Chat = {
//   message: string;
//   role: "USER" | "RAG";
//   order: number;
// };

export type Conversation = {
  id: string;
  title: string;
  chats: Chat[];
};

export type ChatState = {
  conversations: Conversation[];
  activeConversationId: string | null;
  currentState?:
    | "WAIT"
    | "QUERY_RECEIVED"
    | "RETRIEVING_CONTEXT"
    | "WEBSEARCH"
    | "ERROR"
    | "RESPONSE";
  webSearchContent?: string | null;
  retrievedContext?: string | null;
  socketStatus?: "disconnected" | "connected" | "error";
  socketError?: string | null;
  attachments?: FileAttachment[];
  isUploading?: boolean;
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

export enum TreeState {
  // Base States
  IDEAL = "IDEAL",
  GUARDRAIL = "GUARDRAIL",
  ADARAG = "AdaRAG",
  SINGLE_RETRIEVAL = "SINGLE_RETRIEVAL",
  MULTI_RETRIEVAL = "MULTI_RETRIEVAL",
  FINANCE_QUERY = "FINANCE_QUERY",
  LEGAL_QUERY = "LEGAL_QUERY",
  GENERAL_QUERY = "GENERAL_QUERY",
  PLAN_RAG = "PLAN_RAG",
  RETRIEVING = "RETRIEVING",
  // RETRIEVED = "RETRIEVED",
  RRF_CALL = "RRF (K docs)",
  METRAG_CALL = "MetRAG",
  CRAG_CALL = "CRAG",
  COHERE_RERANK = "Cohere Rerank",
  FINAL_RAG_RESPONSE = "Final RAG Response",
}

export interface TreeData {
  state: TreeState;
  nodes: Node[];
  edges: Edge[];
  timestamp: number;
}

export interface FlagCardProps {
  type: "safe" | "risk";
  title: string;
  fault: string;
  description: string;
  order: number;
}

export interface AnalysisType {
  type: string;
  score: number;
}

export interface InsightDetails {
  type: string;
  description: string;
  [key: string]: string | string[];
}

export interface InsigtsAnalysis {
  title: string;
  summary: string;
  analysis: AnalysisType[];
  insights: InsightDetails[];
  recommendedActions: string[];
}

export interface Documents {
  id: string;
  Definitive_Agreement: string;
  Due_Diligence: string;
  Letter_of_Intent: string;
  NDA: string;
  Term_Sheet: string;
  conversation_id: string;
  insights: DocumentsInsights;
}

export interface DocumentsInsights {
  cultural_considerations: string;
  financial_risk_assessment: string;
  operational_compatibility: string;
  regulatory_compliance: string;
}

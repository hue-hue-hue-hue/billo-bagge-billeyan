import { Edge, Node } from "@xyflow/react";

export type Chat = {
  message: string;
  role: "USER" | "RAG";
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
  QRECEIVING = "QRECEIVING",
  QRECEIVED = "QRECEIVED",
  QCLASSIFYING = "QCLASSIFYING",
  QANALYSING = "QANALYSING",
  QANALYSED = "QANALYSED",
  RETRIEVING = "RETRIEVING",
  SRETRIVAL = "Single Retrieval Call",
  EXPANDED_QUERY = "Expanded Query",
  RETRIVAL_CALL = "Retrieval Call",
  RETRIEVED = "Retrieved",
  RRF_CALL = "RRF (K docs)",
  METRAG_CALL = "MetRAG",
  CRAG_CALL = "CRAG",
  COHERE_CALL = "Cohere Rerank",
  FINAL_CONTEXT = "Final Retrieved Context",
}

export interface TreeData {
  state: TreeState;
  nodes: Node[];
  edges: Edge[];
  timestamp: number;
}

export interface FlagCardProps {
  type: "caution" | "risk";
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

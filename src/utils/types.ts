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

  // Common States
  ADARAG_AGENT = "ADARAG_AGENT",
  CORRECTIVE_RAG = "CORRECTIVE_RAG",
  SCORE_DOCUMENT_RELEVANCE = "SCORE_DOCUMENT_RELEVANCE",
  TRANSFER_TO_GENERAL_AGENT = "TRANSFER_TO_GENERAL_AGENT",
  HYDE_QUERY = "HYDE_QUERY",
  METRAG_SCORE = "METRAG_SCORE",
  METRAG_FILTER = "METRAG_FILTER",
  PLAN_RAG_QUERY = "PLAN_RAG_QUERY",
  SINGLE_PLAN_RAG_STEP_QUERY = "SINGLE_PLAN_RAG_STEP_QUERY",
  RERANK_DOCS = "RERANK_DOCS",
  TAVILY_SEARCH = "TAVILY_SEARCH",
  BRAVE_SEARCH = "BRAVE_SEARCH",
  LINKUP_SEARCH = "LINKUP_SEARCH",

  // Finance Agent States
  TRANSFER_TO_FINANCE_AGENT = "TRANSFER_TO_FINANCE_AGENT",
  SINGLE_RETRIEVER_FINANCE_AGENT = "SINGLE_RETRIEVER_FINANCE_AGENT",
  STEP_EXECUTOR = "STEP_EXECUTOR",
  MULTI_RETRIEVAL_FINANCE_AGENT = "MULTI_RETRIEVAL_FINANCE_AGENT",
  SINGLE_RETRIEVAL_FINANCE_AGENT = "SINGLE_RETRIEVAL_FINANCE_AGENT",

  // Guardrail States
  GUARDRAIL = "GUARDRAIL",

  // Legal Agent States
  TRANSFER_TO_LEGAL_AGENT = "TRANSFER_TO_LEGAL_AGENT",
  SINGLE_RETRIEVER_LEGAL_AGENT = "SINGLE_RETRIEVER_LEGAL_AGENT",
  MULTI_RETRIEVAL_LEGAL_AGENT = "MULTI_RETRIEVAL_LEGAL_AGENT",
  SINGLE_RETRIEVAL_LEGAL_AGENT = "SINGLE_RETRIEVAL_LEGAL_AGENT",

  // MA Agent States
  PLAN_TO_QUERIES = "PLAN_TO_QUERIES",
  GENERATE_AGREEMENT = "GENERATE_AGREEMENT",
  INGEST = "INGEST",
  GENERATE_DOCUMENT = "GENERATE_DOCUMENT",
  SEND_DOCUMENTS = "SEND_DOCUMENTS",
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

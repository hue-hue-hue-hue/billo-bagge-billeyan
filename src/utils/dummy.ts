import { Chat, Conversation, ChatState } from "./types";

const sampleChats = (): Chat[] => [
  {
    message: "Can you explain quantum computing in simple terms?",
    role: "USER",
    order: 1,
  },
  {
    message:
      "Quantum computing is a type of computing that harnesses the collective power of quantum states, such as superposition, interference, and entanglement, to solve problems too complex for classical computers.",
    role: "RAG",
    order: 2,
  },
  {
    message: "Can you give a real-world example of quantum computing?",
    role: "USER",
    order: 3,
  },
  {
    message:
      "One promising application is quantum cryptography, which offers ultra-secure communication. Quantum key distribution (QKD) leverages the principles of quantum mechanics to ensure that any eavesdropping attempt is detected.",
    role: "RAG",
    order: 4,
  },
  {
    message: "What are the challenges in developing quantum computers?",
    role: "USER",
    order: 5,
  },
  {
    message:
      "Quantum computers are highly sensitive to noise and decoherence, which can disrupt quantum operations. Maintaining quantum coherence is a major challenge. Additionally, building large-scale quantum computers requires significant technological advancements.",
    role: "RAG",
    order: 6,
  },
];

export const conversations: Conversation[] = [
  {
    id: "conv1",
    title: "Quantum Computing Basics",
    chats: sampleChats(),
  },
  {
    id: "conv2",
    title: "AI and Machine Learning",
    chats: sampleChats(),
  },
  {
    id: "conv3",
    title: "Climate Change and Sustainability",
    chats: sampleChats(),
  },
  {
    id: "conv4",
    title: "Space Exploration",
    chats: sampleChats(),
  },
  {
    id: "conv5",
    title: "Healthcare and Biotechnology",
    chats: sampleChats(),
  },
];

export const dummyState: ChatState = {
  conversations,
  activeConversationId: "conv1",
  currentState: "WAIT",
  webSearchContent: "Sample web search content retrieved by RAG.",
  retrievedContext: "Sample retrieved context from vector store.",
};

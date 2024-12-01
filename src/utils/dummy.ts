import { Chat, Conversation, ChatState } from "./types";

const sampleChats = (prefix: string): Chat[] => [
  {
    message: prefix + "Can you explain quantum computing in simple terms?",
    role: "USER",
    order: 1,
  },
  {
    message:
      prefix +
      "Quantum computing is a type of computing that harnesses the collective power of quantum states, such as superposition, interference, and entanglement, to solve problems too complex for classical computers.",
    role: "RAG",
    order: 2,
  },
  {
    message: prefix + "Can you give a real-world example of quantum computing?",
    role: "USER",
    order: 3,
  },
  {
    message:
      prefix +
      "One promising application is quantum cryptography, which offers ultra-secure communication. Quantum key distribution (QKD) leverages the principles of quantum mechanics to ensure that any eavesdropping attempt is detected.",
    role: "RAG",
    order: 4,
  },
  {
    message:
      prefix + "What are the challenges in developing quantum computers?",
    role: "USER",
    order: 5,
  },
  {
    message:
      prefix +
      "Quantum computers are highly sensitive to noise and decoherence, which can disrupt quantum operations. Maintaining quantum coherence is a major challenge. Additionally, building large-scale quantum computers requires significant technological advancements.",
    role: "RAG",
    order: 6,
  },
];

export const conversations: Conversation[] = [
  {
    id: "conv1",
    title: "Quantum Computing Basics",
    chats: sampleChats("conv1 "),
  },
  {
    id: "conv2",
    title: "AI and Machine Learning",
    chats: sampleChats("conv2 "),
  },
  {
    id: "conv3",
    title: "Climate Change and Sustainability asdf asdf asdf a",
    chats: sampleChats("conv3 "),
  },
  {
    id: "conv4",
    title: "Space Exploration",
    chats: sampleChats("conv4 "),
  },
  {
    id: "conv5",
    title: "Healthcare and Biotechnology",
    chats: sampleChats("conv5 "),
  },
];

export const dummyState: ChatState = {
  conversations,
  activeConversationId: "conv1",
  currentState: "WAIT",
  webSearchContent: "Sample web search content retrieved by RAG.",
  retrievedContext: "Sample retrieved context from vector store.",
};

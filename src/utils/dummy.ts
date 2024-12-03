import { Chat, Conversation, ChatState, FlagCardProps } from "./types";

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

export const dummyFlags: FlagCardProps[] = [
  {
    type: "caution",
    title: "Ambiguity in Delivery Timeline",
    fault: "The Supplier may deliver products without delay.",
    description:
      "The phrase 'may deliver' lacks commitment and is open to interpretation, making it unclear when the delivery will occur.",
    order: 1,
  },
  {
    type: "caution",
    title: "Reference Mismatch in Invoicing",
    fault:
      "Invoices will be provided within 5 business days following delivery.",
    description:
      "No section defines the exact delivery timeline, leaving ambiguity around when the invoice deadline begins.",
    order: 2,
  },
  {
    type: "risk",
    title: "Conflict in Clause Terminology",
    fault: "The Supplier may deliver products without delay.",
    description:
      "The repeated clause appears in conflicting contexts, creating uncertainty about its interpretation.",
    order: 3,
  },
  {
    type: "caution",
    title: "Missing Deadline for Contract Finalization",
    fault: "The contract shall be signed promptly upon agreement.",
    description:
      "The term 'promptly' is subjective and lacks a specific deadline, which may lead to delays or disputes.",
    order: 4,
  },
  {
    type: "risk",
    title: "High Penalty Risk for Delayed Delivery",
    fault: "A penalty of 10% will apply for delays deemed unreasonable.",
    description:
      "The term 'unreasonable' is undefined, leading to potential disputes over penalty enforcement.",
    order: 5,
  },
  {
    type: "caution",
    title: "Undefined Ambiguous Terminology",
    fault: "Reasonable efforts will be made to resolve any disputes.",
    description:
      "The term 'reasonable efforts' is vague and open to varying interpretations, potentially causing legal disagreements.",
    order: 6,
  },
  {
    type: "risk",
    title: "Liability for Delivery Risks",
    fault:
      "The Supplier is not liable for any delays caused by unforeseen circumstances.",
    description:
      "The clause does not define 'unforeseen circumstances,' which could allow the Supplier to avoid accountability too broadly.",
    order: 7,
  },
  {
    type: "risk",
    title: "Unclear Payment Schedule",
    fault: "Payment terms shall be mutually agreed upon at a later stage.",
    description:
      "No specific payment schedule is provided, creating uncertainty and potential conflicts over payment timelines.",
    order: 8,
  },
  {
    type: "caution",
    title: "Redundant Overlapping Clauses",
    fault:
      "The delivery timeline is subject to change based on the Supplier's discretion.",
    description:
      "This clause overlaps with earlier terms, creating redundancy and increasing the potential for misinterpretation.",
    order: 9,
  },
  {
    type: "risk",
    title: "Jurisdictional Conflict",
    fault:
      "This agreement shall be governed by the laws of both State A and State B.",
    description:
      "Mentioning two jurisdictions introduces potential conflicts over which legal framework applies in case of disputes.",
    order: 10,
  },
];

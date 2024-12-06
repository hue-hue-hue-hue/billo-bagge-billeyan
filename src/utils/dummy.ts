import {
  Chat,
  Conversation,
  ChatState,
  FlagCardProps,
  InsigtsAnalysis,
} from "./types";

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

export const documentsToRender = [
  {
    title: "Document 1",
    url: "https://arxiv.org/pdf/2005.11405",
  },
  {
    title: "Document 2",
    url: "https://arxiv.org/pdf/2005.11402",
  },
  {
    title: "Document 3",
    url: "https://arxiv.org/pdf/2005.11403",
  },
  {
    title: "Document 4",
    url: "https://arxiv.org/pdf/2005.11404",
  },
  {
    title: "Document 5",
    url: "https://arxiv.org/pdf/2005.11405",
  },
  {
    title: "Document 6",
    url: "https://arxiv.org/pdf/2005.11406",
  },
  {
    title: "Document 7",
    url: "https://arxiv.org/pdf/2005.11407",
  },
  {
    title: "Document 8",
    url: "https://arxiv.org/pdf/2005.11408",
  },
];

const dummyAnalysis = {
  title: "Document Insights for Facebook and Amazon Policies Integration",
  summary:
    "When the AI agent analyzes the policy documents, it can derive key insights beyond simply merging policies. These insights would support strategic decision-making, ensure smooth integration, and highlight potential risks and opportunities. Here are examples of document insights the agent could provide:",
  analysis: [
    {
      type: "Type1",
      score: 4.5,
    },
    {
      type: "Type2",
      score: 3.5,
    },
    {
      type: "Type3",
      score: 2.5,
    },
    {
      type: "Type4",
      score: 1.5,
    },
  ],
  insights: [
    {
      type: "Alignment Insights",
      description:
        "Highlighting areas of synergy and divergence between the two companies to ensure smooth integration and strategic alignment.",
      overlaps: [
        "Both companies emphasize ethical standards and human rights (e.g., Amazon's supplier code and Facebook's emphasis on content governance).",
        "Shared commitment to transparency and accountability in operations and governance.",
      ],
      conflicts: [
        "Facebook's focus on freedom of expression might conflict with Amazon’s supply chain-based compliance, particularly where restrictive laws may exist.",
        "Discrepancies in reporting structures—Facebook uses independent oversight (Oversight Board), while Amazon employs internal audits.",
      ],
    },
  ],
};

export const expandedDummyAnalysis: InsigtsAnalysis = {
  title: "Comprehensive Document Insights for Tech Merger Analysis",
  summary:
    "When the AI agent analyzes the policy documents, it can derive key insights beyond simply merging policies. These insights would support strategic decision-making, ensure smooth integration, and highlight potential risks and opportunities. Here are examples of document insights the agent could provide:",
  analysis: [
    {
      type: "Type1",
      score: 4.5,
    },
    {
      type: "Type2",
      score: 3.5,
    },
    {
      type: "Type3",
      score: 2.5,
    },
    {
      type: "Type4",
      score: 1.5,
    },
  ],
  insights: [
    {
      type: "Alignment Insights",
      description:
        "Identifying strategic convergence and potential friction points between organizational policies and practices.",
      overlaps: [
        "Shared commitment to data privacy and user protection frameworks",
        "Similar approaches to ethical AI development and responsible technology deployment",
        "Aligned corporate social responsibility initiatives targeting sustainability and community engagement",
      ],
      conflicts: [
        "Divergent approaches to employee data management and privacy protocols",
        "Inconsistent intellectual property protection strategies",
        "Variations in global compliance and regulatory adaptation mechanisms",
      ],
    },
    {
      type: "Operational Compatibility",
      description:
        "Evaluating technical, procedural, and organizational integration potential",
      technicalIntegration: [
        "Complementary cloud infrastructure architectures",
        "Potential challenges in reconciling different software development methodologies",
        "Variations in cybersecurity implementation and risk management frameworks",
      ],
      culturalConsiderations: [
        "Different organizational decision-making hierarchies",
        "Contrasting employee performance evaluation and compensation models",
        "Unique internal communication and collaboration practices",
      ],
    },
    {
      type: "Financial Risk Assessment",
      description:
        "Analyzing potential financial implications and risk mitigation strategies",
      potentialSynergies: [
        "Cost reduction through consolidated infrastructure",
        "Enhanced market penetration by combining user bases",
        "Streamlined supply chain and procurement processes",
      ],
      riskFactors: [
        "Potential regulatory scrutiny in cross-border technology mergers",
        "Intellectual property litigation risks",
        "Employee retention challenges during organizational restructuring",
      ],
    },
    {
      type: "Regulatory Compliance",
      description:
        "Examining legal and regulatory landscape for potential integration challenges",
      globalComplianceConsiderations: [
        "Differences in data protection regulations across jurisdictions",
        "Variations in antitrust and competition law interpretations",
        "Complexity of reconciling international employment regulations",
      ],
      complianceRecommendations: [
        "Develop unified global compliance framework",
        "Create cross-functional regulatory adaptation team",
        "Implement robust monitoring and reporting mechanisms",
      ],
    },
    {
      type: "Technology Integration",
      description:
        "Analyzing technological ecosystem compatibility and integration strategies",
      technologyAlignment: [
        "Potential for unified AI and machine learning research platforms",
        "Opportunities for cross-pollination of technological innovations",
        "Challenges in reconciling different technology stack architectures",
      ],
      integrationChallenges: [
        "Legacy system compatibility issues",
        "Potential redundancies in technological infrastructure",
        "User experience consistency across merged platforms",
      ],
    },
  ],
  recommendedActions: [
    "Conduct comprehensive due diligence across all identified insight domains",
    "Develop a phased integration roadmap addressing key alignment and operational challenges",
    "Establish a dedicated cross-organizational transformation team",
    "Create transparent communication channels for stakeholders",
  ],
};

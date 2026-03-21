import { 
  FileText, 
  Send, 
  CheckCircle, 
  Bot, 
  ArrowRightLeft, 
  Database, 
  Globe, 
  User, 
  BrainCircuit,
  Wrench, 
  MessageSquare,
  FileSpreadsheet
} from 'lucide-react';
import { StageId, StageDefinition } from './types';

export const STAGES: StageDefinition[] = [
  {
    id: StageId.WORKFLOW,
    title: "Workflow",
    subtitle: "Deterministic Automation",
    spectrumLabel: "Determinism",
    autonomyLevel: 10,
    intelligenceLevel: 0,
    description: "The simplest form. Rigid, rule-based, and linear. No intelligence involved.",
    connections: [],
    nodes: [
      { id: 'w1-ticket', label: 'New Ticket', icon: FileText, type: 'trigger', description: 'A new support ticket is received via email or portal.' },
      { id: 'w1-msg', label: 'Send Message', icon: Send, type: 'action', description: 'The system automatically sends a pre-defined "We received your ticket" email.' },
      { id: 'w1-close', label: 'Close Case', icon: CheckCircle, type: 'action', description: 'The ticket is closed or marked for a human queue based on a simple rule.' },
    ]
  },
  {
    id: StageId.AI_POWERED,
    title: "AI-Powered Workflow",
    subtitle: "Intelligent Orchestration (Early)",
    spectrumLabel: "Intelligent Orchestration",
    autonomyLevel: 30,
    intelligenceLevel: 30,
    description: "Adds 'smart routing'. AI classifies inputs, but the process remains linear and human-dependent.",
    connections: [],
    nodes: [
      { id: 'w2-ticket', label: 'New Ticket', icon: FileText, type: 'trigger', description: 'New ticket arrives.' },
      { id: 'w2-classify', label: 'AI Classifies Ticket', icon: Bot, type: 'ai', description: 'AI analyzes the text to tag it (e.g., "Billing", "Tech Support").' },
      { id: 'w2-route', label: 'Ticket Routed to Queue', icon: ArrowRightLeft, type: 'action', description: 'Based on the tag, it moves to the correct department queue.' },
      { id: 'w2-log', label: 'Log to CRM', icon: Database, type: 'action', description: 'The action is logged in the database.' },
    ]
  },
  {
    id: StageId.AGENTIC,
    title: "Agentic Workflow",
    subtitle: "Intelligent Orchestration (Advanced)",
    spectrumLabel: "Semi-Autonomy",
    autonomyLevel: 60,
    intelligenceLevel: 60,
    description: "AI performs multi-step reasoning, drafts responses, and uses tools, but humans still review critical steps.",
    connections: [],
    nodes: [
      { id: 'w3-ticket', label: 'New Ticket', icon: FileText, type: 'trigger', description: 'Ticket received.' },
      { id: 'w3-classify', label: 'AI Classifies Ticket', icon: Bot, type: 'ai', description: 'AI understands intent and determines next steps.' },
      { id: 'w3-scrape', label: 'Scrape URL', icon: Globe, type: 'action', description: 'AI follows links in the ticket to gather context.' },
      { id: 'w3-know', label: 'Knowledge Retrieval', icon: Database, type: 'action', description: 'AI searches internal docs for relevant answers.' },
      { id: 'w3-draft', label: 'AI Drafts Response', icon: Bot, type: 'ai', description: 'Synthesizing data, AI writes a proposed reply.' },
      { id: 'w3-slack', label: 'Send Slack Message', icon: MessageSquare, type: 'action', description: 'Internal team is notified.' },
      { id: 'w3-human', label: 'Human Reviews Draft', icon: User, type: 'human', description: 'A human agent approves or edits the AI draft.' },
      { id: 'w3-crm', label: 'Log to CRM', icon: FileSpreadsheet, type: 'action', description: 'Activity recorded.' },
      { id: 'w3-send', label: 'Send Response', icon: Send, type: 'action', description: 'Approved response sent to customer.' },
    ]
  },
  {
    id: StageId.AI_AGENT,
    title: "AI Agent",
    subtitle: "Complete Autonomy",
    spectrumLabel: "Complete Autonomy",
    autonomyLevel: 100,
    intelligenceLevel: 100,
    description: "The agent reasons about the problem, selects its own tools, and executes end-to-end without human intervention.",
    connections: [],
    nodes: [
      { id: 'w4-ticket', label: 'New Ticket', icon: FileText, type: 'trigger', description: 'Ticket received.' },
      { id: 'w4-reason', label: 'Reasoning & Action', icon: BrainCircuit, type: 'ai', description: 'The Agent plans its approach dynamically based on the issue.' },
      { id: 'w4-identify', label: 'Identify Issue', icon: CheckCircle, type: 'action', description: 'Diagnosing the root cause.' },
      { id: 'w4-api', label: 'APIs and Tools', icon: Wrench, type: 'action', description: 'Calling external services (e.g., issuing refunds, resetting passwords).' },
      { id: 'w4-know', label: 'Knowledge Retrieval', icon: Database, type: 'action', description: 'Looking up policy data.' },
      { id: 'w4-send', label: 'Send Response', icon: Send, type: 'action', description: 'Agent constructs and sends the final reply autonomously.' },
      { id: 'w4-slack', label: 'Send Slack Message', icon: MessageSquare, type: 'action', description: 'Team notified of the resolved action.' },
      { id: 'w4-log', label: 'Log to CRM', icon: FileSpreadsheet, type: 'action', description: 'Case closed and logged.' },
    ]
  }
];

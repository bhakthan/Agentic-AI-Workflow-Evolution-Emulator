import { LucideIcon } from 'lucide-react';

export enum StageId {
  WORKFLOW = 1,
  AI_POWERED = 2,
  AGENTIC = 3,
  AI_AGENT = 4
}

export interface FlowNode {
  id: string;
  label: string;
  icon?: LucideIcon;
  type?: 'trigger' | 'action' | 'decision' | 'ai' | 'human';
  description: string; // Text to show when this step is active
  gridArea?: string; // CSS Grid area for complex layouts
}

export interface StageDefinition {
  id: StageId;
  title: string;
  subtitle: string;
  spectrumLabel: string;
  autonomyLevel: number; // 0 to 100
  intelligenceLevel: number; // 0 to 100
  description: string;
  nodes: FlowNode[];
  connections: string[][]; // Adjacency list or simple pairs for drawing lines (simplified for this visualizer)
}

export interface AnimationState {
  stageId: StageId;
  activeNodeId: string | null;
  isPlaying: boolean;
  completedNodes: string[];
}
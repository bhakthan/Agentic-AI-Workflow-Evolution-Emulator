import React from 'react';
import { STAGES } from '../constants';
import { FlowchartNode } from './FlowchartNode';
import { motion } from 'framer-motion';
import { StageId } from '../types';

interface StageProps {
  activeNodeId: string | null;
  completedNodes: string[];
}

// --- Stage 1: Linear Workflow ---
export const WorkflowLayout: React.FC<StageProps> = ({ activeNodeId, completedNodes }) => {
  const nodes = STAGES.find(s => s.id === StageId.WORKFLOW)?.nodes || [];
  return (
    <div className="flex flex-col items-center gap-8">
      {nodes.map((node, idx) => (
        <React.Fragment key={node.id}>
            <FlowchartNode 
                node={node} 
                isActive={activeNodeId === node.id} 
                isCompleted={completedNodes.includes(node.id)} 
            />
            {/* Arrow between nodes */}
            {idx < nodes.length - 1 && (
                <div className="absolute mt-20 text-slate-300">↓</div>
            )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- Stage 2: AI Powered Workflow ---
export const AIWorkflowLayout: React.FC<StageProps> = ({ activeNodeId, completedNodes }) => {
    const nodes = STAGES.find(s => s.id === StageId.AI_POWERED)?.nodes || [];
    return (
      <div className="flex flex-col items-center gap-8">
        {nodes.map((node, idx) => (
          <React.Fragment key={node.id}>
              <FlowchartNode 
                  node={node} 
                  isActive={activeNodeId === node.id} 
                  isCompleted={completedNodes.includes(node.id)} 
              />
              {idx < nodes.length - 1 && <div className="absolute mt-20 text-slate-300">↓</div>}
          </React.Fragment>
        ))}
      </div>
    );
};

// --- Stage 3: Agentic Workflow (Branching) ---
export const AgenticLayout: React.FC<StageProps> = ({ activeNodeId, completedNodes }) => {
    const stage = STAGES.find(s => s.id === StageId.AGENTIC);
    if (!stage) return null;
    const n = (id: string) => stage.nodes.find(n => n.id === id)!;

    const isNodeActive = (id: string) => activeNodeId === id;
    const isNodeDone = (id: string) => completedNodes.includes(id);

    return (
        <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto gap-6">
             {/* Ticket */}
             <FlowchartNode node={n('w3-ticket')} isActive={isNodeActive('w3-ticket')} isCompleted={isNodeDone('w3-ticket')} />
             <div className="text-slate-300">↓</div>
             
             {/* Classify */}
             <FlowchartNode node={n('w3-classify')} isActive={isNodeActive('w3-classify')} isCompleted={isNodeDone('w3-classify')} />
             
             {/* Branching Wrapper */}
             <div className="relative w-full flex justify-center gap-12 mt-4">
                 {/* Lines for branching */}
                 <svg className="absolute -top-10 w-full h-12 pointer-events-none text-slate-300 z-0">
                     <path d="M336 0 V 20 H 180 V 40" fill="none" stroke="currentColor" strokeWidth="2" />
                     <path d="M336 0 V 20 H 490 V 40" fill="none" stroke="currentColor" strokeWidth="2" />
                 </svg>

                 {/* Left Branch: Scrape */}
                 <FlowchartNode node={n('w3-scrape')} isActive={isNodeActive('w3-scrape')} isCompleted={isNodeDone('w3-scrape')} />
                 {/* Right Branch: Knowledge */}
                 <FlowchartNode node={n('w3-know')} isActive={isNodeActive('w3-know')} isCompleted={isNodeDone('w3-know')} />
             </div>

             {/* Converge to Draft */}
             <div className="relative mt-4">
                <svg className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-12 pointer-events-none text-slate-300 z-0">
                     <path d="M180 0 V 20 H 336 V 40" fill="none" stroke="currentColor" strokeWidth="2" />
                     <path d="M490 0 V 20 H 336 V 40" fill="none" stroke="currentColor" strokeWidth="2" />
                 </svg>
                <FlowchartNode node={n('w3-draft')} isActive={isNodeActive('w3-draft')} isCompleted={isNodeDone('w3-draft')} />
             </div>

             {/* Branch again: Slack & Human */}
             <div className="relative w-full flex justify-center gap-12 mt-4">
                 <svg className="absolute -top-10 w-full h-12 pointer-events-none text-slate-300 z-0">
                     <path d="M336 0 V 20 H 180 V 40" fill="none" stroke="currentColor" strokeWidth="2" />
                     <path d="M336 0 V 20 H 490 V 40" fill="none" stroke="currentColor" strokeWidth="2" />
                 </svg>
                 
                 <div className="flex flex-col items-center gap-6">
                    <FlowchartNode node={n('w3-slack')} isActive={isNodeActive('w3-slack')} isCompleted={isNodeDone('w3-slack')} />
                    <div className="text-slate-300">↓</div>
                    <FlowchartNode node={n('w3-crm')} isActive={isNodeActive('w3-crm')} isCompleted={isNodeDone('w3-crm')} />
                 </div>

                 <div className="flex flex-col items-center gap-6">
                    <FlowchartNode node={n('w3-human')} isActive={isNodeActive('w3-human')} isCompleted={isNodeDone('w3-human')} />
                    <div className="text-slate-300">↓</div>
                    <FlowchartNode node={n('w3-send')} isActive={isNodeActive('w3-send')} isCompleted={isNodeDone('w3-send')} />
                 </div>
             </div>
        </div>
    );
};

// --- Stage 4: AI Agent (Hub/Parallel) ---
export const AIAgentLayout: React.FC<StageProps> = ({ activeNodeId, completedNodes }) => {
    const stage = STAGES.find(s => s.id === StageId.AI_AGENT);
    if (!stage) return null;
    const n = (id: string) => stage.nodes.find(n => n.id === id)!;
    const isNodeActive = (id: string) => activeNodeId === id;
    const isNodeDone = (id: string) => completedNodes.includes(id);

    return (
        <div className="relative flex flex-col items-center w-full max-w-3xl mx-auto gap-5">
             {/* Ticket */}
             <FlowchartNode node={n('w4-ticket')} isActive={isNodeActive('w4-ticket')} isCompleted={isNodeDone('w4-ticket')} />
             <div className="text-slate-300">↓</div>
             
             {/* The Brain */}
             <div className="relative z-20">
                {activeNodeId === 'w4-reason' && (
                    <motion.div 
                        layoutId="brain-glow"
                        className="absolute inset-0 bg-purple-500 blur-xl opacity-30 rounded-full"
                    />
                )}
                <FlowchartNode node={n('w4-reason')} isActive={isNodeActive('w4-reason')} isCompleted={isNodeDone('w4-reason')} />
             </div>

             {/* Parallel Actions */}
             <div className="relative w-full flex justify-center gap-4 mt-6">
                 {/* Connecting Lines from Brain to Tools */}
                 <svg className="absolute -top-12 w-full h-16 pointer-events-none text-slate-300 z-0">
                     <path d="M384 0 V 20 H 150 V 50" fill="none" stroke="currentColor" strokeWidth="2" />
                     <path d="M384 0 V 50" fill="none" stroke="currentColor" strokeWidth="2" />
                     <path d="M384 0 V 20 H 620 V 50" fill="none" stroke="currentColor" strokeWidth="2" />
                 </svg>

                 <FlowchartNode node={n('w4-identify')} isActive={isNodeActive('w4-identify')} isCompleted={isNodeDone('w4-identify')} />
                 <FlowchartNode node={n('w4-api')} isActive={isNodeActive('w4-api')} isCompleted={isNodeDone('w4-api')} />
                 <FlowchartNode node={n('w4-know')} isActive={isNodeActive('w4-know')} isCompleted={isNodeDone('w4-know')} />
             </div>

             {/* Reconverge to Response */}
              <div className="relative mt-4">
                 <svg className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-12 pointer-events-none text-slate-300 z-0">
                     <path d="M150 0 V 20 H 384 V 40" fill="none" stroke="currentColor" strokeWidth="2" />
                     <path d="M384 0 V 40" fill="none" stroke="currentColor" strokeWidth="2" />
                     <path d="M620 0 V 20 H 384 V 40" fill="none" stroke="currentColor" strokeWidth="2" />
                 </svg>
                 <FlowchartNode node={n('w4-send')} isActive={isNodeActive('w4-send')} isCompleted={isNodeDone('w4-send')} />
              </div>

              <div className="text-slate-300">↓</div>
              <FlowchartNode node={n('w4-slack')} isActive={isNodeActive('w4-slack')} isCompleted={isNodeDone('w4-slack')} />
              <div className="text-slate-300">↓</div>
              <FlowchartNode node={n('w4-log')} isActive={isNodeActive('w4-log')} isCompleted={isNodeDone('w4-log')} />
        </div>
    );
};
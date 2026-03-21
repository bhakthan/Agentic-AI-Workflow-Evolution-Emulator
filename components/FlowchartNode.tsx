import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowNode } from '../types';
import { clsx } from 'clsx';

interface Props {
  node: FlowNode;
  isActive: boolean;
  isCompleted: boolean;
  delay?: number;
}

export const FlowchartNode: React.FC<Props> = ({ node, isActive, isCompleted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = node.icon;
  
  // Determine styling based on type and state
  const getColors = () => {
    if (isActive) return "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25 ring-4 ring-indigo-500/10";
    if (isCompleted) return "bg-slate-50 text-slate-500 border-slate-200/60";
    return "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:shadow-md hover:text-indigo-600";
  };

  const getTypeLabel = () => {
    switch(node.type) {
        case 'ai': return 'AI Model';
        case 'human': return 'Human';
        case 'trigger': return 'Input';
        case 'action': return 'Action';
        default: return '';
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ 
        opacity: 1, 
        scale: isActive ? 1.05 : 1, 
        y: isActive ? -4 : 0,
        filter: isCompleted ? 'grayscale(0.2)' : 'grayscale(0)',
      }}
      whileHover={{ scale: isActive ? 1.08 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ zIndex: isHovered ? 50 : (isActive ? 20 : 10) }}
      className={clsx(
        "relative flex flex-col items-center justify-center p-3 rounded-2xl border-[1.5px] transition-colors duration-300 w-40 h-24 cursor-help",
        getColors()
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Type Label Badge */}
      {getTypeLabel() && (
         <span className={clsx(
            "absolute -top-2.5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full transition-colors border",
            isActive 
                ? "bg-indigo-700 text-indigo-50 border-indigo-600" 
                : "bg-slate-100 text-slate-400 border-slate-200 group-hover:border-indigo-200"
         )}>
            {getTypeLabel()}
         </span>
      )}
      
      {/* Icon */}
      {Icon && (
        <div className={clsx("mb-2 transition-transform duration-300", isActive && "scale-110")}>
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        </div>
      )}
      
      {/* Label */}
      <span className="text-xs font-bold text-center leading-tight px-1">{node.label}</span>
      
      {/* Connecting Line Stub (visual only) */}
      <div className="absolute -bottom-4 w-0.5 h-4 bg-slate-200 -z-10" />

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
            <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full mb-3 w-56 bg-slate-900/95 text-slate-50 text-xs p-3 rounded-xl shadow-xl backdrop-blur-md border border-white/10 pointer-events-none text-left"
            >
                {/* Tooltip Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900/95 rotate-45 border-r border-b border-white/10"></div>
                
                {/* Tooltip Content */}
                <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-white/10">
                    {Icon && <Icon size={14} className="text-indigo-300" />}
                    <span className="font-bold text-white">{node.label}</span>
                </div>
                <p className="leading-relaxed text-slate-300 font-normal">
                    {node.description}
                </p>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

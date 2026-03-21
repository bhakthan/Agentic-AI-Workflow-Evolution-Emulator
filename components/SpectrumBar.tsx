import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  intelligence: number;
  autonomy: number;
}

export const SpectrumBar: React.FC<Props> = ({ intelligence, autonomy }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-6 px-4">
        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <span>Determinism</span>
            <span>Intelligent Orchestration</span>
            <span>Complete Autonomy</span>
        </div>
        
        {/* The Bar Container */}
        <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            {/* Background Gradients/Sections if desired, strictly simplified for clean UI */}
            
            {/* Intelligence Indicator */}
            <motion.div 
                className="absolute top-0 bottom-0 left-0 bg-blue-400/50 z-10"
                initial={{ width: '0%' }}
                animate={{ width: `${intelligence}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Autonomy Indicator (Primary) */}
            <motion.div 
                className="absolute top-0 bottom-0 left-0 bg-indigo-600 z-20 mix-blend-multiply"
                initial={{ width: '0%' }}
                animate={{ width: `${autonomy}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />
        </div>

        <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
                <span>Autonomy Level: {autonomy}%</span>
            </div>
            <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                <span>Intelligence Level: {intelligence}%</span>
            </div>
        </div>
    </div>
  );
};
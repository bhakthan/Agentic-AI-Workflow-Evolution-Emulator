import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, ChevronRight, ChevronLeft, Info, CheckCircle2 } from 'lucide-react';
import { STAGES } from './constants';
import { StageId } from './types';
import { WorkflowLayout, AIWorkflowLayout, AgenticLayout, AIAgentLayout } from './components/Layouts';
import { SpectrumBar } from './components/SpectrumBar';
import { clsx } from 'clsx';

const App: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1); // -1 = Not started
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  
  const activeStage = STAGES[activeStageIdx];
  const timerRef = useRef<number | null>(null);

  // Reset function
  const resetStage = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setCompletedNodes([]);
    if (timerRef.current) window.clearTimeout(timerRef.current);
  };

  // Switch stage handler
  const handleStageChange = (idx: number) => {
    if (idx < 0 || idx >= STAGES.length) return;
    setActiveStageIdx(idx);
    resetStage();
  };

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      const totalSteps = activeStage.nodes.length;
      
      if (currentStep < totalSteps) {
        timerRef.current = window.setTimeout(() => {
            // Mark current as complete before moving to next
            if (currentStep >= 0) {
                setCompletedNodes(prev => [...prev, activeStage.nodes[currentStep].id]);
            }
            
            if (currentStep === totalSteps - 1) {
                setIsPlaying(false); // Stop at end
            } else {
                setCurrentStep(prev => prev + 1);
            }
        }, 1500); // Time per step
      }
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, activeStage]);

  const activeNode = currentStep >= 0 ? activeStage.nodes[currentStep] : null;
  const isFinished = completedNodes.length === activeStage.nodes.length;

  const renderLayout = () => {
    const props = { 
        activeNodeId: activeNode?.id || null, 
        completedNodes 
    };
    switch (activeStage.id) {
      case StageId.WORKFLOW: return <WorkflowLayout {...props} />;
      case StageId.AI_POWERED: return <AIWorkflowLayout {...props} />;
      case StageId.AGENTIC: return <AgenticLayout {...props} />;
      case StageId.AI_AGENT: return <AIAgentLayout {...props} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm/50 backdrop-blur-sm bg-white/80">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
            <span className="bg-indigo-600 text-white p-1 rounded text-xs">v2025</span>
            Generative AI vs. AI Agents
          </h1>
          <p className="text-sm text-slate-500 font-medium">The Evolution of Automation</p>
        </div>
        
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl">
            {STAGES.map((s, i) => (
                <button
                    key={s.id}
                    onClick={() => handleStageChange(i)}
                    className={clsx(
                        "px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200",
                        activeStageIdx === i 
                            ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200" 
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    )}
                >
                    {s.title}
                </button>
            ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center relative overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 h-full">
            
            {/* Left Panel: Description & Controls */}
            <div className="lg:w-[380px] flex-shrink-0 flex flex-col gap-6 z-30">
                <motion.div 
                    key={activeStage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 relative overflow-hidden"
                >
                    {/* Decorative background blob */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

                    <div className="relative">
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 mb-4">
                            {activeStage.spectrumLabel}
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{activeStage.title}</h2>
                        <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wide">{activeStage.subtitle}</h3>
                        <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                            {activeStage.description}
                        </p>

                        {/* Dynamic Step Info */}
                        <div className="mt-6 pt-6 border-t border-slate-100">
                             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Info size={14} /> 
                                <span>Current Action</span>
                            </h4>
                            <div className="min-h-[80px]">
                                <AnimatePresence mode="wait">
                                    {activeNode ? (
                                        <motion.div
                                            key={activeNode.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 shadow-sm"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                {activeNode.icon && <activeNode.icon size={16} className="text-indigo-600"/>}
                                                <div className="font-bold text-indigo-900 text-sm">{activeNode.label}</div>
                                            </div>
                                            <div className="text-slate-600 text-sm leading-snug pl-6">{activeNode.description}</div>
                                        </motion.div>
                                    ) : isFinished ? (
                                        <motion.div 
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100"
                                        >
                                            <CheckCircle2 size={24} />
                                            <span className="font-semibold text-sm">Workflow Completed</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="text-slate-400 italic text-sm p-2"
                                        >
                                            Click "Simulate" to visualize the process flow.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Controls */}
                <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm z-30">
                    <button 
                        onClick={() => handleStageChange(activeStageIdx - 1)}
                        disabled={activeStageIdx === 0}
                        className="p-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex gap-3 flex-1 justify-center">
                        <button
                            onClick={() => {
                                if (isPlaying) {
                                    setIsPlaying(false);
                                } else {
                                    if (currentStep >= activeStage.nodes.length - 1) {
                                        resetStage();
                                        setTimeout(() => setIsPlaying(true), 100);
                                    } else {
                                        setIsPlaying(true);
                                        if (currentStep === -1) setCurrentStep(0);
                                    }
                                }
                            }}
                            className={clsx(
                                "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all active:scale-95",
                                isPlaying 
                                    ? "bg-amber-500 hover:bg-amber-600 ring-2 ring-amber-100" 
                                    : isFinished 
                                        ? "bg-emerald-600 hover:bg-emerald-700 ring-2 ring-emerald-100"
                                        : "bg-indigo-600 hover:bg-indigo-700 ring-2 ring-indigo-100"
                            )}
                        >
                            {isPlaying ? (
                                <><Pause size={18} fill="currentColor" className="opacity-80"/> Pause</>
                            ) : isFinished ? (
                                <><RefreshCw size={18} /> Replay</>
                            ) : (
                                <><Play size={18} fill="currentColor" className="opacity-80"/> Simulate</>
                            )}
                        </button>
                        
                        {!isFinished && (
                            <button 
                                onClick={resetStage}
                                disabled={currentStep === -1}
                                className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-30 transition-colors"
                                title="Reset Simulation"
                            >
                                <RefreshCw size={20} />
                            </button>
                        )}
                    </div>

                    <button 
                        onClick={() => handleStageChange(activeStageIdx + 1)}
                        disabled={activeStageIdx === STAGES.length - 1}
                        className="p-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Right Panel: Visualization */}
            <div className="flex-1 relative flex flex-col min-h-[600px]">
                 {/* Background Container (Clipped) */}
                 <div className="absolute inset-0 bg-white/60 rounded-3xl border border-white/60 shadow-2xl shadow-slate-200/50 backdrop-blur-xl overflow-hidden z-0">
                     <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                          style={{ 
                              backgroundImage: 'radial-gradient(#6366f1 1.5px, transparent 1.5px)', 
                              backgroundSize: '32px 32px' 
                          }} 
                     />
                     {/* Gradient glow */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-indigo-50/50 to-transparent opacity-60"></div>
                 </div>

                 {/* Content Container (Visible Overflow for Tooltips) */}
                 <div className="relative z-10 flex-1 flex items-center justify-center p-8 overflow-visible">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStage.id}
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="w-full flex justify-center"
                        >
                            {renderLayout()}
                        </motion.div>
                    </AnimatePresence>
                 </div>
            </div>
        </div>

        {/* Footer Spectrum */}
        <div className="w-full bg-white/80 backdrop-blur border-t border-slate-200 py-6 mt-auto z-20">
            <SpectrumBar 
                autonomy={activeStage.autonomyLevel} 
                intelligence={activeStage.intelligenceLevel} 
            />
        </div>
      </main>
    </div>
  );
};

export default App;

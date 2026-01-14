import React, { useState, useEffect, useRef } from 'react';
import { AlgorithmType, Frame, ArrayFrame, GridFrame, IntervalFrame, GraphFrame, GraphNode, LinkedListFrame, TrieFrame, LinkedListNode, TrieNode } from '../types';
import { 
  generateBinarySearchFrames, 
  generateLinearSearchFrames,
  generateTwoPointersFrames,
  generateBubbleSortFrames,
  generateSelectionSortFrames,
  generateInsertionSortFrames,
  generateMergeSortFrames,
  generateQuickSortFrames,
  generateUnionFindFrames,
  generateBFSFrames, 
  generateDFSFrames,
  generateDijkstraFrames,
  generateAStarFrames,
  generateBellmanFordFrames,
  generateIntervalSchedulingFrames,
  generateSlidingWindowFrames,
  generateMonotonicStackFrames,
  generateLinkedListFrames,
  generateTrieFrames
} from '../lib/algorithms';
import { algorithmPseudocode } from '../lib/pseudocode';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Shuffle, MoveRight, PenLine, X, AlertCircle, FileCode, Move } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisualizerProps {
  algorithm: AlgorithmType;
  onFrameChange?: (frame: Frame) => void;
}

const Visualizer: React.FC<VisualizerProps> = ({ algorithm, onFrameChange }) => {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // ms
  
  // Custom Input State
  const [showInputModal, setShowInputModal] = useState(false);
  const [inputArrayStr, setInputArrayStr] = useState('');
  const [inputTargetStr, setInputTargetStr] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  // Pseudocode State
  const [showCode, setShowCode] = useState(true);
  
  // Refs to keep track of intervals
  const intervalRef = useRef<number | null>(null);

  // Determine if the current algorithm supports custom array input
  const supportsCustomInput = [
    AlgorithmType.LINEAR_SEARCH,
    AlgorithmType.BINARY_SEARCH,
    AlgorithmType.TWO_POINTERS,
    AlgorithmType.SLIDING_WINDOW,
    AlgorithmType.BUBBLE_SORT,
    AlgorithmType.SELECTION_SORT,
    AlgorithmType.INSERTION_SORT,
    AlgorithmType.MERGE_SORT,
    AlgorithmType.QUICK_SORT,
    AlgorithmType.MONOTONIC_STACK
  ].includes(algorithm);

  const requiresTarget = [
    AlgorithmType.LINEAR_SEARCH,
    AlgorithmType.BINARY_SEARCH,
    AlgorithmType.TWO_POINTERS,
    AlgorithmType.SLIDING_WINDOW
  ].includes(algorithm);

  const requiresSorted = [
      AlgorithmType.BINARY_SEARCH,
      AlgorithmType.TWO_POINTERS
  ].includes(algorithm);

  // Initialize Algorithm Logic
  const initAlgorithm = (customData?: { array: number[], target?: number }) => {
    setIsPlaying(false);
    setCurrentFrameIndex(0);

    let framesGenerated: Frame[] = [];

    // Helper for random data if no custom data provided
    const getRandomArray = (len: number, max: number = 99) => Array.from({ length: len }, () => Math.floor(Math.random() * max) + 1);
    const getRandomTarget = (arr: number[]) => Math.random() > 0.3 ? arr[Math.floor(Math.random() * arr.length)] : 100;

    // --- Searching ---
    if (algorithm === AlgorithmType.BINARY_SEARCH) {
      const array = customData ? [...customData.array].sort((a,b) => a-b) : getRandomArray(13).sort((a, b) => a - b);
      const target = customData?.target ?? getRandomTarget(array);
      framesGenerated = generateBinarySearchFrames(array, target);
    } 
    else if (algorithm === AlgorithmType.LINEAR_SEARCH) {
      const array = customData?.array ?? getRandomArray(12);
      const target = customData?.target ?? getRandomTarget(array);
      framesGenerated = generateLinearSearchFrames(array, target);
    }
    else if (algorithm === AlgorithmType.TWO_POINTERS) {
      const array = customData ? [...customData.array].sort((a,b) => a-b) : getRandomArray(10, 20).sort((a, b) => a - b);
      let target = customData?.target;
      
      if (target === undefined) {
         const idx1 = Math.floor(Math.random() * (array.length/2));
         const idx2 = array.length - 1 - Math.floor(Math.random() * (array.length/2));
         target = array[idx1] + array[idx2];
      }
      framesGenerated = generateTwoPointersFrames(array, target);
    }
    else if (algorithm === AlgorithmType.SLIDING_WINDOW) {
        const array = customData?.array ?? getRandomArray(12, 9);
        const target = customData?.target ?? (Math.floor(Math.random() * 10) + 15);
        framesGenerated = generateSlidingWindowFrames(array, target);
    }

    else if (algorithm === AlgorithmType.BUBBLE_SORT || algorithm === AlgorithmType.SELECTION_SORT || algorithm === AlgorithmType.INSERTION_SORT || algorithm === AlgorithmType.MERGE_SORT || algorithm === AlgorithmType.QUICK_SORT) {
      const array = customData?.array ?? getRandomArray(8);
      
      if (algorithm === AlgorithmType.BUBBLE_SORT) framesGenerated = generateBubbleSortFrames(array);
      else if (algorithm === AlgorithmType.SELECTION_SORT) framesGenerated = generateSelectionSortFrames(array);
      else if (algorithm === AlgorithmType.INSERTION_SORT) framesGenerated = generateInsertionSortFrames(array);
      else if (algorithm === AlgorithmType.MERGE_SORT) framesGenerated = generateMergeSortFrames(array);
      else if (algorithm === AlgorithmType.QUICK_SORT) framesGenerated = generateQuickSortFrames(array);
    }
    
    else if (algorithm === AlgorithmType.MONOTONIC_STACK) {
        const array = customData?.array ?? getRandomArray(10, 20);
        framesGenerated = generateMonotonicStackFrames(array);
    }

    else if (algorithm === AlgorithmType.BFS) framesGenerated = generateBFSFrames();
    else if (algorithm === AlgorithmType.DFS) framesGenerated = generateDFSFrames();
    else if (algorithm === AlgorithmType.UNION_FIND) framesGenerated = generateUnionFindFrames(12);
    else if (algorithm === AlgorithmType.BELLMAN_FORD) framesGenerated = generateBellmanFordFrames();
    else if (algorithm === AlgorithmType.LINKED_LIST) framesGenerated = generateLinkedListFrames();
    else if (algorithm === AlgorithmType.TRIE) framesGenerated = generateTrieFrames();
    else if (algorithm === AlgorithmType.INTERVAL_SCHEDULING) framesGenerated = generateIntervalSchedulingFrames();
    else if (algorithm === AlgorithmType.DIJKSTRA || algorithm === AlgorithmType.A_STAR) {
      const rows = 10;
      const cols = 15;
      const start: [number, number] = [1, 1];
      const end: [number, number] = [8, 13];
      const walls = new Set<string>();
      for(let r=0; r<rows; r++) {
          for(let c=0; c<cols; c++) {
              if (Math.random() < 0.25 && !(r===start[0] && c===start[1]) && !(r===end[0] && c===end[1])) {
                  walls.add(`${r},${c}`);
              }
          }
      }
      if (algorithm === AlgorithmType.DIJKSTRA) framesGenerated = generateDijkstraFrames(rows, cols, start, end, walls);
      else if (algorithm === AlgorithmType.A_STAR) framesGenerated = generateAStarFrames(rows, cols, start, end, walls);
    }

    setFrames(framesGenerated);
  };

  const handleCustomDataSubmit = () => {
    setInputError(null);

    if (!/^[\d,\s-]+$/.test(inputArrayStr)) {
        setInputError("Invalid characters. Only numbers, commas, and dashes allowed.");
        return;
    }

    const rawArray = inputArrayStr.split(',')
        .map(s => s.trim())
        .filter(s => s !== '')
        .map(Number);
    
    if (rawArray.some(isNaN)) {
        setInputError("Array contains invalid numbers.");
        return;
    }

    if (rawArray.length === 0) {
        setInputError("Array cannot be empty.");
        return;
    }

    if (rawArray.length > 20) {
        setInputError("Maximum 20 elements allowed to maintain performance.");
        return;
    }
    
    if (rawArray.some(n => Math.abs(n) > 999)) {
        setInputError("Numbers must be between -999 and 999.");
        return;
    }

    let parsedTarget: number | undefined = undefined;
    if (requiresTarget) {
        if (!/^[\d\s-]+$/.test(inputTargetStr)) {
            setInputError("Target must be a valid number.");
            return;
        }
        parsedTarget = Number(inputTargetStr.trim());
        if (isNaN(parsedTarget)) {
            setInputError("Target is not a valid number.");
            return;
        }
    }

    initAlgorithm({ array: rawArray, target: parsedTarget });
    setShowInputModal(false);
  };

  useEffect(() => {
    initAlgorithm();
    setInputArrayStr('');
    setInputTargetStr('');
    setInputError(null);
  }, [algorithm]);

  useEffect(() => {
    if (frames.length > 0 && frames[currentFrameIndex]) {
        onFrameChange?.(frames[currentFrameIndex]);
    }
  }, [currentFrameIndex, frames, onFrameChange]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentFrameIndex(prev => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, frames.length, speed]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => initAlgorithm();
  const stepForward = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(prev => Math.min(prev + 1, frames.length - 1));
  };
  const stepBack = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(prev => Math.max(prev - 1, 0));
  };

  const currentFrame = frames[currentFrameIndex];
  const pseudocodeLines = algorithmPseudocode[algorithm];

  if (!currentFrame) return <div className="p-10 text-center text-brand-600">Initializing...</div>;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ring-1 ring-black/5 relative">
      
      {/* Custom Input Modal */}
      {showInputModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden ring-1 ring-black/10 scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <PenLine size={16} className="text-brand-600" />
                        Custom Data
                    </h3>
                    <button onClick={() => setShowInputModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Array (Comma Separated)</label>
                        <input 
                            type="text" 
                            value={inputArrayStr}
                            onChange={(e) => setInputArrayStr(e.target.value)}
                            placeholder="e.g. 10, 5, 8, 3, 1"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-mono text-slate-700 placeholder-slate-400"
                        />
                        <p className="text-[10px] text-slate-400">Max 20 numbers. Values -999 to 999.</p>
                    </div>

                    {requiresTarget && (
                        <div className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Value</label>
                             <input 
                                type="number" 
                                value={inputTargetStr}
                                onChange={(e) => setInputTargetStr(e.target.value)}
                                placeholder="e.g. 5"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-mono text-slate-700"
                             />
                        </div>
                    )}

                    {requiresSorted && (
                        <div className="flex items-start gap-2 p-3 bg-amber-50 text-amber-700 text-xs rounded-lg border border-amber-100">
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            <p>This algorithm requires sorted data. Your input will be automatically sorted.</p>
                        </div>
                    )}

                    {inputError && (
                         <div className="flex items-start gap-2 p-3 bg-rose-50 text-rose-600 text-xs rounded-lg border border-rose-100 animate-in slide-in-from-top-1">
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            <p className="font-medium">{inputError}</p>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
                    <button 
                        onClick={() => setShowInputModal(false)}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleCustomDataSubmit}
                        className="px-4 py-2 text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 rounded-lg shadow-sm shadow-brand-500/20 transition-all active:scale-95"
                    >
                        Visualize
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Controls Header - Added relative z-20 to ensure tooltips are not clipped by canvas overlap */}
      <div className="bg-slate-50/50 p-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-4 backdrop-blur-sm shrink-0 relative z-20">
        <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-800 mr-4 tracking-tight">{algorithm}</h2>
            
            <Tooltip text="Randomize Data">
                <button onClick={() => initAlgorithm()} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors shadow-sm">
                    <Shuffle size={18} />
                </button>
            </Tooltip>
            
            {supportsCustomInput && (
                <Tooltip text="Edit Data">
                    <button 
                        onClick={() => setShowInputModal(true)} 
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors shadow-sm" 
                    >
                        <PenLine size={18} />
                    </button>
                </Tooltip>
            )}

            <Tooltip text={showCode ? "Hide Code" : "Show Code"}>
                <button
                    onClick={() => setShowCode(!showCode)}
                    className={`p-2 rounded-lg border text-slate-600 transition-colors shadow-sm ${
                        showCode 
                        ? 'bg-brand-50 border-brand-200 text-brand-600' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:text-brand-600'
                    }`}
                >
                    <FileCode size={18} />
                </button>
            </Tooltip>

            <div className="h-6 w-px bg-slate-300 mx-2"></div>
            <button onClick={stepBack} disabled={currentFrameIndex === 0} className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30 text-slate-600 transition">
                <ChevronLeft size={20} />
            </button>
            <button onClick={togglePlay} className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 transition shadow-lg shadow-brand-500/20">
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={stepForward} disabled={currentFrameIndex === frames.length - 1} className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30 text-slate-600 transition">
                <ChevronRight size={20} />
            </button>
            <Tooltip text="Reset">
                <button onClick={() => setCurrentFrameIndex(0)} className="p-2 ml-2 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition">
                    <RotateCcw size={18} />
                </button>
            </Tooltip>
        </div>

        <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-slate-600 font-mono bg-slate-100 px-2 py-1 rounded">
                Step: {currentFrameIndex + 1}/{frames.length}
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Speed</span>
                <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="50" 
                    value={1050 - speed} 
                    onChange={(e) => setSpeed(1050 - Number(e.target.value))}
                    className="w-28 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600 hover:accent-brand-700"
                />
            </div>
        </div>
      </div>

      {/* Visualization Canvas Container */}
      <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 relative z-10">
        
        {/* Description Box - Static Position */}
        <div className="w-full flex justify-center pt-6 px-6 z-10 shrink-0">
             <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-xl shadow-sm border border-brand-100 max-w-2xl w-full ring-1 ring-brand-500/10 flex items-start gap-3 transition-all duration-300">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-500 shrink-0 animate-pulse"></div>
                <p className="text-slate-700 font-medium text-sm leading-relaxed">{currentFrame.description}</p>
             </div>
        </div>

        {/* Pseudocode Overlay - Draggable with Framer Motion */}
        {showCode && pseudocodeLines && (
            <motion.div 
                drag
                dragMomentum={false} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute z-40 w-72 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 overflow-hidden ring-1 ring-black/5 right-4 top-4 cursor-move"
                style={{ touchAction: "none" }}
            >
                <div 
                    className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex justify-between items-center select-none"
                >
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Move size={12} />
                        Pseudocode
                    </span>
                    <button 
                        onClick={() => setShowCode(false)} 
                        onPointerDownCapture={(e) => e.stopPropagation()} 
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <X size={14}/>
                    </button>
                </div>
                <div className="p-3 font-mono text-xs overflow-auto max-h-[60vh] cursor-text" onPointerDownCapture={(e) => e.stopPropagation()}>
                    {pseudocodeLines.map((line, idx) => (
                        <div 
                            key={idx} 
                            className={`py-0.5 rounded transition-colors duration-200 whitespace-pre ${
                                currentFrame.codeLine === idx 
                                ? 'bg-amber-100 text-amber-900 font-bold border-l-2 border-amber-500 pl-1.5' 
                                : 'text-slate-600 pl-2'
                            }`}
                        >
                            {line}
                        </div>
                    ))}
                </div>
            </motion.div>
        )}

        {/* Scrollable Visualization Area */}
        <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center">
            {currentFrame.type === 'array' && <ArrayRenderer frame={currentFrame} />}
            {currentFrame.type === 'grid' && <GridRenderer frame={currentFrame} />}
            {currentFrame.type === 'interval' && <IntervalRenderer frame={currentFrame} />}
            {currentFrame.type === 'graph' && <GraphRenderer frame={currentFrame} />}
            {currentFrame.type === 'linked-list' && <LinkedListRenderer frame={currentFrame} />}
            {currentFrame.type === 'trie' && <TrieRenderer frame={currentFrame} />}
        </div>
      </div>
    </div>
  );
};

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="relative flex items-center justify-center" 
             onMouseEnter={() => setIsVisible(true)} 
             onMouseLeave={() => setIsVisible(false)}>
            {children}
            {isVisible && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-lg whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150">
                    {text}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900"></div>
                </div>
            )}
        </div>
    )
}

const ArrayRenderer: React.FC<{ frame: ArrayFrame }> = ({ frame }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px]">
      
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-12 w-full px-4 py-8 max-w-5xl">
        {frame.array.map((value, idx) => {
            const isMid = frame.mid === idx;
            const isFound = frame.foundIndex === idx;
            const inRange = (frame.left !== undefined && frame.right !== undefined) 
                ? (idx >= frame.left && idx <= frame.right) 
                : true;
            
            const isLeft = frame.left === idx;
            const isRight = frame.right === idx;
            const isPivot = frame.pivotIndex === idx;
            
            const isComparing = frame.compareIndices?.includes(idx);
            const isSwapping = frame.swapIndices?.includes(idx);
            const isSorted = frame.sortedIndices?.includes(idx);
            const isHighlighted = frame.highlightIndices?.includes(idx);
            const isOverwriting = frame.overwriteIndex === idx;

            let boxClass = "bg-slate-50 border-2 border-slate-200 text-slate-300";
            let containerClass = "opacity-40 scale-95 blur-[0.5px]";

            if (inRange) {
                boxClass = "bg-white border-2 border-brand-400 text-brand-600 shadow-sm";
                containerClass = "opacity-100 scale-100";
            }
            
            if (isComparing) {
                boxClass = "bg-orange-100 border-2 border-orange-400 text-orange-600 scale-105 shadow-md";
                containerClass = "opacity-100 z-10";
            }

            if (isSwapping || isOverwriting) {
                 boxClass = "bg-purple-100 border-2 border-purple-500 text-purple-700 scale-110 shadow-lg ring-2 ring-purple-100";
                 containerClass = "opacity-100 z-20";
            }

            if (isSorted) {
                 boxClass = "bg-emerald-50 border-2 border-emerald-400 text-emerald-600";
                 containerClass = "opacity-100";
            }
            
            if (isMid || isHighlighted) {
                boxClass = "bg-amber-400 border-2 border-amber-500 text-white shadow-lg shadow-amber-200 ring-2 ring-amber-100";
                containerClass = "opacity-100 scale-110 z-30"; 
            }

            if (isPivot) {
                boxClass = "bg-rose-500 border-2 border-rose-600 text-white shadow-lg shadow-rose-200 ring-4 ring-rose-100";
                containerClass = "opacity-100 scale-110 z-30";
            }

            if (isFound) {
                boxClass = "bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg shadow-emerald-200 ring-2 ring-emerald-100";
                containerClass = "opacity-100 scale-110 z-30"; 
            }

            return (
              <div key={idx} className={`flex flex-col items-center justify-start group transition-all duration-300 ease-out ${containerClass}`}>
                 <div className={`
                    w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-300
                    ${boxClass}
                 `}>
                    {value}
                 </div>
                 
                 <span className="mt-2 text-xs text-slate-400 font-mono font-medium">{idx}</span>

                 <div className="relative w-full flex flex-col items-center h-8">
                    {isMid && (
                        <div className="absolute -top-1 flex flex-col items-center animate-in slide-in-from-bottom-2 duration-300">
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-amber-500 mb-1"></div>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shadow-sm whitespace-nowrap">Current</span>
                        </div>
                    )}
                    
                    {isPivot && (
                        <div className="absolute -top-1 flex flex-col items-center animate-in slide-in-from-bottom-2 duration-300 z-40">
                             <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-rose-500 mb-1"></div>
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 shadow-sm whitespace-nowrap">Pivot</span>
                        </div>
                    )}

                    <div className={`absolute ${isMid || isPivot ? 'top-8' : 'top-1'} flex gap-1 transition-all duration-300`}>
                        {isLeft && (
                             <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200 shadow-sm min-w-[20px] text-center" title="Left Bound">L</span>
                        )}
                        {isRight && (
                             <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200 shadow-sm min-w-[20px] text-center" title="Right Bound">R</span>
                        )}
                    </div>
                 </div>
              </div>
            );
        })}
      </div>

      <div className="w-full flex flex-col items-center space-y-8 mt-4">
        
        {frame.windowSum !== undefined && (
             <div className="bg-slate-900 text-white px-6 py-2 rounded-full font-mono text-sm shadow-lg animate-in slide-in-from-bottom-4">
                 Window Sum: <span className="font-bold text-brand-300 text-lg ml-2">{frame.windowSum}</span>
             </div>
        )}

        {frame.stack && (
            <div className="flex flex-col items-center animate-in fade-in duration-500 w-full">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Monotonic Stack (Indices)</h4>
                <div className="flex items-center justify-start gap-3 h-24 p-4 bg-slate-100 rounded-xl border border-slate-200 min-w-[300px] overflow-x-auto shadow-inner">
                    <span className="text-xs text-slate-400 font-mono mr-2 border-r border-slate-300 pr-2 self-center">BOTTOM</span>
                    {frame.stack.length === 0 ? (
                        <span className="text-slate-400 text-sm italic">Empty</span>
                    ) : (
                        frame.stack.map((valIndex, i) => {
                             const isTop = i === frame.stack!.length - 1;
                             return (
                             <div key={i} className={`
                                relative flex flex-col items-center justify-center w-12 h-16 bg-white border-2 rounded-lg shadow-sm transition-all duration-300
                                ${isTop ? 'border-brand-500 ring-2 ring-brand-100 scale-105 z-10' : 'border-slate-300 text-slate-400'}
                             `}>
                                 {isTop && <span className="absolute -top-3 bg-brand-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">TOP</span>}
                                 <span className={`text-lg font-bold ${isTop ? 'text-brand-600' : 'text-slate-500'}`}>{frame.array[valIndex]}</span>
                                 <span className="text-[10px] text-slate-400 font-mono mt-0.5">idx:{valIndex}</span>
                             </div>
                             );
                        })
                    )}
                </div>
                <p className="text-xs text-slate-400 mt-2">Stores indices of elements that haven't found a greater element yet.</p>
            </div>
        )}

        {frame.secondArray && (
            <div className="flex flex-col items-center animate-in fade-in duration-500 w-full max-w-4xl">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Result Array (Next Greater Element)</h4>
                 <div className="flex flex-wrap items-center justify-center gap-2">
                     {frame.secondArray.map((val, idx) => (
                         <div key={idx} className={`
                             w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm border-2 transition-all duration-300
                             ${val === -1 ? 'border-slate-200 text-slate-300 bg-slate-50' : 'border-indigo-200 text-indigo-600 bg-indigo-50 font-bold'}
                             ${frame.overwriteIndex === idx ? 'scale-110 ring-2 ring-indigo-400 border-indigo-500 bg-white' : ''}
                         `}>
                             {val}
                         </div>
                     ))}
                 </div>
            </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4 sm:gap-8 mt-12 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 justify-center">
           <div className="flex items-center gap-2">
               <div className="w-5 h-5 rounded border-2 border-brand-400 bg-white"></div> 
               <span>Range</span>
           </div>
           <div className="flex items-center gap-2">
               <div className="w-5 h-5 rounded border-2 border-orange-400 bg-orange-100"></div> 
               <span>Compare</span>
           </div>
           <div className="flex items-center gap-2">
               <div className="w-5 h-5 rounded border-2 border-purple-500 bg-purple-100"></div> 
               <span>Swap/Write</span>
           </div>
           {frame.pivotIndex !== undefined && (
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-rose-600 bg-rose-500"></div> 
                    <span>Pivot</span>
                </div>
           )}
           <div className="flex items-center gap-2">
               <div className="w-5 h-5 rounded border-2 border-amber-500 bg-amber-400"></div> 
               <span>Pointer</span>
           </div>
      </div>
    </div>
  );
};

const GridRenderer: React.FC<{ frame: GridFrame }> = ({ frame }) => {
  return (
    <div className="grid gap-1 p-4 bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100"
      style={{ 
        gridTemplateColumns: `repeat(${frame.grid[0].length}, minmax(0, 1fr))` 
      }}>
      {frame.grid.map((row, rIdx) => (
          row.map((cell, cIdx) => {
              let cellClass = "w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-xs transition-all duration-300 border border-transparent relative overflow-hidden";
              
              if (cell.isStart) cellClass += " bg-emerald-500 text-white font-bold shadow-md scale-105 z-10";
              else if (cell.isEnd) cellClass += " bg-rose-500 text-white font-bold shadow-md scale-105 z-10";
              else if (cell.isWall) cellClass += " bg-slate-800 rounded-sm";
              else if (cell.isCurrent) cellClass += " bg-amber-400 scale-110 shadow-lg ring-4 ring-amber-400/20 z-20";
              else if (cell.isPath) cellClass += " bg-emerald-400 shadow-inner scale-95 rounded-sm";
              else if (cell.isVisited) cellClass += " bg-brand-100 border-brand-200";
              else cellClass += " bg-slate-50 border-slate-100";

              return (
                  <div key={`${rIdx}-${cIdx}`} className={cellClass}>
                      {cell.isStart ? 'S' : cell.isEnd ? 'E' : (
                          <>
                           {cell.weight && cell.weight > 1 && (
                               <span className="opacity-50 font-bold">{cell.weight}</span>
                           )}
                           {cell.distance !== Infinity && cell.distance !== undefined && (
                               <span className="absolute bottom-0 right-1 text-[8px] text-slate-500 font-mono">{cell.distance}</span>
                           )}
                          </>
                      )}
                  </div>
              )
          })
      ))}
    </div>
  );
}

const IntervalRenderer: React.FC<{ frame: IntervalFrame }> = ({ frame }) => {
    const minStart = Math.min(...frame.intervals.map(i => i.start));
    const maxEnd = Math.max(...frame.intervals.map(i => i.end));
    const span = maxEnd - minStart + 2;

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-slate-100 p-8 space-y-4">
                <div className="flex w-full border-b border-slate-200 pb-2 mb-4">
                    {Array.from({length: span}).map((_, i) => (
                        <div key={i} className="flex-1 text-[10px] text-slate-400 text-center border-l border-slate-100 h-2">
                        </div>
                    ))}
                </div>

                {frame.intervals.map((interval) => {
                    const leftPct = ((interval.start - minStart) / span) * 100;
                    const widthPct = ((interval.end - interval.start) / span) * 100;
                    
                    let barClass = "bg-slate-200 text-slate-500";
                    if (interval.isSelected) barClass = "bg-emerald-500 text-white shadow-md ring-2 ring-emerald-100";
                    else if (interval.isEliminated) barClass = "bg-rose-100 text-rose-300 line-through opacity-50";
                    else if (interval.isConsidered) barClass = "bg-amber-400 text-white shadow-lg scale-[1.02] z-10";

                    return (
                        <div key={interval.id} className="relative h-10 w-full bg-slate-50 rounded-lg overflow-hidden flex items-center">
                            <div 
                                className={`absolute h-8 rounded-md flex items-center justify-center text-xs font-bold transition-all duration-500 ${barClass}`}
                                style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                            >
                                {interval.id}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-6 mt-8">
                 <div className="flex items-center gap-2">
                     <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                     <span className="text-sm text-slate-600">Selected</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <div className="w-4 h-4 bg-amber-400 rounded"></div>
                     <span className="text-sm text-slate-600">Considering</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <div className="w-4 h-4 bg-rose-100 rounded border border-rose-200"></div>
                     <span className="text-sm text-slate-600">Eliminated</span>
                 </div>
            </div>
        </div>
    );
};

const GraphRenderer: React.FC<{ frame: GraphFrame }> = ({ frame }) => {
  const nodeMap = new Map<number, GraphNode>();
  frame.nodes.forEach(n => nodeMap.set(n.id, n));

  return (
    <div className="w-full h-full relative min-h-[400px] flex items-center justify-center p-4">
      <svg className="w-full h-full max-w-4xl max-h-[600px] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
         <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="8" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#94a3b8" />
            </marker>
             <marker id="arrowhead-highlight" markerWidth="6" markerHeight="4" refX="8" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#f59e0b" />
            </marker>
         </defs>
         
         {frame.edges.map((edge, idx) => {
             const u = nodeMap.get(edge.source);
             const v = nodeMap.get(edge.target);
             if (!u || !v) return null;
             
             const isHighlighted = frame.highlightEdges?.some(e => e.source === edge.source && e.target === edge.target);
             
             const midX = (u.x + v.x) / 2;
             const midY = (u.y + v.y) / 2;

             return (
                 <g key={`edge-${idx}`}>
                     <line
                        x1={u.x} y1={u.y}
                        x2={v.x} y2={v.y}
                        stroke={isHighlighted ? "#f59e0b" : "#cbd5e1"}
                        strokeWidth={isHighlighted ? "0.8" : "0.4"}
                        markerEnd={isHighlighted ? "url(#arrowhead-highlight)" : "url(#arrowhead)"}
                        className="transition-all duration-500 ease-in-out"
                     />
                     {edge.weight !== undefined && (
                         <g className="animate-in fade-in zoom-in-50 duration-500">
                             <rect x={midX - 2.5} y={midY - 2} width="5" height="4" rx="1" fill="white" fillOpacity="0.9" />
                             <text 
                                x={midX} y={midY} 
                                dy="0.35em" 
                                textAnchor="middle" 
                                fontSize="2" 
                                fontWeight={isHighlighted ? "bold" : "normal"}
                                fill={isHighlighted ? "#d97706" : "#64748b"}
                            >
                                {edge.weight}
                            </text>
                         </g>
                     )}
                 </g>
             );
         })}

         {frame.nodes.map((node) => {
             const isHighlighted = frame.highlightNodes?.includes(node.id);
             
             return (
                 <g key={node.id} className="transition-all duration-500 ease-in-out" style={{ transform: `translate(${node.x}px, ${node.y}px)` }}>
                     <circle
                        cx="0" cy="0"
                        r={isHighlighted ? "4.5" : "4"}
                        fill="white"
                        stroke={node.color}
                        strokeWidth={node.isRoot ? "0.8" : "0.5"}
                        className={`${isHighlighted ? 'filter drop-shadow-md' : ''} transition-all duration-300`}
                     />
                     <text
                        x="0" y="0"
                        dy="0.35em"
                        textAnchor="middle"
                        fontSize="2.5"
                        fontWeight="bold"
                        fill={node.color}
                        className="pointer-events-none select-none"
                     >
                        {node.id}
                     </text>
                     {node.isRoot && !node.label && (
                        <text
                           x="0" y="-5.5"
                           textAnchor="middle"
                           fontSize="1.5"
                           fill={node.color}
                           className="uppercase tracking-widest opacity-70"
                        >
                           ROOT
                        </text>
                     )}
                     {node.label && (
                         <g>
                             <rect x="-3" y="-7.5" width="6" height="3" rx="0.5" fill={node.color} className="opacity-90" />
                             <text
                                x="0" y="-6"
                                dy="0.35em"
                                textAnchor="middle"
                                fontSize="1.8"
                                fill="white"
                                fontWeight="bold"
                             >
                                {node.label}
                             </text>
                         </g>
                     )}
                 </g>
             );
         })}
      </svg>
    </div>
  );
};

const LinkedListRenderer: React.FC<{ frame: LinkedListFrame }> = ({ frame }) => {
    const visibleNodes = frame.nodes;

    const chain: LinkedListNode[] = [];
    const visited = new Set<number>();
    let curr = visibleNodes.find(n => n.isHead);
    while(curr && !visited.has(curr.id)) {
        chain.push(curr);
        visited.add(curr.id);
        if(curr.nextId === null) break;
        curr = visibleNodes.find(n => n.id === curr!.nextId);
    }
    
    const floating = visibleNodes.filter(n => !visited.has(n.id));

    return (
        <div className="flex flex-col w-full h-full p-6 overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-start overflow-x-auto pb-12 pt-12 px-4 scrollbar-thin scrollbar-thumb-slate-300 w-full">
                <div className="flex items-center min-w-max space-x-2 mx-auto">
                    {chain.map((node, index) => (
                        <div key={node.id} className="flex items-center">
                            <div className="relative flex flex-col items-center group mx-2">
                                {node.label && (
                                    <div className="absolute -top-12 animate-bounce flex flex-col items-center z-20">
                                        <span className="bg-brand-600 text-white text-xs px-2 py-1 rounded shadow-md font-bold uppercase tracking-wider whitespace-nowrap">{node.label}</span>
                                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-600 mt-[-1px]"></div>
                                    </div>
                                )}
                                
                                {node.isCurrent && !node.label && (
                                    <div className="absolute -top-10 animate-in slide-in-from-top-2 flex flex-col items-center z-20">
                                         <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-amber-500 mb-1"></div>
                                    </div>
                                )}

                                <div className={`
                                    w-20 h-20 rounded-2xl border-[3px] flex flex-col items-center justify-center shadow-lg transition-all duration-300 relative z-10 bg-white
                                    ${node.highlight ? 'border-emerald-500 text-emerald-700 shadow-emerald-100 scale-105' : 
                                      node.isCurrent ? 'border-amber-400 text-amber-700 ring-4 ring-amber-100' :
                                      'border-slate-200 text-slate-700'}
                                `}>
                                    <span className="text-2xl font-bold">{node.value}</span>
                                    <span className="text-[10px] text-slate-400 font-mono mt-1">0x{node.id}</span>
                                    
                                    {node.isHead && <span className="absolute -bottom-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">Head</span>}
                                    {node.isTail && <span className="absolute -bottom-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">Tail</span>}
                                </div>
                            </div>

                            <div className="flex items-center text-slate-300 mx-1">
                               {node.nextId === null ? (
                                   <div className="flex flex-col items-center ml-2 opacity-60">
                                        <div className="w-8 h-0.5 bg-slate-300"></div>
                                        <div className="w-8 h-8 border-2 border-slate-300 border-dashed rounded flex items-center justify-center text-[8px] text-slate-400 mt-2 bg-slate-50 font-bold">NULL</div>
                                   </div>
                               ) : (
                                   <MoveRight size={32} strokeWidth={1.5} className="text-slate-400" />
                               )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {floating.length > 0 && (
                 <div className="flex flex-col items-center w-full mt-4 border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Memory Pool / Disconnected</h4>
                    <div className="flex flex-wrap justify-center gap-8">
                        {floating.map(node => (
                             <div key={node.id} className="relative flex flex-col items-center">
                                {node.label && (
                                    <span className={`absolute -top-7 text-xs font-bold px-2 py-0.5 rounded shadow-sm uppercase ${
                                        node.label === 'Deleted' ? 'bg-rose-100 text-rose-500' : 'bg-indigo-100 text-indigo-500'
                                    }`}>{node.label}</span>
                                )}
                                <div className={`
                                    w-16 h-16 rounded-xl border-2 flex items-center justify-center text-xl font-bold shadow-md transition-all duration-300 bg-white
                                    ${node.label === 'Deleted' ? 'border-rose-300 text-rose-300 line-through opacity-70 border-dashed' : 'border-indigo-400 text-indigo-700 ring-2 ring-indigo-50'}
                                `}>
                                    {node.value}
                                </div>
                             </div>
                        ))}
                    </div>
                 </div>
            )}
        </div>
    );
};

const TrieRenderer: React.FC<{ frame: TrieFrame }> = ({ frame }) => {
    const nodeMap = new Map<string, TrieNode>(frame.nodes.map(n => [n.id, n]));
    
    return (
      <div className="w-full h-full relative min-h-[400px] flex items-center justify-center p-4">
        <svg className="w-full h-full max-w-4xl max-h-[600px] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
           {frame.nodes.map(parent => (
               parent.children.map(childId => {
                   const child = nodeMap.get(childId);
                   if (!child) return null;
                   return (
                       <line 
                           key={`${parent.id}-${child.id}`}
                           x1={parent.x} y1={parent.y}
                           x2={child.x} y2={child.y}
                           stroke="#cbd5e1"
                           strokeWidth="0.5"
                       />
                   )
               })
           ))}
  
           {frame.nodes.map(node => (
               <g key={node.id} style={{ transform: `translate(${node.x}px, ${node.y}px)` }} className="transition-all duration-500 ease-in-out">
                   <circle
                      r={node.isEndOfWord ? "3.5" : "3"}
                      fill={node.highlight ? "#10b981" : (node.isCurrent ? "#f59e0b" : "white")}
                      stroke={node.highlight ? "#059669" : (node.isCurrent ? "#d97706" : "#64748b")}
                      strokeWidth={node.isEndOfWord ? "0.8" : "0.5"}
                      className="transition-colors duration-300"
                   />
                   {node.isEndOfWord && (
                       <circle r="2.5" fill="none" stroke={node.highlight ? "#059669" : "#64748b"} strokeWidth="0.3" opacity="0.5" />
                   )}
                   
                   <text
                      y="0.3em"
                      textAnchor="middle"
                      fontSize="2.5"
                      fontWeight="bold"
                      fill={node.highlight || node.isCurrent ? "white" : "#475569"}
                      className="select-none pointer-events-none"
                   >
                       {node.char || "R"}
                   </text>
               </g>
           ))}
        </svg>
      </div>
    );
  };

export default Visualizer;
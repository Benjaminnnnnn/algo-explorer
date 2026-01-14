import React, { useEffect, useState, useRef } from 'react';
import { Search, X, ChevronRight, Command } from 'lucide-react';
import { AlgorithmType } from '../types';

interface AlgorithmOption {
  type: AlgorithmType;
  category: string;
  icon: React.ReactNode;
  desc: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (algo: AlgorithmType) => void;
  algorithms: AlgorithmOption[];
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelect, algorithms }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredAlgorithms = algorithms.filter(algo => 
    algo.type.toLowerCase().includes(query.toLowerCase()) || 
    algo.desc.toLowerCase().includes(query.toLowerCase()) ||
    algo.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Auto-scroll to active item
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeElement = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredAlgorithms.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredAlgorithms.length) % filteredAlgorithms.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredAlgorithms[activeIndex]) {
          onSelect(filteredAlgorithms[activeIndex].type);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredAlgorithms, activeIndex, onSelect, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-lg"
            placeholder="Search algorithms..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
          />
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
          >
            <span className="sr-only">Close</span>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium text-slate-500 bg-slate-100 rounded border border-slate-200">ESC</kbd>
            <X className="w-5 h-5 sm:hidden" />
          </button>
        </div>

        <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2">
          {filteredAlgorithms.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-500">
              <p>No algorithms found matching "{query}"</p>
            </div>
          ) : (
            <div className="px-2">
              <div className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">Results</div>
              {filteredAlgorithms.map((algo, index) => (
                <div key={algo.type} data-index={index}>
                     {/* Show category header if it's the first item or different from previous */}
                     {(index === 0 || filteredAlgorithms[index-1].category !== algo.category) && (
                         <div className="px-3 py-1.5 mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider opacity-70">
                             {algo.category}
                         </div>
                     )}
                    <button
                    onClick={() => {
                        onSelect(algo.type);
                        onClose();
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors group text-left ${
                        index === activeIndex ? 'bg-brand-50' : 'hover:bg-slate-50'
                    }`}
                    >
                    <div className={`p-2 rounded-md mr-3 transition-colors ${
                        index === activeIndex ? 'bg-white text-brand-600 shadow-sm' : 'bg-slate-100 text-slate-500'
                    }`}>
                        {algo.icon}
                    </div>
                    <div className="flex-1">
                        <div className={`font-medium ${index === activeIndex ? 'text-brand-700' : 'text-slate-700'}`}>
                        {algo.type}
                        </div>
                        <div className={`text-xs ${index === activeIndex ? 'text-brand-500' : 'text-slate-400'}`}>
                        {algo.desc}
                        </div>
                    </div>
                    {index === activeIndex && (
                        <ChevronRight className="w-4 h-4 text-brand-400" />
                    )}
                    </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
            <span>Use <kbd className="font-sans font-medium">↑</kbd> <kbd className="font-sans font-medium">↓</kbd> to navigate</span>
            <span><kbd className="font-sans font-medium">↵</kbd> to select</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
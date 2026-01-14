import React from 'react';
import { AlgorithmType } from '../types';
import { ChevronRight } from 'lucide-react';

interface AlgorithmOption {
  type: AlgorithmType;
  category: string;
  icon: React.ReactNode;
  desc: string;
}

interface ExploreProps {
  algorithms: AlgorithmOption[];
  onSelect: (algo: AlgorithmType) => void;
}

const Explore: React.FC<ExploreProps> = ({ algorithms, onSelect }) => {
  // Group algorithms by category
  const groupedAlgorithms = algorithms.reduce((acc, algo) => {
    if (!acc[algo.category]) acc[algo.category] = [];
    acc[algo.category].push(algo);
    return acc;
  }, {} as Record<string, AlgorithmOption[]>);

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-6 lg:p-8 scrollbar-hide">
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        <div className="text-center space-y-3 py-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Algorithms
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Select an algorithm below to visualize its execution, analyze time complexity, and learn with our AI tutor.
            </p>
        </div>

        {Object.entries(groupedAlgorithms).map(([category, algos]) => (
          <div key={category} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center space-x-3">
               <h2 className="text-lg font-bold text-slate-800 tracking-tight uppercase text-xs bg-slate-200/50 px-2 py-1 rounded-md">{category}</h2>
               <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {algos.map((algo) => (
                <button
                  key={algo.type}
                  onClick={() => onSelect(algo.type)}
                  className="group relative flex flex-col bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 hover:-translate-y-0.5 transition-all duration-200 text-left h-full"
                >
                  <div className="flex items-start justify-between mb-2">
                      <div className="p-2 bg-slate-50 rounded-lg w-fit text-brand-600 group-hover:bg-brand-50 group-hover:scale-105 transition-all duration-300 ring-1 ring-slate-100 group-hover:ring-brand-100">
                        {/* Scale down the icon slightly visually via transform if needed, but keeping original node */}
                        <div className="transform scale-90 origin-top-left">
                            {algo.icon}
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <ChevronRight size={16} className="text-brand-400" />
                      </div>
                  </div>
                  
                  <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-brand-700 transition-colors line-clamp-1" title={algo.type}>
                    {algo.type}
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-snug line-clamp-2">
                    {algo.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
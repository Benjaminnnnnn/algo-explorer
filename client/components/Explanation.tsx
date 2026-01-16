import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import { AlgorithmType } from '../types';
import { algorithmContent } from '../lib/algorithmContent';
import { BookOpen, Clock, HardDrive, Code, Copy, Check } from 'lucide-react';

interface ExplanationProps {
  algorithm: AlgorithmType;
}

type Language = 'cpp' | 'python' | 'javascript';

const Explanation: React.FC<ExplanationProps> = ({ algorithm }) => {
  const content = algorithmContent[algorithm];
  const [activeLang, setActiveLang] = useState<Language>('python');
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement | null>(null);

  const languageClass: Record<Language, string> = {
    cpp: 'cpp',
    python: 'python',
    javascript: 'javascript'
  };

  const copyToClipboard = () => {
    if (content?.code[activeLang]) {
      navigator.clipboard.writeText(content.code[activeLang]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [activeLang, content]);

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8">
        <BookOpen size={48} className="mb-4 opacity-50" />
        <h3 className="text-xl font-semibold">Content Coming Soon</h3>
        <p>Detailed explanation for {algorithm} is being written.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full p-6 lg:p-10 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">{content.title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Complexity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Time Complexity</h4>
              <p className="text-slate-600 font-mono text-sm mt-1">{content.complexity.time}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <HardDrive size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Space Complexity</h4>
              <p className="text-slate-600 font-mono text-sm mt-1">{content.complexity.space}</p>
            </div>
          </div>
        </div>

        {/* Implementation Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <div className="flex items-center space-x-2">
                <Code className="text-slate-400" size={20} />
                <h3 className="font-semibold text-slate-700">Implementation</h3>
             </div>
             
             <div className="flex items-center bg-slate-200 rounded-lg p-1 self-stretch sm:self-auto">
                {(['cpp', 'python', 'javascript'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                      activeLang === lang 
                        ? 'bg-white text-brand-700 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                  >
                    {lang === 'cpp' ? 'C++' : lang}
                  </button>
                ))}
             </div>
          </div>

          <div className="relative group">
            <button 
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-md opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                title="Copy code"
            >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
            <div className="bg-[#1e1e1e] p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                    <code ref={codeRef} className={`language-${languageClass[activeLang]}`}>{content.code[activeLang]}</code>
                </pre>
            </div>
          </div>
        </div>

        {/* Additional padding for bottom scroll */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default Explanation;

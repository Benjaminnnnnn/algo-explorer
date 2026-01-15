import {
  Activity,
  ArrowLeftRight,
  ArrowRightLeft,
  BarChartHorizontal,
  BookOpen,
  CalendarRange,
  ChevronRight,
  Code2,
  Combine,
  Command,
  Eye,
  GitGraph,
  Grid,
  Layers,
  Link,
  ListOrdered,
  Milestone,
  MousePointer2,
  Network,
  Search,
  X,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import AIChat from "./components/AIChat";
import CommandPalette from "./components/CommandPalette";
import Explanation from "./components/Explanation";
import Explore from "./components/Explore";
import Visualizer from "./components/Visualizer";
import { useEscapeKey } from "./hooks/useEscapeKey";
import { AlgorithmType, Frame } from "./types";

export const App: React.FC = () => {
  const [currentAlgo, setCurrentAlgo] = useState<AlgorithmType>(
    AlgorithmType.BINARY_SEARCH
  );
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isPaletteOpen, setPaletteOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"visualize" | "learn" | "explore">(
    "explore"
  );

  // Track the current frame for AI Context
  const [currentFrame, setCurrentFrame] = useState<Frame | null>(null);

  const algorithms = [
    {
      category: "Searching",
      type: AlgorithmType.LINEAR_SEARCH,
      icon: <ArrowLeftRight size={24} />,
      desc: "O(n) sequential search",
    },
    {
      category: "Searching",
      type: AlgorithmType.BINARY_SEARCH,
      icon: <Search size={24} />,
      desc: "O(log n) search on sorted arrays",
    },
    {
      category: "Searching",
      type: AlgorithmType.TWO_POINTERS,
      icon: <MousePointer2 size={24} />,
      desc: "Finding pairs in sorted arrays",
    },
    {
      category: "Searching",
      type: AlgorithmType.SLIDING_WINDOW,
      icon: <ArrowRightLeft size={24} />,
      desc: "Dynamic window for subarray problems",
    },

    {
      category: "Sorting",
      type: AlgorithmType.BUBBLE_SORT,
      icon: <ListOrdered size={24} />,
      desc: "O(n²) simple swapping sort",
    },
    {
      category: "Sorting",
      type: AlgorithmType.SELECTION_SORT,
      icon: <BarChartHorizontal size={24} />,
      desc: "O(n²) finding minimums",
    },
    {
      category: "Sorting",
      type: AlgorithmType.INSERTION_SORT,
      icon: <ListOrdered size={24} />,
      desc: "O(n²) building sorted array",
    },
    {
      category: "Sorting",
      type: AlgorithmType.MERGE_SORT,
      icon: <Combine size={24} />,
      desc: "O(n log n) divide and conquer",
    },
    {
      category: "Sorting",
      type: AlgorithmType.QUICK_SORT,
      icon: <Zap size={24} />,
      desc: "O(n log n) partition based sort",
    },

    {
      category: "Stack",
      type: AlgorithmType.MONOTONIC_STACK,
      icon: <Layers size={24} />,
      desc: "Find Next Greater/Smaller Element",
    },

    {
      category: "Graph",
      type: AlgorithmType.BFS,
      icon: <Activity size={24} />,
      desc: "Shortest path in unweighted graphs",
    },
    {
      category: "Graph",
      type: AlgorithmType.DFS,
      icon: <GitGraph size={24} />,
      desc: "Deep traversal for connectivity",
    },
    {
      category: "Graph",
      type: AlgorithmType.DIJKSTRA,
      icon: <Milestone size={24} />,
      desc: "Shortest path (weighted graphs)",
    },
    {
      category: "Graph",
      type: AlgorithmType.A_STAR,
      icon: <Zap size={24} />,
      desc: "Heuristic-based pathfinding",
    },
    {
      category: "Graph",
      type: AlgorithmType.BELLMAN_FORD,
      icon: <Activity size={24} />,
      desc: "Shortest path with edge relaxation",
    },
    {
      category: "Graph",
      type: AlgorithmType.UNION_FIND,
      icon: <Combine size={24} />,
      desc: "Disjoint Set Union (DSU) operations",
    },

    {
      category: "Data Structures",
      type: AlgorithmType.LINKED_LIST,
      icon: <Link size={24} />,
      desc: "Search, Insert, Delete nodes",
    },
    {
      category: "Data Structures",
      type: AlgorithmType.TRIE,
      icon: <Network size={24} />,
      desc: "Prefix tree for string operations",
    },

    {
      category: "Optimization",
      type: AlgorithmType.INTERVAL_SCHEDULING,
      icon: <CalendarRange size={24} />,
      desc: "Greedy selection of non-overlapping intervals",
    },
  ];

  // Group algorithms by category for sidebar (Hidden but preserved)
  const groupedAlgorithms = algorithms.reduce((acc, algo) => {
    if (!acc[algo.category]) acc[algo.category] = [];
    acc[algo.category].push(algo);
    return acc;
  }, {} as Record<string, typeof algorithms>);

  // Keyboard shortcut listener for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle Escape Key to collapse sidebars
  useEscapeKey(() => {
    // Priority 1: Do nothing if palette is open (palette handles its own close)
    if (isPaletteOpen) return;

    // Priority 2: Close Mobile Sidebar
    if (isSidebarOpen) {
      setSidebarOpen(false);
      return;
    }

    // Priority 3: Close Chat
    if (showChat && viewMode !== "explore") {
      setShowChat(false);
      return;
    }
  }, [isPaletteOpen, isSidebarOpen, showChat, viewMode]);

  // Handle Algorithm Selection
  const handleSelectAlgo = (algo: AlgorithmType) => {
    setCurrentAlgo(algo);
    setViewMode("visualize");
    setCurrentFrame(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      {/* Navbar */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 z-30 shadow-sm shrink-0">
        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="flex items-center space-x-3">
            {/* Sidebar Toggle - HIDDEN per request */}
            {/*
             <button
                className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              */}

            <button
              onClick={() => setViewMode("explore")}
              className="flex items-center space-x-2 text-brand-700 hover:opacity-80 transition-opacity"
            >
              <div className="bg-brand-50 p-2 rounded-lg ring-1 ring-brand-100">
                <Code2 size={24} className="text-brand-600" />
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:inline">
                Algo<span className="text-slate-400 font-light">Explorer</span>
              </span>
              <span className="text-xl font-bold tracking-tight sm:hidden">
                Algo
              </span>
            </button>
          </div>

          {/* Search Trigger (Desktop) */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden md:flex items-center w-64 px-3 py-2 bg-slate-100 text-slate-500 rounded-lg border border-slate-200 hover:border-brand-300 hover:ring-2 hover:ring-brand-100/50 hover:bg-white transition-all text-sm group"
          >
            <Search
              size={16}
              className="mr-2 text-slate-400 group-hover:text-brand-500 transition-colors"
            />
            <span>Search algorithms...</span>
            <span className="ml-auto flex items-center text-xs font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 shadow-sm">
              <Command size={10} className="mr-0.5" /> K
            </span>
          </button>
        </div>

        {/* View Switcher and Actions */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* View Toggle - Only show when NOT in explore mode */}
          {viewMode !== "explore" && (
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 animate-in fade-in zoom-in-95">
              <button
                onClick={() => setViewMode("visualize")}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "visualize"
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Eye size={16} />
                <span className="hidden sm:inline">Visualize</span>
              </button>
              <button
                onClick={() => setViewMode("learn")}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "learn"
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <BookOpen size={16} />
                <span className="hidden sm:inline">Learn</span>
              </button>
            </div>
          )}

          {viewMode === "explore" ? (
            <button
              onClick={() => setViewMode("visualize")}
              className="hidden sm:flex items-center space-x-2 text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors"
            >
              <span>Last Session</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setViewMode("explore")}
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium text-slate-500 hover:text-brand-700 hover:bg-slate-100 transition-all"
            >
              <Grid size={16} />
              <span className="hidden sm:inline">Explore</span>
            </button>
          )}

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* Search Trigger (Mobile) */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          >
            <Search size={20} />
          </button>

          {/* Chat Toggle - Hide on Explore */}
          {viewMode !== "explore" && (
            <>
              <button
                onClick={() => setShowChat(!showChat)}
                className={`text-sm font-medium px-4 py-2 rounded-lg border transition-all hidden sm:block ${
                  showChat
                    ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800 shadow-md shadow-slate-900/10"
                    : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600"
                }`}
              >
                {showChat ? "Hide Tutor" : "Ask AI"}
              </button>

              {/* Mobile Chat Icon Only */}
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-2 rounded-lg sm:hidden ${
                  showChat
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 bg-slate-100"
                }`}
              >
                <Activity size={20} />
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar - HIDDEN per request (Code preserved) */}
        {false && (
          <>
            <div
              className={`
                    absolute inset-y-0 left-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 z-40 lg:hidden border-r border-slate-100 overflow-y-auto
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
              <div className="px-4 py-6">
                <div className="flex justify-between items-center mb-6 px-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Navigation
                  </h3>
                </div>

                <button
                  onClick={() => {
                    setPaletteOpen(true);
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-3 mb-6 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand-300 transition-all group"
                >
                  <Search
                    size={18}
                    className="mr-3 text-slate-400 group-hover:text-brand-500"
                  />
                  Search Algorithms...
                </button>

                <div className="space-y-6">
                  {Object.entries(groupedAlgorithms).map(
                    ([category, algos]) => (
                      <div key={category}>
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">
                          {category}
                        </h3>
                        <div className="space-y-0.5">
                          {algos.map((algo) => (
                            <button
                              key={algo.type}
                              onClick={() => {
                                handleSelectAlgo(algo.type);
                                setSidebarOpen(false);
                              }}
                              className={`flex items-start w-full px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                                currentAlgo === algo.type
                                  ? "bg-brand-50/80 text-brand-900"
                                  : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <div
                                className={`mt-0.5 mr-3.5 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                                  currentAlgo === algo.type
                                    ? "bg-white text-brand-600 shadow-sm ring-1 ring-brand-100"
                                    : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-sm"
                                }`}
                              >
                                {algo.icon}
                              </div>
                              <div className="flex flex-col gap-0.5 overflow-hidden">
                                <span
                                  className={`text-sm font-semibold truncate ${
                                    currentAlgo === algo.type
                                      ? "text-brand-700"
                                      : "text-slate-700"
                                  }`}
                                >
                                  {algo.type}
                                </span>
                                <span
                                  className={`text-[11px] leading-tight truncate ${
                                    currentAlgo === algo.type
                                      ? "text-brand-500/80"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {algo.desc}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
              <div
                className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm z-30 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden p-0 gap-6 relative">
          <div className="flex-1 h-full flex flex-col min-w-0">
            {viewMode === "explore" ? (
              <Explore algorithms={algorithms} onSelect={handleSelectAlgo} />
            ) : viewMode === "visualize" ? (
              <div className="p-4 lg:p-6 h-full">
                <Visualizer
                  algorithm={currentAlgo}
                  onFrameChange={setCurrentFrame}
                />
              </div>
            ) : (
              <div className="p-4 lg:p-6 h-full">
                <Explanation algorithm={currentAlgo} />
              </div>
            )}
          </div>

          {/* Desktop/Toggleable Chat - Only show if NOT in explore */}
          {showChat && viewMode !== "explore" && (
            <div className="hidden lg:block h-full transition-all duration-300 animate-fade-in border-l border-slate-200">
              <AIChat currentAlgo={currentAlgo} currentFrame={currentFrame} />
            </div>
          )}

          {/* Mobile Chat Overlay */}
          {showChat && viewMode !== "explore" && (
            <div className="lg:hidden absolute inset-0 z-50 flex justify-end">
              <div className="w-full max-w-md h-full bg-white shadow-2xl animate-slide-in-right flex flex-col">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-800">AI Tutor</h3>
                  <button onClick={() => setShowChat(false)}>
                    <X
                      size={20}
                      className="text-slate-500 hover:text-rose-500 transition-colors"
                    />
                  </button>
                </div>
                <div className="flex-1 overflow-hidden relative">
                  <AIChat
                    currentAlgo={currentAlgo}
                    currentFrame={currentFrame}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={handleSelectAlgo}
        algorithms={algorithms}
      />
    </div>
  );
};


export enum AlgorithmType {
  // Searching
  LINEAR_SEARCH = 'Linear Search',
  BINARY_SEARCH = 'Binary Search',
  TWO_POINTERS = 'Two Pointers (Pair Sum)',
  SLIDING_WINDOW = 'Sliding Window (Min Subarray)',
  
  // Sorting
  BUBBLE_SORT = 'Bubble Sort',
  SELECTION_SORT = 'Selection Sort',
  INSERTION_SORT = 'Insertion Sort',
  MERGE_SORT = 'Merge Sort',
  QUICK_SORT = 'Quick Sort',

  // Stack
  MONOTONIC_STACK = 'Monotonic Stack (Next Greater)',

  // Graph
  BFS = 'Breadth-First Search',
  DFS = 'Depth-First Search',
  DIJKSTRA = 'Dijkstra\'s Algorithm',
  A_STAR = 'A* Search',
  BELLMAN_FORD = 'Bellman-Ford',
  UNION_FIND = 'Union Find (Disjoint Set)',

  // Data Structures
  LINKED_LIST = 'Linked List Operations',
  TRIE = 'Trie (Prefix Tree)',

  // Greedy / Optimization
  INTERVAL_SCHEDULING = 'Interval Scheduling',
}

export interface ArrayFrame {
  type: 'array';
  array: number[];
  // Search specific
  left?: number;
  right?: number;
  mid?: number | null;
  foundIndex?: number | null;
  // Sorting specific
  compareIndices?: number[]; // Elements being compared
  swapIndices?: number[];    // Elements being swapped
  sortedIndices?: number[];  // Elements confirmed sorted
  pivotIndex?: number;       // Quick sort pivot
  // Merge Sort specific
  overwriteIndex?: number; // Index being overwritten from aux array
  // Union Find specific
  highlightIndices?: number[];
  // Stack / Sliding Window specific
  stack?: number[]; // Stack content (values or indices)
  secondArray?: number[]; // For results like Next Greater Element
  windowSum?: number;
  description: string;
  codeLine?: number; // Pseudocode line number
}

export interface GridCell {
  row: number;
  col: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isPath: boolean;
  isCurrent: boolean;
  distance?: number;
  weight?: number; // Cost to enter this node
}

export interface GridFrame {
  type: 'grid';
  grid: GridCell[][];
  current: [number, number] | null;
  visited: string[]; // Set of "row,col"
  queue: string[]; // For display
  description: string;
  codeLine?: number;
}

export interface Interval {
  id: number;
  start: number;
  end: number;
  isSelected: boolean;
  isConsidered: boolean;
  isEliminated: boolean;
}

export interface IntervalFrame {
  type: 'interval';
  intervals: Interval[];
  currentId?: number;
  lastSelectedId?: number;
  description: string;
  codeLine?: number;
}

export interface GraphNode {
  id: number;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  color: string;
  isRoot: boolean;
  label?: string; // For displaying distance or other values
}

export interface GraphEdge {
  source: number;
  target: number;
  weight?: number; // For weighted graphs
}

export interface GraphFrame {
  type: 'graph';
  nodes: GraphNode[];
  edges: GraphEdge[];
  highlightNodes?: number[];
  highlightEdges?: {source: number, target: number}[];
  description: string;
  codeLine?: number;
}

export interface LinkedListNode {
    id: number;
    value: number;
    nextId: number | null;
    isHead?: boolean;
    isTail?: boolean;
    isCurrent?: boolean; // Traversal pointer
    highlight?: boolean;
    label?: string; // 'curr', 'prev', 'new'
}

export interface LinkedListFrame {
    type: 'linked-list';
    nodes: LinkedListNode[];
    description: string;
    codeLine?: number;
}

export interface TrieNode {
    id: string;
    char: string;
    isEndOfWord: boolean;
    children: string[]; // IDs
    x: number; // 0-100
    y: number; // 0-100
    highlight?: boolean;
    isCurrent?: boolean;
}

export interface TrieFrame {
    type: 'trie';
    nodes: TrieNode[];
    description: string;
    codeLine?: number;
}

export type Frame = ArrayFrame | GridFrame | IntervalFrame | GraphFrame | LinkedListFrame | TrieFrame;

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface AlgorithmConfig {
  speed: number; // ms delay
}


import { Frame, ArrayFrame, GridFrame, GridCell, IntervalFrame, Interval, GraphFrame, GraphNode, GraphEdge, LinkedListFrame, LinkedListNode, TrieFrame, TrieNode } from '../types';

// --- Searching Algorithms ---

export const generateLinearSearchFrames = (arr: number[], target: number): ArrayFrame[] => {
  const frames: ArrayFrame[] = [];
  
  frames.push({
    type: 'array',
    array: [...arr],
    mid: null,
    foundIndex: null,
    description: `Starting Linear Search for target ${target}.`,
    codeLine: 0
  });

  for (let i = 0; i < arr.length; i++) {
    frames.push({
      type: 'array',
      array: [...arr],
      mid: i, // Use mid pointer to show current index
      foundIndex: null,
      description: `Checking index ${i} (Value: ${arr[i]}).`,
      codeLine: 1
    });

    if (arr[i] === target) {
      frames.push({
        type: 'array',
        array: [...arr],
        mid: i,
        foundIndex: i,
        description: `Found target ${target} at index ${i}!`,
        codeLine: 2
      });
      return frames;
    }
  }

  frames.push({
    type: 'array',
    array: [...arr],
    mid: null,
    foundIndex: -1,
    description: `Target ${target} not found in the array.`,
    codeLine: 3
  });

  return frames;
};

export const generateBinarySearchFrames = (arr: number[], target: number): ArrayFrame[] => {
  const frames: ArrayFrame[] = [];
  let left = 0;
  let right = arr.length - 1;

  frames.push({
    type: 'array',
    array: [...arr],
    left,
    right,
    mid: null,
    foundIndex: null,
    description: `Starting Binary Search for target ${target}. Range: [${left}, ${right}].`,
    codeLine: 0
  });

  while (left <= right) {
    frames.push({
      type: 'array',
      array: [...arr],
      left,
      right,
      mid: null,
      foundIndex: null,
      description: `Check loop condition: ${left} <= ${right}.`,
      codeLine: 1
    });

    const mid = Math.floor((left + right) / 2);
    
    frames.push({
      type: 'array',
      array: [...arr],
      left,
      right,
      mid,
      foundIndex: null,
      description: `Checking middle element at index ${mid} (Value: ${arr[mid]}).`,
      codeLine: 2
    });

    if (arr[mid] === target) {
      frames.push({
        type: 'array',
        array: [...arr],
        left,
        right,
        mid,
        foundIndex: mid,
        description: `Found target ${target} at index ${mid}!`,
        codeLine: 3
      });
      return frames;
    }

    if (arr[mid] < target) {
      frames.push({
        type: 'array',
        array: [...arr],
        left,
        right,
        mid,
        foundIndex: null,
        description: `${arr[mid]} is less than ${target}.`,
        codeLine: 4
      });
      left = mid + 1;
      frames.push({
        type: 'array',
        array: [...arr],
        left,
        right,
        mid,
        foundIndex: null,
        description: `Moving left bound to ${mid + 1}.`,
        codeLine: 5
      });
    } else {
      frames.push({
        type: 'array',
        array: [...arr],
        left,
        right,
        mid,
        foundIndex: null,
        description: `${arr[mid]} is greater than ${target}.`,
        codeLine: 6
      });
      right = mid - 1;
      frames.push({
        type: 'array',
        array: [...arr],
        left,
        right,
        mid,
        foundIndex: null,
        description: `Moving right bound to ${mid - 1}.`,
        codeLine: 7
      });
    }
  }

  frames.push({
    type: 'array',
    array: [...arr],
    left,
    right,
    mid: null,
    foundIndex: -1,
    description: `Target ${target} not found in the array.`,
    codeLine: 8
  });

  return frames;
};

export const generateTwoPointersFrames = (arr: number[], target: number): ArrayFrame[] => {
    const frames: ArrayFrame[] = [];
    let left = 0;
    let right = arr.length - 1;

    frames.push({
        type: 'array',
        array: [...arr],
        left,
        right,
        description: `Starting Two Pointers search for pair summing to ${target}. Sorted array required.`,
        codeLine: 0
    });

    while (left < right) {
        frames.push({
          type: 'array',
          array: [...arr],
          left,
          right,
          description: `Loop condition ${left} < ${right} is true.`,
          codeLine: 1
        });

        const sum = arr[left] + arr[right];
        
        frames.push({
            type: 'array',
            array: [...arr],
            left,
            right,
            compareIndices: [left, right],
            description: `Checking sum of ${arr[left]} + ${arr[right]} = ${sum}. Target is ${target}.`,
            codeLine: 2
        });

        if (sum === target) {
            frames.push({
                type: 'array',
                array: [...arr],
                left,
                right,
                foundIndex: left, // abusing foundIndex to highlight match
                mid: right,      // abusing mid to highlight match
                description: `Found pair! ${arr[left]} + ${arr[right]} = ${target}.`,
                codeLine: 3
            });
            return frames;
        } else if (sum < target) {
             frames.push({
                type: 'array',
                array: [...arr],
                left,
                right,
                description: `Sum ${sum} is too small.`,
                codeLine: 4
            });
            left++;
            frames.push({
                type: 'array',
                array: [...arr],
                left,
                right,
                description: `Moving left pointer to index ${left} to increase sum.`,
                codeLine: 4
            });
        } else {
            frames.push({
                type: 'array',
                array: [...arr],
                left,
                right,
                description: `Sum ${sum} is too large.`,
                codeLine: 5
            });
            right--;
            frames.push({
                type: 'array',
                array: [...arr],
                left,
                right,
                description: `Moving right pointer to index ${right} to decrease sum.`,
                codeLine: 5
            });
        }
    }

    frames.push({
        type: 'array',
        array: [...arr],
        description: "No pair found summing to target.",
        codeLine: 6
    });

    return frames;
};

// --- Sliding Window ---

export const generateSlidingWindowFrames = (arr: number[], target: number): ArrayFrame[] => {
    const frames: ArrayFrame[] = [];
    let left = 0;
    let currentSum = 0;
    let minLen = Infinity;
    
    frames.push({
        type: 'array',
        array: [...arr],
        description: `Find Minimum Size Subarray with Sum >= ${target}. Initializing window.`
    });

    for (let right = 0; right < arr.length; right++) {
        currentSum += arr[right];
        
        frames.push({
            type: 'array',
            array: [...arr],
            left: left,
            right: right,
            windowSum: currentSum,
            description: `Expanded window right to index ${right}. Current Sum: ${currentSum}.`
        });

        while (currentSum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            
            frames.push({
                type: 'array',
                array: [...arr],
                left: left,
                right: right,
                windowSum: currentSum,
                foundIndex: (right - left + 1 === minLen) ? left : undefined, // Highlight potentially best start
                description: `Sum ${currentSum} >= ${target}. Valid window! Length: ${right - left + 1}. Trying to shrink from left.`
            });

            currentSum -= arr[left];
            left++;

            frames.push({
                type: 'array',
                array: [...arr],
                left: left,
                right: right,
                windowSum: currentSum,
                description: `Shrunk window. New Sum: ${currentSum}.`
            });
        }
    }

    frames.push({
        type: 'array',
        array: [...arr],
        description: minLen === Infinity ? "No subarray found." : `Finished. Minimum length found was ${minLen}.`
    });

    return frames;
};

// --- Sorting Algorithms ---

export const generateBubbleSortFrames = (initialArr: number[]): ArrayFrame[] => {
  const frames: ArrayFrame[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sortedIndices: number[] = [];

  frames.push({
    type: 'array',
    array: [...arr],
    description: "Starting Bubble Sort.",
    codeLine: 0
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    frames.push({
      type: 'array',
      array: [...arr],
      sortedIndices: [...sortedIndices],
      description: `Starting pass ${i}.`,
      codeLine: 1
    });

    for (let j = 0; j < n - i - 1; j++) {
      // Compare
      frames.push({
        type: 'array',
        array: [...arr],
        compareIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        description: `Comparing ${arr[j]} and ${arr[j + 1]}.`,
        codeLine: 3
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        frames.push({
          type: 'array',
          array: [...arr],
          compareIndices: [j, j + 1],
          swapIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          description: `Swapping ${arr[j+1]} (was ${arr[j]}) and ${arr[j]} (was ${arr[j+1]}).`,
          codeLine: 4
        });
        // Indicate swapped flag set
        frames.push({
            type: 'array',
            array: [...arr],
            compareIndices: [j, j + 1],
            sortedIndices: [...sortedIndices],
            description: `Set swapped = true.`,
            codeLine: 5
        });
      }
    }
    sortedIndices.push(n - 1 - i);
    frames.push({
      type: 'array',
      array: [...arr],
      sortedIndices: [...sortedIndices],
      description: `Element ${arr[n - 1 - i]} is now in its sorted position.`,
      codeLine: 6
    });
    
    if (!swapped) {
       // Optimization: If no swaps occurred, array is sorted
       const allIndices = Array.from({length: n}, (_, k) => k);
       frames.push({
          type: 'array',
          array: [...arr],
          sortedIndices: allIndices,
          description: "No swaps in this pass. Array is fully sorted!",
          codeLine: 6
       });
       return frames;
    }
  }
  
  // Add the last element (index 0) to sorted
  sortedIndices.push(0);
  frames.push({
    type: 'array',
    array: [...arr],
    sortedIndices: sortedIndices,
    description: "Bubble Sort Complete."
  });

  return frames;
};

export const generateSelectionSortFrames = (initialArr: number[]): ArrayFrame[] => {
  const frames: ArrayFrame[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sortedIndices: number[] = [];

  frames.push({
    type: 'array',
    array: [...arr],
    description: "Starting Selection Sort.",
    codeLine: 0
  });

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    
    frames.push({
       type: 'array',
       array: [...arr],
       sortedIndices: [...sortedIndices],
       mid: i, // Use 'mid' visual style to indicate start of unsorted section
       description: `Finding minimum element starting from index ${i}.`,
       codeLine: 1
    });

    for (let j = i + 1; j < n; j++) {
      frames.push({
        type: 'array',
        array: [...arr],
        compareIndices: [minIdx, j],
        sortedIndices: [...sortedIndices],
        description: `Comparing current minimum (${arr[minIdx]}) with ${arr[j]}.`,
        codeLine: 2
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        frames.push({
            type: 'array',
            array: [...arr],
            compareIndices: [j],
            sortedIndices: [...sortedIndices],
            description: `Found new minimum: ${arr[j]} at index ${j}.`,
            codeLine: 3
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      
      frames.push({
          type: 'array',
          array: [...arr],
          swapIndices: [i, minIdx],
          sortedIndices: [...sortedIndices],
          description: `Swapping ${arr[minIdx]} (min) with ${arr[i]} (current position).`,
          codeLine: 6
      });
    }

    sortedIndices.push(i);
    frames.push({
        type: 'array',
        array: [...arr],
        sortedIndices: [...sortedIndices],
        description: `${arr[i]} is now sorted.`
    });
  }

  return frames;
};

export const generateInsertionSortFrames = (initialArr: number[]): ArrayFrame[] => {
    const frames: ArrayFrame[] = [];
    const arr = [...initialArr];
    const n = arr.length;
    // For insertion sort, the left part 0...i is implicitly sorted relative to itself
    const sortedIndices: number[] = [0]; 
  
    frames.push({
      type: 'array',
      array: [...arr],
      sortedIndices: [0],
      description: "Starting Insertion Sort. Index 0 is considered sorted.",
      codeLine: 0
    });
  
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
  
      frames.push({
          type: 'array',
          array: [...arr],
          mid: i, // Highlight current key
          sortedIndices: Array.from({length: i}, (_, k) => k),
          description: `Taking ${key} (index ${i}) to insert into sorted portion.`,
          codeLine: 1
      });
  
      while (j >= 0 && arr[j] > key) {
        frames.push({
            type: 'array',
            array: [...arr],
            compareIndices: [j, j+1],
            sortedIndices: Array.from({length: i}, (_, k) => k),
            description: `${arr[j]} > ${key}, shifting ${arr[j]} to the right.`,
            codeLine: 2
        });

        arr[j + 1] = arr[j];
        
        frames.push({
            type: 'array',
            array: [...arr],
            swapIndices: [j+1], // Visualizing the write
            sortedIndices: Array.from({length: i}, (_, k) => k),
            description: `Moved ${arr[j]} to index ${j+1}.`,
            codeLine: 3
        });
        
        j = j - 1;
        frames.push({
            type: 'array',
            array: [...arr],
            swapIndices: [j+1],
            sortedIndices: Array.from({length: i}, (_, k) => k),
            description: `Decrementing j to ${j}.`,
            codeLine: 4
        });
      }
      arr[j + 1] = key;
      
      frames.push({
        type: 'array',
        array: [...arr],
        swapIndices: [j+1],
        sortedIndices: Array.from({length: i + 1}, (_, k) => k),
        description: `Inserted ${key} at index ${j + 1}.`,
        codeLine: 5
      });
    }

    frames.push({
        type: 'array',
        array: [...arr],
        sortedIndices: Array.from({length: n}, (_, k) => k),
        description: "Insertion Sort Complete."
    });
  
    return frames;
  };

export const generateMergeSortFrames = (initialArr: number[]): ArrayFrame[] => {
    const frames: ArrayFrame[] = [];
    const arr = [...initialArr];
    // We will visualize the merges in a bottom-up or top-down manner.
    // Recursive is easiest to implement.
    
    const merge = (start: number, mid: number, end: number) => {
        const leftArr = arr.slice(start, mid + 1);
        const rightArr = arr.slice(mid + 1, end + 1);
        
        let i = 0, j = 0, k = start;
        
        frames.push({
            type: 'array',
            array: [...arr],
            left: start, right: end, 
            description: `Merging subarrays: [${start}-${mid}] and [${mid+1}-${end}].`,
            codeLine: 4
        });

        while (i < leftArr.length && j < rightArr.length) {
            frames.push({
                type: 'array',
                array: [...arr],
                compareIndices: [start + i, mid + 1 + j],
                left: start, right: end, // show current working range
                description: `Comparing ${leftArr[i]} (left subarray) and ${rightArr[j]} (right subarray).`,
                codeLine: 4
            });
            
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                frames.push({
                    type: 'array',
                    array: [...arr],
                    overwriteIndex: k,
                    left: start, right: end,
                    description: `Placing ${leftArr[i]} at index ${k}.`,
                    codeLine: 4
                });
                i++;
            } else {
                arr[k] = rightArr[j];
                frames.push({
                    type: 'array',
                    array: [...arr],
                    overwriteIndex: k,
                    left: start, right: end,
                    description: `Placing ${rightArr[j]} at index ${k}.`,
                    codeLine: 4
                });
                j++;
            }
            k++;
        }
        
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            frames.push({
                type: 'array',
                array: [...arr],
                overwriteIndex: k,
                left: start, right: end,
                description: `Placing remaining ${leftArr[i]} at index ${k}.`
            });
            i++; k++;
        }
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            frames.push({
                type: 'array',
                array: [...arr],
                overwriteIndex: k,
                left: start, right: end,
                description: `Placing remaining ${rightArr[j]} at index ${k}.`
            });
            j++; k++;
        }
    };

    const mergeSort = (start: number, end: number) => {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            frames.push({
                type: 'array',
                array: [...arr],
                left: start, right: end,
                description: `Split: [${start}-${end}] into [${start}-${mid}] and [${mid+1}-${end}].`,
                codeLine: 2
            });
            mergeSort(start, mid);
            mergeSort(mid + 1, end);
            merge(start, mid, end);
        } else {
             frames.push({
                type: 'array',
                array: [...arr],
                left: start, right: end,
                description: `Base case: Range [${start}-${end}] has 1 element.`,
                codeLine: 1
            });
        }
    };

    frames.push({
        type: 'array',
        array: [...arr],
        description: "Starting Merge Sort.",
        codeLine: 0
    });

    mergeSort(0, arr.length - 1);

    frames.push({
        type: 'array',
        array: [...arr],
        sortedIndices: arr.map((_, i) => i),
        description: "Merge Sort Complete."
    });

    return frames;
};

export const generateQuickSortFrames = (initialArr: number[]): ArrayFrame[] => {
    const frames: ArrayFrame[] = [];
    const arr = [...initialArr];
    
    // Using Lomuto partition scheme
    const partition = (low: number, high: number) => {
        const pivot = arr[high];
        frames.push({
            type: 'array',
            array: [...arr],
            pivotIndex: high,
            left: low, right: high, // current range
            description: `Partitioning range [${low}, ${high}]. Pivot is ${pivot} (index ${high}).`,
            codeLine: 2
        });

        let i = low - 1; // Index of smaller element

        for (let j = low; j < high; j++) {
            frames.push({
                type: 'array',
                array: [...arr],
                pivotIndex: high,
                left: low, right: high,
                compareIndices: [j, high],
                mid: j, // current element
                highlightIndices: [i + 1], // where small elements end
                description: `Comparing ${arr[j]} with pivot ${pivot}.`
            });

            if (arr[j] < pivot) {
                i++;
                // Swap
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                
                frames.push({
                    type: 'array',
                    array: [...arr],
                    pivotIndex: high,
                    left: low, right: high,
                    swapIndices: [i, j],
                    highlightIndices: [i], // newly added small element
                    description: `${arr[i]} is smaller than pivot. Swapped to index ${i}.`
                });
            }
        }
        
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        frames.push({
            type: 'array',
            array: [...arr],
            pivotIndex: i + 1,
            left: low, right: high,
            swapIndices: [i + 1, high],
            description: `Moving pivot to correct position index ${i+1}.`
        });

        return i + 1;
    };

    const quickSort = (low: number, high: number) => {
        if (low < high) {
            frames.push({
                type: 'array',
                array: [...arr],
                left: low, right: high,
                description: `Quick Sort on range [${low}, ${high}].`,
                codeLine: 1
            });
            const pi = partition(low, high);
            // Element at pi is now sorted
            frames.push({
                type: 'array',
                array: [...arr],
                sortedIndices: [pi], 
                pivotIndex: pi,
                description: `Pivot ${arr[pi]} is now at its sorted position.`,
                codeLine: 2
            });
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        } else if (low === high) {
             frames.push({
                type: 'array',
                array: [...arr],
                sortedIndices: [low],
                description: `Single element range [${low}, ${low}] is already sorted.`
            });
        }
    };

    frames.push({
        type: 'array',
        array: [...arr],
        description: "Starting Quick Sort (Lomuto Partition).",
        codeLine: 0
    });

    quickSort(0, arr.length - 1);

    frames.push({
        type: 'array',
        array: [...arr],
        sortedIndices: arr.map((_, i) => i),
        description: "Quick Sort Complete."
    });

    return frames;
};

// --- Monotonic Stack ---

export const generateMonotonicStackFrames = (arr: number[]): ArrayFrame[] => {
    // Next Greater Element
    const frames: ArrayFrame[] = [];
    const n = arr.length;
    const result = new Array(n).fill(-1);
    const stack: number[] = []; // Stores indices

    frames.push({
        type: 'array',
        array: [...arr],
        secondArray: [...result],
        stack: [],
        description: "Monotonic Stack: Finding Next Greater Element (NGE) using a Decreasing Stack."
    });

    for (let i = 0; i < n; i++) {
        frames.push({
            type: 'array',
            array: [...arr],
            secondArray: [...result],
            stack: [...stack],
            mid: i,
            description: `Step ${i}: Processing element ${arr[i]} (index ${i}).`
        });

        while (stack.length > 0) {
            const topIndex = stack[stack.length - 1];
            const topValue = arr[topIndex];

            // Compare frame
            frames.push({
                type: 'array',
                array: [...arr],
                secondArray: [...result],
                stack: [...stack],
                mid: i,
                compareIndices: [i, topIndex],
                description: `Compare Current (${arr[i]}) vs Stack Top (${topValue}). Is ${arr[i]} > ${topValue}?`
            });

            if (arr[i] > topValue) {
                // Found NGE
                result[topIndex] = arr[i];
                
                // Visual pop preparation (still in stack for this frame, but highlighting result write)
                frames.push({
                    type: 'array',
                    array: [...arr],
                    secondArray: [...result],
                    stack: [...stack],
                    mid: i,
                    overwriteIndex: topIndex,
                    description: `Yes! ${arr[i]} > ${topValue}. ${arr[i]} is the NGE for index ${topIndex}.`
                });

                stack.pop();
                
                // Post pop frame
                 frames.push({
                    type: 'array',
                    array: [...arr],
                    secondArray: [...result],
                    stack: [...stack],
                    mid: i,
                    description: `Popped index ${topIndex}. Checking next stack top...`
                });
            } else {
                 frames.push({
                    type: 'array',
                    array: [...arr],
                    secondArray: [...result],
                    stack: [...stack],
                    mid: i,
                    compareIndices: [i, topIndex],
                    description: `No. ${arr[i]} <= ${topValue}. Cannot pop. Pushing current.`
                });
                break;
            }
        }

        stack.push(i);
        frames.push({
            type: 'array',
            array: [...arr],
            secondArray: [...result],
            stack: [...stack],
            mid: i,
            description: `Pushed index ${i} (${arr[i]}) onto the stack.`
        });
    }

    frames.push({
        type: 'array',
        array: [...arr],
        secondArray: [...result],
        stack: [...stack],
        description: "Finished processing. Remaining items in stack have no Next Greater Element."
    });

    return frames;
};

// --- Union Find ---

const getRoot = (parent: number[], i: number): number => {
    while (i !== parent[i]) i = parent[i];
    return i;
};

const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981',
    '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e'
];

// Helper to layout the forest of trees
const generateGraphFrame = (parent: number[], description: string, highlightNodes: number[] = [], highlightEdges: {source: number, target: number}[] = [], codeLine?: number): GraphFrame => {
    const size = parent.length;
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    
    // 1. Build Adjacency List for the Forest (Parent -> Children)
    const adj: number[][] = Array.from({length: size}, () => []);
    const roots: number[] = [];
    
    for (let i = 0; i < size; i++) {
        if (parent[i] === i) {
            roots.push(i);
        } else {
            adj[parent[i]].push(i);
            edges.push({ source: i, target: parent[i] }); // Edge points to parent
        }
    }

    // 2. Recursive function to calculate subtree widths
    const widths = new Map<number, number>();
    const calcWidth = (u: number): number => {
        if (adj[u].length === 0) {
            widths.set(u, 1);
            return 1;
        }
        let w = 0;
        for (const v of adj[u]) w += calcWidth(v);
        widths.set(u, w);
        return w;
    };

    // Calculate widths for all roots
    roots.forEach(r => calcWidth(r));

    // 3. Recursive placement
    const place = (u: number, xStart: number, level: number) => {
        const myWidth = widths.get(u)!;
        // Center the node within its allocated width
        const xCenter = xStart + myWidth / 2;
        
        // Root color logic
        const root = getRoot(parent, u);
        const color = colors[root % colors.length];

        nodes.push({
            id: u,
            x: xCenter, // Temporary coordinate
            y: level,   // Temporary coordinate
            color,
            isRoot: parent[u] === u
        });

        let childXStart = xStart;
        for (const v of adj[u]) {
            place(v, childXStart, level + 1);
            childXStart += widths.get(v)!;
        }
    };

    let currentX = 0;
    roots.forEach(root => {
        const rootWidth = widths.get(root)!;
        place(root, currentX, 0);
        currentX += rootWidth + 0.5; // Add a small gap between disjoint trees
    });

    const totalWidth = Math.max(currentX, 1); // Avoid div by zero
    // Find max depth for Y scaling
    let maxDepth = 0;
    nodes.forEach(n => maxDepth = Math.max(maxDepth, n.y));
    const effectiveMaxDepth = Math.max(maxDepth, 4);

    // 4. Normalize coordinates to percentages [0-100]
    const normalizedNodes = nodes.map(n => ({
        ...n,
        x: 5 + (n.x / totalWidth) * 90,
        y: 10 + (n.y / effectiveMaxDepth) * 80
    }));

    return {
        type: 'graph',
        nodes: normalizedNodes,
        edges,
        highlightNodes,
        highlightEdges,
        description,
        codeLine
    };
};

export const generateUnionFindFrames = (size: number): GraphFrame[] => {
    const frames: GraphFrame[] = [];
    const parent = Array.from({ length: size }, (_, i) => i);
    
    // Pre-defined "interesting" scenario + some randoms
    const operations: [number, number][] = [];
    
    // Create some small trees first
    for(let i=0; i<size; i+=2) {
        if(i+1 < size) operations.push([i, i+1]);
    }
    // Merge some of those trees
    for(let i=0; i<size; i+=4) {
        if(i+2 < size) operations.push([i, i+2]);
    }
    // Random unions to connect remaining components
    for(let i=0; i<3; i++) {
        const u = Math.floor(Math.random() * size);
        const v = Math.floor(Math.random() * size);
        operations.push([u, v]);
    }

    frames.push(generateGraphFrame([...parent], "Initialized Union Find. Each element is its own parent."));

    for (const [u, v] of operations) {
        frames.push(generateGraphFrame(
            [...parent], 
            `Union(${u}, ${v}). Checking if they are already connected...`, 
            [u, v]
        ));

        // Find U
        let rootU = u;
        let pathU = [u];
        while (rootU !== parent[rootU]) {
            rootU = parent[rootU];
            pathU.push(rootU);
        }
        
        // Find V
        let rootV = v;
        let pathV = [v];
        while (rootV !== parent[rootV]) {
            rootV = parent[rootV];
            pathV.push(rootV);
        }
        
        // Highlight paths
        const edgesToHighlight: {source: number, target: number}[] = [];
        for(let k=0; k<pathU.length-1; k++) edgesToHighlight.push({source: pathU[k], target: pathU[k+1]});
        for(let k=0; k<pathV.length-1; k++) edgesToHighlight.push({source: pathV[k], target: pathV[k+1]});

        frames.push(generateGraphFrame(
            [...parent],
            `Finding roots: Root(${u}) = ${rootU}, Root(${v}) = ${rootV}`,
            [...pathU, ...pathV],
            edgesToHighlight
        ));

        if (rootU !== rootV) {
            parent[rootU] = rootV; // Basic Union
            frames.push(generateGraphFrame(
                [...parent], 
                `Roots differ. Union: Set parent of ${rootU} to ${rootV}.`,
                [rootU, rootV],
                [{source: rootU, target: rootV}]
            ));
        } else {
             frames.push(generateGraphFrame(
                [...parent], 
                `Roots are the same (${rootU}). ${u} and ${v} are already connected.`,
                [u, v]
            ));
        }
    }
    
    frames.push(generateGraphFrame([...parent], "Union Find Operations Complete."));
    
    return frames;
};

// --- Tree Layout Helpers ---

// Helper function to create a nice tree layout for BFS/DFS
const getTreeLayout = () => {
    // 15 nodes
    const count = 15;
    const edges: GraphEdge[] = [
        { source: 0, target: 1 }, { source: 0, target: 2 },
        { source: 1, target: 3 }, { source: 1, target: 4 },
        { source: 2, target: 5 }, { source: 2, target: 6 },
        { source: 3, target: 7 }, { source: 3, target: 8 },
        { source: 4, target: 9 },
        { source: 5, target: 10 }, { source: 5, target: 11 },
        { source: 6, target: 12 },
        { source: 12, target: 13 }, { source: 12, target: 14 }
    ];
    
    // Build adjacency list for layout calculation
    const adj = Array.from({length: count}, () => [] as number[]);
    edges.forEach(e => adj[e.source].push(e.target));
    
    const nodes: GraphNode[] = [];
    const widths = new Array(count).fill(1); // leaf width
    
    // Post-order to calc widths for centering
    const calcWidth = (u: number): number => {
        if(adj[u].length === 0) return 1;
        let w = 0;
        for(const v of adj[u]) w += calcWidth(v);
        widths[u] = w;
        return w;
    };
    calcWidth(0);
    
    const assignPos = (u: number, xStart: number, level: number) => {
        const w = widths[u];
        const xCenter = xStart + w / 2;
        
        nodes.push({
            id: u,
            x: 0, // placeholder
            y: level,
            color: '#cbd5e1', // default slate
            isRoot: u === 0
        });
        
        // Store raw coordinate temporarily
        (nodes[nodes.length-1] as any)._rawX = xCenter;
        
        let currX = xStart;
        for(const v of adj[u]) {
            assignPos(v, currX, level + 1);
            currX += widths[v];
        }
    };
    
    assignPos(0, 0, 0);
    
    // Normalize coordinates
    const totalW = widths[0];
    const maxLevel = 4;
    
    return {
        nodes: nodes.map(n => ({
            ...n,
            x: 5 + ((n as any)._rawX / totalW) * 90, // Map to 5-95% width
            y: 10 + (n.y / (maxLevel + 1)) * 80,    // Map to 10-90% height
            label: undefined
        })).sort((a,b) => a.id - b.id), // Sort by ID for easier indexing
        edges,
        adj
    };
};

// --- BFS (Tree/Graph) ---

export const generateBFSFrames = (): GraphFrame[] => {
    const frames: GraphFrame[] = [];
    const { nodes: initialNodes, edges, adj } = getTreeLayout();
    
    const getNodes = (activeSet: Set<number>, visitedSet: Set<number>) => {
        return initialNodes.map(n => ({
            ...n,
            color: activeSet.has(n.id) ? '#f59e0b' : (visitedSet.has(n.id) ? '#10b981' : '#cbd5e1')
        }));
    };

    const queue: number[] = [0];
    const visited = new Set<number>([0]);
    
    frames.push({
        type: 'graph',
        nodes: getNodes(new Set([0]), new Set()),
        edges,
        description: "Starting BFS from Root (0). Added to Queue.",
        codeLine: 0
    });

    while (queue.length > 0) {
        frames.push({
            type: 'graph',
            nodes: getNodes(new Set([queue[0]]), visited),
            edges,
            description: "Checking queue condition.",
            codeLine: 2
        });
        const u = queue.shift()!;
        
        frames.push({
            type: 'graph',
            nodes: getNodes(new Set([u]), visited),
            edges,
            highlightNodes: [u],
            description: `Dequeued ${u}. processing neighbors...`,
            codeLine: 3
        });

        const neighbors = adj[u];
        
        for (const v of neighbors) {
            frames.push({
                type: 'graph',
                nodes: getNodes(new Set([u]), visited), // u is still active parent
                edges,
                highlightNodes: [u, v], // Highlight edge connection
                highlightEdges: [{source: u, target: v}],
                description: `Checking neighbor ${v}.`,
                codeLine: 4
            });

            if (!visited.has(v)) {
                visited.add(v);
                queue.push(v);
                
                frames.push({
                    type: 'graph',
                    nodes: getNodes(new Set([u]), visited), 
                    edges,
                    highlightNodes: [u, v], 
                    highlightEdges: [{source: u, target: v}],
                    description: `Marked ${v} visited and added to Queue.`,
                    codeLine: 6
                });
            }
        }
    }

    frames.push({
        type: 'graph',
        nodes: getNodes(new Set(), visited),
        edges,
        description: "BFS Traversal Complete."
    });

    return frames;
};

// --- DFS (Tree/Graph) ---

export const generateDFSFrames = (): GraphFrame[] => {
    const frames: GraphFrame[] = [];
    const { nodes: initialNodes, edges, adj } = getTreeLayout();
    const visited = new Set<number>();

    const getNodes = (activeNode: number | null) => {
        return initialNodes.map(n => ({
            ...n,
            color: n.id === activeNode ? '#f59e0b' : (visited.has(n.id) ? '#10b981' : '#cbd5e1')
        }));
    };

    const dfs = (u: number) => {
        frames.push({
            type: 'graph',
            nodes: getNodes(u),
            edges,
            highlightNodes: [u],
            description: `Calling DFS(${u}). Marking visited.`,
            codeLine: 1
        });
        visited.add(u);

        const neighbors = adj[u];
        
        for (const v of neighbors) {
            frames.push({
                type: 'graph',
                nodes: getNodes(u),
                edges,
                highlightEdges: [{source: u, target: v}],
                description: `Checking neighbor ${v} of ${u}.`,
                codeLine: 2
            });

            if (!visited.has(v)) {
                frames.push({
                    type: 'graph',
                    nodes: getNodes(u),
                    edges,
                    highlightEdges: [{source: u, target: v}],
                    description: `${v} not visited. Recursing...`,
                    codeLine: 4
                });
                
                dfs(v);
                
                frames.push({
                    type: 'graph',
                    nodes: getNodes(u),
                    edges,
                    highlightEdges: [{source: u, target: v}], // Highlight return path
                    description: `Finished branch ${v}. Backtracking to ${u}.`
                });
            }
        }
    };

    frames.push({
        type: 'graph',
        nodes: initialNodes,
        edges,
        description: "Starting DFS from Root (0).",
        codeLine: 0
    });

    dfs(0);

    frames.push({
        type: 'graph',
        nodes: getNodes(null),
        edges,
        description: "DFS Traversal Complete."
    });

    return frames;
};

// --- Linked List ---

export const generateLinkedListFrames = (): LinkedListFrame[] => {
    const frames: LinkedListFrame[] = [];
    
    // Initial State: 10 -> 20 -> 30 -> 40
    let nodes: LinkedListNode[] = [
        { id: 10, value: 10, nextId: 20, isHead: true },
        { id: 20, value: 20, nextId: 30 },
        { id: 30, value: 30, nextId: 40 },
        { id: 40, value: 40, nextId: null, isTail: true }
    ];

    const clone = () => JSON.parse(JSON.stringify(nodes));

    frames.push({
        type: 'linked-list',
        nodes: clone(),
        description: "Initial Linked List: 10 -> 20 -> 30 -> 40"
    });

    // 1. Search for 30
    frames.push({
        type: 'linked-list',
        nodes: clone(),
        description: "Operation: Search for value 30."
    });

    let currentId: number | null = 10;
    while(currentId !== null) {
        const node = nodes.find(n => n.id === currentId)!;
        node.isCurrent = true;
        
        frames.push({
            type: 'linked-list',
            nodes: JSON.parse(JSON.stringify(nodes)), // clone with current highlight
            description: `Checking node with value ${node.value}...`
        });

        if (node.value === 30) {
            node.highlight = true;
            node.isCurrent = false;
            node.label = "Found";
            frames.push({
                type: 'linked-list',
                nodes: JSON.parse(JSON.stringify(nodes)),
                description: "Value 30 found!"
            });
            break;
        }

        node.isCurrent = false;
        currentId = node.nextId;
    }

    // Reset highlighting for next op
    nodes.forEach(n => {
        n.isCurrent = false;
        n.highlight = false;
        n.label = undefined;
    });

    // 2. Insert 25 after 20
    frames.push({
        type: 'linked-list',
        nodes: clone(),
        description: "Operation: Insert 25 after node 20."
    });

    // Traverse to 20
    currentId = 10;
    while(currentId !== null) {
         const node = nodes.find(n => n.id === currentId)!;
         node.isCurrent = true;
         frames.push({
             type: 'linked-list',
             nodes: JSON.parse(JSON.stringify(nodes)),
             description: `Traversing... at ${node.value}`
         });

         if(node.value === 20) {
             node.label = "Target";
             frames.push({
                 type: 'linked-list',
                 nodes: JSON.parse(JSON.stringify(nodes)),
                 description: "Found target node 20."
             });
             node.isCurrent = false;
             break;
         }
         node.isCurrent = false;
         currentId = node.nextId;
    }

    // Create new node
    const newNode: LinkedListNode = { id: 25, value: 25, nextId: null, highlight: true, label: "New" };
    nodes.push(newNode); // It's in the array but not linked yet
    // To visualize it as "floating", the renderer will handle unlinked nodes or we imply it by nextId=null initially
    
    frames.push({
        type: 'linked-list',
        nodes: JSON.parse(JSON.stringify(nodes)),
        description: "Created new node 25."
    });

    // Link 25 to 30
    newNode.nextId = 30;
    frames.push({
        type: 'linked-list',
        nodes: JSON.parse(JSON.stringify(nodes)),
        description: "Point 25.next to 30."
    });

    // Link 20 to 25
    const targetNode = nodes.find(n => n.value === 20)!;
    targetNode.nextId = 25;
    targetNode.label = undefined;
    newNode.highlight = false;
    newNode.label = undefined;

    frames.push({
        type: 'linked-list',
        nodes: JSON.parse(JSON.stringify(nodes)),
        description: "Point 20.next to 25. Insertion Complete."
    });

    // 3. Delete 40
    frames.push({
        type: 'linked-list',
        nodes: clone(),
        description: "Operation: Delete node 40 (Tail)."
    });

    // Find predecessor of 40 (which is 30)
    currentId = 10;
    while(currentId !== null) {
         const node = nodes.find(n => n.id === currentId)!;
         node.isCurrent = true;
         
         const nextNode = nodes.find(n => n.id === node.nextId);
         
         frames.push({
             type: 'linked-list',
             nodes: JSON.parse(JSON.stringify(nodes)),
             description: `Traversing... at ${node.value}`
         });
         
         if(nextNode && nextNode.value === 40) {
              frames.push({
                 type: 'linked-list',
                 nodes: JSON.parse(JSON.stringify(nodes)),
                 description: `Node ${node.value} points to 40. This is the predecessor.`
             });
             
             // Unlink
             node.nextId = null;
             node.isTail = true;
             
             // Mark 40 as floating/deleted
             nextNode.label = "Deleted";
             nextNode.highlight = true;
             nextNode.isTail = false;
             node.isCurrent = false;

             frames.push({
                 type: 'linked-list',
                 nodes: JSON.parse(JSON.stringify(nodes)),
                 description: `Set ${node.value}.next to null. Node 40 is detached.`
             });
             
             // Remove from list for final view
             nodes = nodes.filter(n => n.value !== 40);
             break;
         }
         
         node.isCurrent = false;
         currentId = node.nextId;
    }

    frames.push({
        type: 'linked-list',
        nodes: JSON.parse(JSON.stringify(nodes)),
        description: "Deletion Complete."
    });

    return frames;
};

// --- Trie ---

export const generateTrieFrames = (): TrieFrame[] => {
    const frames: TrieFrame[] = [];
    
    // Structure: ID is the string path from root (e.g., "root", "root-c", "root-c-a")
    let root: TrieNode = { 
        id: "root", 
        char: "", 
        isEndOfWord: false, 
        children: [], 
        x: 50, 
        y: 10 
    };
    
    let allNodes: TrieNode[] = [root];

    const cloneNodes = () => JSON.parse(JSON.stringify(allNodes));

    frames.push({
        type: 'trie',
        nodes: cloneNodes(),
        description: "Initialized empty Trie Root."
    });

    // Operations: Insert "TO", Insert "TEA"
    const words = ["TO", "TEA", "TED"];
    
    // Simplified layout helper
    const positions: Record<string, {x: number, y: number}> = {
        "T": {x: 50, y: 30},
        "TO": {x: 35, y: 50},
        "TE": {x: 65, y: 50},
        "TEA": {x: 55, y: 70},
        "TED": {x: 75, y: 70}
    };

    const insert = (word: string) => {
        frames.push({
            type: 'trie',
            nodes: cloneNodes(),
            description: `Operation: Insert "${word}".`
        });

        let currentId = "root";
        let currentNode = allNodes.find(n => n.id === currentId)!;
        currentNode.isCurrent = true;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            const nextId = currentId === "root" ? char : currentId + char;
            
            // Check if exists
            const existingNode = allNodes.find(n => n.id === nextId);
            
            if (existingNode) {
                frames.push({
                    type: 'trie',
                    nodes: cloneNodes(),
                    description: `Character '${char}' exists. Moving down.`
                });
                currentNode.isCurrent = false;
                existingNode.isCurrent = true;
                currentId = nextId;
                currentNode = existingNode;
            } else {
                frames.push({
                    type: 'trie',
                    nodes: cloneNodes(),
                    description: `Character '${char}' not found. Creating new node.`
                });
                
                currentNode.isCurrent = false;
                
                const pos = positions[nextId] || {x: 50, y: 90};
                const newNode: TrieNode = {
                    id: nextId,
                    char: char,
                    isEndOfWord: false,
                    children: [],
                    x: pos.x,
                    y: pos.y,
                    isCurrent: true
                };
                
                allNodes.push(newNode);
                currentNode.children.push(nextId);
                
                frames.push({
                    type: 'trie',
                    nodes: cloneNodes(),
                    description: `Created '${char}'. Linking to parent.`
                });
                
                currentId = nextId;
                currentNode = newNode;
            }
        }
        
        currentNode.isEndOfWord = true;
        currentNode.isCurrent = false;
        currentNode.highlight = true;
        
        frames.push({
            type: 'trie',
            nodes: cloneNodes(),
            description: `Marked '${word[word.length-1]}' as End of Word.`
        });
        
        // Reset highlight
        setTimeout(() => { currentNode.highlight = false; }, 0); // Logic fix: in generator we just modify state
        currentNode.highlight = false; 
    };

    insert("TO");
    insert("TEA");
    insert("TED");

    // Search Example
    const searchWord = "TEA";
    frames.push({
        type: 'trie',
        nodes: cloneNodes(),
        description: `Operation: Search for "${searchWord}".`
    });
    
    let currentId = "root";
    let found = true;
    allNodes.forEach(n => n.isCurrent = false);
    allNodes.find(n => n.id === "root")!.isCurrent = true;

    for(let i=0; i<searchWord.length; i++) {
        const char = searchWord[i];
        const nextId = currentId === "root" ? char : currentId + char;
        const node = allNodes.find(n => n.id === nextId);
        
        frames.push({
            type: 'trie',
            nodes: cloneNodes(),
            description: `Looking for '${char}'...`
        });

        if(node) {
             const parent = allNodes.find(n => n.id === currentId)!;
             parent.isCurrent = false;
             node.isCurrent = true;
             currentId = nextId;
        } else {
            found = false;
            break;
        }
    }
    
    const finalNode = allNodes.find(n => n.id === currentId);
    if(found && finalNode?.isEndOfWord) {
         if(finalNode) {
             finalNode.highlight = true;
             finalNode.isCurrent = false;
         }
         frames.push({
            type: 'trie',
            nodes: cloneNodes(),
            description: `Found word "${searchWord}"!`
        });
    }

    return frames;
};

// --- Grid Helpers ---

const createGrid = (rows: number, cols: number, start: [number, number], end: [number, number], weighted: boolean = false): GridCell[][] => {
  const grid: GridCell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: GridCell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        isWall: false,
        isStart: r === start[0] && c === start[1],
        isEnd: r === end[0] && c === end[1],
        isVisited: false,
        isPath: false,
        isCurrent: false,
        distance: Infinity,
        weight: weighted ? Math.floor(Math.random() * 9) + 1 : 1
      });
    }
    grid.push(row);
  }
  return grid;
};

const cloneGrid = (grid: GridCell[][]): GridCell[][] => {
  return grid.map(row => row.map(cell => ({ ...cell })));
};

// --- Dijkstra's Algorithm ---

interface PQNode {
  r: number;
  c: number;
  cost: number;
}

export const generateDijkstraFrames = (rows: number, cols: number, start: [number, number], end: [number, number], walls: Set<string>): GridFrame[] => {
  const frames: GridFrame[] = [];
  let grid = createGrid(rows, cols, start, end);
  
  // Apply walls
  grid.forEach(row => row.forEach(cell => {
    if (walls.has(`${cell.row},${cell.col}`) && !cell.isStart && !cell.isEnd) {
      cell.isWall = true;
    }
    cell.distance = Infinity;
  }));

  grid[start[0]][start[1]].distance = 0;

  // Simple Priority Queue (array sort)
  let pq: PQNode[] = [{ r: start[0], c: start[1], cost: 0 }];
  const visited = new Set<string>();
  const parent = new Map<string, string>();

  frames.push({
    type: 'grid',
    grid: cloneGrid(grid),
    current: null,
    visited: [],
    queue: [`${start[0]},${start[1]}`],
    description: "Starting Dijkstra. Initialized priority queue with Start Node (dist: 0)."
  });

  while (pq.length > 0) {
    // Sort descending so pop() removes smallest
    pq.sort((a, b) => b.cost - a.cost);
    const current = pq.pop()!;
    const { r, c, cost } = current;
    const currentKey = `${r},${c}`;

    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    grid[r][c].isVisited = true;
    grid[r][c].isCurrent = true;

    frames.push({
      type: 'grid',
      grid: cloneGrid(grid),
      current: [r, c],
      visited: Array.from(visited),
      queue: pq.map(n => `[${n.r},${n.c}]:${n.cost}`),
      description: `Visiting node [${r}, ${c}] with distance ${cost}.`
    });

    grid[r][c].isCurrent = false;

    if (r === end[0] && c === end[1]) {
       let currStr: string | undefined = currentKey;
       while (currStr) {
         const [pr, pc] = currStr.split(',').map(Number);
         grid[pr][pc].isPath = true;
         currStr = parent.get(currStr);
       }
       frames.push({
         type: 'grid',
         grid: cloneGrid(grid),
         current: null,
         visited: Array.from(visited),
         queue: [],
         description: "Target found! Shortest path guaranteed."
       });
       return frames;
    }

    const neighbors = [
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
    ];

    for (const [nr, nc] of neighbors) {
       if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc].isWall) {
           const newCost = cost + 1; // Unweighted edge cost = 1
           if (newCost < (grid[nr][nc].distance || Infinity)) {
               grid[nr][nc].distance = newCost;
               parent.set(`${nr},${nc}`, currentKey);
               pq.push({ r: nr, c: nc, cost: newCost });
           }
       }
    }
  }

  return frames;
}

// --- A* Search ---

interface AStarNode {
    r: number;
    c: number;
    f: number; // f = g + h
    g: number;
}

export const generateAStarFrames = (rows: number, cols: number, start: [number, number], end: [number, number], walls: Set<string>): GridFrame[] => {
    const frames: GridFrame[] = [];
    let grid = createGrid(rows, cols, start, end);
    
    grid.forEach(row => row.forEach(cell => {
      if (walls.has(`${cell.row},${cell.col}`) && !cell.isStart && !cell.isEnd) {
        cell.isWall = true;
      }
    }));
  
    // Manhattan distance heuristic
    const getHeuristic = (r: number, c: number) => Math.abs(r - end[0]) + Math.abs(c - end[1]);
  
    let openSet: AStarNode[] = [{ r: start[0], c: start[1], g: 0, f: getHeuristic(start[0], start[1]) }];
    const closedSet = new Set<string>();
    const parent = new Map<string, string>();
    const gScore = new Map<string, number>();
    
    gScore.set(`${start[0]},${start[1]}`, 0);
  
    frames.push({
      type: 'grid',
      grid: cloneGrid(grid),
      current: null,
      visited: [],
      queue: [`${start[0]},${start[1]}`],
      description: "Starting A*. Using Manhattan distance heuristic."
    });
  
    while (openSet.length > 0) {
      // Sort descending by F, then by H (tie-breaking) for pop()
      openSet.sort((a, b) => {
          if (b.f === a.f) {
             const hA = a.f - a.g;
             const hB = b.f - b.g;
             return hB - hA; 
          }
          return b.f - a.f;
      });
      
      const current = openSet.pop()!;
      const { r, c, g } = current;
      const currentKey = `${r},${c}`;
  
      if (closedSet.has(currentKey)) continue;
      closedSet.add(currentKey);
  
      grid[r][c].isVisited = true;
      grid[r][c].isCurrent = true;
  
      frames.push({
        type: 'grid',
        grid: cloneGrid(grid),
        current: [r, c],
        visited: Array.from(closedSet),
        queue: openSet.map(n => `[${n.r},${n.c}]`), 
        description: `Visiting [${r}, ${c}] (g: ${g}, h: ${current.f - g}, f: ${current.f}).`
      });
  
      grid[r][c].isCurrent = false;
  
      if (r === end[0] && c === end[1]) {
         let currStr: string | undefined = currentKey;
         while (currStr) {
           const [pr, pc] = currStr.split(',').map(Number);
           grid[pr][pc].isPath = true;
           currStr = parent.get(currStr);
         }
         frames.push({
           type: 'grid',
           grid: cloneGrid(grid),
           current: null,
           visited: Array.from(closedSet),
           queue: [],
           description: "Target found! Path reconstructed."
         });
         return frames;
      }
  
      const neighbors = [
          [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
      ];
  
      for (const [nr, nc] of neighbors) {
         if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc].isWall && !closedSet.has(`${nr},${nc}`)) {
             const tentativeG = g + 1;
             const neighborKey = `${nr},${nc}`;
             const existingG = gScore.get(neighborKey) ?? Infinity;
             
             if (tentativeG < existingG) {
                 parent.set(neighborKey, currentKey);
                 gScore.set(neighborKey, tentativeG);
                 const h = getHeuristic(nr, nc);
                 openSet.push({ r: nr, c: nc, g: tentativeG, f: tentativeG + h });
             }
         }
      }
    }

    frames.push({
        type: 'grid',
        grid: cloneGrid(grid),
        current: null,
        visited: Array.from(closedSet),
        queue: [],
        description: "Queue empty. Target not reachable."
    });
  
    return frames;
  }

// --- Bellman Ford (Graph) ---

export const generateBellmanFordFrames = (): GraphFrame[] => {
    const frames: GraphFrame[] = [];
    const numNodes = 6;
    const nodes: GraphNode[] = [];
    const dist = new Array(numNodes).fill(Infinity);
    dist[0] = 0;

    // Layout nodes in a circle
    const centerX = 50;
    const centerY = 50;
    const radius = 35;

    for(let i=0; i<numNodes; i++) {
        const angle = (2 * Math.PI * i) / numNodes - Math.PI / 2; // Start from top
        nodes.push({
            id: i,
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
            color: '#cbd5e1', // Default slate-300
            isRoot: i === 0,
            label: i === 0 ? '0' : '∞'
        });
    }

    // Create directed edges with weights
    const edges: GraphEdge[] = [
        { source: 0, target: 1, weight: 4 },
        { source: 0, target: 2, weight: 2 },
        { source: 1, target: 2, weight: 3 }, // This creates a "useless" edge since 0->2 is cheaper
        { source: 1, target: 3, weight: 2 },
        { source: 1, target: 4, weight: 3 },
        { source: 2, target: 1, weight: 1 }, // Cycle potential
        { source: 2, target: 3, weight: 4 },
        { source: 2, target: 4, weight: 5 },
        { source: 4, target: 3, weight: -2 }, // Negative weight!
        { source: 3, target: 5, weight: 2 },
        { source: 4, target: 5, weight: 3 }
    ];

    const createFrame = (desc: string, highlights: {nodes?: number[], edges?: {source: number, target: number}[]} = {}): GraphFrame => {
        return {
            type: 'graph',
            nodes: nodes.map((n, idx) => ({
                ...n,
                label: dist[idx] === Infinity ? '∞' : dist[idx].toString(),
                color: dist[idx] === Infinity ? '#cbd5e1' : (idx === 0 ? '#10b981' : '#3b82f6')
            })),
            edges: edges,
            highlightNodes: highlights.nodes,
            highlightEdges: highlights.edges,
            description: desc
        };
    };

    frames.push(createFrame("Initialized Bellman-Ford. Distance to Source (0) is 0, others ∞."));

    // Relax edges |V| - 1 times
    for (let k = 1; k < numNodes; k++) {
        let changed = false;
        frames.push(createFrame(`Iteration ${k}: Relaxing all edges...`));
        
        for (const edge of edges) {
            const { source, target, weight } = edge;
            
            // Highlight edge being checked
            frames.push(createFrame(
                `Checking edge ${source} -> ${target} (weight: ${weight}). Dist[${source}] = ${dist[source] === Infinity ? '∞' : dist[source]}.`,
                { 
                    edges: [{source, target}],
                    nodes: [source, target]
                }
            ));

            if (dist[source] !== Infinity && dist[source] + weight! < dist[target]) {
                dist[target] = dist[source] + weight!;
                changed = true;
                
                frames.push(createFrame(
                    `Relaxation! New Dist[${target}] = ${dist[source]} + ${weight} = ${dist[target]}.`,
                    { 
                        edges: [{source, target}],
                        nodes: [target] // Highlight updated node
                    }
                ));
            }
        }
        
        if (!changed) {
            frames.push(createFrame(`No changes in Iteration ${k}. Algorithm terminated early.`));
            break;
        }
    }

    // Check for negative cycles (optional pass)
    let hasNegativeCycle = false;
    for (const edge of edges) {
        if (dist[edge.source] !== Infinity && dist[edge.source] + edge.weight! < dist[edge.target]) {
             hasNegativeCycle = true;
             frames.push(createFrame(
                `Negative cycle detected! Edge ${edge.source}->${edge.target} can still be relaxed.`,
                { edges: [{source: edge.source, target: edge.target}] }
             ));
             break;
        }
    }

    if (!hasNegativeCycle) {
        frames.push(createFrame("Bellman-Ford Complete. Shortest paths found (no negative cycles)."));
    }

    return frames;
};

// --- Interval Scheduling ---

export const generateIntervalSchedulingFrames = (): IntervalFrame[] => {
    const frames: IntervalFrame[] = [];
    const count = 7;
    const intervals: Interval[] = [];
    
    // Generate random intervals
    for(let i=0; i<count; i++) {
        const start = Math.floor(Math.random() * 20);
        const length = Math.floor(Math.random() * 8) + 2;
        intervals.push({
            id: i,
            start,
            end: start + length,
            isSelected: false,
            isConsidered: false,
            isEliminated: false
        });
    }

    frames.push({
        type: 'interval',
        intervals: JSON.parse(JSON.stringify(intervals)),
        description: "Initial set of intervals. Goal: Select maximum non-overlapping intervals."
    });

    // Step 1: Sort by end time
    intervals.sort((a, b) => a.end - b.end);

    frames.push({
        type: 'interval',
        intervals: JSON.parse(JSON.stringify(intervals)),
        description: "Greedy Strategy: Sort intervals by their Finish Time (earliest finish first)."
    });

    let lastEnd = -1;
    for(let i=0; i<intervals.length; i++) {
        const current = intervals[i];
        current.isConsidered = true;

        frames.push({
            type: 'interval',
            intervals: JSON.parse(JSON.stringify(intervals)),
            currentId: current.id,
            description: `Considering Interval ${current.id} (Ends at ${current.end}).`
        });

        if (current.start >= lastEnd) {
            current.isSelected = true;
            lastEnd = current.end;
            current.isConsidered = false;
            frames.push({
                type: 'interval',
                intervals: JSON.parse(JSON.stringify(intervals)),
                currentId: current.id,
                description: `Interval ${current.id} starts after previous selection ends. Selected.`
            });
        } else {
            current.isEliminated = true;
            current.isConsidered = false;
            frames.push({
                type: 'interval',
                intervals: JSON.parse(JSON.stringify(intervals)),
                currentId: current.id,
                description: `Interval ${current.id} overlaps. Eliminated.`
            });
        }
    }
    
    frames.push({
        type: 'interval',
        intervals: JSON.parse(JSON.stringify(intervals)),
        description: "Interval Scheduling Complete. Optimal set selected."
    });

    return frames;
};
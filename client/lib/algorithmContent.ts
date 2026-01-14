import { AlgorithmType } from "../types";

export interface AlgoContent {
  title: string;
  description: string;
  complexity: {
    time: string;
    space: string;
  };
  code: {
    cpp: string;
    python: string;
    javascript: string;
  };
}

const defaultCode = {
  cpp: "// Implementation coming soon",
  python: "# Implementation coming soon",
  javascript: "// Implementation coming soon"
};

export const algorithmContent: Record<AlgorithmType, AlgoContent> = {
  [AlgorithmType.LINEAR_SEARCH]: {
    title: "Linear Search",
    description: "Linear Search is the simplest searching algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched. It works on both sorted and unsorted arrays.",
    complexity: {
      time: "O(n) - We might need to check every element.",
      space: "O(1) - No extra space required."
    },
    code: {
      cpp: `int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++)
        if (arr[i] == x)
            return i;
    return -1;
}`,
      python: `def linear_search(arr, x):
    for i in range(len(arr)):
        if arr[i] == x:
            return i
    return -1`,
      javascript: `function linearSearch(arr, x) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === x) return i;
    }
    return -1;
}`
    }
  },
  [AlgorithmType.BINARY_SEARCH]: {
    title: "Binary Search",
    description: "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
    complexity: {
      time: "O(log n) - The search space is halved at every step.",
      space: "O(1) - Iterative implementation uses constant space."
    },
    code: {
      cpp: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
      python: `def binary_search(arr, x):
    l, r = 0, len(arr) - 1
    while l <= r:
        mid = l + (r - l) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            l = mid + 1
        else:
            r = mid - 1
    return -1`,
      javascript: `function binarySearch(arr, x) {
    let l = 0, r = arr.length - 1;
    while (l <= r) {
        let m = Math.floor(l + (r - l) / 2);
        if (arr[m] === x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`
    }
  },
  [AlgorithmType.TWO_POINTERS]: {
    title: "Two Pointers (Pair Sum)",
    description: "The Two Pointers technique is commonly used to search for a pair of elements in a sorted array that sum up to a specific target. By using pointers at the beginning and end of the array, we can determine whether to increase or decrease the sum by moving the left or right pointer, avoiding nested loops.",
    complexity: {
      time: "O(n) - We scan the array at most once.",
      space: "O(1) - No extra space needed."
    },
    code: {
      cpp: `bool hasPairWithSum(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}`,
      python: `def has_pair_with_sum(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return False`,
      javascript: `function hasPairWithSum(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}`
    }
  },
  [AlgorithmType.SLIDING_WINDOW]: {
    title: "Sliding Window",
    description: "The Sliding Window pattern is used to perform a required operation on a specific window size of a given array or string, such as finding the longest substring or the minimum sum subarray. It converts nested loops into a single loop.",
    complexity: {
      time: "O(n) - Each element is added and removed from the window at most once.",
      space: "O(1) - Assuming the window simply tracks indices."
    },
    code: {
      cpp: `// Min Size Subarray Sum
int minSubArrayLen(int target, vector<int>& nums) {
    int n = nums.size();
    int minLen = INT_MAX;
    int left = 0, sum = 0;
    
    for (int right = 0; right < n; right++) {
        sum += nums[right];
        while (sum >= target) {
            minLen = min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLen == INT_MAX ? 0 : minLen;
}`,
      python: `def min_sub_array_len(target, nums):
    min_len = float('inf')
    left = 0
    current_sum = 0
    
    for right in range(len(nums)):
        current_sum += nums[right]
        while current_sum >= target:
            min_len = min(min_len, right - left + 1)
            current_sum -= nums[left]
            left += 1
            
    return 0 if min_len == float('inf') else min_len`,
      javascript: `function minSubArrayLen(target, nums) {
    let minLen = Infinity;
    let left = 0;
    let sum = 0;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLen === Infinity ? 0 : minLen;
}`
    }
  },
  [AlgorithmType.BUBBLE_SORT]: {
    title: "Bubble Sort",
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    complexity: {
      time: "O(n²) - Nested loops checking all elements.",
      space: "O(1) - In-place sorting."
    },
    code: {
      cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1])
                swap(arr[j], arr[j+1]);
        }
    }
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`,
      javascript: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`
    }
  },
  [AlgorithmType.SELECTION_SORT]: {
    title: "Selection Sort",
    description: "Selection Sort sorts an array by repeatedly finding the minimum element (considering ascending order) from the unsorted part and putting it at the beginning.",
    complexity: {
      time: "O(n²) - Two nested loops.",
      space: "O(1) - In-place sorting."
    },
    code: {
      cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        swap(arr[min_idx], arr[i]);
    }
}`,
      python: `def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
      javascript: `function selectionSort(arr) {
    let n = arr.length;
    for(let i = 0; i < n; i++) {
        let minIdx = i;
        for(let j = i+1; j < n; j++){
            if(arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        let temp = arr[i]; 
        arr[i] = arr[minIdx];
        arr[minIdx] = temp; 
    }
    return arr;
}`
    }
  },
  [AlgorithmType.INSERTION_SORT]: {
    title: "Insertion Sort",
    description: "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort, but efficient for small data sets.",
    complexity: {
      time: "O(n²) - Worst case.",
      space: "O(1) - In-place sorting."
    },
    code: {
      cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
      javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}`
    }
  },
  [AlgorithmType.MERGE_SORT]: {
    title: "Merge Sort",
    description: "Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
    complexity: {
      time: "O(n log n) - Recursive division and merging.",
      space: "O(n) - Requires auxiliary space for merging."
    },
    code: {
      cpp: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
 
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
 
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
 
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
            
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1`,
      javascript: `function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}`
    }
  },
  [AlgorithmType.QUICK_SORT]: {
    title: "Quick Sort",
    description: "Quick Sort is a Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways.",
    complexity: {
      time: "O(n log n) average, O(n²) worst case.",
      space: "O(log n) - Stack space."
    },
    code: {
      cpp: `int partition(int arr[], int low, int high) {
    int pivot = arr[high]; 
    int i = (low - 1); 
  
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++; 
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}
  
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      python: `def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`,
      javascript: `function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    }
  },
  [AlgorithmType.MONOTONIC_STACK]: {
    title: "Monotonic Stack",
    description: "A monotonic stack is a stack that maintains its elements in a specific order (either increasing or decreasing). It is commonly used to find the 'Next Greater Element' or 'Next Smaller Element' for each item in an array in linear time.",
    complexity: {
      time: "O(n) - Each element is pushed and popped at most once.",
      space: "O(n) - Stack size."
    },
    code: {
      cpp: `vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> s; // Stores indices
    
    for (int i = 0; i < n; i++) {
        while (!s.empty() && nums[s.top()] < nums[i]) {
            res[s.top()] = nums[i];
            s.pop();
        }
        s.push(i);
    }
    return res;
}`,
      python: `def next_greater_elements(nums):
    n = len(nums)
    res = [-1] * n
    stack = [] # Stores indices
    
    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            idx = stack.pop()
            res[idx] = nums[i]
        stack.append(i)
    return res`,
      javascript: `function nextGreaterElements(nums) {
    const n = nums.length;
    const res = new Array(n).fill(-1);
    const stack = []; // Stores indices
    
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            const idx = stack.pop();
            res[idx] = nums[i];
        }
        stack.push(i);
    }
    return res;
}`
    }
  },
  [AlgorithmType.BFS]: {
    title: "Breadth-First Search (BFS)",
    description: "BFS is a graph traversal algorithm that explores all neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It uses a Queue to keep track of visited nodes.",
    complexity: {
      time: "O(V + E) - Visits every vertex and edge.",
      space: "O(V) - For the queue."
    },
    code: {
      cpp: `void bfs(vector<vector<int>>& adj, int s) {
    int V = adj.size();
    vector<bool> visited(V, false);
    queue<int> q;
 
    visited[s] = true;
    q.push(s);
 
    while(!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";
 
        for(int v : adj[u]) {
            if(!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
      python: `def bfs(adj, s):
    visited = [False] * len(adj)
    queue = []
    
    visited[s] = True
    queue.append(s)
    
    while queue:
        u = queue.pop(0)
        print(u, end=" ")
        
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                queue.append(v)`,
      javascript: `function bfs(adj, s) {
    let visited = new Array(adj.length).fill(false);
    let queue = [];
    
    visited[s] = true;
    queue.push(s);
    
    while (queue.length > 0) {
        let u = queue.shift();
        console.log(u);
        
        for (let v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                queue.push(v);
            }
        }
    }
}`
    }
  },
  [AlgorithmType.DFS]: {
    title: "Depth-First Search (DFS)",
    description: "DFS is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking. It uses a Stack (or recursion).",
    complexity: {
      time: "O(V + E) - Visits every vertex and edge.",
      space: "O(V) - Recursion stack."
    },
    code: {
      cpp: `void dfsUtil(int u, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u]) {
        if (!visited[v])
            dfsUtil(v, adj, visited);
    }
}

void dfs(vector<vector<int>>& adj, int s) {
    vector<bool> visited(adj.size(), false);
    dfsUtil(s, adj, visited);
}`,
      python: `def dfs_util(u, adj, visited):
    visited[u] = True
    print(u, end=" ")
    for v in adj[u]:
        if not visited[v]:
            dfs_util(v, adj, visited)

def dfs(adj, s):
    visited = [False] * len(adj)
    dfs_util(s, adj, visited)`,
      javascript: `function dfsUtil(u, adj, visited) {
    visited[u] = true;
    console.log(u);
    for (let v of adj[u]) {
        if (!visited[v]) {
            dfsUtil(v, adj, visited);
        }
    }
}

function dfs(adj, s) {
    let visited = new Array(adj.length).fill(false);
    dfsUtil(s, adj, visited);
}`
    }
  },
  [AlgorithmType.DIJKSTRA]: {
    title: "Dijkstra's Algorithm",
    description: "Dijkstra's algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights. It uses a priority queue to greedily select the closest unvisited node.",
    complexity: {
      time: "O((V + E) log V) - Using Priority Queue.",
      space: "O(V) - To store distances."
    },
    code: {
      cpp: `vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int S) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, INT_MAX);
 
    dist[S] = 0;
    pq.push({0, S});
 
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
 
        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      python: `import heapq

def dijkstra(V, adj, S):
    pq = []
    heapq.heappush(pq, (0, S))
    dist = [float('inf')] * V
    dist[S] = 0
    
    while pq:
        d, u = heapq.heappop(pq)
        
        if d > dist[u]: continue
        
        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    return dist`,
      javascript: `// Requires a PriorityQueue implementation
function dijkstra(V, adj, S) {
    let dist = new Array(V).fill(Infinity);
    let pq = new MinPriorityQueue(); // Hypothetical class
    
    dist[S] = 0;
    pq.enqueue(S, 0);
    
    while (!pq.isEmpty()) {
        let { element: u } = pq.dequeue();
        
        for (let [v, weight] of adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.enqueue(v, dist[v]);
            }
        }
    }
    return dist;
}`
    }
  },
  [AlgorithmType.A_STAR]: {
    title: "A* Search Algorithm",
    description: "A* is an informed search algorithm used for pathfinding. It maintains a tree of paths originating at the start node and extends those paths one edge at a time. It uses a heuristic function to estimate the cost to the goal, prioritizing promising paths.",
    complexity: {
      time: "O(E) - Depends heavily on heuristic.",
      space: "O(V) - Stores visited nodes."
    },
    code: {
      cpp: "// Similar to Dijkstra but with heuristic h(n)\n// f(n) = g(n) + h(n)",
      python: "# Similar to Dijkstra but adds heuristic cost\n# priority = g_score + heuristic(neighbor, goal)",
      javascript: "// Similar to Dijkstra but uses heuristic\n// f = g + h"
    }
  },
  [AlgorithmType.BELLMAN_FORD]: {
    title: "Bellman-Ford Algorithm",
    description: "Bellman-Ford computes shortest paths from a single source vertex to all of the other vertices in a weighted digraph. It is slower than Dijkstra's algorithm but can handle graphs with negative edge weights.",
    complexity: {
      time: "O(V * E) - Relaxes all edges V-1 times.",
      space: "O(V) - Distance array."
    },
    code: {
      cpp: `vector<int> bellmanFord(int V, vector<vector<int>>& edges, int S) {
    vector<int> dist(V, 1e8);
    dist[S] = 0;
    for (int i = 0; i < V - 1; i++) {
        for (auto& it : edges) {
            int u = it[0];
            int v = it[1];
            int wt = it[2];
            if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
            }
        }
    }
    // Check for negative cycle
    for (auto& it : edges) {
        int u = it[0];
        int v = it[1];
        int wt = it[2];
        if (dist[u] != 1e8 && dist[u] + wt < dist[v]) return {-1};
    }
    return dist;
}`,
      python: `def bellman_ford(V, edges, S):
    dist = [float('inf')] * V
    dist[S] = 0
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                
    # Negative cycle check
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None # Cycle detected
    return dist`,
      javascript: `function bellmanFord(V, edges, S) {
    let dist = new Array(V).fill(Infinity);
    dist[S] = 0;
    
    for (let i = 0; i < V - 1; i++) {
        for (let [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    return dist;
}`
    }
  },
  [AlgorithmType.UNION_FIND]: {
    title: "Union Find (Disjoint Set)",
    description: "Union-Find is a data structure that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets. It supports two useful operations: Find (determine which subset a particular element is in) and Union (join two subsets).",
    complexity: {
      time: "O(α(n)) - Inverse Ackermann function (nearly constant).",
      space: "O(n) - To store parent array."
    },
    code: {
      cpp: `int parent[MAXN];
int find(int i) {
    if (parent[i] == i)
        return i;
    return parent[i] = find(parent[i]); // Path Compression
}
void unionSets(int i, int j) {
    int root_i = find(i);
    int root_j = find(j);
    if (root_i != root_j)
        parent[root_i] = root_j;
}`,
      python: `parent = list(range(n))
def find(i):
    if parent[i] == i:
        return i
    parent[i] = find(parent[i]) # Path Compression
    return parent[i]

def union(i, j):
    root_i = find(i)
    root_j = find(j)
    if root_i != root_j:
        parent[root_i] = root_j`,
      javascript: `class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
    }
    find(i) {
        if (this.parent[i] === i) return i;
        return this.parent[i] = this.find(this.parent[i]); // Path compression
    }
    union(i, j) {
        const rootI = this.find(i);
        const rootJ = this.find(j);
        if (rootI !== rootJ) this.parent[rootI] = rootJ;
    }
}`
    }
  },
  [AlgorithmType.LINKED_LIST]: {
    title: "Linked List",
    description: "A Linked List is a linear data structure where elements are not stored at contiguous memory locations. The elements are linked using pointers. It allows for efficient insertion and deletion.",
    complexity: {
      time: "Search O(n), Insert/Delete O(1) (if pointer known).",
      space: "O(n) - Storage for elements + pointers."
    },
    code: {
      cpp: `struct Node {
    int data;
    Node* next;
};`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next`,
      javascript: `class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}`
    }
  },
  [AlgorithmType.TRIE]: {
    title: "Trie (Prefix Tree)",
    description: "A Trie is a tree-like data structure used to efficiently store and retrieve keys in a dataset of strings. It is widely used for autocomplete and spell checker systems.",
    complexity: {
      time: "O(m) - m is the length of the string.",
      space: "O(m * Alphabet_Size * n) - Space efficient for shared prefixes."
    },
    code: {
      cpp: `struct TrieNode {
    TrieNode *children[26];
    bool isEndOfWord;
};

void insert(struct TrieNode *root, string key) {
    struct TrieNode *pCrawl = root;
    for (int i = 0; i < key.length(); i++) {
        int index = key[i] - 'a';
        if (!pCrawl->children[index])
            pCrawl->children[index] = getNode();
        pCrawl = pCrawl->children[index];
    }
    pCrawl->isEndOfWord = true;
}`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True`,
      javascript: `class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}
class Trie {
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }
}`
    }
  },
  [AlgorithmType.INTERVAL_SCHEDULING]: {
    title: "Interval Scheduling",
    description: "The Interval Scheduling problem asks to select the maximum number of mutually compatible intervals. The greedy approach of sorting by finish time works optimally.",
    complexity: {
      time: "O(n log n) - Due to sorting.",
      space: "O(1) - or O(n) depending on sort implementation."
    },
    code: {
      cpp: `bool compare(Interval a, Interval b) {
    return a.end < b.end;
}
int maxIntervals(vector<Interval>& intervals) {
    sort(intervals.begin(), intervals.end(), compare);
    int count = 0;
    int lastEnd = -1;
    for(auto val : intervals) {
        if(val.start >= lastEnd) {
            count++;
            lastEnd = val.end;
        }
    }
    return count;
}`,
      python: `def solve_interval_scheduling(intervals):
    # intervals is list of (start, end)
    intervals.sort(key=lambda x: x[1])
    count = 0
    last_end = -1
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count`,
      javascript: `function maxIntervals(intervals) {
    intervals.sort((a, b) => a.end - b.end);
    let count = 0;
    let lastEnd = -1;
    for(let interval of intervals) {
        if(interval.start >= lastEnd) {
            count++;
            lastEnd = interval.end;
        }
    }
    return count;
}`
    }
  }
};

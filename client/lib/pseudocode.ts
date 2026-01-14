import { AlgorithmType } from '../types';

export const algorithmPseudocode: Partial<Record<AlgorithmType, string[]>> = {
  [AlgorithmType.LINEAR_SEARCH]: [
    "for i from 0 to length - 1:",
    "  if array[i] == target:",
    "    return i (Found)",
    "return -1 (Not Found)"
  ],
  [AlgorithmType.BINARY_SEARCH]: [
    "left = 0, right = length - 1",
    "while left <= right:",
    "  mid = floor((left + right) / 2)",
    "  if array[mid] == target: return mid",
    "  if array[mid] < target:",
    "    left = mid + 1",
    "  else:",
    "    right = mid - 1",
    "return -1"
  ],
  [AlgorithmType.TWO_POINTERS]: [
    "left = 0, right = length - 1",
    "while left < right:",
    "  sum = array[left] + array[right]",
    "  if sum == target: return true",
    "  else if sum < target: left++",
    "  else: right--",
    "return false"
  ],
  [AlgorithmType.BUBBLE_SORT]: [
    "for i from 0 to n - 1:",
    "  swapped = false",
    "  for j from 0 to n - i - 1:",
    "    if array[j] > array[j+1]:",
    "      swap(array[j], array[j+1])",
    "      swapped = true",
    "  if not swapped: break"
  ],
  [AlgorithmType.SELECTION_SORT]: [
    "for i from 0 to n - 1:",
    "  min_idx = i",
    "  for j from i + 1 to n:",
    "    if array[j] < array[min_idx]:",
    "      min_idx = j",
    "  if min_idx != i:",
    "    swap(array[i], array[min_idx])"
  ],
  [AlgorithmType.INSERTION_SORT]: [
    "for i from 1 to n:",
    "  key = array[i], j = i - 1",
    "  while j >= 0 and array[j] > key:",
    "    array[j+1] = array[j]",
    "    j = j - 1",
    "  array[j+1] = key"
  ],
  [AlgorithmType.MERGE_SORT]: [
    "function mergeSort(arr):",
    "  if length <= 1: return",
    "  mid = length / 2",
    "  mergeSort(leftHalf), mergeSort(rightHalf)",
    "  merge(leftHalf, rightHalf)"
  ],
  [AlgorithmType.QUICK_SORT]: [
    "function quickSort(low, high):",
    "  if low < high:",
    "    pivot = partition(low, high)",
    "    quickSort(low, pivot - 1)",
    "    quickSort(pivot + 1, high)"
  ],
  [AlgorithmType.BFS]: [
    "create queue Q, enqueue start_node",
    "mark start_node as visited",
    "while Q is not empty:",
    "  u = Q.dequeue()",
    "  for each neighbor v of u:",
    "    if v is not visited:",
    "      mark v as visited",
    "      Q.enqueue(v)"
  ],
  [AlgorithmType.DFS]: [
    "function dfs(u):",
    "  mark u as visited",
    "  for each neighbor v of u:",
    "    if v is not visited:",
    "      dfs(v)"
  ]
};
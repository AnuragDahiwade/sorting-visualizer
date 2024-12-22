export interface SortingStats {
  comparisons: number;
  swaps: number;
  timeElapsed: number;   // In milliseconds
  arrayAccesses: number;
  currentPhase: string;  // e.g., "partitioning", "merging"
}
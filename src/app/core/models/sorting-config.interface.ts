export type SortingAlgorithm = 
  | 'bubble' 
  | 'quick' 
  | 'merge' 
  | 'selection'
  | 'insertion'
  | 'heap'
  | 'counting'
  | 'radix'
  | 'bucket';
export interface SortingConfig {
  algorithm: SortingAlgorithm;
  arraySize: number;
  speed: number;         // Milliseconds per operation
  showStats: boolean;
  soundEnabled?: boolean; // For audio feedback
}
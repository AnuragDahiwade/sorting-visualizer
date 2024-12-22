export type SortingEventType = 'comparison' | 'swap' | 'selection' | 'partition' | 'merge';

export interface SortingEvent {
  type: SortingEventType;
  indices: number[];     // Affected array indices
  timestamp: number;
  description?: string;  // For detailed logging/playback
}
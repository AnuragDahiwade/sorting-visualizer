
export type ElementState = 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'selected';

export interface ArrayElement {
  value: number;
  state: ElementState;
  originalIndex: number;  // To track initial position
  color?: string;        // For custom visualization
}

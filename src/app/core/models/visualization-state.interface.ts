import { ArrayElement } from "./array-element.interface";
import { SortingAlgorithm } from "./sorting-config.interface";
import { SortingEvent } from "./sorting-event.interface";
import { SortingStats } from "./sorting-stats.interface";

export interface VisualizationState {
  array: ArrayElement[];
  isSorting: boolean;
  isPaused: boolean;
  currentAlgorithm: SortingAlgorithm;
  speed: number;
  stats: SortingStats;
  currentStep: number;
  totalSteps: number;
  eventHistory: SortingEvent[];
}
import { SortingAlgorithm } from "./sorting-config.interface";

export interface AlgorithmInfo {
  name: SortingAlgorithm;
  displayName: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  description: string;
}
import { ElementState } from "./array-element.interface";

export interface ChartOptions {
  barWidth: number;
  barGap: number;
  containerHeight: number;
  containerWidth: number;
  barColorMap: {
    [key in ElementState]: string;
  };
  animations: {
    enabled: boolean;
    duration: number;
  };
}
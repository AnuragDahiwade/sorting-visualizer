import { ElementState } from "./array-element.interface";

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  states: {
    [key in ElementState]: string;
  };
  chart: {
    gridColor: string;
    axisColor: string;
    labelColor: string;
  };
}
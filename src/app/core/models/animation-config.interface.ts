export interface AnimationConfig {
  duration: number;      // Duration of each animation step
  delayBetweenSteps: number;
  highlightDuration: number;
  swapAnimation: {
    duration: number;
    easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  };
}
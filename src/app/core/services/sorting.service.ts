import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ArrayElement } from '../models/array-element.interface';
import { SortingStats } from '../models/sorting-stats.interface';
import { SortingEvent } from '../models/sorting-event.interface';
import { SortingAlgorithm } from '../models/sorting-config.interface';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private arraySubject = new BehaviorSubject<ArrayElement[]>([]);
  private statsSubject = new BehaviorSubject<SortingStats>({
    comparisons: 0,
    swaps: 0,
    timeElapsed: 0,
    arrayAccesses: 0,
    currentPhase: 'idle',
  });
  private eventsSubject = new BehaviorSubject<SortingEvent[]>([]);
  private speedMs = 100;

  // Observables
  array$ = this.arraySubject.asObservable();
  stats$ = this.statsSubject.asObservable();
  events$ = this.eventsSubject.asObservable();

  constructor() {}

  // New method to generate random array
  generateArray(size: number, min: number = 5, max: number = 100): void {
    const newArray: ArrayElement[] = Array.from(
      { length: size },
      (_, index) => ({
        value: Math.floor(Math.random() * (max - min + 1)) + min,
        state: 'default',
        originalIndex: index,
      })
    );
    this.arraySubject.next(newArray);
    this.resetStats();
  }

  // New method to get current array
  getCurrentArray(): ArrayElement[] {
    return this.arraySubject.value;
  }

  // New method to get array as plain numbers
  getCurrentArrayValues(): number[] {
    return this.arraySubject.value.map((element) => element.value);
  }

  // New method to generate specific array patterns
  generateSpecialArray(
    type: 'nearly-sorted' | 'reversed' | 'few-unique' | 'sorted',
    size: number
  ): void {
    let newArray: number[] = [];

    switch (type) {
      case 'nearly-sorted':
        newArray = this.generateNearlySortedArray(size);
        break;
      case 'reversed':
        newArray = Array.from({ length: size }, (_, i) => size - i);
        break;
      case 'few-unique':
        newArray = this.generateFewUniqueArray(size);
        break;
      case 'sorted':
        newArray = Array.from({ length: size }, (_, i) => i + 1);
        break;
    }

    const elements: ArrayElement[] = newArray.map((value, index) => ({
      value,
      state: 'default',
      originalIndex: index,
    }));

    this.arraySubject.next(elements);
    this.resetStats();
  }

  private generateNearlySortedArray(size: number): number[] {
    const arr = Array.from({ length: size }, (_, i) => i + 1);
    // Swap a few random pairs to make it nearly sorted
    for (let i = 0; i < size * 0.1; i++) {
      const idx1 = Math.floor(Math.random() * size);
      const idx2 = Math.floor(Math.random() * size);
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }
    return arr;
  }

  private generateFewUniqueArray(size: number): number[] {
    const uniqueValues = [10, 20, 30, 40, 50]; // Few unique values
    return Array.from(
      { length: size },
      () => uniqueValues[Math.floor(Math.random() * uniqueValues.length)]
    );
  }

  // Method to manually set array
  setArray(array: number[]): void {
    const elements: ArrayElement[] = array.map((value, index) => ({
      value,
      state: 'default',
      originalIndex: index,
    }));
    this.arraySubject.next(elements);
    this.resetStats();
  }

  // Method to check if array is sorted
  isSorted(): boolean {
    const array = this.getCurrentArray();
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i].value > array[i + 1].value) {
        return false;
      }
    }
    return true;
  }

  setSpeed(speedMs: number): void {
    this.speedMs = speedMs;
  }

  private resetStats(): void {
    this.statsSubject.next({
      comparisons: 0,
      swaps: 0,
      timeElapsed: 0,
      arrayAccesses: 0,
      currentPhase: 'idle',
    });
    this.eventsSubject.next([]);
  }

  private async delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.speedMs));
  }

  private updateStats(type: 'comparison' | 'swap' | 'access'): void {
    const currentStats = this.statsSubject.value;
    const newStats = { ...currentStats };

    switch (type) {
      case 'comparison':
        newStats.comparisons++;
        break;
      case 'swap':
        newStats.swaps++;
        break;
      case 'access':
        newStats.arrayAccesses++;
        break;
    }

    this.statsSubject.next(newStats);
  }

  private async compare(
    arr: ArrayElement[],
    i: number,
    j: number
  ): Promise<boolean> {
    arr[i].state = 'comparing';
    arr[j].state = 'comparing';
    this.arraySubject.next([...arr]);

    await this.delay();
    this.updateStats('comparison');

    const result = arr[i].value > arr[j].value;

    arr[i].state = 'default';
    arr[j].state = 'default';

    return result;
  }

  private async swap(arr: ArrayElement[], i: number, j: number): Promise<void> {
    arr[i].state = 'swapping';
    arr[j].state = 'swapping';
    this.arraySubject.next([...arr]);

    await this.delay();
    this.updateStats('swap');

    [arr[i], arr[j]] = [arr[j], arr[i]];

    arr[i].state = 'default';
    arr[j].state = 'default';
    this.arraySubject.next([...arr]);
  }

  // Bubble Sort Implementation
  async bubbleSort(): Promise<void> {
    const arr = [...this.arraySubject.value];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (await this.compare(arr, j, j + 1)) {
          await this.swap(arr, j, j + 1);
        }
      }
      arr[n - i - 1].state = 'sorted';
    }

    arr[0].state = 'sorted';
    this.arraySubject.next(arr);
  }

  // Quick Sort Implementation
  async quickSort(): Promise<void> {
    const arr = [...this.arraySubject.value];
    await this.quickSortHelper(arr, 0, arr.length - 1);
    this.arraySubject.next(arr);
  }

  private async quickSortHelper(
    arr: ArrayElement[],
    low: number,
    high: number
  ): Promise<void> {
    if (low < high) {
      const pi = await this.partition(arr, low, high);
      await this.quickSortHelper(arr, low, pi - 1);
      await this.quickSortHelper(arr, pi + 1, high);
    }
  }

  private async partition(
    arr: ArrayElement[],
    low: number,
    high: number
  ): Promise<number> {
    const pivot = arr[high];
    pivot.state = 'pivot';
    this.arraySubject.next([...arr]);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Changed the comparison logic by adding ! operator
      if (!(await this.compare(arr, j, high))) {
        i++;
        await this.swap(arr, i, j);
      }
    }

    await this.swap(arr, i + 1, high);
    pivot.state = 'default';
    return i + 1;
  }

  // Merge Sort Implementation
  async mergeSort(): Promise<void> {
    const arr = [...this.arraySubject.value];
    await this.mergeSortHelper(arr, 0, arr.length - 1);

    // Mark all elements as sorted at the end
    arr.forEach((element) => (element.state = 'sorted'));
    this.arraySubject.next([...arr]);
  }

  private async mergeSortHelper(
    arr: ArrayElement[],
    left: number,
    right: number
  ): Promise<void> {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await this.mergeSortHelper(arr, left, mid);
      await this.mergeSortHelper(arr, mid + 1, right);
      await this.merge(arr, left, mid, right);
    }
  }

  private async merge(
    arr: ArrayElement[],
    left: number,
    mid: number,
    right: number
  ): Promise<void> {
    const tempArray = [...arr]; // Create a copy of the entire array

    let i = left; // Starting index of left subarray
    let j = mid + 1; // Starting index of right subarray
    let k = left; // Starting index of merged array

    while (i <= mid && j <= right) {
      // Highlight elements being compared
      arr[i].state = 'comparing';
      arr[j].state = 'comparing';
      this.arraySubject.next([...arr]);

      if (tempArray[i].value <= tempArray[j].value) {
        arr[k] = { ...tempArray[i], state: 'default' };
        i++;
      } else {
        arr[k] = { ...tempArray[j], state: 'default' };
        j++;
      }

      // Update the array and reset states
      this.arraySubject.next([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100));
      k++;
    }

    // Copy remaining elements from left subarray
    while (i <= mid) {
      arr[k] = { ...tempArray[i], state: 'default' };
      this.arraySubject.next([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100));
      i++;
      k++;
    }

    // Copy remaining elements from right subarray
    while (j <= right) {
      arr[k] = { ...tempArray[j], state: 'default' };
      this.arraySubject.next([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100));
      j++;
      k++;
    }
  }

  // Selection Sort Implementation
  async selectionSort(): Promise<void> {
    const arr = [...this.arraySubject.value];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      arr[i].state = 'selected';

      for (let j = i + 1; j < n; j++) {
        if (await this.compare(arr, minIdx, j)) {
          arr[minIdx].state = 'default';
          minIdx = j;
          arr[minIdx].state = 'selected';
        }
      }

      if (minIdx !== i) {
        await this.swap(arr, i, minIdx);
      }

      arr[i].state = 'sorted';
      this.arraySubject.next([...arr]);
    }

    arr[n - 1].state = 'sorted';
    this.arraySubject.next(arr);
  }

  // ... (previous code remains the same until the sorting algorithms section)

  // Insertion Sort Implementation
  // async insertionSort(): Promise<void> {
  //   const arr = [...this.arraySubject.value];
  //   const n = arr.length;

  //   for (let i = 1; i < n; i++) {
  //     const key = arr[i];
  //     key.state = 'selected';
  //     this.arraySubject.next([...arr]);
  //     await this.delay();

  //     let j = i - 1;
  //     while (j >= 0 && (await this.compare(arr, j, i))) {
  //       arr[j + 1] = arr[j];
  //       arr[j + 1].state = 'swapping';
  //       this.arraySubject.next([...arr]);
  //       await this.delay();
  //       arr[j + 1].state = 'default';
  //       j--;
  //     }

  //     arr[j + 1] = key;
  //     key.state = 'sorted';
  //     this.arraySubject.next([...arr]);
  //   }

  //   // Mark all elements as sorted
  //   for (const element of arr) {
  //     element.state = 'sorted';
  //   }
  //   this.arraySubject.next(arr);
  // }

  async insertionSort(): Promise<void> {
    const arr = [...this.arraySubject.value];
    const n = arr.length;

    // Reset all states to default at the start
    arr.forEach((element) => (element.state = 'default'));
    this.arraySubject.next([...arr]);

    for (let i = 1; i < n; i++) {
      // Select current element
      const key = { ...arr[i] }; // Create a copy of the element
      key.state = 'selected';
      arr[i].state = 'selected';
      this.arraySubject.next([...arr]);
      await this.delay();

      let j = i - 1;

      // Compare and shift elements
      while (j >= 0 && arr[j].value > key.value) {
        // Move elements forward
        arr[j + 1] = { ...arr[j], state: 'swapping' };
        arr[j].state = 'swapping';
        this.arraySubject.next([...arr]);
        await this.delay();

        // Reset state of shifted element
        arr[j + 1].state = 'default';
        j--;
      }

      // Place the key element in its correct position
      arr[j + 1] = { ...key };
      arr[j + 1].state = 'sorted';
      this.arraySubject.next([...arr]);
      await this.delay();

      // Mark all elements up to i as sorted
      for (let k = 0; k <= i; k++) {
        arr[k].state = 'sorted';
      }
      this.arraySubject.next([...arr]);
    }

    // Mark all remaining elements as sorted
    arr.forEach((element) => (element.state = 'sorted'));
    this.arraySubject.next([...arr]);
  }

  Insertion() {
    // int n = arr.length;
    //     for(int i=0; i<n; i++) {
    //         int num = arr[i];
    //         int j = i - 1;
    //         while(j >= 0 && num < arr[j]) {
    //             arr[j+1] = arr[j];
    //             j--;
    //         }
    //         arr[j+1] = num;
    //     }
    //     return arr;
  }
  // Heap Sort Implementation
  async heapSort(): Promise<void> {
    const arr = [...this.arraySubject.value];
    const n = arr.length;

    // Build min heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      await this.swap(arr, 0, i);
      arr[i].state = 'sorted';
      this.arraySubject.next([...arr]);
      await this.heapify(arr, i, 0);
    }

    arr[0].state = 'sorted';
    this.arraySubject.next(arr);
  }

  private async heapify(
    arr: ArrayElement[],
    n: number,
    i: number
  ): Promise<void> {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Changed to find the smallest element instead of largest
    if (left < n && !(await this.compare(arr, smallest, left))) {
      smallest = left;
    }

    if (right < n && !(await this.compare(arr, smallest, right))) {
      smallest = right;
    }

    if (smallest !== i) {
      await this.swap(arr, i, smallest);
      await this.heapify(arr, n, smallest);
    }
  }

  // Counting Sort Implementation
  async countingSort(): Promise<void> {
    const arr = [...this.arraySubject.value];
    const n = arr.length;

    // Find max value
    let max = arr[0].value;
    for (const element of arr) {
      if (element.value > max) {
        max = element.value;
      }
    }

    // Create counting array
    const count = new Array(max + 1).fill(0);

    // Count occurrences
    for (const element of arr) {
      element.state = 'comparing';
      this.arraySubject.next([...arr]);
      await this.delay();
      count[element.value]++;
      element.state = 'default';
    }

    // Calculate cumulative count
    for (let i = 1; i <= max; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    const output: ArrayElement[] = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
      const element = { ...arr[i] };
      const index = count[element.value] - 1;
      output[index] = element;
      count[element.value]--;

      // Visualize placement
      element.state = 'swapping';
      this.arraySubject.next([...arr]);
      await this.delay();
    }

    // Copy back to original array with visualization
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      arr[i].state = 'sorted';
      this.arraySubject.next([...arr]);
      await this.delay();
    }
  }

  // Radix Sort Implementation
  async radixSort(): Promise<void> {
    const arr = [...this.arraySubject.value];

    // Find maximum number to know number of digits
    let max = arr[0].value;
    for (const element of arr) {
      if (element.value > max) {
        max = element.value;
      }
    }

    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await this.countingSortForRadix(arr, exp);
    }

    // Mark all as sorted
    for (const element of arr) {
      element.state = 'sorted';
    }
    this.arraySubject.next(arr);
  }

  private async countingSortForRadix(
    arr: ArrayElement[],
    exp: number
  ): Promise<void> {
    const n = arr.length;
    const output: ArrayElement[] = new Array(n);
    const count = new Array(10).fill(0);

    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i].value / exp) % 10;
      count[digit]++;
      arr[i].state = 'comparing';
      this.arraySubject.next([...arr]);
      await this.delay();
      arr[i].state = 'default';
    }

    // Change count[i] to position of digit in output
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i].value / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;

      arr[i].state = 'swapping';
      this.arraySubject.next([...arr]);
      await this.delay();
      arr[i].state = 'default';
    }

    // Copy output array to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      arr[i].state = 'comparing';
      this.arraySubject.next([...arr]);
      await this.delay();
      arr[i].state = 'default';
    }
  }

  // Bucket Sort Implementation
  async bucketSort(): Promise<void> {
    const arr = [...this.arraySubject.value];
    const n = arr.length;
    const bucketCount = Math.floor(Math.sqrt(n));

    // Find max value for scaling
    let maxVal = arr[0].value;
    for (const element of arr) {
      if (element.value > maxVal) {
        maxVal = element.value;
      }
    }

    // Create buckets
    const buckets: ArrayElement[][] = Array.from(
      { length: bucketCount },
      () => []
    );

    // Put elements in buckets
    for (const element of arr) {
      const bucketIndex = Math.floor(
        (element.value * bucketCount) / (maxVal + 1)
      );
      buckets[bucketIndex].push(element);

      element.state = 'comparing';
      this.arraySubject.next([...arr]);
      await this.delay();
      element.state = 'default';
    }

    // Sort buckets using insertion sort and visualize
    let currentIndex = 0;
    for (const bucket of buckets) {
      // Sort bucket using insertion sort
      for (let i = 1; i < bucket.length; i++) {
        const key = bucket[i];
        let j = i - 1;

        while (j >= 0 && bucket[j].value > key.value) {
          bucket[j + 1] = bucket[j];
          bucket[j + 1].state = 'swapping';
          this.arraySubject.next([...arr]);
          await this.delay();
          bucket[j + 1].state = 'default';
          j--;
        }
        bucket[j + 1] = key;
      }

      // Copy back to original array
      for (const element of bucket) {
        arr[currentIndex] = element;
        element.state = 'sorted';
        this.arraySubject.next([...arr]);
        await this.delay();
        currentIndex++;
      }
    }

    this.arraySubject.next(arr);
  }

  // Public method to start sorting
  async sort(algorithm: SortingAlgorithm): Promise<void> {
    const startTime = Date.now();

    switch (algorithm) {
      case 'bubble':
        await this.bubbleSort();
        break;
      case 'quick':
        await this.quickSort();
        break;
      case 'merge':
        await this.mergeSort();
        break;
      case 'selection':
        await this.selectionSort();
        break;
      case 'insertion':
        await this.insertionSort();
        break;
      case 'heap':
        await this.heapSort();
        break;
      case 'counting':
        await this.countingSort();
        break;
      case 'radix':
        await this.radixSort();
        break;
      case 'bucket':
        await this.bucketSort();
        break;
      default:
        throw new Error(`Algorithm ${algorithm} not implemented`);
    }

    const endTime = Date.now();
    const currentStats = this.statsSubject.value;
    this.statsSubject.next({
      ...currentStats,
      timeElapsed: endTime - startTime,
    });
  }
}

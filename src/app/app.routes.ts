import { Routes } from '@angular/router';
import { VisualizerPageComponent } from './features/visualizer/containers/visualizer-page/visualizer-page.component';
import { ControlsComponent } from './features/visualizer/components/controls/controls.component';
import { BubbleSortComponent } from './features/visualizer/components/sortings/bubble-sort/bubble-sort.component';
import { InsertionSortComponent } from './features/visualizer/components/sortings/insertion-sort/insertion-sort.component';
import { SelectionSortComponent } from './features/visualizer/components/sortings/selection-sort/selection-sort.component';
import { MergeSortComponent } from './features/visualizer/components/sortings/merge-sort/merge-sort.component';
import { QuickSortComponent } from './features/visualizer/components/sortings/quick-sort/quick-sort.component';
import { HeapSortComponent } from './features/visualizer/components/sortings/heap-sort/heap-sort.component';
import { CountingSortComponent } from './features/visualizer/components/sortings/counting-sort/counting-sort.component';
import { RadixSortComponent } from './features/visualizer/components/sortings/radix-sort/radix-sort.component';
import { BucketSortComponent } from './features/visualizer/components/sortings/bucket-sort/bucket-sort.component';

export const routes: Routes = [
  {
    path: '',
    component: BubbleSortComponent
  },
  {
    path: 'sorting',
    component: VisualizerPageComponent
  },
  {
    path: "controls",
    component: ControlsComponent
  },
  {
    path: 'sortings',
    children: [
      {
        path: 'bubble-sort',
        component: BubbleSortComponent
      },
      {
        path: 'insertion-sort',
        component: InsertionSortComponent
      },
      {
        path: 'selection-sort',
        component: SelectionSortComponent
      },
      {
        path: 'merge-sort',
        component: MergeSortComponent
      },
      {
        path: 'quick-sort',
        component: QuickSortComponent
      },
      {
        path: 'heap-sort',
        component: HeapSortComponent
      },
      {
        path: 'counting-sort',
        component: CountingSortComponent
      },
      {
        path: 'radix-sort',
        component: RadixSortComponent
      },
      {
        path: 'bucket-sort',
        component: BucketSortComponent
      }
    ]
  }

];

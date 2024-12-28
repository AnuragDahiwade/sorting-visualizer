import { Routes } from '@angular/router';
import { VisualizerPageComponent } from './features/visualizer/containers/visualizer-page/visualizer-page.component';
import { ControlsComponent } from './features/visualizer/components/controls/controls.component';
import { BubbleSortComponent } from './features/visualizer/components/sortings/bubble-sort/bubble-sort.component';
import { InsertionSortComponent } from './features/visualizer/components/sortings/insertion-sort/insertion-sort.component';

export const routes: Routes = [
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
      }
    ]
  }

];

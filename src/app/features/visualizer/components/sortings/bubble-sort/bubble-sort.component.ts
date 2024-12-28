import { Component } from '@angular/core';
import { VisualizerPageComponent } from '../../../containers/visualizer-page/visualizer-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortingAlgorithm } from '../../../../../core/models/sorting-config.interface';

@Component({
  selector: 'app-bubble-sort',
  standalone: true,
  imports: [VisualizerPageComponent, CommonModule, FormsModule],
  templateUrl: './bubble-sort.component.html',
  styleUrl: './bubble-sort.component.css'
})
export class BubbleSortComponent {
  algorithmName: SortingAlgorithm = "bubble";

}

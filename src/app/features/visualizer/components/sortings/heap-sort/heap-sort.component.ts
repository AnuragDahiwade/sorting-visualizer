import { Component } from '@angular/core';
import { SortingAlgorithm } from '../../../../../core/models/sorting-config.interface';
import { VisualizerPageComponent } from '../../../containers/visualizer-page/visualizer-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heap-sort',
  standalone: true,
  imports: [VisualizerPageComponent, CommonModule, FormsModule],
  templateUrl: './heap-sort.component.html',
  styleUrl: './heap-sort.component.css'
})
export class HeapSortComponent {
  algorithmName: SortingAlgorithm = "heap";

}

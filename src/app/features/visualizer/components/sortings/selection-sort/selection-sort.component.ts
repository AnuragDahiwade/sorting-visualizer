import { Component } from '@angular/core';
import { SortingAlgorithm } from '../../../../../core/models/sorting-config.interface';
import { VisualizerPageComponent } from '../../../containers/visualizer-page/visualizer-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selection-sort',
  standalone: true,
  imports: [VisualizerPageComponent, CommonModule, FormsModule],
  templateUrl: './selection-sort.component.html',
  styleUrl: './selection-sort.component.css'
})
export class SelectionSortComponent {
  algorithmName: SortingAlgorithm = "selection";

}

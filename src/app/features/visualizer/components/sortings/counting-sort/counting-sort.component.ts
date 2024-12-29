import { Component } from '@angular/core';
import { SortingAlgorithm } from '../../../../../core/models/sorting-config.interface';
import { VisualizerPageComponent } from '../../../containers/visualizer-page/visualizer-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counting-sort',
  standalone: true,
  imports: [VisualizerPageComponent, CommonModule, FormsModule],
  templateUrl: './counting-sort.component.html',
  styleUrl: './counting-sort.component.css'
})
export class CountingSortComponent {
  algorithmName: SortingAlgorithm = "counting";

}

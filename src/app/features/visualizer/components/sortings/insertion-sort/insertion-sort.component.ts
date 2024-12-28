import { Component } from '@angular/core';
import { VisualizerPageComponent } from '../../../containers/visualizer-page/visualizer-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortingAlgorithm } from '../../../../../core/models/sorting-config.interface';

@Component({
  selector: 'app-insertion-sort',
  standalone: true,
  imports: [VisualizerPageComponent, CommonModule, FormsModule],
  templateUrl: './insertion-sort.component.html',
  styleUrl: './insertion-sort.component.css'
})
export class InsertionSortComponent {
  algorithmName: SortingAlgorithm = 'insertion';
  
}

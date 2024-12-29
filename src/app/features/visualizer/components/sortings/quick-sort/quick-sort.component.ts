import { Component } from '@angular/core';
import { SortingAlgorithm } from '../../../../../core/models/sorting-config.interface';
import { VisualizerPageComponent } from '../../../containers/visualizer-page/visualizer-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quick-sort',
  standalone: true,
  imports: [VisualizerPageComponent, CommonModule, FormsModule],
  templateUrl: './quick-sort.component.html',
  styleUrl: './quick-sort.component.css'
})
export class QuickSortComponent {
  algorithmName: SortingAlgorithm = "quick";

}

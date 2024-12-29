import { Component } from '@angular/core';
import { SortingAlgorithm } from '../../../../../core/models/sorting-config.interface';
import { VisualizerPageComponent } from '../../../containers/visualizer-page/visualizer-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bucket-sort',
  standalone: true,
  imports: [VisualizerPageComponent, CommonModule, FormsModule],
  templateUrl: './bucket-sort.component.html',
  styleUrl: './bucket-sort.component.css'
})
export class BucketSortComponent {
  algorithmName: SortingAlgorithm = "bucket";

}

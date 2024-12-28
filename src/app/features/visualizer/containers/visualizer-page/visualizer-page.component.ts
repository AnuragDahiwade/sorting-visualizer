import { Component, Input } from '@angular/core';
import { SortingService } from '../../../../core/services/sorting.service';
import { ArrayGeneratorService } from '../../../../core/services/array-generator.service';
import { ArrayElement } from '../../../../core/models/array-element.interface';
import { SortingStats } from '../../../../core/models/sorting-stats.interface';
import { SortingAlgorithm } from '../../../../core/models/sorting-config.interface';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { D3SortingVisualizerComponent } from '../../components/d3-sorting-visualizer/d3-sorting-visualizer.component';
import { ControlsComponent } from '../../components/controls/controls.component';

@Component({
  selector: 'app-visualizer-page',
  standalone: true,
  imports: [CommonModule, FormsModule, D3SortingVisualizerComponent, ControlsComponent],
  templateUrl: './visualizer-page.component.html',
  styleUrl: './visualizer-page.component.css'
})
export class VisualizerPageComponent {
  array: ArrayElement[] = [];
  stats: SortingStats = {
    comparisons: 0,
    swaps: 0,
    timeElapsed: 0,
    arrayAccesses: 0,
    currentPhase: 'idle'
  };
  
  arraySize = 5;
  @Input() selectedAlgorithm: SortingAlgorithm = 'bubble';
  speed = 100;
  isSorting = false;
  maxValue = 100;

  private subscriptions: Subscription[] = [];

  constructor(private sortingService: SortingService) {}

  ngOnInit() {
    // Subscribe to array updates
    this.subscriptions.push(
      this.sortingService.array$.subscribe(array => {
        this.array = array;
        this.updateMaxValue();
      })
    );

    // Subscribe to stats updates
    this.subscriptions.push(
      this.sortingService.stats$.subscribe(stats => {
        this.stats = stats;
      })
    );

    // Generate initial array
    this.generateNewArray();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  generateNewArray() {
    this.sortingService.generateArray(this.arraySize);
    this.isSorting = false;
  }

  updateSpeed() {
    this.sortingService.setSpeed(this.speed);
  }

  async startSorting() {
    if (this.isSorting) return;
    
    this.isSorting = true;
    try {
      await this.sortingService.sort(this.selectedAlgorithm);
    } finally {
      this.isSorting = false;
    }
  }

  private updateMaxValue() {
    this.maxValue = Math.max(...this.array.map(element => element.value));
  }

  // Helper method for generating array patterns
  generateSpecialArray(type: 'nearly-sorted' | 'reversed' | 'few-unique' | 'sorted') {
    this.sortingService.generateSpecialArray(type, this.arraySize);
  }
}

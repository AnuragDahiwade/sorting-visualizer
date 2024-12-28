import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {

  selectedAlgorithm: string = ""
  sortingAlgorithms: string[] = ["Bubble", "Quick", "Merge", "Selection", "Insertion", "Heap", "Counting", "Radix", "Bucket"]

  isSideBarExpanded: boolean = false


  toggleSideBar(): void {
    this.isSideBarExpanded = !this.isSideBarExpanded;

    console.log(this.isSideBarExpanded);
    
  }
}

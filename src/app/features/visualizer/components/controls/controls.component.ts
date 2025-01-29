import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css',
})
export class ControlsComponent {
  selectedAlgorithm: string = '';
  sortingAlgorithms: string[] = [
    'Bubble',
    'Quick',
    'Merge',
    'Selection',
    'Insertion',
    'Heap',
    'Counting',
    'Radix',
    'Bucket',
  ];

  isSideBarExpanded: boolean = false;

  constructor(private elementRef: ElementRef) {}

  toggleSideBar(): void {
    this.isSideBarExpanded = !this.isSideBarExpanded;
    console.log(this.isSideBarExpanded);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isSideBarExpanded) {
      const sidebar =
        this.elementRef.nativeElement.querySelector('.side-nav-bar');
      const toggleButton =
        this.elementRef.nativeElement.querySelector('.toggle_button'); // Replace with your actual toggle button class

      const clickedInside =
        sidebar.contains(event.target) ||
        (toggleButton && toggleButton.contains(event.target));

      if (!clickedInside) {
        this.isSideBarExpanded = false;
      }
    }
  }
}

import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { SortingService } from '../../../../core/services/sorting.service';
import { ArrayElement } from '../../../../core/models/array-element.interface';


@Component({
  selector: 'app-d3-sorting-visualizer',
  standalone: true,
  imports: [],
  templateUrl: './d3-sorting-visualizer.component.html',
  styleUrl: './d3-sorting-visualizer.component.css'
})
export class D3SortingVisualizerComponent implements OnInit, OnDestroy{
  private svg: any;
  private width = 0;
  private height = 0;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private subscription: Subscription | undefined;
  private xScale: any;
  private yScale: any;
  private colorScale: any;
  private maxValue = 100;

  constructor(
    private elementRef: ElementRef,
    private sortingService: SortingService
  ) {}

  ngOnInit() {
    this.initializeD3();
    this.setupSubscription();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initializeD3() {
    // Get container dimensions
    const container = this.elementRef.nativeElement.querySelector('.visualization-container');
    this.width = container.clientWidth - this.margin.left - this.margin.right;
    this.height = container.clientHeight - this.margin.top - this.margin.bottom;

    // Create SVG
    this.svg = d3.select(this.elementRef.nativeElement.querySelector('svg'))
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Initialize scales
    this.xScale = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);

    this.yScale = d3.scaleLinear()
      .range([this.height, 0]);

    // Initialize color scale
    this.colorScale = d3.scaleOrdinal<string>()
      .domain(['default', 'comparing', 'swapping', 'sorted', 'pivot'])
      .range(['#60a5fa', '#fbbf24', '#ef4444', '#22c55e', '#8b5cf6']);

    // Add axes
    this.svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height})`);

    this.svg.append('g')
      .attr('class', 'y-axis');
  }

  private setupSubscription() {
    this.subscription = this.sortingService.array$.subscribe(array => {
      this.updateVisualization(array);
    });
  }

  private updateVisualization(data: ArrayElement[]) {
    // Update scales
    this.xScale.domain(data.map((_, i) => i));
    this.yScale.domain([0, d3.max(data, d => d.value)]);

    // Update axes
    this.svg.select('.x-axis')
      .transition()
      .duration(100)
      .call(d3.axisBottom(this.xScale));

    this.svg.select('.y-axis')
      .transition()
      .duration(100)
      .call(d3.axisLeft(this.yScale));

    // Data join for bars
    const bars = this.svg.selectAll('.bar')
      .data(data, (d: ArrayElement) => d.originalIndex);

    // Remove exiting bars
    bars.exit().remove();

    // Add new bars
    const newBars = bars.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: ArrayElement, i: number) => this.xScale(i))
      .attr('y', this.height)
      .attr('width', this.xScale.bandwidth());

    // Update all bars
    bars.merge(newBars)
      .transition()
      .duration(100)
      .attr('x', (d: ArrayElement, i: number) => this.xScale(i))
      .attr('y', (d: ArrayElement) => this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', (d: ArrayElement) => this.height - this.yScale(d.value))
      .attr('fill', (d: ArrayElement) => this.colorScale(d.state));

    // Add value labels
    const labels = this.svg.selectAll('.bar-label')
      .data(data, (d: ArrayElement) => d.originalIndex);

    labels.exit().remove();

    const newLabels = labels.enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('text-anchor', 'middle');

    labels.merge(newLabels)
      .transition()
      .duration(100)
      .attr('x', (d: ArrayElement, i: number) => this.xScale(i) + this.xScale.bandwidth() / 2)
      .attr('y', (d: ArrayElement) => this.yScale(d.value) - 5)
      .text((d: ArrayElement) => d.value);
  }

  // Method to handle window resize
  private onResize() {
    // Clear existing visualization
    this.svg.selectAll('*').remove();
    
    // Reinitialize with new dimensions
    this.initializeD3();
    
    // Update visualization with current data
    this.updateVisualization(this.sortingService.getCurrentArray());
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3SortingVisualizerComponent } from './d3-sorting-visualizer.component';

describe('D3SortingVisualizerComponent', () => {
  let component: D3SortingVisualizerComponent;
  let fixture: ComponentFixture<D3SortingVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D3SortingVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3SortingVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

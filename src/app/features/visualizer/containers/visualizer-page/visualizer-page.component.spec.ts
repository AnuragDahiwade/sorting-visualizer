import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerPageComponent } from './visualizer-page.component';

describe('VisualizerPageComponent', () => {
  let component: VisualizerPageComponent;
  let fixture: ComponentFixture<VisualizerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

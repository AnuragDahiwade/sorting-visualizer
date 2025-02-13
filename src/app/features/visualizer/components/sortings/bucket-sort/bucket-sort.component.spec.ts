import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketSortComponent } from './bucket-sort.component';

describe('BucketSortComponent', () => {
  let component: BucketSortComponent;
  let fixture: ComponentFixture<BucketSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BucketSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucketSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesListComponent } from './batches-list.component';

describe('BatchesListComponent', () => {
  let component: BatchesListComponent;
  let fixture: ComponentFixture<BatchesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

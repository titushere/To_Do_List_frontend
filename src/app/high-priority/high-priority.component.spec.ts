import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighPriorityComponent } from './high-priority.component';

describe('HighPriorityComponent', () => {
  let component: HighPriorityComponent;
  let fixture: ComponentFixture<HighPriorityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighPriorityComponent]
    });
    fixture = TestBed.createComponent(HighPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

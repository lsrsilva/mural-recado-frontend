import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemFormComponent } from './task-item-form.component';

describe('TaskItemFormComponent', () => {
  let component: TaskItemFormComponent;
  let fixture: ComponentFixture<TaskItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

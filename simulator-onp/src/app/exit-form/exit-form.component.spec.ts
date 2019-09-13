import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitFormComponent } from './exit-form.component';

describe('ExitFormComponent', () => {
  let component: ExitFormComponent;
  let fixture: ComponentFixture<ExitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

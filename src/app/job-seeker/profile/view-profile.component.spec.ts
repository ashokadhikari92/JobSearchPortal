import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobSeekerProfileComponent } from './view-profile.component';

describe('ViewProfileComponent', () => {
  let component: ViewJobSeekerProfileComponent;
  let fixture: ComponentFixture<ViewJobSeekerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJobSeekerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobSeekerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

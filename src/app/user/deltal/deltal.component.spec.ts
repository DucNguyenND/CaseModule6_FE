import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltalComponent } from './deltal.component';

describe('DeltalComponent', () => {
  let component: DeltalComponent;
  let fixture: ComponentFixture<DeltalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeltalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeltalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

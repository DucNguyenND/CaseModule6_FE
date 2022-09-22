import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEnterpriseComponent } from './main-enterprise.component';

describe('MainEnterpriseComponent', () => {
  let component: MainEnterpriseComponent;
  let fixture: ComponentFixture<MainEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainEnterpriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

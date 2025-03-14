import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionDateComponent } from './home-section-date.component';

describe('HomeSectionDateComponent', () => {
  let component: HomeSectionDateComponent;
  let fixture: ComponentFixture<HomeSectionDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSectionDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSectionDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

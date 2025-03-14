import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionAlgorithmsComponent } from './home-section-algorithms.component';

describe('HomeSectionAlgorithmsComponent', () => {
  let component: HomeSectionAlgorithmsComponent;
  let fixture: ComponentFixture<HomeSectionAlgorithmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSectionAlgorithmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSectionAlgorithmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

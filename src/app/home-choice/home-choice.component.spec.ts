import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChoiceComponent } from './home-choice.component';

describe('HomeChoiceComponent', () => {
  let component: HomeChoiceComponent;
  let fixture: ComponentFixture<HomeChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeChoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

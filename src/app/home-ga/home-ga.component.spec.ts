import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGaComponent } from './home-ga.component';

describe('HomeGaComponent', () => {
  let component: HomeGaComponent;
  let fixture: ComponentFixture<HomeGaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeGaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

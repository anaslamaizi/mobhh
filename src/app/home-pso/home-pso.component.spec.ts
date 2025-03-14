import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePsoComponent } from './home-pso.component';

describe('HomePsoComponent', () => {
  let component: HomePsoComponent;
  let fixture: ComponentFixture<HomePsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

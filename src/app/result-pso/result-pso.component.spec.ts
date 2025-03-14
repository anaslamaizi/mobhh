import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPsoComponent } from './result-pso.component';

describe('ResultPsoComponent', () => {
  let component: ResultPsoComponent;
  let fixture: ComponentFixture<ResultPsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultPsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultPsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

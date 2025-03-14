import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultGaComponent } from './result-ga.component';

describe('ResultGaComponent', () => {
  let component: ResultGaComponent;
  let fixture: ComponentFixture<ResultGaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultGaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultGaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

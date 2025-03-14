import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionNetworkFileComponent } from './home-section-network-file.component';

describe('HomeSectionNetworkFileComponent', () => {
  let component: HomeSectionNetworkFileComponent;
  let fixture: ComponentFixture<HomeSectionNetworkFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSectionNetworkFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSectionNetworkFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

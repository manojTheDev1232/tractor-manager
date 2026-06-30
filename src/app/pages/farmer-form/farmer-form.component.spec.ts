import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerFormComponent } from './farmer-form.component';

describe('FarmerFormComponent', () => {
  let component: FarmerFormComponent;
  let fixture: ComponentFixture<FarmerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselFormComponent } from './diesel-form.component';

describe('DieselFormComponent', () => {
  let component: DieselFormComponent;
  let fixture: ComponentFixture<DieselFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DieselFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselListComponent } from './diesel-list.component';

describe('DieselListComponent', () => {
  let component: DieselListComponent;
  let fixture: ComponentFixture<DieselListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DieselListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

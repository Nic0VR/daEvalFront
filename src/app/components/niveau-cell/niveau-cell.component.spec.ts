import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauCellComponent } from './niveau-cell.component';

describe('NiveauCellComponent', () => {
  let component: NiveauCellComponent;
  let fixture: ComponentFixture<NiveauCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

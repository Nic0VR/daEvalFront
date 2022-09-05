import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifNiveauDialogComponent } from './modif-niveau-dialog.component';

describe('ModifNiveauDialogComponent', () => {
  let component: ModifNiveauDialogComponent;
  let fixture: ComponentFixture<ModifNiveauDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifNiveauDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifNiveauDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

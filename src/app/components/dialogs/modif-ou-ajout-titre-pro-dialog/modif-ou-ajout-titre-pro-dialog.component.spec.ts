import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifOuAjoutTitreProDialogComponent } from './modif-ou-ajout-titre-pro-dialog.component';

describe('ModifOuAjoutTitreProDialogComponent', () => {
  let component: ModifOuAjoutTitreProDialogComponent;
  let fixture: ComponentFixture<ModifOuAjoutTitreProDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifOuAjoutTitreProDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifOuAjoutTitreProDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

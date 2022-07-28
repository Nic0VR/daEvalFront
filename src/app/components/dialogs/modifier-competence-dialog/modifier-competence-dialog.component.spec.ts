import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompetenceDialogComponent } from './modifier-competence-dialog.component';

describe('ModifierCompetenceDialogComponent', () => {
  let component: ModifierCompetenceDialogComponent;
  let fixture: ComponentFixture<ModifierCompetenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCompetenceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCompetenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

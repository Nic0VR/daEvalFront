import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEvalDialogComponent } from './ajouter-eval-dialog.component';

describe('AjouterEvalDialogComponent', () => {
  let component: AjouterEvalDialogComponent;
  let fixture: ComponentFixture<AjouterEvalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterEvalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterEvalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

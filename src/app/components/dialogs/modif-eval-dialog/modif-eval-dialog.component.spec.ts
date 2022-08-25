import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifEvalDialogComponent } from './modif-eval-dialog.component';

describe('ModifEvalDialogComponent', () => {
  let component: ModifEvalDialogComponent;
  let fixture: ComponentFixture<ModifEvalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifEvalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifEvalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

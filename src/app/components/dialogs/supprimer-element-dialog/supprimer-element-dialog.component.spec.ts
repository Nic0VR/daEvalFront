import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerElementDialogComponent } from './supprimer-element-dialog.component';

describe('SupprimerElementDialogComponent', () => {
  let component: SupprimerElementDialogComponent;
  let fixture: ComponentFixture<SupprimerElementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerElementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

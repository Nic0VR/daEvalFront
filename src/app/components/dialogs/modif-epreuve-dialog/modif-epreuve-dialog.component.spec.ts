import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifEpreuveDialogComponent } from './modif-epreuve-dialog.component';

describe('ModifEpreuveDialogComponent', () => {
  let component: ModifEpreuveDialogComponent;
  let fixture: ComponentFixture<ModifEpreuveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifEpreuveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifEpreuveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantModifyComponent } from './etudiant-modify.component';

describe('EtudiantModifyComponent', () => {
  let component: EtudiantModifyComponent;
  let fixture: ComponentFixture<EtudiantModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocCompetencesComponent } from './bloc-competences.component';

describe('BlocCompetencesComponent', () => {
  let component: BlocCompetencesComponent;
  let fixture: ComponentFixture<BlocCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocCompetencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

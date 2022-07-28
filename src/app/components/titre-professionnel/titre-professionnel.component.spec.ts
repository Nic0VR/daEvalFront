import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreProfessionnelComponent } from './titre-professionnel.component';

describe('TitreProfessionnelComponent', () => {
  let component: TitreProfessionnelComponent;
  let fixture: ComponentFixture<TitreProfessionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitreProfessionnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreProfessionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

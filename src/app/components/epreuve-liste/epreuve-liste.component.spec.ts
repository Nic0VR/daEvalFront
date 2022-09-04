import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpreuveListeComponent } from './epreuve-liste.component';

describe('EpreuveListeComponent', () => {
  let component: EpreuveListeComponent;
  let fixture: ComponentFixture<EpreuveListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpreuveListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpreuveListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

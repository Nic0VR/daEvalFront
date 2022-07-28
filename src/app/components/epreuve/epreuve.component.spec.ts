import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpreuveComponent } from './epreuve.component';

describe('EpreuveComponent', () => {
  let component: EpreuveComponent;
  let fixture: ComponentFixture<EpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpreuveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

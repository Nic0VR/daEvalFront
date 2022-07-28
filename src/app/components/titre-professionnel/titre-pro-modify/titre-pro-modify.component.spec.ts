import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreProModifyComponent } from './titre-pro-modify.component';

describe('TitreProModifyComponent', () => {
  let component: TitreProModifyComponent;
  let fixture: ComponentFixture<TitreProModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitreProModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreProModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

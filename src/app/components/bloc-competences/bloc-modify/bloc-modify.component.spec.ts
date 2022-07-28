import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocModifyComponent } from './bloc-modify.component';

describe('BlocModifyComponent', () => {
  let component: BlocModifyComponent;
  let fixture: ComponentFixture<BlocModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

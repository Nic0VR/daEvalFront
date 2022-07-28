import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionModifyComponent } from './promotion-modify.component';

describe('PromotionModifyComponent', () => {
  let component: PromotionModifyComponent;
  let fixture: ComponentFixture<PromotionModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

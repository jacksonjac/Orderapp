import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopslistComponent } from './shopslist.component';

describe('ShopslistComponent', () => {
  let component: ShopslistComponent;
  let fixture: ComponentFixture<ShopslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopslistComponent]
    });
    fixture = TestBed.createComponent(ShopslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

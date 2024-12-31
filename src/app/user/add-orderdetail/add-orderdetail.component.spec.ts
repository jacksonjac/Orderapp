import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderdetailComponent } from './add-orderdetail.component';

describe('AddOrderdetailComponent', () => {
  let component: AddOrderdetailComponent;
  let fixture: ComponentFixture<AddOrderdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrderdetailComponent]
    });
    fixture = TestBed.createComponent(AddOrderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

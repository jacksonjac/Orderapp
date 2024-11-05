import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductstatusComponent } from './productstatus.component';

describe('ProductstatusComponent', () => {
  let component: ProductstatusComponent;
  let fixture: ComponentFixture<ProductstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductstatusComponent]
    });
    fixture = TestBed.createComponent(ProductstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

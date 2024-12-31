import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc, CollectionReference, getDocs } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-orderdetail',
  templateUrl: './add-orderdetail.component.html',
  styleUrls: ['./add-orderdetail.component.css']
})
export class AddOrderdetailComponent {

  addressForm: FormGroup;
  orderData: any; // To hold the passed product order data

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private firestore: Firestore
  ) {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      district: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });

    // Retrieve the order data from the router state
    const navigation = this.router.getCurrentNavigation();
    this.orderData = navigation?.extras?.state?.['orderData'];
  }

  ngOnInit(): void {
    if (!this.orderData) {
      console.error('Order data not found!');
      this.router.navigate(['/productdetails']); // Redirect back if no data is present
    }
  }

  async onSubmit() {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;

      const fullOrderData = {
        ...this.orderData, // Include product order data
        ...addressData, // Include address data
        orderDate: new Date(),
      };
    console.log(fullOrderData,"orderdata")
      try {
        await addDoc(collection(this.firestore, 'orderAddresses'), fullOrderData);
        this.router.navigateByUrl('user/sucesspage');
      } catch (error) {
        console.error('Error saving order details:', error);
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.addressForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

}

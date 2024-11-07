import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css'],
})
export class RegistrationformComponent implements OnInit {
 
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private firestore: Firestore,
    private route: ActivatedRoute
  ) {
    // Initialize the form with relevant fields
    this.registrationForm = this.fb.group({
      productName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)],
      ],
      brand: ['', [Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      price: ['', [Validators.required, Validators.min(0)]],
      shippedQuantity: [0, [Validators.required, Validators.min(0)]], // New field with a default value
      statusDetails: ['pending', []], // New consolidated field with default status
      orderDate: [new Date().toISOString().split('T')[0], []], // Set current date in YYYY-MM-DD format
    });
  }

  ngOnInit() {
    // Call the function to fetch and log order items on component initialization
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      console.log("Form Data:", this.registrationForm.value);
      try {
        // Save the form data in the "Orderitems" collection
        const docRef = await addDoc(
          collection(this.firestore, "Orderitems"),
          this.registrationForm.value
        );
        console.log("Added Document ID:", docRef.id);
  
        // Redirect to the "AllOrders" page
        this.router.navigateByUrl('user/AllOrders');
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

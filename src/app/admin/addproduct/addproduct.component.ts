import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc, CollectionReference, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit{
  registrationForm: FormGroup;
  selectedImage: File | null = null;
  imageError: string | null = null;
  imageUrl: string | null = null;
  categories: string[] = []; // Stores unique categories


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private firestore: Firestore
  ) {
    this.registrationForm = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      brand: ['', [Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categories: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.fetchCategories()
    
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
  
      // Validate image file size and type
      if (this.selectedImage.size > 5 * 1024 * 1024) {
        this.imageError = 'File size exceeds 5MB.';
        return;
      }
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(this.selectedImage.type)) {
        this.imageError = 'Invalid file type. Only JPG and PNG are allowed.';
        return;
      }
  
      this.imageError = null;
      await this.uploadImageToCloudinary(this.selectedImage);
    }
  }
  async fetchCategories() {
    try {
      const orderItemsCollection: CollectionReference = collection(
        this.firestore,
        'categories'
      );
      const snapshot = await getDocs(orderItemsCollection);

      // Extract unique categories (brands)
      this.categories = [
        ...new Set(snapshot.docs.map((doc) => doc.data()['category'])),
      ].filter((category) => !!category);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  }
  async uploadImageToCloudinary(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'orderapp'); // Cloudinary upload preset

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dq6z55nw1/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        this.imageUrl = data.secure_url;
      } else {
        throw new Error('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      this.imageError = 'Image upload failed. Please try again.';
    }
  }
  async onSubmit() {
    // Ensure image is uploaded before submitting the form
    if (this.registrationForm.valid && this.imageUrl) {
      const productData = {
        ...this.registrationForm.value,
        imageUrl: this.imageUrl,
      };
  
      try {
        const docRef = await addDoc(collection(this.firestore, 'Products'), productData);
        this.router.navigateByUrl('user/AllOrders');
      } catch (error) {
        console.error('Error adding document:', error);
      }
    } else {
      if (!this.imageUrl) {
        this.imageError = 'Please upload an image.';
      } else {
        this.imageError = null;
      }
    }
  }
  

  isInvalid(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent {

  editForm: FormGroup;
  productId: string = '';
  productData: any = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: Firestore
  ) {
    this.editForm = this.fb.group({
      productName: ['', [Validators.required]],
      brand: [''],
      price: ['', [Validators.required]],
      description: ['', Validators.required],
      weight: ['', Validators.required],
    
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchProductData();
  }

  async fetchProductData() {
    try {
      const productRef = doc(this.firestore, 'productsforwayanad', this.productId);
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        this.productData = productSnapshot.data();
        this.editForm.patchValue(this.productData);
      } else {
        console.error('Product not found!');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }

  async onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    try {
      const productRef = doc(this.firestore, 'productsforwayanad', this.productId);
      await updateDoc(productRef, this.editForm.value);
      console.log('Product updated successfully!');
      this.router.navigate(['admin/productlist']);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

}

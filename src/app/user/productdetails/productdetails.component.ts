import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, getDoc, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  productId!: string;
  productDetails: any;
  quantity!: number;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.fetchProductDetails();
  }

  async fetchProductDetails() {
    try {
      const productRef = doc(this.firestore, 'productsforwayanad', this.productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        this.productDetails = productSnap.data();
        console.log(this.productDetails, "Product Details");
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching product details: ', error);
    }
  }

  async placeOrder() {
    if (!this.quantity || this.quantity < 1) {
      console.error('Invalid quantity entered');
      return;
    }
  
    const orderData = {
      productId: this.productId,
      productName: this.productDetails.productName,
      price: this.productDetails.price,
      quantity: this.quantity,
      imageUrl: this.productDetails.imageUrl, // Add the image URL here
      weight:this.productDetails.weight
    };
    console.log("orderdata pass",orderData)
  
    // Navigate to the Add Address Details page with the order data
    this.router.navigate(['/user/adddetails'], { state: { orderData } });
  }
}

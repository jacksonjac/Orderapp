import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, CollectionReference } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit{

  Products: Product[] = []; // Use the Product interface
  shopId: string | null = null;

  constructor(private router: Router, private firestore: Firestore, private route: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve the shop ID from query parameters
    this.route.queryParams.subscribe(params => {
      this.shopId = params['id']; // Get the shop ID from the query parameter
      console.log("Shop ID:", this.shopId);
      this.fetchData();
    });
  }

  async fetchData() {
    const productsCollection: CollectionReference = collection(this.firestore, 'products');

    try {
      const querySnapshot = await getDocs(productsCollection);
      this.Products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]; // Use type assertion here

      // Filter products by shop ID
      if (this.shopId) {
        this.Products = this.Products.filter(product => product.shopId === this.shopId); // Make sure shopId exists
      }

      console.log('Fetched Products: ', this.Products);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }
}
// product.model.ts
export interface Product {
  id: string;
  productName: string;
  model: string;
  category: string;
  rate: number;
  customerRate: number;
  shopId: string; // Add this field
}

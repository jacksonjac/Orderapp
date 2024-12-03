import { Component } from '@angular/core';
import { Firestore, collection, getDocs, updateDoc, doc, CollectionReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlists',
  templateUrl: './productlists.component.html',
  styleUrls: ['./productlists.component.css']
})
export class ProductlistsComponent {

  orders: any[] = []; 
  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit() {
   
    this.fetchOrderItems()
  }

  async fetchOrderItems() {
    try {
      const orderItemsCollection: CollectionReference = collection(this.firestore, 'Products');
      const snapshot = await getDocs(orderItemsCollection);

      this.orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }
  navigateToDetails(productId: string) {
    this.router.navigate(['/user/productDetails', productId]);
  }
  

}

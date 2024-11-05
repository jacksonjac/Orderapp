import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';
@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  orders: any[] = [];  // Array to store order data

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit() {
    this.fetchOrderItems();
  }

  async fetchOrderItems() {
    try {
      const orderItemsCollection: CollectionReference = collection(this.firestore, 'Orderitems');
      const snapshot = await getDocs(orderItemsCollection);

      this.orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }
  viewStatus(orderId: string) {
    // Navigate to the order detail page with the ID
    this.router.navigate(['user/productStatus', orderId]);
  }
}

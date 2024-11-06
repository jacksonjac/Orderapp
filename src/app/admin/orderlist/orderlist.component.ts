import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs, updateDoc, doc, CollectionReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

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

  async updateOrderStatus(orderId: string, newStatus: string) {
    try {
      const orderDocRef = doc(this.firestore, 'Orderitems', orderId);
      await updateDoc(orderDocRef, { status: newStatus });
      console.log(`Order ID: ${orderId} status updated to: ${newStatus}`);
      
      // Update the local orders array to reflect the new status immediately
      const orderIndex = this.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        this.orders[orderIndex].status = newStatus;
      }
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  }
}

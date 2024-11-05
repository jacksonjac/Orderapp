import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-productstatus',
  templateUrl: './productstatus.component.html',
  styleUrls: ['./productstatus.component.css']
})
export class ProductstatusComponent {

  orderId: string | null = null;
  orderData: any;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');  // Get order ID from URL
    if (this.orderId) {
      this.fetchOrderDetails(this.orderId);
    }
  }

  async fetchOrderDetails(orderId: string) {
    try {
      const orderDocRef = doc(this.firestore, 'Orderitems', orderId);
      const orderDoc = await getDoc(orderDocRef);
      if (orderDoc.exists()) {
        this.orderData = orderDoc.data();
        console.log("Order Details:", this.orderData);  // Console log the data or display it in the template
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  }
  // Current status of the order (1: Waiting, 2: Shipped, 3: Delivered)
  status: number = 3;

  // Method to simulate progressing the status to the next stage
  progressStatus() {
    if (this.status < 3) {
      this.status++;
    }
  }

}

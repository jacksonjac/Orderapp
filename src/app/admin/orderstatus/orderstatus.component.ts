
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.css']
})
export class OrderstatusComponent {

  orderId: string | null = null;
  orderData: any;

  // Current status of the order (1: Waiting, 2: Confirmed, 3: Shipped, 4: Delivered)
  status: number = 1;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');  // Get order ID from URL
    if (this.orderId) {
      this.fetchOrderDetails(this.orderId);
    } else {
      console.log("Order ID is null or undefined");
    }
  }

  async fetchOrderDetails(orderId: string) {
    try {
      if (!orderId) {
        console.error("Invalid order ID");
        return;
      }

      const orderDocRef = doc(this.firestore, 'Orderitems', orderId);
      const orderDoc = await getDoc(orderDocRef);

      if (orderDoc.exists()) {
        this.orderData = orderDoc.data();
        console.log("Order Details:", this.orderData);  // Console log the data or display it in the template

        // Check statusDetails and set the corresponding status value
        if (this.orderData.status) {
          this.setStatusFromDetails(this.orderData.status);
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  }

  // Method to set status based on statusDetails
  setStatusFromDetails(status: string) {
    switch (status.toLowerCase()) {
      case 'pending':
        this.status = 1;
        break;
      case 'confirmed':
        this.status = 2;
        break;
      case 'shipped':
        this.status = 3;
        break;
     
      default:
        this.status = 1; // Default to pending if statusDetails is unknown
        break;
    }
  }

  // Method to simulate progressing the status to the next stage
  progressStatus() {
    if (this.status < 3) {
      this.status++;
    }
  }

}

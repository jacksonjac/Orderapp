import { Component ,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-productstatus',
  templateUrl: './productstatus.component.html',
  styleUrls: ['./productstatus.component.css']
})
export class ProductstatusComponent {

  orderId: string | null = null;
  orderData: any;

  // Current status of the order (1: Waiting, 2: Confirmed, 3: Shipped, 4: Delivered)
  status: number = 1;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef to trigger change detection
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');  // Get order ID from URL
    if (this.orderId) {
      this.fetchOrderDetails(this.orderId);
    } else {
      console.log("Order ID is null or undefined");
    }
  }

  // Fetch order details from Firestore
  async fetchOrderDetails(orderId: string) {
    try {
      if (!orderId) {
        console.error("Invalid order ID");
        return;
      }

      const orderDocRef = doc(this.firestore, 'Orders', orderId);
      const orderDoc = await getDoc(orderDocRef);

      if (orderDoc.exists()) {
        this.orderData = orderDoc.data();
        console.log("Order Details:", this.orderData);

        // Set the status based on Firestore data
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

  // Set status based on the statusDetails
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
        this.status = 1; // Default to pending if unknown status
        break;
    }
  }

  // Progress status through stages and update Firestore
  async progressStatus() {
    if (this.status < 3) {
      this.status++;

      // Set the corresponding statusDetails based on the status
      let statusDetails = '';
      switch (this.status) {
        case 2:
          statusDetails = 'Confirmed';
          break;
        case 3:
          statusDetails = 'Shipped';
          break;
        
        default:
          statusDetails = 'Pending';
          break;
      }

      // Update Firestore document with the new status and statusDetails
      const orderDocRef = doc(this.firestore, 'Orderitems', this.orderId!);
      await updateDoc(orderDocRef, {
        status: statusDetails.toLowerCase(),
        statusDetails: statusDetails
      });

      // Manually trigger change detection to update UI
      this.cdr.detectChanges();

      console.log(`Order status updated to: ${statusDetails}`);
    }
  }
}

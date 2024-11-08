import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs, updateDoc, doc, CollectionReference } from '@angular/fire/firestore';


@Component({
  selector: 'app-confirmed-orders',
  templateUrl: './confirmed-orders.component.html',
  styleUrls: ['./confirmed-orders.component.css']
})
export class ConfirmedOrdersComponent implements OnInit {
  orders: any[] = [];  // Array to store order data

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit() {
   
    this.fetchOrderConfirmedItems()
  }

  // Fetch orders from Firestore


  async fetchOrderConfirmedItems() {
    try {
      const orderItemsCollection: CollectionReference = collection(this.firestore, 'Orderitems');
      const snapshot = await getDocs(orderItemsCollection);
  
      this.orders = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Order)) // Type cast to Order
        .filter(order => order.status === 'Confirmed'); // Only keep pending orders
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }

    console.log("pending data",this.orders)
  }
  
  

  // Navigate to order details page
  viewStatus(orderId: string) {
    this.router.navigate(['admin/productStatus', orderId]);
  }

  // Update order status and shipped quantity when status is 'Shipped'
  async updateShippedQuantity(orderId: string, shippedQuantity: number) {
    try {
      const orderDocRef = doc(this.firestore, 'Orderitems', orderId);
  
      // Set the status details and current date for shippedDate
      const statusDetails = 'Order has been shipped';
      const shippedDate = new Date().toLocaleDateString('en-CA');  // Current date for shipped date
  
      // Update the order document with status, shippedQuantity, and shippedDate
      await updateDoc(orderDocRef, {
        status: 'Shipped',
        statusDetails: statusDetails,
        shippedQuantity: shippedQuantity,
        shippedDate: shippedDate
      });
  
      // Update the local orders array to reflect the new status, shipped quantity, and shipped date
      const orderIndex = this.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        this.orders[orderIndex].status = 'Shipped';
        this.orders[orderIndex].statusDetails = statusDetails;
        this.orders[orderIndex].shippedQuantity = shippedQuantity;
        this.orders[orderIndex].shippedDate = shippedDate;  // Store shippedDate in local data
      }
  
      console.log(`Order ID: ${orderId} status updated to 'Shipped', shippedQuantity set to: ${shippedQuantity}, and shippedDate set to: ${shippedDate}`);
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  }
  

  // Update order status based on the selected value
  async onStatusChange(orderId: string, newStatus: string) {
    try {
      const orderDocRef = doc(this.firestore, 'Orderitems', orderId);
      let statusDetails = '';
      let updateData: any = {};
  
      // Setting the status and status details based on the new status
      if (newStatus === 'Confirmed') {
        statusDetails = 'Order has been confirmed';
      } else if (newStatus === 'Shipped') {
        statusDetails = 'Order has been shipped';
  
        // Set the shipped date as the current date when status is "Shipped"
        updateData.shippedDate = new Date();  // Adding the shipped date
      } else {
        statusDetails = 'Pending';
      }
  
      // Update the order document with the new status and details
      updateData.status = newStatus;
      updateData.statusDetails = statusDetails;
  
      // Updating the document in Firestore
      await updateDoc(orderDocRef, updateData);
  
      // Updating the local orders array with the new status and details
      const orderIndex = this.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        this.orders[orderIndex].status = newStatus;
        this.orders[orderIndex].statusDetails = statusDetails;
  
        // If the shipped date was updated, add it to the local order data
        if (newStatus === 'Shipped') {
          this.orders[orderIndex].shippedDate = updateData.shippedDate;
        }
      }
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  }
  
}
interface Order {
  id: string;
  productName: string;
  brand: string;
  quantity: number;
  price: number;
  status: string; // Status property included here
  statusDetails?: string;
  shippedQuantity?: number;
  shippedDate?: string;
}



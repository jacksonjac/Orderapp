import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs, updateDoc, doc, CollectionReference } from '@angular/fire/firestore';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
  orders: any[] = [];  // Array to store order data

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit() {
    this.fetchOrderItems();
  }

  async fetchOrderItems() {
    try {
      const orderItemsCollection: CollectionReference = collection(this.firestore, 'productsforwayanad');
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
  deleteOrder(){}
  editOrder(){}
}



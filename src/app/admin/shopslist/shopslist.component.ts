import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, CollectionReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopslist',
  templateUrl: './shopslist.component.html',
  styleUrls: ['./shopslist.component.css']
})
export class ShopslistComponent implements OnInit {
  shopOwners: any[] = [];
  totalShopOwners: number = 0; 
  searchText: string = ""; 
  selectedShopAssociation: string = ""; // To hold the selected shop association

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit() {}

  // Method to fetch data from the selected collection
  async fetchData(association: string) {
    const shopOwnersCollection: CollectionReference = collection(this.firestore, association);

    try {
      const querySnapshot = await getDocs(shopOwnersCollection);
      this.shopOwners = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.totalShopOwners = this.shopOwners.length; 
      console.log('Fetched Data: ', this.shopOwners);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }

  // Method called when shop association is selected
  onShopAssociationChange(event: any) {
    const selectedAssociation = event.target.value;
    console.log("seleted",selectedAssociation)
    if (selectedAssociation) {
      this.fetchData(selectedAssociation); // Fetch data for the selected association
    }
  }

  viewShopProducts(shopId: string) {
    this.router.navigate(['/admin/products-list'], { queryParams: { id: shopId } });
  }

}

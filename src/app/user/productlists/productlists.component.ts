import { Component } from '@angular/core';
import { Firestore, collection, getDocs, query, where, CollectionReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productlists',
  templateUrl: './productlists.component.html',
  styleUrls: ['./productlists.component.css']
})
export class ProductlistsComponent {

  orders: any[] = [];
  categories: string[] = []; // Stores unique categories
  defaultImage =
    'https://www.ishtaorganics.in/cdn/shop/files/Fireflycoconutoilin2bottlesonein500mlanotherin1lwithacoconutinsideandwhiebackgrou.jpg?v=1712694482';
    carouselImages: string[] = [
      '/assets/images/feed.jpeg',
      '/assets/images/lime.jpeg',
      '/assets/images/paddi.jpeg'
    ];
    currentIndex: number = 0;
    interval: any;
  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit() {
    this.fetchOrderItems();
    this.fetchCategories();
    this.startCarousel();
  }
  startCarousel(): void {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  async fetchOrderItems(category: string = '') {
    try {
      console.log(category,"category is ")
      const orderItemsCollection: CollectionReference = collection(
        this.firestore,
        'productsforwayanad'
      );
      const filters = category
        ? query(orderItemsCollection, where('categories', '==', category))
        : orderItemsCollection;
      const snapshot = await getDocs(filters);

      this.orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
  }

  async fetchCategories() {
    try {
      const orderItemsCollection: CollectionReference = collection(
        this.firestore,
        'categoryforwayanad'
      );
      const snapshot = await getDocs(orderItemsCollection);

      // Extract unique categories (brands)
      this.categories = [
        ...new Set(snapshot.docs.map((doc) => doc.data()['category'])),
      ].filter((category) => !!category);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  }

  onCategoryChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.fetchOrderItems(selectedCategory);
  }

  navigateToDetails(productId: string) {
    this.router.navigate(['/user/productDetails', productId]);
  }
  

}

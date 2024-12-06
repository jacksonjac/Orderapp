import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  Islogged = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check token initially
    this.checkLoginStatus();

    // Listen for route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
        this.isMenuOpen = false; // Close the menu on route change
      }
    });
  }

  // Check login status based on the presence of the token
  checkLoginStatus() {
    const token = localStorage.getItem('userToken');
    this.Islogged = !!token; // Convert token existence to boolean
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.removeItem('userToken');
    this.Islogged = false; // Update login status
    this.isMenuOpen = false; // Close the menu on logout
    this.router.navigate(['']); // Redirect to the login or home page
  }
}

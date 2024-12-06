import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('userToken'); // Ensure this matches the login token key

    if (token) {
      // If token exists, navigate to the product list page
      this.router.navigate(['/user/Productlist']);
      return false; // Prevent navigation to the login page
    }

    // If token is not available, allow access to the login page
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(): boolean {

    const token = localStorage.getItem("admintoken")
       console.log(token)

    if (token) {
     
      return true;
    }

    
    alert("token is not available")
    this.router.navigate(['/']);  
    return false;
  }
}
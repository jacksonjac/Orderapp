import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() {}

  isLoggedIn(): boolean {
    // Check if the token exists in localStorage
    return !!localStorage.getItem('userToken');
  }
}

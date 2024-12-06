import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  LoginForm: FormGroup;
  

  // Hardcoded credentials
  credentials = [
    { username: 'User', password: 'pass@123' },
    { username: 'user2', password: 'pass2' },
    { username: 'admin', password: 'admin123' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.LoginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      const { username, password } = this.LoginForm.value;
  
      // Check if the entered credentials exist in the object
      const isValidUser = this.credentials.some(
        cred => cred.username === username && cred.password === password
      );
  
      if (isValidUser) {
        console.log('Login successful');
  
        // Store the token in localStorage
        localStorage.setItem('userToken', 'Usertoken123');
  
        // Navigate to the user/productlist route
        this.router.navigateByUrl('user/Productlist');
      } else {
        console.error('Invalid username or password');
        alert('Invalid username or password');
      }
    }
  }
  

  isInvalid(controlName: string): boolean {
    const control = this.LoginForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

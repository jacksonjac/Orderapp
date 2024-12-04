import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ProductstatusComponent } from './productstatus/productstatus.component';
import { AllordersComponent } from './allorders/allorders.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ConfirmedOrdersComponent } from './confirmed-orders/confirmed-orders.component';
import { NavbarComponent } from '../user/shared/navbar/navbar.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ProductlistsComponent } from './productlists/productlists.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { SucesspageComponent } from './sucesspage/sucesspage.component';



@NgModule({
  declarations: [
   
    UserComponent,
        ProductstatusComponent,
        AllordersComponent,
        ShippedOrdersComponent,
        AllOrdersComponent,
        ConfirmedOrdersComponent,
        NavbarComponent,
        LoginpageComponent,
        ProductlistsComponent,
        ProductdetailsComponent,
        SucesspageComponent,
    
 
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ToastrModule,
    
   
  ]
})
export class UserModule { }

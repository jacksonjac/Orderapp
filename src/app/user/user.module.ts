import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { ProductstatusComponent } from './productstatus/productstatus.component';
import { AllordersComponent } from './allorders/allorders.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ConfirmedOrdersComponent } from './confirmed-orders/confirmed-orders.component';
import { NavbarComponent } from '../user/shared/navbar/navbar.component';
import { LoginpageComponent } from './loginpage/loginpage.component';



@NgModule({
  declarations: [
   
    UserComponent,
        RegistrationformComponent,
        ProductstatusComponent,
        AllordersComponent,
        ShippedOrdersComponent,
        AllOrdersComponent,
        ConfirmedOrdersComponent,
        NavbarComponent,
        LoginpageComponent,
    
 
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import {SearchFilterPipe} from '../pipe/search-filter.pipe'
import { AdminRoutingModule } from './admin-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ConfirmedOrdersComponent } from './confirmed-orders/confirmed-orders.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';
import { NavbarComponent } from '../admin/shared/navbar/navbar.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProducteditComponent } from './productedit/productedit.component';




@NgModule({
  declarations: [
    
    
    AdminComponent,
        
        
         SearchFilterPipe,
         OrderlistComponent,
         OrderstatusComponent,
         AllOrdersComponent,
         ConfirmedOrdersComponent,
         ShippedOrdersComponent,
         NavbarComponent,
         LoginpageComponent,
         AddproductComponent,
         ProductlistComponent,
         ProducteditComponent
         
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ToastrModule
  ]
})
export class AdminModule { }
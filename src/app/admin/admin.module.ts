import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import {SearchFilterPipe} from '../pipe/search-filter.pipe'
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductlistComponent } from './productlist/productlist.component';
import { ShopslistComponent } from './shopslist/shopslist.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    
    AdminComponent,
         ProductlistComponent,
         ShopslistComponent,
         SearchFilterPipe
         
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
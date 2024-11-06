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




@NgModule({
  declarations: [
    
    
    AdminComponent,
        
        
         SearchFilterPipe,
         OrderlistComponent,
         OrderstatusComponent
         
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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ConfirmedOrdersComponent } from './confirmed-orders/confirmed-orders.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';



const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
     {path:'',component:OrderlistComponent},
     {path:'productStatus/:id',component:OrderstatusComponent},
     {path:'AllOrders',component:AllOrdersComponent},
     {path:'ConfirmedOrders',component:ConfirmedOrdersComponent},
     {path:'ShippedOrders',component:ShippedOrdersComponent}
     
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
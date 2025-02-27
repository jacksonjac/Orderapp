import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ConfirmedOrdersComponent } from './confirmed-orders/confirmed-orders.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProducteditComponent } from './productedit/productedit.component';



const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
     {path:'',component:LoginpageComponent},
     {path:'addproduct',component:AddproductComponent},
     {path:'productlist',component:ProductlistComponent},
     { path: 'edit-product/:id', component: ProducteditComponent },
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
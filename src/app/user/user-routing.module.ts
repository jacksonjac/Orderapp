import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';



import { ProductstatusComponent } from './productstatus/productstatus.component';
import { AllordersComponent } from './allorders/allorders.component';
import { ConfirmedOrdersComponent } from './confirmed-orders/confirmed-orders.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ProductlistsComponent } from './productlists/productlists.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { SucesspageComponent } from './sucesspage/sucesspage.component';


const routes: Routes = [
  { path: '', component: UserComponent,
    children:[
        {path:'',component:LoginpageComponent},
        {path:'Productlist',component:ProductlistsComponent},
        {path: 'productDetails/:id', component: ProductdetailsComponent },
        {path:'sucesspage',component:SucesspageComponent},
        {path:'Registration',component:RegistrationformComponent},
        {path:'AllOrders',component:AllordersComponent},
        {path:'productStatus/:id',component:ProductstatusComponent},
        {path:'AllOrders',component:AllordersComponent},
        {path:'ConfirmedOrders',component:ConfirmedOrdersComponent},
        {path:'ShippedOrders',component:ShippedOrdersComponent}
        
  

      
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

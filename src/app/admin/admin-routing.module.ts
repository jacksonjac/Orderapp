import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';



const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
     {path:'',component:OrderlistComponent},
     {path:'productStatus/:id',component:OrderstatusComponent}
     
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
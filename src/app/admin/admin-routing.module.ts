import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { OrderlistComponent } from './orderlist/orderlist.component';



const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
     {path:'',component:OrderlistComponent}
     
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
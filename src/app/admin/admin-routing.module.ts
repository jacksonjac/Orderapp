import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AdminComponent } from './admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { ShopslistComponent } from './shopslist/shopslist.component';
import { ProductlistComponent } from './productlist/productlist.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent},
      {path:'shop-details',component:ShopslistComponent},
      {path:'products-list',component:ProductlistComponent}
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
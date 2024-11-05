import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';



import { ProductstatusComponent } from './productstatus/productstatus.component';
import { AllordersComponent } from './allorders/allorders.component';


const routes: Routes = [
  { path: '', component: UserComponent,
    children:[
        {path:'',component:RegistrationformComponent},
        {path:'AllOrders',component:AllordersComponent},
        {path:'productStatus/:id',component:ProductstatusComponent}
        
  

      
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

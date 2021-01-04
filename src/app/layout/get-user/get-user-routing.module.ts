import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetUserComponent } from './get-user.component';

const routes: Routes = [
  {
    path:'',component:GetUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetUserRoutingModule { }

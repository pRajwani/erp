import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleUserComponent } from './single-user.component';

const routes: Routes = [
  {
    path:'',component:SingleUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleUserRoutingModule { }

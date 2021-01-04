import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleUserRoutingModule } from './single-user-routing.module';
import { PageHeaderModule } from './../../shared/index';
import { SingleUserComponent } from './single-user.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,HttpClientModule,
    SingleUserRoutingModule,
    PageHeaderModule
  ]
})
export class SingleUserModule { }

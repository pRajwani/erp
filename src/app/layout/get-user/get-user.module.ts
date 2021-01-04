import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetUserRoutingModule } from './get-user-routing.module';
import { GetUserComponent } from './get-user.component';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './../../shared/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule,
    GetUserRoutingModule,PageHeaderModule,
  ]
})
export class GetUserModule { }

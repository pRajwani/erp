import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { PageHeaderModule } from './../../shared/index';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddUserComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,HttpClientModule,
    AddUserRoutingModule,ToastrModule.forRoot(),
    PageHeaderModule,
  ]
})
export class AddUserModule { }

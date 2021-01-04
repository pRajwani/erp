import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from "angular-mydatepicker";
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [AttendanceComponent],
  imports: [
    CommonModule,FormsModule,AngularMyDatePickerModule,Ng2SmartTableModule,
    AttendanceRoutingModule,ReactiveFormsModule
  ]
})
export class AttendanceModule { }

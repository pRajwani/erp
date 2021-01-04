import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, TranslateModule, LoginRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [LoginComponent]
})
export class LoginModule {}

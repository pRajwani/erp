import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from "ngx-image-cropper";
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
    imports: [CommonModule, TranslateModule, SignupRoutingModule,FormsModule,ReactiveFormsModule,ImageCropperModule],
    declarations: [SignupComponent]
})
export class SignupModule {}

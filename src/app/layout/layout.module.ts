import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ImageCropperModule } from "ngx-image-cropper";
import { LayoutRoutingModule } from './layout-routing.module';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { LayoutComponent } from './layout.component';
import { GetUserComponent } from './get-user/get-user.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CropImageComponent } from './crop-image/crop-image.component';

@NgModule({
    imports: [CommonModule,FormsModule,ReactiveFormsModule, LayoutRoutingModule, TranslateModule, NgbDropdownModule,ImageCropperModule,Ng2SmartTableModule],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, GetUserComponent, SingleUserComponent, UpdateUserComponent, CropImageComponent]
})
export class LayoutModule {}

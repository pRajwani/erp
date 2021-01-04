import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropImageComponent } from './crop-image/crop-image.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then((m) => m.FormModule) },
            { path: 'addEmploye', loadChildren: () => import('./add-user/add-user.module').then((m) => m.AddUserModule) },
            { path: 'viewemployees', loadChildren: () => import('./get-user/get-user.module').then((m) => m.GetUserModule) },
            { path:'singleEmploye', loadChildren:()=>import('./single-user/single-user.module').then((m)=>m.SingleUserModule)},
            { path:'updateEmploye', loadChildren:()=>import('./update-user/update-user.module').then((m)=>m.UpdateUserModule)},
            {path:'crop',component:CropImageComponent},
            {path:'attendance', loadChildren:()=>import('./attendance/attendance.module').then((m)=>m.AttendanceModule)},
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule)
            },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule) },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule)
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

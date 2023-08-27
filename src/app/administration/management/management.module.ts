import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';


import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-list/user-create/user-create.component';
import { OptionListComponent } from './option-list/option-list.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { MenuItemManagerComponent } from './option-list/menu-item-manager/menu-item-manager.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionCreateComponent } from './permission-list/permission-create/permission-create.component';
import { ProfileCreateComponent } from './profile-list/profile-create/profile-create.component';
import { MenuItemComponent } from './profile-list/profile-create/menu-item/menu-item.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupCreateComponent } from './group-list/group-create/group-create.component';
import { UserTypeListComponent } from './user-type-list/user-type-list.component';
import { UserTypeCreateComponent } from './user-type-list/user-type-create/user-type-create.component';
import { MANAGEMENT_ROUTES } from './management.routing';
import { PermissionItemComponent } from './profile-list/profile-create/menu-item/permission-item/permission-item.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    OptionListComponent,
    ProfileListComponent,
    MenuItemManagerComponent,
    PermissionListComponent,
    PermissionCreateComponent,
    ProfileCreateComponent,
    MenuItemComponent,
    GroupListComponent,
    GroupCreateComponent,
    UserTypeListComponent,
    UserTypeCreateComponent,
    PermissionItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,

    MANAGEMENT_ROUTES
  ]
})
export class ManagementModule { }

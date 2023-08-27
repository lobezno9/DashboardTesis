import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AUTH_ROUTES } from './auth.routing';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../service/auth.service';
import { AngularMaterialModule } from '../angular-material.module';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';




@NgModule({
  declarations: [
    LoginComponent,
    RecoverPasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    AUTH_ROUTES,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }

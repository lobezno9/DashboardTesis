import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ADMINISTRATION_ROUTES } from './administration.routing';

import { HomeComponent } from './home/home.component';
import { AngularMaterialModule } from '../angular-material.module';
import { DynamicComponent } from './dynamic/dynamic.component';
import { NgxBarCodePutModule } from 'ngx-barcodeput';
import { IFrameComponent } from './iframe/iframe.component';


@NgModule({
  declarations: [
    HomeComponent,
    DynamicComponent,
    IFrameComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxBarCodePutModule,

    ADMINISTRATION_ROUTES
  ]
})
export class AdministrationModule { }

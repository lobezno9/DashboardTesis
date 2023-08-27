import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlankComponent } from './components/blank/blank.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TemplateComponent } from './components/template/template.component';
import { AngularMaterialModule } from '../angular-material.module';
import { NavService } from '../service/nav.service';
import { AlertComponent } from './components/alert/alert.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    BlankComponent,
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent,
    TemplateComponent,
    AlertComponent,
    BreadcrumbsComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
  ],
  exports: [
    SpinnerComponent,
    AlertComponent,
    TableComponent
  ],
  providers: [NavService]

})
export class SharedModule { }

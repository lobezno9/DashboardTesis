import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlankComponent } from './shared/components/blank/blank.component';
import { TemplateComponent } from './shared/components/template/template.component';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { HoraAccesoGuard } from './shared/guards/hora-acceso.guard';

//Definicion de Rutas utilizando Lasy Loading 
const routes: Routes =
  [
    {
      path: '',
      component: BlankComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
        }
      ]
    },
    {
      path: '',
      component: TemplateComponent,
      children: [
        {
          path: 'Administration',
          loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
          canLoad: [AuthenticationGuard],
        },
      ]
    },
    // {
    //   path: '',
    //   component: BlankComponent,
    //   children: [
    //     {
    //       path: '**',
    //       loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    //     },
    //   ]
    // }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

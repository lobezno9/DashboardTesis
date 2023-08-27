import { Routes, RouterModule } from '@angular/router';
import { ProfileGuard } from '../shared/guards/profile.guard';
import { DynamicComponent } from './dynamic/dynamic.component';
import { HomeComponent } from './home/home.component';
import { IFrameComponent } from './iframe/iframe.component';

//Definicion de Rutas utilizando Lasy Loading 
const AdministrationRoutes: Routes =
    [
        {
            path: '',
            children: [
                {
                    path: 'Management',
                    loadChildren: () => import('./management/management.module').then(m => m.ManagementModule),
                    canLoad: [ProfileGuard],
                },
                {
                    path: '',
                    component: HomeComponent,
                    data: {
                        title: 'Home',
                        urls: [{ title: 'Home', url: '/Home' }, { title: 'Home' }]
                    }
                },
                {
                    path: 'Home',
                    component: HomeComponent,
                    data: {
                        title: 'Home',
                        urls: [{ title: 'Home', url: '/Home' }, { title: 'Home' }]
                    }
                },
                {
                    path: 'IFrame',
                    component: IFrameComponent,
                    data: {
                        title: 'Dynamic',
                        urls: [{ title: 'Dynamic', url: '/Dynamic' }, { title: 'Dynamic' }]
                    }
                },
                {
                    path: 'Dynamic',
                    component: DynamicComponent,
                    data: {
                        title: 'Dynamic',
                        urls: [{ title: 'Dynamic', url: '/Dynamic' }, { title: 'Dynamic' }]
                    }
                },


                // siempre de ultimas, es la ruta si no encrutra nada redirecciona
                {
                    path: '**',
                    component: HomeComponent,
                    data: {
                        title: 'Home',
                        urls: [{ title: 'Home', url: '/Home' }, { title: 'Home' }]
                    }
                },
            ]
        }
    ];

export const ADMINISTRATION_ROUTES = RouterModule.forChild(AdministrationRoutes);

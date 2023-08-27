import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';


const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: LoginComponent,
                data: {
                    title: 'Login',
                    urls: [{ title: 'Login', url: '/Login' }, { title: 'Login' }]
                }
            },
            {
                path: 'Login',
                component: LoginComponent,
                data: {
                    title: 'Login',
                    urls: [{ title: 'Login', url: '/Login' }, { title: 'Login' }]
                }
            },
            {
                path: 'UpdatePassword',
                component: UpdatePasswordComponent,
                data: {
                    title: 'UpdatePassword',
                    urls: [{ title: 'UpdatePassword', url: '/UpdatePassword' }, { title: 'UpdatePassword' }]
                }
            }
        ]
    }
];

export const AUTH_ROUTES = RouterModule.forChild(AuthRoutes);

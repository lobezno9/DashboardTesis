import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "src/app/shared/guards/authentication.guard";
import { ProfileGuard } from "src/app/shared/guards/profile.guard";
import { HomeComponent } from "../home/home.component";
import { GroupListComponent } from "./group-list/group-list.component";
import { OptionListComponent } from "./option-list/option-list.component";
import { PermissionListComponent } from "./permission-list/permission-list.component";
import { ProfileListComponent } from "./profile-list/profile-list.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserTypeListComponent } from "./user-type-list/user-type-list.component";

const ManagementRoutes: Routes =
    [
        {
            path: '',
            children: [
                {
                    path: '',
                    component: HomeComponent,
                    data: {
                        title: 'Home',
                        urls: [{ title: 'Home', url: '/Home' }, { title: 'Home' }]
                    }
                },
                {
                    path: 'Users',
                    component: UserListComponent,
                    data: {
                        title: 'Usuarios',
                        urls: [{ title: 'Users', url: '/Users' }, { title: 'Users' }]
                    },
                    canLoad: [ProfileGuard]
                },
                {
                    path: 'Options',
                    component: OptionListComponent,
                    data: {
                        title: 'Opciones de Menu',
                        urls: [{ title: 'Options', url: '/Options' }, { title: 'Options' }]
                    },
                    canLoad: [ProfileGuard]
                },
                {
                    path: 'Profile',
                    component: ProfileListComponent,
                    data: {
                        title: 'Perfiles',
                        urls: [{ title: 'Profile', url: '/Profile' }, { title: 'Profile' }]
                    },
                    canLoad: [ProfileGuard]
                },
                {
                    path: 'Permission',
                    component: PermissionListComponent,
                    data: {
                        title: 'Permisos',
                        urls: [{ title: 'Permission', url: '/Permission' }, { title: 'Permission' }]
                    },
                    canLoad: [ProfileGuard]
                },
                {
                    path: 'Group',
                    component: GroupListComponent,
                    data: {
                        title: 'Grupo',
                        urls: [{ title: 'Group', url: '/Group' }, { title: 'Group' }]
                    },
                    canLoad: [ProfileGuard]
                },
                {
                    path: 'UserType',
                    component: UserTypeListComponent,
                    data: {
                        title: 'Tipo Usuarios',
                        urls: [{ title: 'UserType', url: '/UserType' }, { title: 'UserType' }]
                    },
                    canLoad: [ProfileGuard]
                },
            ]
        }
    ];
export const MANAGEMENT_ROUTES = RouterModule.forChild(ManagementRoutes);

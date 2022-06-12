import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './general/dashboard/dashboard.component';

const pagesRoutes: Routes = [
    {
        path: 'notificaciones',
        component: PagesComponent,
        canActivate: [],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    {
        path: 'general',
        component: PagesComponent,
        canActivate: [],
        children: [
            { path: 'dashboard', component: DashboardComponent , data: { titulo: 'Dashboard' } },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
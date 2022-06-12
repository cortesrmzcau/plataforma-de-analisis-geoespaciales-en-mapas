import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: { titulo: 'Home' } },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );

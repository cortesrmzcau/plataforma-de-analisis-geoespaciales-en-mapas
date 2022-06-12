import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager  } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { HaversineService } from "ng2-haversine";
import { ClusterManager } from '@agm/js-marker-clusterer';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './general/dashboard/dashboard.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        PAGES_ROUTES,
        MDBBootstrapModulesPro.forRoot(),
        AgmCoreModule.forRoot({
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
            apiKey: '',
          }),
        AgmJsMarkerClustererModule
    ],
    providers: [
        GoogleMapsAPIWrapper,
        DatePipe,
        HaversineService,
        ClusterManager,
            { provide: MarkerManager, useExisting: ClusterManager },
            InfoWindowManager,
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class PagesModule { }

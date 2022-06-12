import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';

// Rutas

import { APP_ROUTES } from './app.routes';

// Servicios

import { ServiceModule } from './services/service.module';

// Modulos

import { PagesModule } from './pages/pages.module';
import { HomeComponent } from './home/home.component';

// Firebase

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AsyncPipe } from '../../node_modules/@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'AIzaSyCJ1zJa9-jBEKM6ERzDZBuS3zD9rvv9E30'
    }),
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule
  ],
  providers: [MDBSpinningPreloader, AngularFireAuth, DatePipe, AngularFirestore, AsyncPipe],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

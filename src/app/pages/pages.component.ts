import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { LoginService } from '../services/service.index';
import { Usuario } from '../models/modelos.index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  // Configuracion del header

  public imgProfileBoolean: boolean = true;
  public imgProfile: string = '';
  public emailUser: string = '';

  public usuariosDB: Usuario[];

  constructor(
    public _Route: Router,
    public afAuth: AngularFireAuth,
    private _Login: LoginService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
  }

  ngAfterContentInit() {
  }

  obtenerUsuarioLogeado() {
    return this._Login.isAuth().subscribe(auth => {
      this.emailUser = auth.email;
      if (auth.providerData[0].providerId == 'twitter.com') {
        this.imgProfileBoolean = false;
        this.imgProfile = auth.photoURL;
      } else {
        this.imgProfileBoolean = true;
      }
    });
  }

  onLogout() {
    this.afAuth.signOut();
    this._Route.navigate(['home']);
  }

}

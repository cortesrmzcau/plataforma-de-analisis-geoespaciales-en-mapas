import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase  } from '@angular/fire/database';
import { Router } from '@angular/router';

import { Usuario } from '../models/modelos.index';
import { LoginService } from '../services/service.index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email: string;
  password: string;
  message_error1: boolean = false;
  message_error2: boolean = false;
  message_error3: boolean = false;

  FormRegister: FormGroup;
  FormLogin: FormGroup;

  constructor(
    private firebase: AngularFireDatabase,
    public _LoginService: LoginService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public fb: FormBuilder
  ) {
    this.FormLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    this.FormRegister = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  // Registrar usuario

  formularioRegistrar() {
    return this._LoginService.registerEmail(this.FormRegister.value.email, this.FormRegister.value.password)
      .then((res) => {
        this.message_error3 = false;
        this.onLoginRedirect();
      }).catch(err => {
        console.log('error al registrar', err.code);
        if (err.code == "auth/email-already-in-use") {
          this.message_error3 = true;
        } else {
          this.message_error3 = false;
        }
      });
  }

  // Login Email

  formularioIngresar() {
    return this._LoginService.loginEmail(this.FormLogin.value.email, this.FormLogin.value.password)
      .then((res) => {
        this.message_error1 = false;
        this.message_error2 = false;
        this.onLoginRedirect();
      }).catch(err => {
        if (err.code == "auth/user-not-found") {
          this.message_error1 = true;
        } else {
          this.message_error1 = false;
        }

        if(err.code == "auth/wrong-password") {
          this.message_error2 = true;
        } else {
          this.message_error2 = false;
        }
      });
  }

  // Login Twitter

  onLoginTwitter(): void {
    this._LoginService.loginTwitterUser()
      .then(() => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  // Redireccionar al dashboard

  onLoginRedirect(): void {
    this.router.navigateByUrl('general/dashboard');
  }

}

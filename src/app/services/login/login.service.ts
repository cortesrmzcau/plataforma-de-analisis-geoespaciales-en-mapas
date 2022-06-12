import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap  } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFireDatabase  } from '@angular/fire/database';

import { Usuario } from 'src/app/models/modelos.index';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarios: Usuario[];

  randomUser = Math.random().toString(36).substring(7);

  constructor(
    private afsAuth: AngularFireAuth,
    private firebase: AngularFireDatabase
  ) {  }

  registerEmail(email: string, password: string) {
    return this.afsAuth.createUserWithEmailAndPassword(email, password)
      .then(res =>
        this.registerDatabase(email, res.user.uid)
      );
  }

  loginEmail(email: string, password: string) {
    return this.afsAuth.signInWithEmailAndPassword(email, password);
  }

  loginTwitterUser() {
    return this.afsAuth.signInWithPopup(new auth.TwitterAuthProvider())
      .then(credential => {
        this.updateUserData(credential.user)
      });
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  logoutUser() {
    return this.afsAuth.signOut();
  }

  updateUserData(user) {
    return this.firebase.list('usuarios').snapshotChanges().subscribe(item => {
      if (item.length == 0) {
        return this.firebase.database.ref('usuarios_web/' + user.uid).set({
          nombre: user.displayName,
          userRandom: 'usuario' + this.randomUser,
          email: user.email,
          tipoLogin: 'twitter',
          imgProfile: user.photoURL
        });
      } else {
        this.usuarios = [];
        item.forEach(element => {
          let x: any = element.payload.toJSON();
          x['$key'] = element.key;
          this.usuarios.push(x);
        });

        for ( let email of this.usuarios) {
          if (email['email'] != user.email) {
            return this.firebase.database.ref('usuarios/' + user.uid).set({
              nombre: user.displayName,
              userRandom: 'usuario' + this.randomUser,
              email: user.email,
              tipoLogin: 'twitter',
              imgProfile: user.photoURL
            });
          }
        }
      }
    });
  }

  registerDatabase(email: string, key?: string) {
    return this.firebase.database.ref('usuarios/' + key).set({
      email: email,
      imgProfile: '...',
      nombre: 'nombre' + this.randomUser,
      tipoLogin: 'email',
      userRandom: 'usuario' + this.randomUser
    });
  }

  obtenerUsuariosWeb() {
    return this.firebase.list('usuarios_app');
  }

  obtenerListaProductosFavoritos() {
    return this.firebase.list('usuarios_favoritos_web');
  }
}

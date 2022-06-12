import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

import { localizacion_ip } from 'src/app/models/modelos.index';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient,
    private firebase: AngularFireDatabase
  ) { }

  // Busqueda General

  getLocation() {
    return this.http.get<localizacion_ip>('https://ipapi.co/json');
  }

  obtenerCategorias() {
    return this.firebase.list('tienda_categorias');
  }

  obtenerUsuariosApp(){
    return this.firebase.list('usuarios_app');
  }

  obtenerProductosFavoritos() {
    return this.firebase.list('usuarios_favoritos_web');
  }

}

import { Component, OnInit } from '@angular/core';
import { HaversineService, GeoCoord } from "ng2-haversine";

import { usuarioApp, usuariosProductosFavoritos, dataCategoria } from 'src/app/models/modelos.index';
import { MapService } from 'src/app/services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Tipo de grafica

  public chartType: string = 'pie';

  // Configuracion grafica tendencia productos y categorias

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#4677DD', '#4588F1', '#78AAF2'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    legend: {
      display: false,
    },
    responsive: true
  };

  // Configuracion grafica genero

  public chartColorsGenero: Array<any> = [
    {
      backgroundColor: ['#ec407a', '#4677dd'],
      borderWidth: 2,
    }
  ];

  // Cambiar la densidad del mapa

  public styles = [{ }];

  // Ajuste para cambiar de posicion y rango

  public eventAuxiliar: any;
  public isDisableSectiontendencia: boolean = false;

  // Información para permisos

  public no_data: boolean;
  public aviso: boolean = true;
  public panel: boolean;
  public analizando: boolean;
  public no_resultados: boolean;

  // Asignar medidas

  public doscientoscincuentam: string = '250 m';
  public trescientoscincuentam: string = '500 m';
  public quinientoscincuentam: string = '750 m';
  public milm: string = '1000 m';

  // Mi ubicación actual

  public icoImage: string = "https://firebasestorage.googleapis.com/v0/b/sicon-e520e.appspot.com/o/pin-red-solid-1.png?alt=media&token=0ab63e74-c7b4-4e1b-925c-909fc7148e2c";
  public icoImage2: string = "https://firebasestorage.googleapis.com/v0/b/sicon-e520e.appspot.com/o/pin-yellow-solid-1.png?alt=media&token=7bc23f70-16fc-40f7-93a2-d11c91add630";

  public latitude: number = 0;
  public longitude: number = 0;
  public latlng: boolean = false;
  public zoom: number = 6;
  public cardInfoLocation: boolean = false;
  public city: string;
  public region: string;
  public rangoSeleccionado: number = 1;
  public circleLocation: boolean = false;
  public circleRadius: number = 0;

  // Configuracion nodo de categorias

  public listaCategorias: dataCategoria[];

  // Productos y servicios de interes

  public listUsuariosApp: usuarioApp[] = new Array;
  public usuariosArrededorMiUbucacion: any = [];
  public usuariosProductosFavoritosWebTemporal: any[];
  public usuariosProductosFavoritosWeb: usuariosProductosFavoritos[];
  public listProductosInteresMiUbicacion: any = [];

  public graficaProductosInteres: boolean;
  public analizandoProductosInteres: boolean;
  public noResultadosProductosInteres: boolean;

  // Nombre de los productos

  public productosInteres: any = [];

  public productosFavoritosParte1: any = [];
  public productosFavoritosParte2: any = [];
  
  public vecesProductosInteresParte1: string[] = new Array;
  public vecesProductosInteresParte2: Array<any>;
  public vecesProductosInteresParte3: any = [];
  
  public productosFavoritosRecortarString: any = [];

  // Categorias de mayor interes

  public categoriaInteres: any = [];

  public categoriasProductosInteresParte1: any = [];
  public categoriasProductosInteresParte2: any = [];

  public vecesCategoriasInteresParte1: string[] = new Array;
  public vecesCategoriasInteresParte2: Array<any>;
  public vecesCategoriasInteresParte3: any = [];

  public graficaCategoriasInteres: boolean;
  public analizandoCategoriasInteres: boolean;
  public noResultadosCategoriasInteres: boolean;

  public categoriasFavoritasRecortarString: any = [];

  // Edad - Producto

  public edadesUsuarios: any = [];

  public edad1822: any = [];
  public edad1822P: number = 0;
  public generoEdad1822: any = [];
  public generoMujeresEdad1822: any = [];
  public generoHombresEdad1822: any = [];
  public totalGenero1822: number = 0;
  public totalMujeres1822: number = 0;
  public totalHombres1822: number = 0;

  public edad2327: any = [];
  public edad2327P: number = 0;
  public generoEdad2327: any = [];
  public generoMujeresEdad2327: any = [];
  public generoMujeresEdad2327Parte2: number = 0;
  public generoHombresEdad2327: any = [];
  public totalGenero2327: number = 0;
  public totalMujeres2327: number = 0;
  public totalHombres2327: number = 0;

  public edad2832: any = [];
  public edad2832P: number = 0;
  public generoEdad2832: any = [];
  public generoMujeresEdad2832: any = [];
  public generoHombresEdad2832: any = [];
  public totalGenero2832: number = 0;
  public totalMujeres2832: number = 0;
  public totalHombres2832: number = 0;

  public agrupacionEdadProductos: boolean;
  public analizandoEdadProductos: boolean;
  public noResultadosEdadProductos: boolean;

  public seccion2832: boolean;
  public seccion2327: boolean;
  public seccion1822: boolean;

  // Genero

  public generoInteresFinal: any = [];
  public numeroMujeres: any = [];
  public numeroHombres: any = [];

  public totalMujeres: any;
  public totalHombres: any;
  public totalGenero: number;
  public textoTotalMujeres: any;
  public textoTotalHombres: any;
  public graficaGenero: Array<any>;
  public graficaLabelGenero: any = [];

  public graficaGeneroProductos: boolean;
  public analizandoGeneroProductos: boolean;
  public noResultadosGeneroProductos: boolean;

  // Información destacada

  public age2: any = '';
  public showAge2: any = '';
  public precioPromedioInteresProducto: any = [];
  public totalPrecioPromedioInteresProducto: number = 0;
  public edadPromedioInteresProducto: any = [];
  public totalEdadPromedioInteresProducto: number = 0;
  public precioPromedioMismaCategoria: any = [];
  public precioPromedioMismaCategoria2: any = [];
  public promedioArregloPrecioPromedioMismaCategoria: number = 0;

  public seccionInformacionDestacada: boolean;
  public analizandoInformacionDestacada: boolean;
  public noResultadosInformacionDestacada: boolean;

  // Información adicional

  public nombreProductoMenorInteres: string = '';
  public precioProductoMenorInteres: string = '';
  public categoriaMenorInteres: string = '';
  public interesadosProductoMenorInteres: string = '';
  public precioPromedioProductoTop: string = '';

  public seccionResultadosInformacionAdicional: boolean = false;
  public analizandoInformacionAdicional: boolean = true;
  public noResultadosInformacionAdicional: boolean = false;

  // Negocios seguidos

  public negociosSeguidos: any[] = [];
  public seccionResultadosNegociosSeguidos: boolean = false;
  public analizandoNegociosSeguidos: boolean = true;
  public noResultadosNegociosSeguidos: boolean = false;

  constructor(
    private _MapService: MapService,
    private _haversineService: HaversineService
  ) { }

  ngOnInit() {
    this.ubicacionActual();
    setTimeout(() => {
      this.AnalisisEnMiUbicacion(260);
    },1000);
  }

  /************************************************
  ************  Permisos de ubicación  ************
  ************************************************/

  ubicacionActual() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //this.latitude = position.coords.latitude;
          //this.longitude = position.coords.longitude;
          this.latitude = 20.5089192;
          this.longitude = -97.4341225;

          this.zoom = 16;
          this.circleRadius = 280;
          this.cardInfoLocation = true;

          this._MapService.getLocation().subscribe(data => {
            this.city = data.city;
            this.region = data.region;
          });

          this.aviso = false;
          this.panel = true;
      });
    }
  }


  /************************************************
  ****************  Analizar zona  ****************
  ************************************************/

 AnalisisEnMiUbicacion(rangoDeAnalisis?: number) {
  let distancia: number = 0;

  this.analizandoProductosInteres = true;
  this.analizandoCategoriasInteres = true;
  this.analizandoEdadProductos = true;
  this.analizandoGeneroProductos = true;
  this.analizandoInformacionDestacada = true;
  this.analizandoInformacionAdicional = true;

  return this._MapService.obtenerUsuariosApp().snapshotChanges(['child_changed']).subscribe(
    item => {
      if (item.length == 0) {
        this.panel = false;
        this.no_data = true;
      } else {
        this.listUsuariosApp = [];
        this.usuariosArrededorMiUbucacion = [];
        
        item.forEach(element => {
          let x: any = element.payload.toJSON();
          x['$key'] = element.key;
          return this.listUsuariosApp.push(x);
        });

        for(let y of this.listUsuariosApp) {
          let miUbicacion: GeoCoord = {
            latitude: this.latitude,
            longitude: this.longitude
          };

          let ubicacionProducto: GeoCoord = {
            latitude: parseFloat(y['latitud']),
            longitude: parseFloat(y['longitud'])
          };

          distancia = this._haversineService.getDistanceInMeters(miUbicacion, ubicacionProducto);

          if (distancia < rangoDeAnalisis) {
            this.usuariosArrededorMiUbucacion.push(y);
          }
        }

        setTimeout(() => {
          if (this.usuariosArrededorMiUbucacion.length == 0) {
            this.analizandoProductosInteres = false;
            this.analizandoCategoriasInteres = false;
            this.analizandoEdadProductos = false;
            this.analizandoGeneroProductos = false;
            this.analizandoInformacionDestacada = false;
            this.analizandoInformacionAdicional = false;
          } else {
            this.analizandoProductosInteres = false;
            this.noResultadosProductosInteres = false;

            this.analizandoCategoriasInteres = false;
            this.noResultadosCategoriasInteres = false;

            this.analizandoEdadProductos = false;
            this.noResultadosEdadProductos = false;

            this.analizandoGeneroProductos = false;
            this.noResultadosGeneroProductos = false;

            this.analizandoInformacionDestacada = false;
            this.noResultadosInformacionDestacada = false;

            this.analizandoInformacionAdicional = false;
            this.noResultadosInformacionAdicional = false;

            return this._MapService.obtenerProductosFavoritos().snapshotChanges(['child_changed']).subscribe(
              items => {
                
                this.usuariosProductosFavoritosWeb = [];
                this.usuariosProductosFavoritosWebTemporal = [];
                this.listaCategorias = [];
                this.listProductosInteresMiUbicacion = [];

                items.forEach(element2 => {
                  let z: any = element2.payload.toJSON();
                  z['$key'] = element2.key;
                  return this.usuariosProductosFavoritosWebTemporal.push(z);
                });

                return this._MapService.obtenerCategorias().snapshotChanges(['child_changed']).subscribe(
                  itemss => {
                    itemss.forEach(element3 => {
                      let x: any = element3.payload.toJSON();
                      x['$key'] = element3.key;
                      return this.listaCategorias.push(x);
                    });

                    for(let q of this.usuariosProductosFavoritosWebTemporal) {
                      for(let w of this.listaCategorias) {
                        if (q.tag == w.nombre) {
                          let registroTemporal: any = [];

                          registroTemporal = [{
                            $key: q.$key,
                            descripcion: q.descripcion,
                            id_tienda: q.id_tienda,
                            imagen: q.imagen,
                            nombre: q.nombre,
                            precio: q.precio,
                            tag: w['nombre'],
                            user_uid: q.user_id
                          }];

                          this.usuariosProductosFavoritosWeb.push(registroTemporal[0]);
                        }
                      }
                    }
                    
                    for(let x of this.usuariosArrededorMiUbucacion) {
                      for(let y of this.usuariosProductosFavoritosWeb) {
                        if (y['user_uid'] != undefined && x['$key'] == y['user_uid']) {

                          let agrupacionResultadoUsuariosProductoFavorito: any = [];

                          agrupacionResultadoUsuariosProductoFavorito = [{
                            user_id: x['$key'],
                            key_producto: y['$key'],
                            genero: x['genero'],
                            edad: x['fecha_nacimiento'],
                            nombre: y['nombre'],
                            precio: y['precio'],
                            categoria: y['tag'],
                            latitude: x['latitud'],
                            longitude: x['longitud'],
                            fecha: y['fecha'],
                            hora: y['hora']
                          }];

                          this.listProductosInteresMiUbicacion.push(agrupacionResultadoUsuariosProductoFavorito[0]);
                        }
                      }
                    }

                    return this.resultadoAnalisisObtenerDatosEnMiUbicacion(this.listProductosInteresMiUbicacion);
                  });
              });
          }
        }, 1500);
            

        this.panel = true;
        this.no_data = false;
      }
    });
 }


  /************************************************
  **********  Analisis productos interes  *********
  ************************************************/

  resultadoAnalisisObtenerDatosEnMiUbicacion(ProductosFavoritos?: any[]) {

    if (ProductosFavoritos.length > 0) {

      /************************************************************
      *****  Card los 3 productos de mayor interes de la zona  ****
      ************************************************************/


      let contador1: number = 0;
      let repetidos1: any = [];

      this.productosInteres = [];
      
      this.productosFavoritosParte1 = [];
      this.productosFavoritosParte2 = [];

      this.vecesProductosInteresParte1 = [];
      this.vecesProductosInteresParte2 = [];
      this.vecesProductosInteresParte3 = [];
    
      this.productosFavoritosRecortarString = [];

      for(let x = 0; x < ProductosFavoritos.length; x++) {
        for(let y = 0; y < ProductosFavoritos.length; y++) {
          if (ProductosFavoritos[x].nombre == ProductosFavoritos[y].nombre) {
            contador1++;
          }
        }
        if (contador1 > 0 && repetidos1.indexOf(ProductosFavoritos[x].nombre) === -1) {
          repetidos1.push(ProductosFavoritos[x].nombre);

          let nombreProductos: any = [];

          nombreProductos = [{
            nombre: ProductosFavoritos[x].nombre,
            precio: ProductosFavoritos[x].precio,
            categoria: ProductosFavoritos[x].categoria,
            veces: contador1
          }];

          this.productosInteres.push(nombreProductos[0]);
          this.productosInteres.sort((arreglop1, arreglop2) => arreglop2.veces - arreglop1.veces);
        }
        contador1 = 0;
      }

      for(let u of this.productosInteres) {
        this.productosFavoritosParte1.push(u['nombre']);
        this.vecesProductosInteresParte1.push(u['veces']);

        let productoFavoritoNombreVeces: any = [];

        productoFavoritoNombreVeces = [{
          nombre: u['nombre'].slice(0,25),
          veces: u['veces']
        }];
        
        this.productosFavoritosRecortarString.push(productoFavoritoNombreVeces[0]);
      }

      this.productosFavoritosRecortarString = this.productosFavoritosRecortarString.slice(0,3);

      this.productosFavoritosParte2 = this.productosFavoritosParte1.slice(0,3);

      this.vecesProductosInteresParte3 = this.vecesProductosInteresParte1.slice(0,3);

      this.vecesProductosInteresParte2 = [{
        data: [
          this.vecesProductosInteresParte1[0],
          this.vecesProductosInteresParte1[1],
          this.vecesProductosInteresParte1[2]
        ]
      }];

      if (this.vecesProductosInteresParte2.length > 0) {
        this.graficaProductosInteres = true;      
      }


      /************************************************************
      ****  Card las 3 categorías de mayor interes de la zona  ****
      ************************************************************/


      let contador2: number = 0;
      let repetidos2: any = [];

      this.categoriaInteres = [];

      this.categoriasProductosInteresParte1 = [];
      this.categoriasProductosInteresParte2 = [];

      this.vecesCategoriasInteresParte1 = [];
      this.vecesCategoriasInteresParte2 = [];
      this.vecesCategoriasInteresParte3 = [];

      this.categoriasFavoritasRecortarString = [];

      for(let x = 0; x < ProductosFavoritos.length; x++) {
        for(let y = 0; y < ProductosFavoritos.length; y++) {
          if (ProductosFavoritos[x].categoria == ProductosFavoritos[y].categoria) {
            contador2++;
          }
        }
        if (contador2 > 0 && repetidos2.indexOf(ProductosFavoritos[x].categoria) === -1) {
          repetidos2.push(ProductosFavoritos[x].categoria);
          
          let nombreCategorias: any = [];

          nombreCategorias = [{
            nombre: ProductosFavoritos[x].categoria,
            veces: contador2
          }];

          this.categoriaInteres.push(nombreCategorias[0]);
          this.categoriaInteres.sort((arreglop1, arreglop2) => arreglop2.veces - arreglop1.veces);
        }
        contador2 = 0;
      }

      for(let t of this.categoriaInteres) {
        this.categoriasProductosInteresParte1.push(t['nombre']);
        this.vecesCategoriasInteresParte1.push(t['veces']);

        let categoriaFavoritoNombreVeces: any = [];

        categoriaFavoritoNombreVeces = [{
          nombre: t['nombre'].slice(0,25),
          veces: t['veces']
        }];
        
        this.categoriasFavoritasRecortarString.push(categoriaFavoritoNombreVeces[0]);
      }

      this.categoriasFavoritasRecortarString = this.categoriasFavoritasRecortarString.slice(0,3);

      this.categoriasProductosInteresParte2 = this.categoriasProductosInteresParte1.slice(0,3);

      this.vecesCategoriasInteresParte3 = this.vecesCategoriasInteresParte1.slice(0,3);

      this.vecesCategoriasInteresParte2 = [{
        data: [
          this.vecesCategoriasInteresParte1[0],
          this.vecesCategoriasInteresParte1[1],
          this.vecesCategoriasInteresParte1[2]
        ]
      }];

      if (this.categoriasProductosInteresParte2.length > 0) {
        this.graficaCategoriasInteres = true;      
      }


      /************************************************************
      ******  Agrupación en 3 diferentes edades y su genero  ******
      ************************************************************/


      let age: string = '';
      let contador3: number = 0;
      let repetidos3: any = [];

      this.edadesUsuarios = [];

      this.edad1822 = [];
      this.edad2327 = [];
      this.edad2832 = [];

      this.edad1822 = [];
      this.edad2327 = [];
      this.edad2832 = [];

      this.generoEdad1822 = [];
      this.generoEdad2327 = [];
      this.generoEdad2832 = [];

      this.generoMujeresEdad1822 = [];
      this.generoHombresEdad1822 = [];

      this.generoMujeresEdad2327 = [];
      this.generoHombresEdad2327 = [];

      this.generoMujeresEdad2832 = [];
      this.generoHombresEdad2832 = [];

      this.totalGenero1822 = 0;
      this.totalMujeres1822 = 0;
      this.totalHombres1822 = 0;

      this.totalGenero2327 = 0;
      this.totalMujeres2327 = 0
      this.totalHombres2327 = 0;

      this.totalGenero2832 = 0;
      this.totalMujeres2832 = 0;
      this.totalHombres2832 = 0;

      this.totalGenero = 0;
      this.totalMujeres = 0;
      this.totalHombres = 0;
      this.textoTotalMujeres = 0;
      this.textoTotalHombres = 0;

      for(let x = 0; x < ProductosFavoritos.length; x++) {
        for(let y = 0; y < ProductosFavoritos.length; y++) {
          if (ProductosFavoritos[x].edad == ProductosFavoritos[y].edad) {
            contador3++;
          }
        }
        if (contador3 > 0 && repetidos3.indexOf(ProductosFavoritos[x].edad) === -1) {
          repetidos3.push(ProductosFavoritos[x].edad);

          age = String(ProductosFavoritos[x].edad);
          let anio: any = age.slice(age.length-4, age.length);
          let pasar: any = age.slice(0, age.length-5);
          let dia: any = age.substring(0, pasar.indexOf("/"));
          let mes: any = pasar.substring(pasar.indexOf("/"), pasar.length).replace('/', '');
          let nuevaFecha: any = anio + '-' + mes + '-' + dia;
          const convertAge: any = new Date(nuevaFecha);
          let showAge: any = Math.floor(((Math.abs(Date.now() - convertAge.getTime())) / (1000 * 3600 * 24))/366);

          let edadUsuario: any = [];

          edadUsuario = [{
            edad: showAge,
            genero: ProductosFavoritos[x].genero

          }];

          this.edadesUsuarios.push(edadUsuario[0]);
        }
        contador3 = 0;
      }

      for(let ui of this.edadesUsuarios) {
        if (ui['edad'] >= 18 && ui['edad'] <= 22) {
          this.generoEdad1822.push(ui['genero']);
        }

        if (ui['edad'] >= 23 && ui['edad'] <= 27) {
          this.generoEdad2327.push(ui['genero']);
        }

        if (ui['edad'] >= 28 && ui['edad'] <= 32) {
          this.generoEdad2832.push(ui['genero']);
        }
      }

      for(let yo of this.generoEdad1822) {
        if (yo == 'Mujer') {
          this.generoMujeresEdad1822.push(yo);
        }

        if (yo == 'Hombre') {
          this.generoHombresEdad1822.push(yo);
        }
      }

      this.totalGenero1822 = this.generoMujeresEdad1822.length + this.generoHombresEdad1822.length;
      this.totalMujeres1822 = Math.round(((this.generoMujeresEdad1822.length / this.totalGenero1822) * 100));
      this.totalHombres1822 = Math.round(((this.generoHombresEdad1822.length / this.totalGenero1822) * 100));

      if (isNaN(this.totalMujeres1822)) {
        this.totalMujeres1822 = 0;
      }

      if (isNaN(this.totalHombres1822)) {
        this.totalHombres1822 = 0;
      }

      if (this.totalGenero1822 > 0) {
        this.seccion1822 = true;
      } else {
        this.seccion1822 = false;
      }



      for(let yu of this.generoEdad2327) {
        if (yu == 'Mujer') {
          this.generoMujeresEdad2327.push(yu);
        }

        if (yu == 'Hombre') {
          this.generoHombresEdad2327.push(yu);
        }
      }

      this.totalGenero2327 = this.generoMujeresEdad2327.length + this.generoHombresEdad2327.length;
      this.totalMujeres2327 = Math.round(((this.generoMujeresEdad2327.length / this.totalGenero2327) * 100));
      this.totalHombres2327 = Math.round(((this.generoHombresEdad2327.length / this.totalGenero2327) * 100));

      if (isNaN(this.totalMujeres2327)) {
        this.totalMujeres2327 = 0;
      }

      if (isNaN(this.totalHombres2327)) {
        this.totalHombres2327 = 0;
      }

      if (this.generoEdad2327.length > 0) {
        this.seccion2327 = true;
      } else {
        this.seccion2327 = false;
      }


      for(let yu of this.generoEdad2832) {
        if (yu == 'Mujer') {
          this.generoMujeresEdad2832.push(yu);
        }

        if (yu == 'Hombre') {
          this.generoHombresEdad2832.push(yu);
        }
      }

      this.totalGenero2832 = this.generoMujeresEdad2832.length + this.generoHombresEdad2832.length;
      this.totalMujeres2832 = Math.round(((this.generoMujeresEdad2832.length / this.totalGenero2832) * 100));
      this.totalHombres2832 = Math.round(((this.generoHombresEdad2832.length / this.totalGenero2832) * 100));

      if (isNaN(this.totalMujeres2832)) {
        this.totalMujeres2832 = 0;
      }

      if (isNaN(this.totalHombres2832)) {
        this.totalHombres2832 = 0;
      }

      if (this.generoEdad2832.length > 0) {
        this.seccion2832 = true;
      } else {
        this.seccion2832 = false;
      }

      this.agrupacionEdadProductos = true;

      /************************************************************
      **********     Card genero de los interesados    ************
      ************************************************************/

      let contador4: number = 0;
      let repetidos4: any = [];

      this.generoInteresFinal = [];
      this.numeroMujeres = [];
      this.numeroHombres = [];
      this.graficaGenero = [];
      
      this.totalGenero = 0;
      this.totalMujeres = 0;
      this.totalHombres = 0;

      for(let x = 0; x < ProductosFavoritos.length; x++) {
        for(let y = 0; y < ProductosFavoritos.length; y++) {
          if (ProductosFavoritos[x].user_id == ProductosFavoritos[y].user_id) {
            contador4++;
          }
        }
        if (contador4 > 0 && repetidos4.indexOf(ProductosFavoritos[x].user_id) === -1) {
          repetidos4.push(ProductosFavoritos[x].user_id);

          let generoUsuario: any = [];

          generoUsuario = [{
            genero: ProductosFavoritos[x].genero,
          }];

          this.generoInteresFinal.push(generoUsuario[0]);
        }
        contador4 = 0;
      }

      for(let ty of this.generoInteresFinal) {
        if (ty['genero'] == 'Mujer') {
          this.numeroMujeres.push(ty['genero']);
        }

        if (ty['genero'] == 'Hombre') {
          this.numeroHombres.push(ty['genero']);
        }
      }

      this.graficaGenero = [{
        data: [
          this.numeroMujeres.length,
          this.numeroHombres.length
        ]
      }];

      this.graficaLabelGenero = ['Mujeres','Hombres'];

      this.totalGenero = this.numeroMujeres.length + this.numeroHombres.length;
      
      this.totalMujeres = Math.round(((this.numeroMujeres.length / this.totalGenero) * 100));

      if (isNaN(this.totalMujeres)) {
        this.totalMujeres = 0;
      }

      this.totalHombres = Math.round(((this.numeroHombres.length / this.totalGenero) * 100));

      if (isNaN(this.totalHombres)) {
        this.totalHombres = 0;
      }
      
      this.graficaGeneroProductos = true;

      
      /************************************************************
      ***********  Información del producto destacado  ************
      ************************************************************/


      let contador5: number = 0;
      let contador6: number = 0;
      let repetidos5: any = [];
      let repetidos6: any = [];
    
      let age2: string = '';
      let showAge2: any;

      let arregloPrecioPromedioInteresProducto: any = [];
      let arregloEdadPromedioInteresProducto: any = [];

      let sumaArregloPrecioPromedioInteresProducto: number = 0;
      this.precioPromedioInteresProducto = 0;

      let sumaArregloEdadPromedioInteresProducto: number = 0;
      this.edadPromedioInteresProducto = 0;

      this.precioPromedioMismaCategoria = [];
      this.precioPromedioMismaCategoria2 = [];

      let sumaArregloPrecioPromedioMismaCategoria2: number = 0;
      this.promedioArregloPrecioPromedioMismaCategoria = 0;

      // Precio promedio de interes del producto

      for(let gk of ProductosFavoritos) {
        if (gk['nombre'] == this.productosFavoritosParte2[0]) {
          age2 = String(gk['edad']);
          var anio = age2.slice(age2.length-4, age2.length);
          var pasar = age2.slice(0, age2.length-5);
          var dia = age2.substring(0, pasar.indexOf("/"));
          var mes = pasar.substring(pasar.indexOf("/"), pasar.length).replace('/', '');
          var nuevaFecha = anio + '-' + mes + '-' + dia;
          const convertAge = new Date(nuevaFecha);
          showAge2 = Math.floor(((Math.abs(Date.now() - convertAge.getTime())) / (1000 * 3600 * 24))/366);

          arregloPrecioPromedioInteresProducto.push(Number(gk['precio'].replace("$",'')));
          arregloEdadPromedioInteresProducto.push(showAge2);
        }
      }
      
      // Precio promedio del producto de mayor interes

      arregloPrecioPromedioInteresProducto.forEach (function(numero){
        sumaArregloPrecioPromedioInteresProducto += numero;
      });

      this.totalPrecioPromedioInteresProducto =
        Number(sumaArregloPrecioPromedioInteresProducto) / arregloPrecioPromedioInteresProducto.length;

      // Edad promedio que consumen el producto

      arregloEdadPromedioInteresProducto.forEach (function(numero){
        sumaArregloEdadPromedioInteresProducto += numero;
      });

      this.edadPromedioInteresProducto =
        Math.round(sumaArregloEdadPromedioInteresProducto / arregloEdadPromedioInteresProducto.length);

      // Precio promedio de los productos de la misma categoría

      for(let vy of ProductosFavoritos) {
        if(vy['categoria'] == this.categoriaInteres[0].nombre) {
          this.precioPromedioMismaCategoria.push(vy);
        }
      }

      for(let x = 0; x < this.precioPromedioMismaCategoria.length; x++) {
        for(let y = 0; y < this.precioPromedioMismaCategoria.length; y++) {
          if (this.precioPromedioMismaCategoria[x].precio == this.precioPromedioMismaCategoria[y].precio) {
            contador6++;
          }
        }
        if (contador6 > 0 && repetidos6.indexOf(this.precioPromedioMismaCategoria[x].precio) === -1) {
          repetidos6.push(this.precioPromedioMismaCategoria[x].precio);
          this.precioPromedioMismaCategoria2.push(Number(this.precioPromedioMismaCategoria[x].precio.replace("$",'')));
        }
        contador6 = 0;
      }

      this.precioPromedioMismaCategoria2.forEach (function(numero){
        sumaArregloPrecioPromedioMismaCategoria2 += numero;
      });

      this.promedioArregloPrecioPromedioMismaCategoria =
        Math.round(sumaArregloPrecioPromedioMismaCategoria2 / this.precioPromedioMismaCategoria2.length);

      this.seccionInformacionDestacada = true;

      
      /************************************************************
      ***  Información adicional del producto de menos interés ****
      ************************************************************/

      
      this.productosInteres.sort((arreglop1, arreglop2) => arreglop1.veces - arreglop2.veces);

      // Nombre producto menor interes

      this.nombreProductoMenorInteres = this.productosInteres[0].nombre;

      // Precio producto menor interes

      this.precioProductoMenorInteres = this.productosInteres[0].precio.replace("$",'');

      // Interesados en el producto

      this.interesadosProductoMenorInteres = this.productosInteres[0].veces;

      // Categoria de menor interes

      this.categoriaMenorInteres = this.productosInteres[0].categoria;

      this.seccionResultadosInformacionAdicional = true;
      
      return;
    } else {
      this.noResultadosProductosInteres = true;
      this.noResultadosCategoriasInteres = true;
      this.noResultadosEdadProductos = true;
      this.noResultadosGeneroProductos = true;
      this.noResultadosInformacionDestacada = true;
      this.noResultadosInformacionAdicional = true;
    }
  }

  
  /************************************************
  ********  Cambiar posición del marcador  ********
  ************************************************/

  posicionFinalMarcador($event: MouseEvent) {
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;

    this.graficaProductosInteres = false;
    this.graficaCategoriasInteres = false;
    this.agrupacionEdadProductos = false;
    this.graficaGeneroProductos = false;
    this.seccionInformacionDestacada = false;
    this.seccionResultadosInformacionAdicional = false;

    this.noResultadosProductosInteres = false;
    this.noResultadosCategoriasInteres = false;
    this.noResultadosEdadProductos = false;
    this.noResultadosGeneroProductos = false;
    this.noResultadosInformacionDestacada = false;
    this.noResultadosInformacionAdicional = false;

    switch (this.rangoSeleccionado) {
      case 1:
        this.AnalisisEnMiUbicacion(260);
        break;

      case 2:
        this.AnalisisEnMiUbicacion(560);
        break;

      case 3:
        this.AnalisisEnMiUbicacion(760);
        break;
      
      case 4:
        this.AnalisisEnMiUbicacion(1010);
        break;
    }
  }


  /***************************************************
  ****  Ajuste del rango de la zona a analizar  ******
  ***************************************************/

  changeRange(event: any) {
    this.eventAuxiliar = event.target.value;

    this.graficaProductosInteres = false;
    this.graficaCategoriasInteres = false;
    this.agrupacionEdadProductos = false;
    this.graficaGeneroProductos = false;
    this.seccionInformacionDestacada = false;
    this.seccionResultadosInformacionAdicional = false;

    switch (this.eventAuxiliar) {
      case '1':
        this.rangoSeleccionado = Number(event.target.value);
        this.AnalisisEnMiUbicacion(260);
        this.circleRadius = 280;
        break;
      
      case '2':
        this.rangoSeleccionado = Number(event.target.value);
        this.AnalisisEnMiUbicacion(560);
        this.circleRadius = 560;
        break;

      case '3':
        this.rangoSeleccionado = Number(event.target.value);
        this.AnalisisEnMiUbicacion(760);
        this.circleRadius = 840;
        break;

      case '4':
        this.rangoSeleccionado = Number(event.target.value);
        this.AnalisisEnMiUbicacion(1010);
        this.circleRadius = 1120;
        break;
    }
  }

  /****************************************
  ****  Cambiar la densidad del mapa  *****
  *****************************************/

  cambiarDensidad(value: number) {
    if (value == 1) {
      this.styles = [{ }];
    }

    if (value == 2) {
      this.styles = [{
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }];
    }

    if (value == 3) {
      this.styles = [{
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }];
    }

    if (value == 4) {
      this.styles = [{
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }];
    }
  }

}

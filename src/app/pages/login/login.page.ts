import { Component, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ApiService } from 'src/app/services/api.service';
import { Router} from '@angular/router';
import { Globals } from "../../config/globals";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  dispositivoMatriculado: boolean = false;
  message = [];
  catalogos = [];
  parametros = [];

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private router: Router
  ) { 
    console.log('login constructor');
  }

  ngOnInit() {
    console.log('login onInit');
    this.message = [];
  }

  login() {
    if (!(this.username.length > 0 && this.password.length > 0))
      return;
    this.storageService.isDispositivoMatriculado().then(()=>{
      let username = this.username;
      let password = this.password;
      
      if ( ! this.storageService.dispositivoMatriculado ) {
        this.message.push('Dispositivo no registrado, se logeará al servidor.');
        this.loginServer(username, password);
      }
      else
        this.loginLocal(username, password);
    })
    
  }

  loginServer(username: string, password: string) {
    this.message.push('Autenticando en el servidor..........');
    this.apiService.login(this.username, this.password).subscribe(
      res => {
        if (res['response'] != Globals.RESPONSE_OK)
          this.message = res['message'];
        else {
          this.message.push('Login ok, se solicitarán datos de configuración al servidor');
          this.getConfig(username, password);
        }
      },
      err => {
        this.message.push(`Se produjo un error: ${err.message}`);
      }
    );
  }

  getConfig(username: string, password: string) {
    //obtener catalogo del server
    this.apiService.getCatalog(Globals.CATALOG_CONFIG).subscribe(result => {
      console.log('final', result);
      if (result['response'] = Globals.RESPONSE_OK) {
        console.log('put data');
        // grabar localmente datos de configuracion
        this.putConfig(username, password, result['data']);
      };
    },
      error => {
        console.log(error);
      });
  }

  putConfig(username: string, password: string, result: any) {
    // graba localmente datos recibidos de catalogos y parametros
    // result es un array que contiene 2 arrays: 'catalogos' de n items 
    // y 'parametros' de un item

    // adicionar 2 entradas al objeto resut['parametros']: 
    // 'login' : username y 'password' : password 
    result['parametros']['login'] = username;
    result['parametros']['password'] = password;    

    this.storageService.putCatalog(Globals.CATALOG_PARAMETROS, result['parametros']).then(() => {
      this.storageService.putCatalog(Globals.CATALOG_CATALOGOS, result['catalogos']).then(() => {
        this.message.push('Datos de cofiguración recibidos satisfactoriamente.');
        // obtener datos grabados localmente
        this.storageService.getCatalog(Globals.CATALOG_CATALOGOS).then(data => {
          console.log(data);
          this.catalogos = data;
        });
        this.storageService.getCatalog(Globals.CATALOG_PARAMETROS).then(data => {
          console.log(data);
          this.parametros = data;
        });
        // solicitar datos al server
        this.goGetCatalogsServer();
      })
    })
      .catch(error => {
        this.message.push(`Ocurrió un error al grabar configuración: ${error.message}`);
      });
  }

  goGetCatalogsServer() {
    this.message.push('Se solicitaran los catálogos al servidor.');
    this.message.push('Redireccionando a Solicitar catálogos..........');
    this.message = [];
    this.router.navigate([`/get-catalogs`]);
  }

  loginLocal(username, password) {
    this.message.push('Autenticando..........');
    this.storageService.getCatalog(Globals.CATALOG_PARAMETROS).then(data=>{
      let parametros = data;
      if ( parametros.login === username && parametros.password === password ) {
        this.message.push('Login Ok');
        this.verificarCatalogos();
      }
      else
        this.message.push('Login Error');
    })
    .catch(err=>{
      this.message.push(`Ocurrió un error: ${err.message}`);
    })
  }

  verificarCatalogos() {
    this.message.push('Verificando catálogos..........');
    this.storageService.isCatalogosCargados().then(()=>{
      if ( this.storageService.catalogosCargados ) {
        this.message.push('Catalogos cargados OK');
        this.goMenu();
      }
      else {
        this.message.push('Existen catálogos sin cargar.');
        this.goGetCatalogsServer();
      }
    });
    
  }


  goMenu() {
    this.message = [];
    this.router.navigate([`/menu`]);
  }
}

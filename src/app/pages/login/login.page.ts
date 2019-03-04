import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ApiService } from 'src/app/services/api.service';
import { Router} from '@angular/router';
import { Globals } from "../../config/globals";
import { Login } from '../../models/login';
import { TOParametros } from '../../models/to/TOparametros';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  username = '';
  password = '';
  message = [];

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private router: Router
  ) { 
  }
//----------------------------------------------------
  ngOnInit() {
    this.message = [];
    this.logged();
  }
//-----------------------------------------------------
  logged() {
    // si usuario está logeado => goMenu
    this.storageService.logged().then((isLogged)=>{
      if ( isLogged ) 
        this.goMenu();
    });
  }
//-----------------------------------------------------
  login() {
    // realiza el login local o al server 
    let username = this.username;
    let password = this.password; 
    let oLogin = new Login(username, password);
    if ( ! oLogin.validateData() )
      return;
    this.storageService.dispositivoMatriculado().then(isMatriculado=>{
      if ( !isMatriculado )
        this.loginServer(username, password);
      else
        this.loginLocal(username, password);
    })
    .catch(err=>{this.message.push(err.message)});
  }
//-----------------------------------------------------
  loginServer(username: string, password: string) {
    this.message.push('Dispositivo no registrado, se logeará al servidor.');
    this.message.push('Autenticando en el servidor. Un momento por favor...');
    this.apiService.login(username, password).subscribe(
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
//-----------------------------------------------------
  getConfig(username: string, password: string) {
    //obtener datos de configuracion  del server
    this.apiService.getCatalog(Globals.CATALOG_CONFIG).subscribe(result => {
      if (result['response'] == Globals.RESPONSE_OK) {
        // grabar localmente datos de configuracion
        this.putConfig(username, password, result['data']);
      };
    },
      error => {
        console.log(error);
      });
  }
//-----------------------------------------------------
  putConfig(username: string, password: string, result: any) {
    // graba localmente datos recibidos 
    // result es un array que contiene 2 arrays: 'catalogos' de n items 
    // y 'parametros' de un item

    // adicionar 2 entradas al objeto result['parametros']: 
    // 'login' : username y 'password' : password 
    result['parametros']['login'] = username;
    result['parametros']['password'] = password;  
    // marcar como logeado
    result['parametros']['isLogged'] = true;

    this.storageService.putCatalog(Globals.CATALOG_PARAMETROS, result['parametros']).then(() => {
      this.storageService.putCatalog(Globals.CATALOG_CATALOGOS, result['catalogos']).then(() => {
        this.message.push('Datos de cofiguración recibidos satisfactoriamente.');
        // obtener datos grabados localmente
        /*
        this.storageService.getCatalog(Globals.CATALOG_CATALOGOS).then(data => {
          this.catalogos = data;
        });
        this.storageService.getCatalog(Globals.CATALOG_PARAMETROS).then(data => {
          this.parametros = data;
        });
        */
        // solicitar catalogos al server
        this.goGetCatalogsServer();
      })
    })
      .catch(error => {
        this.message.push(`Ocurrió un error al grabar configuración: ${error.message}`);
      });
  }
//-----------------------------------------------------
  goGetCatalogsServer() {
    this.message.push('Se solicitaran los catálogos al servidor.');
    this.message.push('Redireccionando a Solicitar catálogos..........');
    this.message = [];
    this.router.navigate([`/get-catalogs`]);
  }
//-----------------------------------------------------
  loginLocal(username, password) {
    this.message.push('Autenticando..........');
    this.storageService.getCatalog(Globals.CATALOG_PARAMETROS).then(data=>{
      console.log(data);
      let oTOParametros = new TOParametros(data);
      let oLogin = new Login(username, password, oTOParametros);
      if ( ! oLogin.validLogin() ) 
        this.message.push(oLogin.getMessage());
      else {        
        this.message.push(oLogin.getMessage());
        // marcar como logeado
        oTOParametros.setIsLogged(true);
        this.storageService.putCatalog(Globals.CATALOG_PARAMETROS, oTOParametros).then(()=>{
          // verificar catalogos
          this.verificarCatalogos();
        })
      }
    })
    .catch(err=>{
      this.message.push(`Ocurrió un error: ${err.message}`);
    })
  }
//-----------------------------------------------------
  verificarCatalogos() {
    this.message.push('Verificando catálogos..........');
    this.storageService.catalogosCargados().then((isCatalogosCargados)=>{
      if ( isCatalogosCargados ) {
        this.message.push('Catalogos cargados OK');
        this.goMenu();
      }
      else {
        this.message.push('Existen catálogos sin cargar.');
        this.goGetCatalogsServer();
      }
    });
  }
//-----------------------------------------------------
  goMenu() {
    this.message = [];
    this.router.navigate([`/menu`]);
  }
 //----------------------------------------------------- 
}

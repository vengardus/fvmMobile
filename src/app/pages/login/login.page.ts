import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Globals } from "../../config/globals";
import { Login } from '../../models/login';
import { TOParametros } from '../../models/to/TOparametros';
import { ParametrosService } from 'src/app/services/parametros.service';
import { LoginService } from 'src/app/services/login.service';
import { ConfigService } from 'src/app/services/config.service';
import { TOConfig } from 'src/app/models/to/TOconfig';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  @ViewChild('txtUsername') txtUsernameRef;

  message = [];
  states = {
    stateInitialize:'stateInitialize',
    stateSolicitaLogin: 'stateSolicitaLogin',
    stateMenu: 'stateMenu',
    stateConfigSetup: 'stateConfigSetup',
    stateGetCatalogosServer : 'stateGetCatalogosServer'
  };
  state = this.states.stateInitialize;
  form = {
    txtUsername : '',
    txtPassword : '',
    chbRecordarPassword : false
  }
  oTOParametros:TOParametros=null;
  oTOConfig:TOConfig=null;

  constructor(
    private apiService: ApiService,
    private parametrosService: ParametrosService,
    private loginService: LoginService,
    private configService: ConfigService,
    private navController: NavController,
    private alertController: AlertController
  ) { 
  }
  //----------------------------------------------------
  ngOnInit() {
    console.log('onInit');
    this.actionInitialize();
  }

  ionViewWillEnter () {
    console.log('willenter');
  }

  ionViewDidEnter () {
    console.log('ionViewDidEnter ', this.oTOParametros)
  }
  //-----------------------------------------------------
  private actionInitialize() {
    this.loadConfig().then((ok)=>{
      if ( !ok )
        return;
      if ( this.logged() ) {
        this.configService.catalogosCargados().then((isCatalogosCargados)=>{
          if ( isCatalogosCargados ) {
            this.state = this.states.stateMenu;
            this.goMenuPage();
            return;
          }
        });
      }
      this.initData();
      this.state = this.states.stateSolicitaLogin;
    });
  }
  //------------------------------------------------------
  private loadConfig():Promise<boolean> {
    this.state = this.states.stateInitialize;
    this.message = [];
    return this.configService.getConfigSetup().then(oTOConfig=>{
      if ( oTOConfig != null ) 
        this.oTOConfig = oTOConfig;
      else {
        this.message.push('No se pudo crear archivo de configuración.');
        return false;
      }
      return this.parametrosService.getParametros().then(aTOParametros=>{
        if ( aTOParametros != null ) 
          this.oTOParametros = aTOParametros[0];
        return true;
      })
      .catch(error=>{
        this.message.push(error.message);
        return false;
      })
    })
    .catch(error=>{
      this.message.push(error.message);
      return false;
    })
  }
//-----------------------------------------------------
  private initData() {
    if (   this.oTOParametros != null ) {
      this.form.txtUsername = this.oTOParametros.getLogin();
      if ( !this.oTOParametros.getIsRecordarPassword() )
        this.form.txtPassword = ''; 
      else 
        this.form.txtPassword = this.oTOParametros.getPassword();
      this.form.chbRecordarPassword = this.oTOParametros.getIsRecordarPassword();
    }
    this.txtUsernameRef.setFocus();
  }
//------------------------------------------------------------
  logged():boolean {
    let ok = false;
    if ( this.loginService.logged(this.oTOParametros) ) {
      ok = true;
    }
    return ok;
  }
//-----------------------------------------------------
  dispositivoMatriculado():boolean {
    return (this.oTOParametros!=null)? true:false;
  }
//----------------------------------------------------
  actionLogin() {
    this.message=[];
    let username = this.form.txtUsername;
    let password = this.form.txtPassword;
    let oLogin = new Login(username, password);
    if ( ! oLogin.validateData() )
      return;
    // user = root : no usar en producción
    if ( oLogin.isUserRoot() ) {
      this.goConfigSetupPage();
      return;
    }
    // --------------------------------
    if ( ! this.dispositivoMatriculado() ) 
      this.loginServer(username, password);
    else {
      if ( this.loginService.logged(this.oTOParametros) )
        this.verificarCatalogos();
      else
        this.loginLocal(username, password);
    }
  }
//-----------------------------------------------------
  loginServer(username: string, password: string) {
    this.message.push('Dispositivo no registrado, se logeará al servidor.');
    this.message.push('Autenticando en el servidor. Un momento por favor...');
    this.apiService.setIpServer(this.oTOConfig);
    this.apiService.login(username, password).subscribe(
      res => {
        if (res['response'] != Globals.RESPONSE_OK) {
          this.message = [];
          this.message.push(res['message']);
          this.loginError(res['message']);
        }
        else {
          this.message.push('Login ok, se solicitarán datos de configuración al servidor');
          this.getConfig(username, password);
        }
      },
      err => {
        this.message = [];
        this.message.push(`Se produjo un error: ${err.message}`);
        this.loginError(err.message);
      }
    );
  }
//-----------------------------------------------------
  getConfig(username: string, password: string) {
    //obtener datos de configuracion  del server
    this.apiService.getCatalog(Globals.CATALOG_CONFIG).subscribe(result => {
      if (result['response'] == Globals.RESPONSE_OK) 
        this.setConfig(username, password, result['data']);
    },
      error => {
        console.log(error);
      });
  }
//-----------------------------------------------------
  setConfig(username: string, password: string, result: any) { 
    // graba localmente datos recibidos 
    // result es un array que contiene 2 arrays: 'catalogos' de n items 
    // y 'parametros' de un item
    console.log(result);
    this.configService.setConfig(username, password, this.form.chbRecordarPassword, result).then(ok=>{
      if ( ok ) {
        this.message.push('Datos de cofiguración recibidos satisfactoriamente.');
        // solicitar catalogos al server
        this.goGetCatalogsPage();
      }
      else 
        this.message.push(this.configService.getMessage());
    });
  }
//-----------------------------------------------------
  goGetCatalogsPage() {
    this.message.push('Se solicitaran los catálogos al servidor.');
    this.message.push('Redireccionando a Solicitar catálogos..........');
    this.message = [];
    //this.router.navigate([`/get-catalogs`]);
    this.state = this.states.stateGetCatalogosServer;
    this.navController.navigateRoot(`/get-catalogs`);
  }
//-----------------------------------------------------
  loginLocal(username, password) {
    this.message.push('Autenticando..........');
    let oLogin = new Login(username, password, this.oTOParametros);
    if ( ! oLogin.validLogin() ) {
      this.message.push(oLogin.getMessage());
      this.loginError(oLogin.getMessage());
    }
    else {        
      // actualizar parametros : marcar como logeado y si recuerda password
      this.oTOParametros.setIsLogged(true);
      this.oTOParametros.setIsRecordarPassword(this.form.chbRecordarPassword);
      console.log('otoparm', this.oTOParametros);
      this.parametrosService.setParametros(this.oTOParametros).then(()=>{
          this.verificarCatalogos();
      })
      .catch(()=>{
        this.message.push(this.parametrosService.getMessage());
      })
    }
  }
//-----------------------------------------------------
  verificarCatalogos() {
    this.message.push('Verificando catálogos..........');
    this.configService.catalogosCargados().then((isCatalogosCargados)=>{
      if ( isCatalogosCargados ) {
        this.message.push('Catalogos cargados OK');
        this.goMenuPage();
      }
      else {
        this.message.push('Existen catálogos sin cargar.');
        this.goGetCatalogsPage();
      }
    });
  }
//-----------------------------------------------------
  goMenuPage() {
    this.message = [];
    //this.router.navigate([`/menu`]);
    this.state = this.states.stateMenu;
    this.navController.navigateRoot([`/menu`]);
  }
 //----------------------------------------------------- 
  goConfigSetupPage() {
    this.message = [];
    this.state = this.states.stateConfigSetup;
    //this.router.navigate([`/config-setup`]);
    this.navController.navigateRoot([`/config-setup`]);

  }
  //----------------------------------------------------------------
  async loginError(message:string) {
    const alert = await this.alertController.create({
      header: 'Ocurrió un error!',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  //----------------------------------------------------------------
}

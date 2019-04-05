import { Component, OnInit } from '@angular/core';
import { iRadioButton } from 'src/app/class/radioButtons';
import { ConfigService } from 'src/app/services/config.service';
import { TOConfig } from 'src/app/models/to/TOconfig';
import { Globals } from 'src/app/config/globals';
import { ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-config-setup',
  templateUrl: './config-setup.page.html',
  styleUrls: ['./config-setup.page.scss'],
})

export class ConfigSetupPage implements OnInit {
  @ViewChild('txtIp') txtIpRef;

  rbServer : iRadioButton[] = [
    { label:'Local Server', value:Globals.MODO_LOCAL },
    { label:'Hosting Server', value:Globals.MODO_HOSTING }
  ];
  form : any = {
    txtIp : '',
    chbInitialize : false,
    rbServer : this.rbServer,
    rbServer_selected : '',
    isEditIp : false
  };
  oTOConfig : TOConfig = null;
  messages : string[] = [];
  configOk: boolean=false;

  constructor(
    private configService:ConfigService,
    private navController:NavController
  ) { }

  ngOnInit() {
    this.loadConfig();
  }

  loadConfig() {
    this.messages.push('Cargando configuración');
    this.configOk = false;
    this.configService.getConfigSetup().then(data=>{
      this.oTOConfig = data;
      if ( this.oTOConfig != null ) 
        this.initValues();
      else 
        this.messages.push(this.configService.getMessage());      
    });
    
  }

  initValues() {
    console.log('init', this.oTOConfig);
    if ( this.oTOConfig.getIsHostingServer() ) {
      this.form.rbServer_selected = Globals.MODO_HOSTING;
      this.form.txtIp = this.oTOConfig.getIpHostingServer();
    }
    else {
      this.form.rbServer_selected = Globals.MODO_LOCAL;
      this.form.txtIp = this.oTOConfig.getIpLocalServer();
    }
    if ( this.oTOConfig.getIpServer_edit().trim().length>0)
      this.form.txtIp = this.oTOConfig.getIpServer_edit();
    this.form.chbInitialize = false;
    
    this.messages = [];
    this.configOk = true;
  }

  rbServer_change() {
    if ( this.form.rbServer_selected == Globals.MODO_HOSTING ) 
      this.form.txtIp = this.oTOConfig.getIpHostingServer();
    else 
      this.form.txtIp = this.oTOConfig.getIpLocalServer();
  }

  actionEditIp() {
    this.form.isEditIp = true;
    this.form.txtIp = '';
    this.txtIpRef.nativeElement.focus();
  }

  actionRestoreIp() {
    this.form.isEditIp = false;
    this.form.txtIp = '';
    this.rbServer_change();
  }

  actionSaveConfig() {
    if ( this.form.txtIp != '') 
      this.oTOConfig.setIpServer_edit(this.form.txtIp);
    if ( this.form.rbServer_selected == Globals.MODO_HOSTING )
      this.oTOConfig.setIsHostingServer(true);
    else
      this.oTOConfig.setIsHostingServer(false);
    this.oTOConfig.setInitializeAction(this.form.chbInitialize);
    this.configService.saveConfigSetup(this.oTOConfig).then((ok)=>{
      console.log(ok);
      if ( ok )
        this.goLoginPage();
    })
    .catch(()=>{
      this.messages.push(this.configService.getMessage());
    })
  }

  actionCancelar() {
    console.log('cancelarr');
    this.goLoginPage();
  }

  goLoginPage() {
    //this.router.navigate([`/login`]);
    this.navController.navigateRoot([`/login`]);
  }

}

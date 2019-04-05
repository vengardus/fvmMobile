import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { TOConfig } from '../models/to/TOconfig';
import { Config } from 'src/app/models/config';
import { Storage } from '@ionic/storage';
import { TOParametros } from '../models/to/TOparametros';
import { Catalogos } from '../models/catalogos';
import { TOCatalogos } from '../models/to/TOcatalogos';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private message:string='';

  constructor(
    private storage:Storage
  ) { }

  getConfigSetup():Promise<TOConfig> {
    console.log('getconfig');
    return this.storage.get(Globals.CATALOG_CONFIG_SETUP).then(data=>{
      console.log('data', data);
      if ( data != null ) {
        data = JSON.parse(data);
        var oConfig:Config = new Config(data);
        oConfig.getAll();
        return oConfig.getATOConfig()[0];
      }
      else {
        return this.creaConfigSetup().then(aTOConfig=>{
          if ( aTOConfig != null )
            return aTOConfig[0];
          else
            return null;
       })
      }
    })
    .catch(()=>{
      this.message = 'Error al recuperar registro de configuración';
    })
  }

  getMessage():string {
    return this.message;
  }

  creaConfigSetup():Promise<boolean> {
    let oTOConfig = new TOConfig();
    oTOConfig.setIpHostingServer(Globals.HOSTING_SERVER);
    oTOConfig.setIpLocalServer(Globals.LOCAL_SERVER);
    if ( Globals.MODO_SERVER == Globals.MODO_HOSTING)
      oTOConfig.setIsHostingServer(true);
    else
      oTOConfig.setIsHostingServer(false);
    oTOConfig.setInitializeAction(false);
    oTOConfig.setIpServer_edit('');
    oTOConfig.setPassword(Globals.PASSWORD_ROOT);
    oTOConfig.setUsername(Globals.USER_ROOT);
    let oConfig = new Config();
    oConfig.addTO(oTOConfig);
    console.log('crea configsetup');
    return this.storage.set(Globals.CATALOG_CONFIG_SETUP, JSON.stringify(oConfig.getATOConfig())).then(()=>{
      return oConfig.getATOConfig();
    })
    .catch(err => {
      this.message = 'Error al crear registro de configuración. ' + err.message;
      return null
    });
  }

  saveConfigSetup(oTOConfig:TOConfig):Promise<boolean> {
    let aTOConfig:TOConfig[]=[];
    aTOConfig.push(oTOConfig);
    return this.storage.set(Globals.CATALOG_CONFIG_SETUP, JSON.stringify(aTOConfig)).then(()=>{
      if ( oTOConfig.getInitializeAction() )
        return this.initializeDispositivo();
      else
        return true;
    })
    .catch((err)=>{
      this.message = 'Ocurrió un error, no se pudieron guardar los cambios. ' + err.message;
      return false;
    });
  }

  private async initializeDispositivo():Promise<boolean> {
    await this.storage.remove(Globals.CATALOG_PARAMETROS)
    await this.storage.remove(Globals.CATALOG_CATALOGOS)
    await this.storage.remove(Globals.CATALOG_PEDIDO_CABECERA);
    await this.storage.remove(Globals.CATALOG_PEDIDO_DETALLE);
    await this.storage.remove(Globals.CATALOG_SESSION);
    return true;
  }

  /*-----------------------------------------------------------------
    Logica para archivos de configuracion al matricular dispositivo
    => parametros y catalogos
  ------------------------------------------------------------------*/
  setConfig(username: string, password: string, isRecordarPassword:boolean, result: any):Promise<boolean> {
    // graba localmente datos recibidos 
    // result es un array que contiene 2 arrays: 'catalogos' de n items 
    // y 'parametros' de un item

    // adicionar propiedades al objeto result['parametros']: 
    // (no son enviadas desde el server)
    // 'login' : username 
    // 'password' : password 
    // 'isRecordarPassword' : false
    // 'isLogged : true
    result['parametros']['login'] = username;
    result['parametros']['password'] = password;  
    result['parametros']['isRecordarPassword'] = isRecordarPassword;  
    result['parametros']['isLogged'] = true;
    //-----------------------------------------------------
    // grabar parametros como una array
    let oTOParametros = new TOParametros(result['parametros']);
    let aTOParametros:TOParametros[]=[];
    aTOParametros.push(oTOParametros);
    //---------------------------------
    return this.storage.set(Globals.CATALOG_PARAMETROS, JSON.stringify(aTOParametros)).then(() => {
      return this.storage.set(Globals.CATALOG_CATALOGOS, JSON.stringify(result['catalogos'])).then(() => {
        this.message = 'Datos de cofiguración recibidos satisfactoriamente.';
        return true;
      })
      .catch(error => {
        this.message = `Ocurrió un error al grabar configuración: ${error.message}`;
        return false;
      });
    })
    .catch(error => {
      this.message = `Ocurrió un error al grabar configuración: ${error.message}`;
      return false;
    });
  }
  //-------------------------------------------------------------------
  catalogosCargados():Promise<boolean> {
    let isCatalogosCargados = false;
    return this.storage.get(Globals.CATALOG_CATALOGOS).then(data=>{
      if ( ! data )  
        return isCatalogosCargados;
      data = JSON.parse(data);
      let oCatalogos = new Catalogos(data);
      oCatalogos.getAll();
      let aTOCatalogos:TOCatalogos[] = oCatalogos.getATOCatalogos();
      for ( let index in aTOCatalogos) {
        if ( aTOCatalogos[index].getObligatorio() ) {
          if (  aTOCatalogos[index].getRecv() == 2
              && aTOCatalogos[index].getSaved() == 1
           )
            isCatalogosCargados = true;
          else  {
            isCatalogosCargados = false;
            break;
          }
          console.log(aTOCatalogos[index].getNombre(), isCatalogosCargados);
        }
      }
    
      return isCatalogosCargados;
    })

  }

}

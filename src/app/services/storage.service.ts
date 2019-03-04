import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Globals } from "../config/globals";
import { TOClientes } from '../models/to/TOclientes';
import { Clientes } from "../models/clientes";
import { TOParametros } from '../models/to/TOparametros';
import { Catalogos } from '../models/catalogos';
import { TOCatalogos } from '../models/to/TOcatalogos';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(
      private storage:Storage
  ) { }

//-----------------------------------------------------
  getCatalog(catalog:string):Promise<any> {
    return this.storage.get(catalog).then(data=>{
      return JSON.parse(data);
    });
  }
//-----------------------------------------------------
  putCatalog(catalog:string, items:any):Promise<any> {
    return this.storage.set(catalog, JSON.stringify(items));
  }
//-----------------------------------------------------
  logged():Promise<boolean> {
    let isLogged = false;
    return this.getCatalog(Globals.CATALOG_PARAMETROS).then(data=>{
      if ( data) {
        let oTOParametros = new TOParametros(data);
        if ( oTOParametros.getIsLogged() )
          isLogged = true;
      } 
      return isLogged;
    })
  }
//-----------------------------------------------------
  salirSesion():Promise<boolean> {
    return this.getCatalog(Globals.CATALOG_PARAMETROS).then(data=>{
      let oTOParametros = new TOParametros(data);
      oTOParametros.setIsLogged(false);
      console.log('llama a put', oTOParametros);
      return this.putCatalog(Globals.CATALOG_PARAMETROS, oTOParametros).then(()=>{
        console.log('put ok');
        return true;
      })
    })
  }
//-----------------------------------------------------
  dispositivoMatriculado():Promise<boolean> {
    return this.getCatalog(Globals.CATALOG_PARAMETROS).then(data=>{
      let ok = false;
      if ( data != null )
        ok = true;
      return ok;
    })
  }
//-----------------------------------------------------
  catalogosCargados():Promise<boolean> {
    let isCatalogosCargados = false;
    return this.getCatalog(Globals.CATALOG_CATALOGOS).then(data=>{
      if ( ! data )  
        return isCatalogosCargados;

      let oCatalogos = new Catalogos();
      oCatalogos.addCatalogos(data);
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
    /*
      let catalogos = data;
      for ( let index in catalogos) {
        if ( catalogos[index]['obligatorio'] ) {
          if (  catalogos[index]['recv'] == 2
              && catalogos[index]['saved'] == 1
           )
            isCatalogosCargados = true;
          else  {
            isCatalogosCargados = false;
            break;
          }
          console.log(catalogos[index]['nombre'], isCatalogosCargados);
        }
      }
    */
      return isCatalogosCargados;
    })
  }
//-----------------------------------------------------
/*  
getClientes():Promise<TOClientes[]> {
    return this.getCatalog(Globals.CATALOG_CLIENTES).then(data=>{
      let clientes = data;
      let oClientes = new Clientes();
      oClientes.addClientes(clientes);
      return oClientes.getATOClientes();
    })
  }
*/
//-----------------------------------------------------

}

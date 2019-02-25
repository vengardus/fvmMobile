import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Globals } from "../config/globals";
import { Clientes, TOClientes } from "../models/clientes";
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  dispositivoMatriculado:boolean=false;
  catalogosCargados:boolean=false;

  constructor(
      private storage:Storage
  ) { }


  getCatalog(catalog:string):Promise<any> {
    return this.storage.get(catalog).then(data=>{
      return JSON.parse(data);
    });
  }

  putCatalog(catalog:string, items:any) {
    return this.storage.set(catalog, JSON.stringify(items));
  }

  isDispositivoMatriculado() {
    this.dispositivoMatriculado = false;
    return this.getCatalog(Globals.CATALOG_PARAMETROS).then(data=>{
      //console.log('data', data);
      let ok = false;
      if ( data != null )
        this.dispositivoMatriculado = true;
      return data;
    })
  }

  isCatalogosCargados() {
    this.catalogosCargados = false;
    return this.getCatalog(Globals.CATALOG_CATALOGOS).then(data=>{
      let catalogos = data;
      let ok = false;
      for ( let index in catalogos) {
        if ( catalogos[index]['obligatorio'] ) {
          if (  catalogos[index]['recv'] == 2
              && catalogos[index]['saved'] == 1
           )
            this.catalogosCargados = true;
          else  {
            this.catalogosCargados = false;
            break;
          }
          console.log(catalogos[index]['nombre'], this.catalogosCargados);
        }
      }
    })
  }

  // 
  getClientes():Promise<TOClientes[]> {
    return this.getCatalog(Globals.CATALOG_CLIENTES).then(data=>{
      let clientes = data;
      let oClientes = new Clientes();
      oClientes.addClientes(clientes);
      return oClientes.getATOClientes();
    })
  }

}

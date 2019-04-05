import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Globals } from '../config/globals';
import { Parametros } from '../models/parametros';
import { TOParametros } from '../models/to/TOparametros';
import { iSession } from '../models/session';
import { Ttablas } from '../models/ttablas';
import { TOClientes } from '../models/to/TOclientes';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  message:string='';

  constructor(
    private storage:Storage
  ) { }

  getMessage():string {
    return this.message;
  }

  getParametros():Promise<TOParametros[]> {
    return this.storage.get(Globals.CATALOG_PARAMETROS).then(data=>{
      if ( data == null ) {
        this.message = '';
        return null;
      }
      data = JSON.parse(data);
      let oParametros = new Parametros(data);
      oParametros.getAll();
      return  oParametros.getATOParametros();
    })
    .catch((err)=>{
      this.message = `Ocurrió un error: ${err.message}`;
      return null;
    })
  }

  setParametros(oTOParametros:TOParametros):Promise<boolean> {
    let aTOParametros:TOParametros[]=[];
    aTOParametros.push(oTOParametros);
    console.log('set', aTOParametros);
    return this.storage.set(Globals.CATALOG_PARAMETROS, JSON.stringify(aTOParametros)).then(()=>{
      return true;
    })
    .catch((err)=>{
      this.message = `Ocurrió un error: ${err.message}`
      return false;
    })
  }

  //-----------------------------------
  // session
  //------------------------------------------------
  getSession():Promise<iSession> {
    return this.storage.get(Globals.CATALOG_SESSION).then(data=>{
      if ( data == null ) {
        this.message = '';
        return null;
      }
      data = JSON.parse(data);
      let session:iSession = data;
      return  session;
    })
    .catch((err)=>{
      this.message = `Ocurrió un error: ${err.message}`;
      return null;
    })
  }

  setSession(session:iSession):Promise<boolean> {
    return this.storage.set(Globals.CATALOG_SESSION, JSON.stringify(session)).then(()=>{
      return true;
    })
    .catch((err)=>{
      this.message = `Ocurrió un error: ${err.message}`
      return false;
    })
  }

  updateSession(oTOParametros:TOParametros, oTOClientes:TOClientes):Promise<boolean> {
    return this.getSession().then(session=>{
      if ( ! session ) {
        this.message = 'Session vacia';
        return false;
      }
      console.log('fill sesion') ;
      //session.isRuta = //queda igual
      session.oTOClientes = oTOClientes;
      session.oTOParametros = oTOParametros;
      session.oTOPedidoCabecera = null;
      return this.setSession(session).then(ok=>{
        if ( ! ok )
          this.message = 'Error en session';
        console.log('ok session');
        return ok;
      });
    })
  }

  //------------------------------------------------------
  // Ttablas
  //------------------------------------------------------
  getTtablas():Promise<Ttablas> {
    return this.storage.get(Globals.CATALOG_TTABLAS).then(data=>{
      if ( data == null ) {
        this.message = '';
        return null;
      }
      data = JSON.parse(data);
      let oTtablas = new Ttablas(data);
      oTtablas.getAll();
      return  oTtablas;
    })
    .catch((err)=>{
      this.message = `Ocurrió un error: ${err.message}`;
      return null;
    })
  }
}

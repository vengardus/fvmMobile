import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Globals } from '../config/globals';
import { TOParametros } from '../models/to/TOparametros';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private storage:Storage
  ) { }

  logged(oTOParametros:TOParametros):boolean {
    let isLogged = false;
    if ( oTOParametros != null ) 
      if ( oTOParametros.getIsLogged() )
        isLogged = true;
    return isLogged;
  }
//-----------------------------------------------------
  dispositivoMatriculado():Promise<boolean> {
    return this.storage.get(Globals.CATALOG_PARAMETROS).then(data=>{
      let ok = false;
      if ( data != null )
        ok = true;
      return ok;
    })
  }

}

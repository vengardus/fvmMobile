import { Injectable } from '@angular/core';
import { Clientes } from '../models/clientes';
import { Storage } from '@ionic/storage';
import { Globals } from '../config/globals';
import { TOClientes } from '../models/to/TOclientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private message:string;
  constructor(private storage:Storage) { }

  getMessage() {
    return this.message;
  }

  getClientes(isRuta?:string, parametros_diaRuta?:string):Promise<Clientes> {
    return this.storage.get(Globals.CATALOG_CLIENTES).then(data=>{
      if ( data == null ) {
        this.message = '';
        return null;
      }
      data = JSON.parse(data);
      let oClientes = new Clientes(data);
      oClientes.getAll();
      if ( isRuta!=null && parametros_diaRuta!=null) 
        oClientes.filterByDiaRuta(isRuta, parametros_diaRuta);
      return  oClientes;
    })
    .catch((err)=>{
      this.message = `Ocurrió un error: ${err.message}`;
      return null;
    })
  }

  updateCliente(oTOClientes:TOClientes):Promise<boolean> {
    return this.storage.get(Globals.CATALOG_CLIENTES).then(data=>{
      let oClientes = (!data)? new Clientes() : new Clientes(JSON.parse(data));
      oClientes.update(oTOClientes);
      return this.storage.set(Globals.CATALOG_CLIENTES, JSON.stringify(oClientes.getATOClientes())).then(()=> {
        return true;  
      })
      .catch(err=>{
        this.message = err.message;
        return false;
      })
    })
  }
}

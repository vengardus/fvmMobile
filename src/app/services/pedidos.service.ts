import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ArticulosItems } from '../models/articulosItems';
import { Globals } from '../config/globals';
import { TOPedidoCabecera } from '../models/to/TOpedidoCabecera';
import { TOPedidoDetalle } from '../models/to/TOpedidoDetalle';
import { PedidoCabecera } from '../models/pedidoCabecera';
import { PedidoDetalle } from '../models/pedidoDetalle';
import { TOClientes } from '../models/to/TOclientes';
import { TOParametros } from '../models/to/TOparametros';
import { Clientes } from '../models/clientes';
import { ClientesService } from './clientes.service';
import { ParametrosService } from './parametros.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private message:string;

  constructor(
    private storage:Storage,
    private clientesService:ClientesService,
    private parametrosService:ParametrosService
  ) { }

  getMessage():string {
    return this.message;
  }

  getArticulosItems():Promise<ArticulosItems> {
    return this.storage.get(Globals.CATALOG_ARTICULOS).then(data=>{
      if ( data == null ) {
        this.message = 'No se encontraron artículo.';
        return null;
      }
      data = JSON.parse(data);
      let oArticulosItems = new ArticulosItems();
      oArticulosItems.getAllArticulos(data)
      return oArticulosItems;
    })
    .catch((err)=>{
      this.message = `Ocurrió un error: ${err.message}`;
      return null;
    })
  }

  async getPedidos():Promise<TOPedidoCabecera[]> {
    try {
      let data = await this.storage.get(Globals.CATALOG_PEDIDO_CABECERA);
      if (data == null) {
        this.message = 'No se encontraron pedidos.';
        return null;
      }
      data = JSON.parse(data);
      let oPedidoCabecera = new PedidoCabecera(data);
      return oPedidoCabecera.getATOPedidoCabecera();
    }
    catch (err) {
      this.message = `Ocurrió un error: ${err.message}`;
      return null;
    }
  }

  async getPedidosDetalle():Promise<TOPedidoDetalle[]> {
    try {
      let data = await this.storage.get(Globals.CATALOG_PEDIDO_DETALLE);
      if (data == null) {
        this.message = 'No se encontraron pedidos.';
        return null;
      }
      data = JSON.parse(data);
      let oPedidoDetalle = new PedidoDetalle(data);
      return oPedidoDetalle.getATOPedidoDetalle();
    }
    catch (err) {
      this.message = `Ocurrió un error: ${err.message}`;
      return null;
    }
  }

  async setPedidos(aTOPedidoCabecera:TOPedidoCabecera[]):Promise<boolean> {
    try {
      await this.storage.set(Globals.CATALOG_PEDIDO_CABECERA, JSON.stringify(aTOPedidoCabecera));
      return true;
    }
    catch (e) {
      return false;
    }

  }

  // Logica Pedidos
  savePedido( oTOPedidoCabecera:TOPedidoCabecera, 
              aTOPedidoDetalle:TOPedidoDetalle[]):Promise<boolean> {
    return this.storage.get(Globals.CATALOG_PEDIDO_CABECERA).then(data=>{
      let aTOPedidoCabecera = this.setPedidoCabecera(data, oTOPedidoCabecera);
      console.log('save pedcab', aTOPedidoCabecera);
      return this.storage.set(Globals.CATALOG_PEDIDO_CABECERA, 
                          JSON.stringify(aTOPedidoCabecera))
      .then(()=>{
        return this.storage.get(Globals.CATALOG_PEDIDO_DETALLE).then(data=>{
          let aTOPedidoDetalleFinal = this.setPedidoDetalle(data, aTOPedidoDetalle);
          console.log('save detped', aTOPedidoDetalleFinal);
          return this.storage.set(Globals.CATALOG_PEDIDO_DETALLE, JSON.stringify(aTOPedidoDetalleFinal)).then(()=>{
            return true;
          })
          .catch(err=>{
            this.message = err.message;
            return false;
          })
        })
      })
      .catch(err=>{
        this.message = err.message;
        return false;
      });
    })
    .catch(err=>{
      this.message = err.message;
      return false;
    })
  }

  private setPedidoCabecera(data:any, oTOPedidoCabecera:TOPedidoCabecera):TOPedidoCabecera[] {
    let oPedidoCabecera : PedidoCabecera;
    oPedidoCabecera = ( ! data )? new PedidoCabecera() 
                                 : new PedidoCabecera(JSON.parse(data));
    oPedidoCabecera.insert(oTOPedidoCabecera);
    return oPedidoCabecera.getATOPedidoCabecera();
  }

  private setPedidoDetalle(data:any, aTOPedidoDetalle:TOPedidoDetalle[]):TOPedidoDetalle[] {
    let oPedidoDetalle : PedidoDetalle;
      oPedidoDetalle = (!data)? new PedidoDetalle() 
                              : new PedidoDetalle(JSON.parse(data));
      for ( let item of aTOPedidoDetalle ) {
        oPedidoDetalle.insert(item);
      }
      return oPedidoDetalle.getATOPedidoDetalle();
  }

  postSavePedido(oTOPedidocabecera:TOPedidoCabecera, oTOClientes:TOClientes, oTOParametros:TOParametros):Promise<boolean> {
    // actualizar clientes : estadoAtecion, CreditoDisponnible
    oTOClientes.setEstadoAtencion(Globals.ESTADO_CLIENTE.ATENDIDO);
    if ( oTOPedidocabecera.getFormasPago_id() != Globals.FORMA_PAGO_EFECTIVO ) {
      oTOClientes.setCreditoDisponible(oTOClientes.getCreditoDisponible()-oTOPedidocabecera.getTotalVenta());
    }
    console.log('Upd cli', oTOClientes);
    return this.clientesService.updateCliente(oTOClientes).then(ok=>{
      if ( !ok ) {
        this.message = this.clientesService.getMessage();
        return false;
      }
      // actualizar parmetros : correlativoPedido
      oTOParametros.setCorrelativoPedido(oTOParametros.getCorrelativoPedido()+1);
      return this.parametrosService.setParametros(oTOParametros).then(ok=>{
        if ( !ok ) {
          this.message = this.parametrosService.getMessage();
          return false;
        }
        console.log('parm upd');
        // actualizar session
        return this.parametrosService.updateSession(oTOParametros, oTOClientes).then(ok=>{
          if ( !ok ) {
            this.message = this.parametrosService.getMessage();
            return false;
          }
          console.log('SESSION UPD')
          return true;
        })
      })
    })
  }
}

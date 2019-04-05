import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { TOPedidoCabecera } from 'src/app/models/to/TOpedidoCabecera';
import { NavController } from '@ionic/angular';
import { TOClientes } from 'src/app/models/to/TOclientes';
import { ParametrosService } from 'src/app/services/parametros.service';
import { ApiService } from 'src/app/services/api.service';
import { Globals } from 'src/app/config/globals';
import { ConfigService } from 'src/app/services/config.service';
import { TOConfig } from 'src/app/models/to/TOconfig';
import { TOPedidoDetalle } from 'src/app/models/to/TOpedidoDetalle';
import { PedidoDetalle } from 'src/app/models/pedidoDetalle';
import { PedidoCabecera } from 'src/app/models/pedidoCabecera';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  

  pedidos:TOPedidoCabecera[]=[];
  aTOPedidoCabecera:TOPedidoCabecera[]=[];
  aTOPedidoDetalle:TOPedidoDetalle[]=[];
  oTOClientes:TOClientes=null;
  oTOConfig:TOConfig=null;
  messages2:string[]=[];
  ESTADO_PEDIDO_ENVIADO = Globals.ESTADO_PEDIDO_ENVIO.ENVIADO;

  constructor(
    private pedidosService:PedidosService,
    private navController:NavController,
    private parametrosService:ParametrosService,
    private apiService:ApiService,
    private configService:ConfigService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter () {
    this.loadSession().then(ok=>{
      if ( ok )
        this.loadPedidos();
      this.loadConfig();
    })
    this.messages2 = [];
  }

  ionViewDidEnter () {
    console.log('pedidos.ionViewDidEnter ')
  }

  loadSession():Promise<boolean> {
    return this.parametrosService.getSession().then(session=>{
      if ( ! session ) {
        this.messages2.push('Sesion no contiene datos');
        return false;
      }
      console.log('cliente', this.oTOClientes);
      this.oTOClientes = new TOClientes(session.oTOClientes);
      return true;
    })
    .catch(err=>{this.messages2.push('error'); return false;})
  }

  async loadPedidos() {
    this.aTOPedidoCabecera = await this.pedidosService.getPedidos();
    console.log('load pedidos', this.aTOPedidoCabecera, this.oTOClientes.getId());
    this.pedidos = [];
    if ( this.aTOPedidoCabecera ) {
      let oPedidoCabecera = new PedidoCabecera();
      oPedidoCabecera.setATOPedidoCabecera(this.aTOPedidoCabecera);
      this.pedidos = oPedidoCabecera.filterByCliente(this.oTOClientes.getId());
      this.aTOPedidoDetalle = await this.pedidosService.getPedidosDetalle();
      console.log('pedidos', this.pedidos);
      console.log('detalles', this.aTOPedidoDetalle);
    }
    if ( ! this.pedidos.length )
      this.actionNuevoPedido();
  }

  actionCancelar() {
    this.navController.navigateForward('/clientes-info');
  }

  actionNuevoPedido() {
    this.navController.navigateForward('/pedido-cabecera');
  }

  actionCloseMessage(index:number) {
    this.messages2.splice(index, 1);
  }

  async actionSendPedidos() {
    //this.messages2.push('Verificando pedidos pendientes de envío...');
    for ( let index in this.pedidos) {
      if ( this.pedidos[index].getEstadoEnviado() != Globals.ESTADO_PEDIDO_ENVIO.PENDIENTE)
        continue;
      let pedido = this.pedidos[index] ;
      let oPedidoDetalle = new PedidoDetalle();
      oPedidoDetalle.setATOPedidoDetalle(this.aTOPedidoDetalle);
      let detalles = oPedidoDetalle.filterByPedido(pedido.getId());
      let dataPedido = {
        cabecera : pedido,
        detalle : detalles
      }
      console.log('datasend', dataPedido);
      this.apiService.setIpServer(this.oTOConfig);
      this.messages2.push(`Enviando pedido ${pedido.getId()}`);
      let res = await this.apiService.sendPedido(dataPedido);
      console.log('salio', res);
      if ( res == null ) {
        this.messages2.push(this.apiService.message);
        console.log(this.messages2);
      }
      else {
        if (res['response'] == Globals.RESPONSE_OK) {
          this.messages2.push('Pedido enviado satisfactoriamente.');
          this.pedidos[index].setEstadoEnviado(Globals.ESTADO_PEDIDO_ENVIO.ENVIADO);
          let oPedidoCabecera = new PedidoCabecera();
          oPedidoCabecera.setATOPedidoCabecera(this.aTOPedidoCabecera);
          oPedidoCabecera.update(this.pedidos[index]);
          if ( await this.pedidosService.setPedidos(oPedidoCabecera.getATOPedidoCabecera()) )
            this.messages2 = [];
          else
            this.messages2.push('Ocurrió un error al marcar pedido como enviado.');
        }
        else 
          this.messages2.push(`Error: ${res['message']}`);
      }
    }
  }

  actionVerPedidos() {
    console.log(this.pedidos);
  }

  private loadConfig():Promise<boolean> {
   
    return this.configService.getConfigSetup().then(oTOConfig=>{
      if ( oTOConfig != null ) 
        this.oTOConfig = oTOConfig;
      else {
        return false;
      }
    })
  }

}

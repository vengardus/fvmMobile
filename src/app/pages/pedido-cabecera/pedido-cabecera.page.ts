import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Ttablas } from 'src/app/models/ttablas';
import { ParametrosService } from 'src/app/services/parametros.service';
import { Globals } from 'src/app/config/globals';
import { Pedidos } from 'src/app/models/pedidos';
import { iSession } from 'src/app/models/session';
import { TOClientes } from 'src/app/models/to/TOclientes';

@Component({
  selector: 'app-pedido-cabecera',
  templateUrl: './pedido-cabecera.page.html',
  styleUrls: ['./pedido-cabecera.page.scss'],
})

export class PedidoCabeceraPage implements OnInit {
  
  form = {
    selectFormasPago_id:'',
    selectFormasPagoOptions:[], //this.selectFormasPagoOptions
    selectMonedas_id:'',
    selectMonedasOptions:[],
    selectDireccionDespacho_id:'',
    selectDireccionDespachoOptions:[]
  }
  oTtablas:Ttablas=null;
  oTOClientes:TOClientes=null;
  session:iSession=null;
  messages:string[];
  
  constructor(
      private nav:NavController,
      private parametrosService:ParametrosService
    ) { }

  ngOnInit() {
    this.actionInit();
  }

  actionInit() {
    // carga parametros
    this.parametrosService.getTtablas().then(oTtablas=>{
      if ( oTtablas == null )
        return;
      this.oTtablas = oTtablas;
      //carga select FormaPago
      this.form.selectFormasPagoOptions = this.oTtablas.getTabla(Globals.CODTABLA_FORMAS_PAGO);
      if ( this.form.selectFormasPagoOptions.length )
        this.form.selectFormasPago_id = this.form.selectFormasPagoOptions[0].id;
      //carga select Monedas
      this.form.selectMonedasOptions = this.oTtablas.getTabla(Globals.CODTABLA_MONEDAS);
      if ( this.form.selectMonedasOptions.length )
        this.form.selectMonedas_id = this.form.selectMonedasOptions[0].id;
    });
  }

  ionViewWillEnter () {
    console.log('willenter');
    // carga session
    this.parametrosService.getSession().then(session=>{
      this.session = session;
      if ( this.session.oTOClientes ) {
        this.oTOClientes = new TOClientes(this.session.oTOClientes);
      }
    })
  }


  actionPedidoDetalle() {
    console.log(this.form.selectFormasPago_id);
    let oPedidos = new Pedidos();
    if ( oPedidos.validForm(this.form) ) {
      console.log('session', this.session);
      console.log('cli', this.oTOClientes);
      let oTOPedidoCabecera = oPedidos.setPedidoCabecera(this.form, this.oTOClientes);
      console.log('session.otoped', this.session.oTOPedidoCabecera);
      console.log('otoped', oTOPedidoCabecera);
      this.session.oTOPedidoCabecera = oTOPedidoCabecera;
      console.log('session', this.session);
      this.parametrosService.setSession(this.session).then(ok=>{
        if ( ok )
          this.nav.navigateForward(`/pedido-detalle`);
      })
    }
    else {
      this.messages = oPedidos.getMessages();
    }
    
  }

  actionCancelar() {
    this.nav.navigateForward([`/clientes-info`])
  }

  actionCloseMessage(index:number) {
    this.messages.splice(index, 1);
  }
}

import { Component, OnInit } from '@angular/core';
import { ArticulosItems } from 'src/app/models/articulosItems';
import { TOArticulosItems } from 'src/app/models/to/TOarticulosItems';
import { TabButtons } from 'src/app/class/tabButtons';
import { Pedidos } from 'src/app/models/pedidos';
import { PedidosService } from 'src/app/services/pedidos.service';
import { NavController } from '@ionic/angular';
import { ParametrosService } from 'src/app/services/parametros.service';
import { TOPedidoCabecera } from 'src/app/models/to/TOpedidoCabecera';
import { TOClientes } from 'src/app/models/to/TOclientes';
import { TOParametros } from 'src/app/models/to/TOparametros';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.page.html',
  styleUrls: ['./pedido-detalle.page.scss'],
})
export class PedidoDetallePage implements OnInit {

  oArticulosItems:ArticulosItems=null;
  aTOArticulosItemsFiltered:TOArticulosItems[];
  oTOClientes:TOClientes=null;
  oPedidos:Pedidos=null;
  oTOParametros:TOParametros=null;

  searchValue:string='';
  oTabsOpciones:TabButtons=null;
  oTabsArticulos:TabButtons=null;
  messages:string[]=['Cargando...'];

  constructor(private pedidosService:PedidosService,
              private navController:NavController,
              private parametrosService:ParametrosService
    ) { }

  ngOnInit() {
    this.actionInit();
  }
  
  ionViewWillEnter () {
    this.oTabsOpciones.selectTab(0);
  }

  actionInit() {
    this.oPedidos = new Pedidos();
    this.loadTabButtons();
    this.loadSession().then(()=>{
      this.loadArticulosItems();
    })
  }

  loadTabButtons() {
    this.oTabsOpciones = new TabButtons(3, 0, ['Items', 'Carrito', 'Grabar'], 'light', 'primary');
    this.oTabsArticulos = new TabButtons(3, 0, ['Todos', 'Sugeridos', 'Carrito']);
    this.oTabsOpciones.selectTab(0);
  }

  loadSession():Promise<boolean> {
    return this.parametrosService.getSession().then(session=>{
      if ( session ) {
        console.log('session', session);
        this.oPedidos.setOTOPedidoCabecera(new TOPedidoCabecera(session.oTOPedidoCabecera));
        this.oTOClientes = new TOClientes(session.oTOClientes);
        this.oTOParametros = new TOParametros(session.oTOParametros);
        return true;
      }
      else
        return false;
    })
  }

  loadArticulosItems() {
    this.pedidosService.getArticulosItems().then(oArticulosItems=>{
      if ( oArticulosItems == null )
        return;
     this.oArticulosItems = oArticulosItems;
     this.aTOArticulosItemsFiltered = this.oArticulosItems.getATOArticulosItems();
     this.messages = [];
    })
  }

  actionSearch() {
    console.log('searchchanged');
    this.messages.push('Filtrando...');
    this.aTOArticulosItemsFiltered = this.oArticulosItems.filterBySearch(this.searchValue, this.oTabsArticulos.getTabSelected_id())
    this.messages=[];
  }

  /*
  filter2(oTOArticulosItems:TOArticulosItems) {
    // tabButton_id: 0=todos articulos, 1=sugeridos, 2=carrito
    let tabButton_id = this.oTabsArticulos.getTabSelected_id();  
    if (    ! (   tabButton_id == 0
        ||  (tabButton_id == 1 && oTOArticulosItems.getIsSugerido())
        ||  (tabButton_id == 2 && oTOArticulosItems.getIsSelected())
        )
    )
      return false;
    if ( this.searchValue.length==0 )
      return true;
    return this.oArticulosItems.filterItem(this.searchValue, oTOArticulosItems);
  }
*/
  actionSelectButtonTabOpciones(buttonId:number) {
    this.oTabsOpciones.selectTab(buttonId);
    if ( buttonId === 1) // carrito
      this.oPedidos.calculaPedido();
    else
    if ( buttonId === 2)  // grabar 
      this.actionGrabarPedido();
      
  } 

  actionSelectButtonTabArticulos(buttonId:number) {
    this.oTabsArticulos.selectTab(buttonId);
    console.log(this.messages);
    this.actionSearch();
    console.log(this.oArticulosItems);
  } 

  actionUpdateCantidad(isAdd:boolean, oTOArticulosItems:TOArticulosItems) {
    this.oArticulosItems.updateCantidad(isAdd, oTOArticulosItems);
  }

  actionAddCarrito(oTOArticulosItems:TOArticulosItems) {
    this.oPedidos.addCarrito(oTOArticulosItems);
  }

  actionDeleteCarrito(oTOArticulosItems:TOArticulosItems) {
    this.oPedidos.deleteCarrito(oTOArticulosItems);
  }

  actionCancelar() {
    this.navController.navigateForward(['/pedido-cabecera']);
  }

  actionGrabarPedido() {
    this.messages.push('Grabando pedido...');
    this.oPedidos.preSavePedido(this.oTOClientes, this.oTOParametros);
    this.pedidosService.savePedido( this.oPedidos.getOTOPedidoCabecera(), 
                                    this.oPedidos.getATOPedidoDetalle()).then(ok=>{
      console.log('OK save pedido', ok);
      this.pedidosService.postSavePedido(this.oPedidos.getOTOPedidoCabecera(), this.oTOClientes, this.oTOParametros).then(ok=>{
        if ( ok )
          this.navController.navigateRoot('/pedidos');
        else
          console.log('Error postsave', this.pedidosService.getMessage());
      })
    })
  }
  
}


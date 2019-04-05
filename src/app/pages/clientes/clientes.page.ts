import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/config/globals';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { TOParametros } from '../../models/to/TOparametros';
import { Clientes } from '../../models/clientes';
import { TOClientes } from 'src/app/models/to/TOclientes';
import { iSession } from 'src/app/models/session';
import { ParametrosService } from 'src/app/services/parametros.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  message : string[] = [];
  oClientes: Clientes = null;
  oTOParametros: TOParametros = null;
  isRuta = Globals.IS_RUTA;
  searchValue = '';

  constructor(
    private activatedRoute:ActivatedRoute,
    private navController:NavController,
    private platform:Platform,
    private parametrosService:ParametrosService,
    private clientesService:ClientesService
  ) { }

  ngOnInit() {
    if ( this.platform.ready ) 
      this.init();
  }

  init() {
    this.isRuta = this.activatedRoute.snapshot.paramMap.get('isRuta');
      this.loadParametros().then(ok=>{
        if ( ok )
          this.loadClientes();
      });
  }

  loadParametros():Promise<boolean> {
    return this.parametrosService.getParametros().then(aTOParametros=>{
      if ( aTOParametros == null )
        return false;
      this.oTOParametros = aTOParametros[0];
      console.log('this.otoparm', this.oTOParametros);
      return true;
    })
    .catch(()=>{return false;})
  }

  loadClientes() {
    if ( this.isRuta === Globals.IS_RUTA )
      this.message.push('Cargando Clientes en Ruta...');
    else
      this.message.push('Cargando Clientes Fuera de Ruta...');
    return this.clientesService.getClientes(this.isRuta, this.oTOParametros.getDiaRuta()).then(oClientes=>{
      if ( oClientes == null )
        return;
      this.oClientes = oClientes;
      this.message = [];
    })
    .catch(err=>{
      this.message.push('Ocurrió un error:'+err.message);
    })
  }

  searchChanged() {
    if (!this.oClientes) {
      this.loadClientes();
      return;
    }
    this.message.push('Filtrando...');
    this.oClientes.getAll();
    this.oClientes.filterBySearch(this.isRuta, 
                      this.oTOParametros.getDiaRuta(), 
                      this.searchValue);
    this.message=[];
  }

  goInfoCliente(oTOClientes:TOClientes) {
    let session:iSession={
      oTOClientes:oTOClientes,
      isRuta:this.isRuta,
      oTOPedidoCabecera:null,
      oTOParametros:this.oTOParametros
    }
    console.log(session);
    this.parametrosService.setSession(session).then(ok=>{
      if ( ok )
        this.navController.navigateForward(`/clientes-info`);
      else
        this.message.push(this.parametrosService.getMessage());
    })
  }

  actionCancelar() {
    this.navController.navigateRoot(['/menu']);
  }
}


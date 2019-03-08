import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Globals } from 'src/app/config/globals';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { TOParametros } from '../../models/to/TOparametros';
import { Clientes } from '../../models/clientes';
import { TOClientes } from 'src/app/models/to/TOclientes';

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
    private storageService:StorageService,
    private activatedRoute:ActivatedRoute,
    private nav:NavController
  ) { }

  ngOnInit() {
    this.isRuta = this.activatedRoute.snapshot.paramMap.get('isRuta');
    this.loadParametros();
    this.loadClientes();
  }

  loadParametros() {
    return this.storageService.getCatalog(Globals.CATALOG_PARAMETROS).then(data=>{
      if (data) {
        let oTOPametros:TOParametros = new TOParametros(data);
        this.oTOParametros = oTOPametros;
      }
    })
  }

  loadClientes() {
    if ( this.isRuta === Globals.IS_RUTA )
      this.message.push('Cargando Clientes en Ruta...');
    else
      this.message.push('Cargando Clientes Fuera de Ruta...');
    return this.storageService.getCatalog(Globals.CATALOG_CLIENTES).then(data=>{
      let oClientes : Clientes = new Clientes(data);
      oClientes.getAll();
      oClientes.filterByDiaRuta(this.isRuta, this.oTOParametros.getDiaRuta());
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

  goInfoCliente(cliente:TOClientes) {
    let aTOClientes: TOClientes[] = [];
    aTOClientes.push(cliente);
    this.storageService.putCatalog(Globals.CATALOG_TMP_CLIENTES, aTOClientes).then(()=>{
      this.nav.navigateForward(`/clientes-info`);
    })
    .catch(()=>{
      this.message.push('Ocurrió un error al guardar datos temporales.');
    })
  }
}


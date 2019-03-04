import { Component, OnInit } from '@angular/core';
import { TOClientes } from "../../models/to/TOclientes";
import { StorageService } from 'src/app/services/storage.service';
import { Globals } from 'src/app/config/globals';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { TOParametros } from '../../models/to/TOparametros';
import { Clientes } from '../../models/clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  message : string[]=[];
  aTOClientes:TOClientes[]=[];
  parametros:TOParametros=null;
  isRuta='1';
  searchValue='';
  lGlobals = { 
    'TIPO_PERSONA_JURIDICA' : Globals.TIPO_PERSONA_JURIDICA
  };

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
        this.parametros = oTOPametros;
        console.log(oTOPametros);
        console.log('ed', this.parametros.getDiaRuta());
      }
    })
  }

  loadClientes() {
    if ( this.isRuta === '1' )
      this.message.push('Cargando Clientes en Ruta');
    else
      this.message.push('Cargando Clientes Fuera de Ruta');
    return this.storageService.getCatalog(Globals.CATALOG_CLIENTES).then(data=>{
      if (data) {
        let oClientes : Clientes = new Clientes();
        oClientes.addClientes(data);
        this.aTOClientes = oClientes.getATOClientes();
      }
      this.message = [];
    })
  }

  searchChanged() {
    this.loadClientes().then(()=>{
      this.aTOClientes = this.aTOClientes.filter(cliente=>{
        console.log(cliente.getNombres(), this.searchValue);
        let dato: string;
        if ( cliente.getTiposPersona_id()!=Globals.TIPO_PERSONA_JURIDICA ) 
          dato = cliente.getApepat() + cliente.getApemat() + cliente.getNombres();
        else 
          dato = cliente.getRazonSocial();
        if ( dato.toUpperCase().indexOf(this.searchValue.toUpperCase())>-1) {
          console.log('ok');
          return true;
        }
        else
          return false;
      })
    })
  }

  goInfoCliente(cliente) {
    this.storageService.putCatalog(Globals.CATALOG_TMP_CLIENTES, cliente).then(()=>{
      this.nav.navigateForward(`/clientes-info`);
    })
    .catch(()=>{
      this.message.push('Ocurrió un error al guardar datos temporales.');
    })
  }
}

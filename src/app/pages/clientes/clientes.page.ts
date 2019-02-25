import { Component, OnInit } from '@angular/core';
import { Clientes, TOClientes } from "../../models/clientes";
import { StorageService } from 'src/app/services/storage.service';
import { Globals } from 'src/app/config/globals';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  message : string[]=[];
  aTOClientes:TOClientes[]=[];
  parametros:any;
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
      this.parametros = data;
      console.log(this.parametros.diaRuta);
    })
  }

  loadClientes() {
    if ( this.isRuta === '1' )
      this.message.push('Cargando Clientes en Ruta');
    else
      this.message.push('Cargando Clientes Fuera de Ruta');
    return this.storageService.getClientes().then(data=>{
      this.aTOClientes = data;
      this.message = [];
    })
  }

  searchChanged() {
    this.loadClientes().then(()=>{
      this.aTOClientes = this.aTOClientes.filter(cliente=>{
        console.log(cliente.nombres, this.searchValue);
        let dato: string;
        if ( cliente.tiposPersona_id!=Globals.TIPO_PERSONA_JURIDICA ) 
          dato = cliente.apepat + cliente.apemat + cliente.nombres;
        else 
          dato = cliente.razonSocial;
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

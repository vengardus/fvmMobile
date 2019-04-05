import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { Globals } from '../../config/globals';
import { Catalogos } from '../../models/catalogos'
import { TOCatalogos } from '../../models/to/TOcatalogos';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-get-catalogs',
  templateUrl: './get-catalogs.page.html',
  styleUrls: ['./get-catalogs.page.scss'],
})
export class GetCatalogsPage implements OnInit {
  private messages =  [];
  private states = {
    stateMenu : 'stateMenu',
    stateLogin: 'stateLogin',
    stateGetCatalogosServer: 'stateGetCatalogosServer',
  }
  private state = this.states.stateGetCatalogosServer;
  catalogos : TOCatalogos[] = null;

  constructor(
    private storageService:StorageService,
    private apiService:ApiService,
    private navController:NavController
  ) { }

  ngOnInit() {

    console.log('inicio', this.catalogos);
    this.messages = [];
  }

  actionSolicitarServer() {
    this.messages = [];
    // obtener catalogo catalogos localmente
    this.storageService.getCatalog(Globals.CATALOG_CATALOGOS).then(data=>{
      this.catalogos=[];
      if ( ! data )
        this.messages.push('Error en configuración del dispositivo, vuelva a logearse. (No hay catálogos por solicitar)')
      else {
        let oCatalogos:Catalogos = new Catalogos(data);
        oCatalogos.getAll();
        this.catalogos = oCatalogos.getATOCatalogos();
        console.log('catalogos', this.catalogos);
      }
      // para cada catalogo solicitar datos al servidor
      for ( let index in this.catalogos) {
        this.catalogos[index].setRecv(0);
        this.catalogos[index].setSaved(0);
        //this.message.push(`Solicitando catálogo  ${this.catalogos[index].getDescripcion()}...`);
        this.catalogos[index].setRecv(1);
        this.apiService.getCatalog(this.catalogos[index].getId()).subscribe(result=>{
          if ( result['response'] !== Globals.RESPONSE_OK ) {
            this.messages.push(`ERROR al recibir catálogo ${this.catalogos[index].getDescripcion()} : ${result['message']}`);
            this.catalogos[index].setRecv(-2);
          }
          else {
            //this.message.push(`Catálogo ${this.catalogos[index].getDescripcion()} recibido OK`);
            this.catalogos[index].setRecv(2);
            // grabar catalogo localmente
            this.putCatalog(this.catalogos[index].getNombre(), this.catalogos[index].getDescripcion(), result['data']).then(()=>{
              this.catalogos[index].setSaved(1);
              this.storageService.putCatalog(Globals.CATALOG_CATALOGOS, this.catalogos).then(()=>{
                // si todos los catalogos ya se cargaron ir a Menu
                console.log('Verficando catalogos cargados');
                this.storageService.catalogosCargados().then((isCatalogosCargados)=>{
                  if ( isCatalogosCargados ) {
                    //this.message.push('Catálogos cargados satisfactoriamente. ');
                    //this.message.push('Redireccionando al menu..........');
                    this.messages = [];
                    this.goMenuPage();
                  }
                })
              })
            })
            .catch(()=>{
              this.catalogos[index].setSaved(-1);
              this.storageService.putCatalog(Globals.CATALOG_CATALOGOS, this.catalogos);            });
            
          }
        },
        err=>{
          this.messages.push(`Error al recibir catálogo ${this.catalogos[index].getDescripcion()} : ${err}`);
          this.catalogos[index].setRecv(-2);
          this.storageService.putCatalog(Globals.CATALOG_CATALOGOS, this.catalogos);
        })
      }
      console.log('Finalizo getCatalogos', this.catalogos);
    })
  }

  private putCatalog(catalog, catalogDescripcion, data) {
    //this.message.push(`Grabando catálogo ${catalogDescripcion} en el dispositivo...`);
    return this.storageService.putCatalog(catalog, data).then(()=>{
      //this.message.push(`Catálogo ${catalogDescripcion} grabado en dispositivo OK.`);
    })
    .catch(err=>{
      this.messages.push(`Error al grabar catálogo ${catalogDescripcion} en el dispositivo: ${err.message} `);
    })
  }

  private goMenuPage() {
    this.state = this.states.stateMenu;
    this.navController.navigateRoot([`/menu`]);
  }

  actionCancelar() {
    this.state = this.states.stateLogin;
    this.navController.navigateRoot(['/login']);
  }
}


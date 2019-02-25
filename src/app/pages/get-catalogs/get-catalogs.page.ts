import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { Globals } from '../../config/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-catalogs',
  templateUrl: './get-catalogs.page.html',
  styleUrls: ['./get-catalogs.page.scss'],
})
export class GetCatalogsPage implements OnInit {
  message =  [];
  catalogos = [];

  constructor(
    private storageService:StorageService,
    private apiService:ApiService,
    private router:Router
  ) { }

  ngOnInit() {
    this.message = [];
  }

  getCatalogsServer() {
    this.message = [];
    // obtener catalogo catalogos localmente
    this.storageService.getCatalog(Globals.CATALOG_CATALOGOS).then(data=>{
      this.catalogos = data;
      console.log('catalogos', this.catalogos);
      if ( this.catalogos === null )
        this.message.push('Error en configuración del dispositivo, vuelva a logearse. (No hay catálogos por solicitar)')
      // para cada catalogo solicitar datos al servidor
      for ( let index in this.catalogos) {
        this.catalogos[index]['recv'] = 0;
        this.catalogos[index]['saved'] = 0;
        this.message.push(`Solicitando catálogo  ${this.catalogos[index].descripcion}...`);
        this.catalogos[index]['recv'] = 1;
        this.apiService.getCatalog(this.catalogos[index].id).subscribe(result=>{
          if ( result['response'] !== Globals.RESPONSE_OK ) {
            this.message.push(`ERROR al recibir catálogo ${this.catalogos[index].descripcion} : ${result['message']}`);
            this.catalogos[index]['recv'] = -2;
          }
          else {
            this.message.push(`Catálogo ${this.catalogos[index].descripcion} recibido OK`);
            this.catalogos[index]['recv'] = 2;
            // grabar catalogo localmente
            this.putCatalog(this.catalogos[index].nombre, this.catalogos[index].descripcion, result['data']).then(()=>{
              this.catalogos[index]['saved'] = 1;
              this.storageService.putCatalog(Globals.CATALOG_CATALOGOS, this.catalogos).then(()=>{
                // si todos los catalogos ya se cargaron ir a Menu
                console.log('Verficando catalogos cargados');
                this.storageService.isCatalogosCargados().then(()=>{
                  if ( this.storageService.catalogosCargados ) {
                    this.message.push('Catálogos cargados satisfactoriamente. ');
                    this.message.push('Redireccionando al menu..........');
                    this.message = [];
                    this.router.navigate([`/menu`]);
                  }
                })
              })
            })
            .catch(()=>{
              this.catalogos[index]['saved'] = -1;
              this.storageService.putCatalog(Globals.CATALOG_CATALOGOS, this.catalogos);
            });
            
          }
        },
        err=>{
          this.message.push(`Error al recibir catálogo ${this.catalogos[index].descripcion} : ${err}`);
          this.catalogos[index]['recv'] = -2;
          this.storageService.putCatalog(Globals.CATALOG_CATALOGOS, this.catalogos);
        })
      }
      console.log('Finalizo getCatalogos', this.catalogos);
    })
  }

  putCatalog(catalog, catalogDescripcion, data) {
    this.message.push(`Grabando catálogo ${catalogDescripcion} en el dispositivo...`);
    return this.storageService.putCatalog(catalog, data).then(()=>{
      this.message.push(`Catálogo ${catalogDescripcion} grabado en dispositivo OK.`);
    })
    .catch(err=>{
      this.message.push(`Error al grabar catálogo ${catalogDescripcion} en el dispositivo: ${err.message} `);
    })
  }

}


import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Globals } from 'src/app/config/globals';
import { Clientes } from 'src/app/models/clientes';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-clientes-info',
  templateUrl: './clientes-info.page.html',
  styleUrls: ['./clientes-info.page.scss'],
})
export class ClientesInfoPage implements OnInit {
  oClientes : Clientes = null;
  color = {
    primary : 'primary',
    secondary : 'light'
  };
  fill = {
    solid : 'solid',
    outline : 'solid'
  }
  buttonId_selected = 0;
  buttons = [
    {
      id : 0,
      color : this.color.primary,
      fill : this.fill.solid
    },
    {
      id : 1,
      color : this.color.secondary,
      fill : this.fill.outline
    },
    {
      id : 2,
      color : this.color.secondary,
      fill : this.fill.outline
    }
  ];

  constructor(
    private storage:StorageService
  ) { }

  ngOnInit() {
    this.storage.getCatalog(Globals.CATALOG_TMP_CLIENTES).then(data=>{
      console.log('data', data);
      let cliente = data;
      this.oClientes = new Clientes();
      this.oClientes.addCliente(data);
    })
  }

  selectButtonTab(buttonId) {
    this.buttonId_selected = buttonId;
    console.log('selected', this.buttonId_selected);
    for ( let index in this.buttons) {
      console.log('index', index);
      console.log('id', this.buttons[index].id);
      if ( this.buttons[index].id == this.buttonId_selected ) {
        this.buttons[index].color = this.color.primary;
        this.buttons[index].fill = this.fill.solid;
      }
      else {
        this.buttons[index].color = this.color.secondary;
        this.buttons[index].fill = this.fill.outline;
      }
    }
  } 
}

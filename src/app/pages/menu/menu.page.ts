import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private nav:NavController
  ) { }

  ngOnInit() {
  }

  clientesRuta() {
    //this.router.navigate([`/menu`]);
    let isRuta = '1';
    this.nav.navigateForward(`/clientes/${isRuta}`);
  }

  clientesFueraRuta() {
    let isRuta = '0';
    this.nav.navigateForward(`/clientes/${isRuta}`);
  }

}

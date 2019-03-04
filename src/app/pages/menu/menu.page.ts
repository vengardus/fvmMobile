import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private nav:NavController,
    private storageService:StorageService
  ) { }

  ngOnInit() {
  }

  salirSesion() {
    this.storageService.salirSesion().then(ok=>{
      console.log('ok', ok);

      if ( ok )
        this.goLogin();
    })
  }

  goLogin() {
    console.log('Loggin');
    this.nav.navigateForward(`/login`);
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

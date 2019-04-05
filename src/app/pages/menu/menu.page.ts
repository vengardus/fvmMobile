import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ParametrosService } from 'src/app/services/parametros.service';
import { TOParametros } from 'src/app/models/to/TOparametros';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  oTOParametros:TOParametros=null;

  constructor(
    private nav:NavController,
    private parametrosService:ParametrosService,
    private alertController:AlertController
  ) { }

  ngOnInit() {
    this.loadParametros();
  }

  loadParametros() {
    this.parametrosService.getParametros().then(aTOParametros=>{
      console.log('menu', aTOParametros);
      if ( aTOParametros != null ) 
        this.oTOParametros = aTOParametros[0];
      else
        this.showAlert();
    })
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Ocurrió un error!',
      subHeader: '',
      message: 'No se puede cargar parámetros.',
      buttons: ['OK']
    });
    await alert.present();
  }

  salirSesion() {
    console.log('menu sale', this.oTOParametros);
    if ( this.oTOParametros != null ) {
      this.oTOParametros.setIsLogged(false);
      this.parametrosService.setParametros(this.oTOParametros).then((ok)=>{
        if ( ok )
          this.goLoginPage();
        else
          this.showAlert();
      })
    }
  }

  goLoginPage() {
    console.log('Loggin');
    //this.nav.navigateForward(`/login`);
    this.nav.navigateRoot([`/login`]);
  }

  actionEnRuta() {
    //this.router.navigate([`/menu`]);
    let isRuta = '1';
    //this.nav.navigateForward(`/clientes/${isRuta}`);
    this.nav.navigateRoot(`/clientes/${isRuta}`);
  }

  actionFueraRuta() {
    let isRuta = '0';
    this.nav.navigateRoot(`/clientes/${isRuta}`);
  }

}

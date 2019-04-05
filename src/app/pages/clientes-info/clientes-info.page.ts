import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../models/clientes';
import { NavController, Platform } from '@ionic/angular';
import { TabButtons } from 'src/app/class/tabButtons';
import { ParametrosService } from 'src/app/services/parametros.service';
import { TOClientes } from 'src/app/models/to/TOclientes';

@Component({
  selector: 'app-clientes-info',
  templateUrl: './clientes-info.page.html',
  styleUrls: ['./clientes-info.page.scss'],
})
export class ClientesInfoPage implements OnInit {
  oClientes : Clientes = null;
  oTOClientes:TOClientes=null;
  oTabsTipoInfo:TabButtons=null;
  infoDevice = {
    device: '',
    size:'xs'
  }
  isRuta='';

  constructor(
    private parametrosService:ParametrosService,
    private nav:NavController,
    private platform:Platform,
  ) { }

  ngOnInit() {
    if ( this.platform.ready() ) {
      this.onDeviceReady();
     
    }
  }

  onDeviceReady() {
    if(this.platform.is('ios'))
      this.infoDevice.device = 'ios'; 
    if(this.platform.is('android'))
      this.infoDevice.device = 'android';
    if(this.platform.is('mobile'))
      this.infoDevice.device = 'mobile';
    if(this.platform.is('tablet'))
      this.infoDevice.device = 'tablet';
    if(this.platform.is('desktop'))
      this.infoDevice.device = 'desktop';
    
    let myHeight = this.platform.height();
    let myWidth = this.platform.width();
    if ( myWidth < 576 )
      this.infoDevice.size = 'xs';
    if ( myWidth >= 576 && myWidth <= 767 )
      this.infoDevice.size = 'sm';
    if ( myWidth > 767 && myWidth <= 991 )
      this.infoDevice.size = 'md';
    if ( myWidth > 991 && myWidth < 1200 )
      this.infoDevice.size = 'xl';
  }

  ionViewWillEnter () {
    this.init();
  }

  init() {
    this.parametrosService.getSession().then(session=>{
      if ( session == null )
        return;
      console.log('data', session.oTOClientes);
      this.oClientes = new Clientes();
      this.oTOClientes = new TOClientes(session.oTOClientes);
      this.isRuta = session.isRuta;
      this.loadTabButtons();
      console.log(this.oTOClientes);
    })
  }

  loadTabButtons() {
    this.oTabsTipoInfo = new TabButtons(2, 0, ['General', 'Financiera']);
  }

  selectButtonTabTipoInfo(buttonId) {
    this.oTabsTipoInfo.selectTab(buttonId);
  } 

  actionCancelar() {
    this.nav.navigateForward([`/clientes/${this.isRuta}`]);
  }

  actionPedidos() {
    this.nav.navigateForward([`/pedidos`]);
  }
}

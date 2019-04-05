import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'get-catalogs', loadChildren: './pages/get-catalogs/get-catalogs.module#GetCatalogsPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'clientes/:isRuta', loadChildren: './pages/clientes/clientes.module#ClientesPageModule' },
  { path: 'config', loadChildren: './pages/config/config.module#ConfigPageModule' },
  { path: 'clientes-info', loadChildren: './pages/clientes-info/clientes-info.module#ClientesInfoPageModule' },
  { path: 'pedido-detalle', loadChildren: './pages/pedido-detalle/pedido-detalle.module#PedidoDetallePageModule' },
  { path: 'config-setup', loadChildren: './pages/config-setup/config-setup.module#ConfigSetupPageModule' },
  { path: 'pedido-cabecera', loadChildren: './pages/pedido-cabecera/pedido-cabecera.module#PedidoCabeceraPageModule' },
  { path: 'pedidos', loadChildren: './pages/pedidos/pedidos.module#PedidosPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

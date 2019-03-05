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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

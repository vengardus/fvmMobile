import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GetCatalogsPage } from './get-catalogs.page';

const routes: Routes = [
  {
    path: '',
    component: GetCatalogsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GetCatalogsPage]
})
export class GetCatalogsPageModule {}

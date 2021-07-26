import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalfarmaciaPage } from './modalfarmacia.page';

const routes: Routes = [
  {
    path: '',
    component: ModalfarmaciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalfarmaciaPageRoutingModule {}

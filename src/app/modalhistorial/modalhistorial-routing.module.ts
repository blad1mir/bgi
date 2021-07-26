import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalhistorialPage } from './modalhistorial.page';

const routes: Routes = [
  {
    path: '',
    component: ModalhistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalhistorialPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalviajesPage } from './modalviajes.page';

const routes: Routes = [
  {
    path: '',
    component: ModalviajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalviajesPageRoutingModule {}

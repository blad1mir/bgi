import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ModalRegistroPage } from './modal-registro.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule ],
  exports: [RouterModule],
})
export class ModalRegistroPageRoutingModule {}

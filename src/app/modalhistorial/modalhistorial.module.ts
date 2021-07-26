import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalhistorialPageRoutingModule } from './modalhistorial-routing.module';

import { ModalhistorialPage } from './modalhistorial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalhistorialPageRoutingModule
  ],
  declarations: [ModalhistorialPage]
})
export class ModalhistorialPageModule {}

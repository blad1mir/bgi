import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalfarmaciaPageRoutingModule } from './modalfarmacia-routing.module';

import { ModalfarmaciaPage } from './modalfarmacia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalfarmaciaPageRoutingModule
  ],
  declarations: [ModalfarmaciaPage]
})
export class ModalfarmaciaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalviajesPageRoutingModule } from './modalviajes-routing.module';

import { ModalviajesPage } from './modalviajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalviajesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalviajesPage]
})
export class ModalviajesPageModule {}

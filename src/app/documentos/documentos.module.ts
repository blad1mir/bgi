import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosPageRoutingModule } from './documentos-routing.module';

import { DocumentosPage } from './documentos.page';
import { CiudadespipePipe } from '../ciudadespipe.pipe';
import { IdCiudadespipePipe } from '../id-ciudadespipe.pipe';
import { CodigopaispipePipe } from '../codigopaispipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosPageRoutingModule
  ],
  declarations: [DocumentosPage, CiudadespipePipe, IdCiudadespipePipe, CodigopaispipePipe]
})
export class DocumentosPageModule {}

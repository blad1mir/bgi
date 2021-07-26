import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoipPageRoutingModule } from './voip-routing.module';

import { VoipPage } from './voip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoipPageRoutingModule
  ],
  declarations: [VoipPage]
})
export class VoipPageModule {}

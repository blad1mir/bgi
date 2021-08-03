import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FiltroPipe } from './filtro.pipe';
import { SafePipeModule } from 'safe-pipe';
import { VoipService } from './voip.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FechaPipe } from './fecha.pipe';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule , HttpClientModule, SafePipeModule,CommonModule, FormsModule  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },VoipService, FiltroPipe, FechaPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

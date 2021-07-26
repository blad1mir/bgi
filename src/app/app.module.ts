import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
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
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CallNumber, InAppBrowser, VoipService, FiltroPipe, FechaPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

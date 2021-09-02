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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FechaPipe } from './fecha.pipe';
import { CiudadespipePipe } from './ciudadespipe.pipe';
import { IdCiudadespipePipe } from './id-ciudadespipe.pipe';
import { CodigopaispipePipe } from './codigopaispipe.pipe';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  exports: [FormsModule, ReactiveFormsModule],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule , HttpClientModule, SafePipeModule,CommonModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },VoipService, FiltroPipe, FechaPipe, CiudadespipePipe, 
    IdCiudadespipePipe, CodigopaispipePipe, Geolocation, FileTransfer, File, FileTransferObject], 
  bootstrap: [AppComponent],
})
export class AppModule {}

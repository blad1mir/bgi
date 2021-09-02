import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ConexionbdService } from '../servicio/conexionbd.service';
import { SoporteserviceService } from '../soporteservice.service';
import { VoipService } from '../voip.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';





@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit, OnDestroy {
  usuario;

  lat:number
  lon:number
  total:string


  
  constructor(public router: Router, public post: ConexionbdService, private TawkService: VoipService,
    private menu: MenuController, public compo: AppComponent, private TawkSoporte: SoporteserviceService,
    private geolocation: Geolocation) {
     
      this.compo.estatus= true; 
      this.menu.enable(true, 'first');
     // this.menu.open('first');

     this.TawkSoporte.removerChat();
     this.TawkService.removerChat();
    if(this.TawkService.cargar==true){
      this.TawkService.SetChatVisibility(false);
    }
    if(this.TawkSoporte.cargar==true){
      this.TawkSoporte.SetChatVisibility(false);
    }
    
   


    this.usuario =  JSON.parse(localStorage.getItem('user'));
    console.log( JSON.parse(localStorage.getItem('user')));
    console.log(typeof(this.usuario))

    this.getGeolocation();
    //this.getCiudades();
  }

  // getCiudades() {
    
  //   return new Promise(resolve => {
  //     let body = {
  //       aksi: 'getCiudades'
  //     };

  //     this.post.postData(body, 'file_aksi.php').subscribe(data => {
        
 
  //      console.log(data["result"]);
    
  //      //  this.paciente.fecha_nac =  moment(this.paciente.fecha_nac, "YYY-MM-DD").format('DD/MM/YYYY')
        
  //       resolve(true);
  //     });
  //   });
  // }

  getGeolocation(){
    // this.geolocation.getCurrentPosition((geoposition: Geoposition) =>{
    //   this.lat = geoposition.coords.latitude;
    //   this.lon = geoposition.coords.longitude;
    // });
    
   
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      console.log(this.lat +" "+ this.lon);

      let latMadrid = 40.4167;
      let lonMadrid = -3.70325;

      this.total = this.calculateDistance(this.lon, lonMadrid, this.lat, latMadrid)+"KM";
      console.log(this.total)
    });
    
  }

  calculateDistance(lon1, lon2, lat1, lat2){
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((lon1- lon2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return Math.trunc(dis);
}

  getHistorial() {
    console.log("ejecuto esto:", this.usuario[0].email);
     return new Promise(resolve => {
       let body = {
         aksi: 'getHistorial',
         email: this.usuario[0].email
         
 
       };
 
       this.post.postData(body, 'file_aksi.php').subscribe(data => {
        
       
         console.log(data["result"]);
         this.post.historial = data["result"];
    

         
      
         resolve(true);
       });
     });
   }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openmenu(){
    this.menu.open('first');
  }


  onClickChat() {
    
    
   // if (this.networkConnection.hasConnection()) {
    //  this.iab.open(this.tawkChatLink,'_self')
    //const browser = this.iab.
   // const browser = cordova.InAppBrowser.open(this.tawkChatLink)
  // this.router.navigate(['/voip'])
   // const browser = this.iab.create(this.tawkChatLink,'_self',{location:'no'}); 
    //}
    //else this.presentAlert();
  }

  ngOnInit() {
    // this.TawkService.SetChatVisibility(false);
    // this.TawkSoporte.SetChatVisibility(false);

   // this.TawkService.SetChatVisibility(true);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
    
      console.log('Async operation has ended');
      event.target.complete();
    
    }, 2000);
  }

  ngOnDestroy() {
   // this.TawkService.SetChatVisibility(false);
}

  cerrarSesion(){
    localStorage.setItem('user', null);
   
    this.router.navigate(['/login'])
  }


  toVoip(){
   
    

   
    // this.TawkSoporte.removerChat();
    // this.TawkService.agregarChat();
    // this.TawkService.SetChatVisibility(true);
    this.router.navigate(['/voip'])
  }

  toSoporte(){
    // this.TawkService.removerChat();
    // this.TawkSoporte.agregarChat();
    
    // this.TawkSoporte.SetChatVisibility(true);
    this.router.navigate(['/soporte'])
  }



}

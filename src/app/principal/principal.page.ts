import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ConexionbdService } from '../servicio/conexionbd.service';
import { VoipService } from '../voip.service';






@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit, OnDestroy {
  usuario;


  
  constructor(public router: Router, public post: ConexionbdService, private TawkService: VoipService,
    private menu: MenuController, public compo: AppComponent) {
      this.compo.estatus= true; 
      this.menu.enable(true, 'first');
     // this.menu.open('first');
    this.TawkService.SetChatVisibility(false);

    // var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    // (function(){
    // var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    // s1.async=true;
    // s1.src='https://embed.tawk.to/60ab0984a4114e480ad07be4/1f6e1qbkh';
    // s1.charset='UTF-8';
    // s1.setAttribute('crossorigin','*');
    // s0.parentNode.insertBefore(s1,s0);
    // })();
    
    this.usuario =  JSON.parse(localStorage.getItem('user'));
    console.log( JSON.parse(localStorage.getItem('user')));
    console.log(typeof(this.usuario))

    
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

   // this.TawkService.SetChatVisibility(true);
  }

  ngOnDestroy() {
   // this.TawkService.SetChatVisibility(false);
}

  cerrarSesion(){
    localStorage.setItem('user', null);
   
    this.router.navigate(['/login'])
  }



}

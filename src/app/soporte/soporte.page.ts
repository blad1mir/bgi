import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SoporteserviceService } from '../soporteservice.service';
import { VoipService } from '../voip.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit, OnDestroy {
  usuario;  

  constructor(public TawkSoporte: SoporteserviceService, private menu: MenuController, private TawkService: VoipService) {
    this.usuario =  JSON.parse(localStorage.getItem('user'));
   // var tempUser = {firstname: this.usuario[0].nombre, surname:this.usuario[0].apellido, email:this.usuario[0].email }
    
    // TawkSoporte.UpdateTawkUser(tempUser);
    // if(this.TawkService.cargar==true){
    
    //   this.TawkService.SetChatVisibility(false);
    // }

    // this.TawkService.removerChat();

    
    
   // this.TawkSoporte.agregarChat();
    this.TawkSoporte.SetChatVisibility(true); 
     
   
     
   
    
    // var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    //   (function(){
    //   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    //   s1.async=true;
    //   s1.src='https://embed.tawk.to/6063a471f7ce182709359350/1f22jkn88';
    //   s1.charset='UTF-8';
    //   s1.setAttribute('crossorigin','*');
    //   s0.parentNode.insertBefore(s1,s0);
    //   })();
   }

   openmenu(){
    this.menu.open('first');
  }


  ngOnDestroy(): void {
   this.TawkSoporte.SetChatVisibility(false); 
   this.TawkSoporte.removerChat();
  
    
  }
  ngOnInit(): void {
    //this.TawkSoporte.SetChatVisibility(true);
  }
  



}

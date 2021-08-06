import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SoporteserviceService } from '../soporteservice.service';
import { VoipService } from '../voip.service';

@Component({
  selector: 'app-voip',
  templateUrl: './voip.page.html',
  styleUrls: ['./voip.page.scss'],
})
export class VoipPage implements OnInit, OnDestroy {

  usuario;  
  constructor(public TawkService: VoipService, private menu: MenuController,  private TawkSoporte: SoporteserviceService) {

    this.usuario =  JSON.parse(localStorage.getItem('user'));
    // var tempUser = {firstname: this.usuario[0].nombre, surname:this.usuario[0].apellido, email:this.usuario[0].email }
    // console.log(tempUser);
    // TawkService.UpdateTawkUser(tempUser);
   
    // if(this.TawkSoporte.cargar==true){
    
    //   this.TawkSoporte.SetChatVisibility(false);
    // }
  
    // this.TawkSoporte.removerChat();

    

    
    //this.TawkService.agregarChat();
    // this.TawkService.agregarChat();
    // this.TawkService.SetChatVisibility(true);
    
    
   
 
   
   
   
    //this.doRefresh(event);
    console.log(0);
    
      // var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      // (function(){
      // var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      // s1.async=true;
      // s1.src='https://embed.tawk.to/60ab0984a4114e480ad07be4/1f6e1qbkh';
      // s1.charset='UTF-8';
      // s1.setAttribute('crossorigin','*');
      // s0.parentNode.insertBefore(s1,s0);
      // })();

   }

   doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
    
      console.log('Async operation has ended');
      event.target.complete();
     
    }, 2000);
  }

  ngOnInit() {

    //this.TawkService.SetChatVisibility(true);
    //console.log(1);
  }

     
  openmenu(){
    this.menu.open('first');
  }


  ngOnDestroy() {
    // this.TawkService.SetChatVisibility(false);
    // this.TawkService.removerChat();
    
    
 }




}

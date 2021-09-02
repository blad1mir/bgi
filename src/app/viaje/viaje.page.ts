import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalviajesPage } from '../modalviajes/modalviajes.page';
import { ConexionbdService } from '../servicio/conexionbd.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  status=true;
  viajes;
  usuario;

  constructor( public modalController3: ModalController, public post: ConexionbdService,  private menu: MenuController) {


    this.usuario =  JSON.parse(localStorage.getItem('user'));
    this.getViajes(); 
   }

  ngOnInit() {
  }

  getViajes() {
    console.log("ejecuto esto:", this.usuario[0].email);
     return new Promise(resolve => {
       let body = {
         aksi: 'getViajes',
         email: this.usuario[0].email
         
 
       };
 
       this.post.postData(body, 'file_aksi.php').subscribe(data => {
        
       
         console.log(data["result"]);
         this.viajes = data["result"];
         if(data["result"].length == 0){
          this.status=false;
         }

         
      
         resolve(true);
       });
     });
   }

   

  doRefresh(event) {
  
    console.log(event);
    console.log(typeof(event))
    console.log('Begin async operation');
    

    setTimeout(() => {
     
      console.log('Async operation has ended');
      event.target.complete();
      this.getViajes();
    }, 2000);
  }

   
   openmenu(){
    this.menu.open('first');
  }


  async registrar() {
    console.log("hello");
    const modal = await this.modalController3.create({
      component: ModalviajesPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }



}

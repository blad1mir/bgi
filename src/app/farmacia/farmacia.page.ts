import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalfarmaciaPage } from '../modalfarmacia/modalfarmacia.page';
import { ConexionbdService } from '../servicio/conexionbd.service';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.page.html',
  styleUrls: ['./farmacia.page.scss'],
})
export class FarmaciaPage implements OnInit {

  usuario;
  status =false; 
  farmacia;
  constructor(public post: ConexionbdService,   public modalController: ModalController,  private menu: MenuController) { 
    this.usuario =  JSON.parse(localStorage.getItem('user'));
    this.getHistorial();

    setTimeout(() => {
      this.getHistorial();
   }, 2000);
  }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
    
      console.log('Async operation has ended');
      event.target.complete();
      this.getHistorial();
    }, 2000);
  }

  getHistorial() {
    console.log("ejecuto esto:", this.usuario[0].email);
     return new Promise(resolve => {
       let body = {
         aksi: 'getFarmacia',
         email: this.usuario[0].email
         
 
       };
 
       this.post.postData(body, 'file_aksi.php').subscribe(data => {
        
       
         console.log(data["result"]);
         this.farmacia = data["result"];
         if(data["result"].length > 0){
          this.status=true;
         }

         
      
         resolve(true);
       });
     });
   }

   openmenu(){
    this.menu.open('first');
  }


   async mostrarDetalles(historialActual) {
    console.log(historialActual)
    this.post.historial = historialActual;

    const modal = await this.modalController.create({
      component: ModalfarmaciaPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Historial } from '../interface/historial';
import { ModalhistorialPage } from '../modalhistorial/modalhistorial.page';
import { ConexionbdService } from '../servicio/conexionbd.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {


  usuario;
  //historial:any = [];
  historial:Historial[] = [];
  status =false; 
  Filtro: string = "";

  Fecha: string = "";
 
  

  


  constructor(public post: ConexionbdService,  public modalController: ModalController, private menu: MenuController) { 

    this.usuario =  JSON.parse(localStorage.getItem('user'));
    this.getHistorial();

    setTimeout(() => {
       this.getHistorial();
    }, 2000);
    
  }

  ngOnInit() {
    
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
         this.historial = data["result"];
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

  doRefresh(event) {
    console.log(event);
    console.log('Begin async operation');

    setTimeout(() => {
     
      console.log('Async operation has ended');
      event.target.complete();
       this.getHistorial();
    }, 2000);
  }



   async mostrarDetalles(historialActual) {
    console.log(historialActual)
    this.post.historial = historialActual;

    const modal = await this.modalController.create({
      component: ModalhistorialPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  changeStatus(status,){
    console.log(status);
    console.log(this.historial); 
    }

}
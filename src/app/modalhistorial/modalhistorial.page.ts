import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Historia } from '../interface/historia';
import { ConexionbdService } from '../servicio/conexionbd.service';

@Component({
  selector: 'app-modalhistorial',
  templateUrl: './modalhistorial.page.html',
  styleUrls: ['./modalhistorial.page.scss'],
})
export class ModalhistorialPage implements OnInit {

  historial;
  historia: Historia[];
  usuario;

  constructor(public modalController: ModalController, public post: ConexionbdService) {
    this.usuario =  JSON.parse(localStorage.getItem('user'));
    this.historial=this.post.historial;
    
    console.log(this.historial)
    this.getBaremo(this.historial.id,this.usuario[0].email);
    console.log(this.usuario[0].email)
    
   }

  ngOnInit() {
  }

  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  getBaremo(id, email) {
    //console.log("ejecuto esto:", this.usuario[0].email);
     return new Promise(resolve => {
       let body = {
         aksi: 'getBaremos',
         id: id,
         email: email
         
 
       };
 
       this.post.postData(body, 'file_aksi.php').subscribe(data => {
        
       
         console.log(data["result"]);
         this.historia = data["result"];
         console.log(this.historia);

         
      
         resolve(true);
       });
     });
   }

}

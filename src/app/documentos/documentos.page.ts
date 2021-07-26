import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ConexionbdService } from '../servicio/conexionbd.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {
  usuario;
  paciente: any = {};
  // paciente: Paciente;
  constructor(public post: ConexionbdService,  private menu: MenuController) { 
    this.usuario =  JSON.parse(localStorage.getItem('user'));
    this.getPaciente();

    setTimeout(() => {
      this.getPaciente();
   }, 2000);
  }

  ngOnInit() {
  }

  openmenu(){
    this.menu.open('first');
  }

  doRefresh(event) {
    console.log('Begin async operation');


    setTimeout(() => {
     
      console.log('Async operation has ended');
      event.target.complete();
      this.getPaciente();
    }, 2000);
  }

  getPaciente() {
    console.log("ejecuto esto:", this.usuario[0].email);
     return new Promise(resolve => {
       let body = {
         aksi: 'getPaciente',
         email: this.usuario[0].email
         
 
       };
 
       this.post.postData(body, 'file_aksi.php').subscribe(data => {
         console.log(data["result"][0]);
         this.paciente = data["result"][0];
         resolve(true);
       });
     });
   }

}

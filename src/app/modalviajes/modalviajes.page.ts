import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { ConexionbdService } from '../servicio/conexionbd.service';

@Component({
  selector: 'app-modalviajes',
  templateUrl: './modalviajes.page.html',
  styleUrls: ['./modalviajes.page.scss'],
})
export class ModalviajesPage implements OnInit {

  formregistroviaje = new FormGroup({
    fecha_registro: new FormControl(),
    fecha_llegada: new FormControl(),
    origen: new FormControl(),
    destino: new FormControl(),
  });

  usuario;
  today =moment().format('L');
  todayfuture =moment().add(1,'months').format('L').toString();
  year= parseInt(moment().format('YYYY'));
  nextyear=this.year +3;

  constructor(public modalController2: ModalController, public post: ConexionbdService,
    public alertCtrl: AlertController,  public toastController: ToastController) {
      console.log(this.year)
      console.log(this.nextyear)
      console.log(this.todayfuture)
      this.usuario =  JSON.parse(localStorage.getItem('user'));
      console.log(this.usuario);
     }

  ngOnInit() {
  }

  async registrarviaje(){
    console.log( this.formregistroviaje.value);
    console.log(this.usuario[0].email);
    var ida = moment(this.formregistroviaje.value.fecha_registro).format('L');
    var vuelta = moment(this.formregistroviaje.value.fecha_llegada).format('L');

     
 
      let body = {
        aksi: 'add_viaje',
        id_paciente:  this.usuario[0].email,
        fecha_registro: ida,
        fecha_llegada: vuelta,
        origen: this.formregistroviaje.value.origen,
        destino: this.formregistroviaje.value.destino
      };

      this.post.postData(body, 'file_aksi.php').subscribe(async data => {

        var alertpesan = data.toString();
        if(data){
          const toast = await this.toastController.create({
            message: 'Viaje registrado con éxito!',
            duration: 2000
          });
          toast.present();

         this.close();

        }else{
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
        }
      
      });
  

   
  }

  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController2.dismiss({
      'dismissed': true
    });
  }

}

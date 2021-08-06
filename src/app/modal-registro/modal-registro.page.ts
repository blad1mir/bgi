import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { ConexionbdService } from '../servicio/conexionbd.service';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.page.html',
  styleUrls: ['./modal-registro.page.scss'],
})
export class ModalRegistroPage implements OnInit {
  correo = null;
  resultado;
  estatus=false;
  booleanpaciente = false;
  booleanusaurio= false;
  boton = true;
  icon = "eye-outline";
  tipo = "password";

  year= parseInt(moment().format('YYYY'));


  formregistro = new FormGroup({
    nombre: new FormControl(), 
    apellido: new FormControl(),
    correo: new FormControl(),
    telefono: new FormControl(),
    password: new FormControl(),
    direccion: new FormControl(),
    fechan: new FormControl()

  });

  constructor( public modalController: ModalController, public post: ConexionbdService,
    public alertCtrl: AlertController,  public toastController: ToastController, private router: Router) { 
      console.log(this.boton)
      
  }

  ngOnInit() {
  }

  show(){
    if(this.icon == "eye-outline" ){
      this.icon = "eye-off-outline";
      this.tipo = "text";
    }else{
      this.icon = "eye-outline";
      this.tipo = "password";
    }
   
  }

  verificar(){
  
  //console.log(this.correo);
  }

  
  comprobar(){
    this.getPacientes();
    this.getUsuarios();

    if((this.booleanusaurio==true) && (this.booleanpaciente==true)){
        this.estatus = true;
    }else{
      this.estatus=false;
    }
   

    this.disponible();

  }

  disponible(){

    
    if((this.booleanusaurio==true)){
      this.estatus = true;
  }else{
    this.estatus=false;
  }



  

 


    if((this.formregistro.value.nombre != null) && (this.formregistro.value.apellido != null)
     && (this.formregistro.value.correo != null) 
     && (this.formregistro.value.password != null) && (this.formregistro.value.telefono != null) && (this.estatus == true)){
      this.boton= false;
      console.log(this.boton);
    }else{
     
     
    }

  }

  addUsuario(){
    let body = {
      aksi: 'add_suario',
      nombre: this.formregistro.value.nombre,
      apellido: this.formregistro.value.apellido,
      email: this.formregistro.value.correo,
      telefono: this.formregistro.value.telefono,
      password: this.formregistro.value.password,
    };

    this.post.postData(body, 'file_aksi.php').subscribe(async data => {

      var alertpesan = data.toString();
      if(data){
        // const toast = await this.toastController.create({
        //   message: '¡Usuario registrado con éxito!',
        //   duration: 2000
        // });
        // toast.present();

    

    

      }else{
        const toast = await this.toastController.create({
          message: alertpesan,
          duration: 2000
        });
      }
      this.close();
    
    });
  
  }

  addPaciente(){
    let body = {
      aksi: 'add_paciente',
      nombre: this.formregistro.value.nombre,
      apellido: this.formregistro.value.apellido,
      email: this.formregistro.value.correo,
      telefono: this.formregistro.value.telefono,
      direccion: "",
      fechan: this.formregistro.value.fechan,
      password: this.formregistro.value.password
     
    };

    this.post.postData(body, 'file_aksi.php').subscribe(async data => {

      var alertpesan = data.toString();
      if(data){
        // const toast = await this.toastController.create({
        //   message: '¡Paciente registrado con éxito!',
        //   duration: 2000
        // });
        // toast.present();
        //this.close();

    

      }else{
        const toast = await this.toastController.create({
          message: alertpesan,
          duration: 2000
        });
      }
      this.close();
    });

  }

  async registrar(){
    this.formregistro.value.fechan = moment(this.formregistro.value.fechan).format('L');
    console.log( this.formregistro.value);
    console.log(this.booleanpaciente)
    



      if(this.booleanpaciente==true){

        this.addPaciente();
    
      }else{
        this.addUsuario();
      
      }

      this.registro();

      // const toast = await this.toastController.create({
      //   message: '¡Registro exitoso, contacte a soporte para activar su usario!',
      //   duration: 5000
      // });
      // toast.present();
      this.formregistro.reset();
    
      this.close();
    

   
  }


  getPacientes() {
    
           console.log("ejecuto esto:");
     console.log(this.formregistro.value.correo);
   
     return new Promise(resolve => {
       let body = {
         aksi: 'getPaciente',
         email: this.correo
       };
 
       this.post.postData(body, 'file_aksi.php').subscribe(data => {
        
       
         console.log(data["result"]);
         this.resultado = data["result"];
          console.log(data["result"].length)
         if(data["result"].length == 0){
          //this.error();
          // this.estatus = false;
          // this.boton=true;
         
          this.booleanpaciente=true;
         }else{
          this.booleanpaciente=false;
          // this.estatus = true;
         }
         
         resolve(true);
       });
       console.log(this.booleanpaciente)
     });

    


   }

   getUsuarios() {
    
          
    console.log("ejecuto esto:");
    console.log(this.correo);
  
    return new Promise(resolve => {
      let body = {
        aksi: 'getCorreoUsuariotodos',
        email: this.correo
      };

      this.post.postData(body, 'file_aksi.php').subscribe(data => {
       
      
        console.log(data["result"]);
        this.resultado = data["result"];
        console.log(data["result"].length)

        if(data["result"].length > 0){
         
          this.error2();
     
      
         this.estatus = false;
         this.boton= true;
         this.booleanusaurio=false;
        }else{
          this.estatus = true;
          this.booleanusaurio=true;
        }
        
        resolve(true);
      });

      console.log(this.estatus)
    });
  


  }


  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async error(){
    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: 'Error!',
      message: '¡Usted no está registrado como paciente! Contacte con soporte',
      buttons: ['CERRAR']
    });
   
    await alert.present();
   }

   async error2(){
    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: 'Error!',
      message: 'Este usuario ya se encuentra registrado. Pruebe restablecer su contraseña o contactar a soporte',
      buttons: [{text: 'IR A SOPORTE', handler: async () => window.location.href = "https://ww2.corporacionatiempo.com/"},'CERRAR']
    });

    this.formregistro.reset();
    this.booleanpaciente = false;
   
    await alert.present();
   }



   async registro(){
    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: '¡Usuario registrado con éxito!',
      message: 'Para activar su usuario debe realizar su suscripción',
      buttons: [{text: 'Activar suscripción', handler: async () => window.location.href = "https://ww2.corporacionatiempo.com/"},'CERRAR']
    });

    this.formregistro.reset();
    this.booleanpaciente = false;
   
    await alert.present();
   }

}

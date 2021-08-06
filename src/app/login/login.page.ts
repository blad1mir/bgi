import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Md5 } from 'ts-md5';
import { AppComponent } from '../app.component';
import { ModalRegistroPage } from '../modal-registro/modal-registro.page';
import { ConexionbdService } from '../servicio/conexionbd.service';
import { VoipService } from '../voip.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ionicForm = new FormGroup({
    email: new FormControl(), 
    clave: new FormControl(),
  });

  usuario;
  clave;

  resultado;

  constructor(public post: ConexionbdService, public alertCtrl: AlertController,
    private router: Router,  public modalController: ModalController,  private TawkService: VoipService,
    public menu: MenuController, public compo: AppComponent) {
      this.menu.enable(false, 'first');
      
     // this.menuCtrl.enable(false);
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

      if(JSON.parse(localStorage.getItem('user')) != null ){
        this.router.navigate(['/principal'])
      }

   }

   async error(){
    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: 'Error de autenticación',
      message: 'Contraseña inválida',
      buttons: ['OK']
    });
    await alert.present();
   }



     getUsuarios() {
    this.usuario=this.ionicForm.value.email;
    this.clave=this.ionicForm.value.clave;
          
    console.log("ejecuto esto:");
  //  console.log(this.correo);
  
    return new Promise(resolve => {
      let body = {
        aksi: 'getCorreoUsuariotodos',
        email: this.ionicForm.value.email
      };

      this.post.postData(body, 'file_aksi.php').subscribe(data => {
       
      
        console.log(data["result"]);
        this.resultado = data["result"];
        console.log(data["result"].length)

        if(data["result"].length > 0){
        
            this.onLogin();
         
        
        

        }else{
          this.error2();
        }
        
        resolve(true);
      });


    });
  


  }

   onLogin() {
   // console.log("ejecuto esto:");
    return new Promise(resolve => {
      let body = {
        aksi: 'getUsuarios',
        username: this.ionicForm.value.email,
        password: this.ionicForm.value.clave

      };

      this.post.postData(body, 'file_aksi.php').subscribe(data => {
       
      
        console.log(data["result"]);
        this.resultado = data["result"];
        if(this.resultado.length > 0){
          if(this.resultado[0].activo == '2'){
            this.error3();

          }else{
              console.log(true);

          localStorage.setItem('user', JSON.stringify(data["result"]));
          this.compo.estatus= true; 
          this.compo.usuario = JSON.parse(localStorage.getItem('user'));
          this.router.navigate(['/principal']);
          this.ionicForm.reset();
          }
        
         
        
          
      
        //JSON.parse(localStorage.getItem('user'));
        }else{
          console.log(false);
          this.error();
          this.ionicForm.reset();
        }
        resolve(true);
      });
      this.menu.enable(true, 'first');
    });
  }

  ngOnInit() {
  }

  async registro() {
    const modal = await this.modalController.create({
      component: ModalRegistroPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  async notificacion(){
    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: '',
      message: 'Contacte con soporte para restablecer su contraseña',
      buttons: [{text: 'IR A SOPORTE', handler: async () => window.location.href = "https://ww2.corporacionatiempo.com/"},'CERRAR']
    });
   
    await alert.present();
   }

   async error2(){
    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: 'Usuario no registrado',
      message: 'Pruebe registrarse o contartar a soporte',
      buttons: [{text: 'IR A SOPORTE', handler: async () => window.location.href = "https://ww2.corporacionatiempo.com/"},'CERRAR']
    });
    this.ionicForm.reset();
    await alert.present();
   }

   async error3(){
    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: 'Usuario inactivo',
      message: 'Su usuario estará activo después de suscribirse',
      buttons: ['CERRAR', {text: 'ACTIVAR SUSCRIPCIÓN', handler: async () => window.location.href = "https://ww2.corporacionatiempo.com/"}]
    });
    this.ionicForm.reset();
    await alert.present();
   }

}

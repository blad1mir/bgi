import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario ={nombre:"", apellido:""};
  estatus = true;
  constructor(private menu: MenuController, public router: Router) {
    if(JSON.parse(localStorage.getItem('user'))!=null){
      var usertemp =  JSON.parse(localStorage.getItem('user'));
      this.usuario[0]=usertemp;
    }
    
    
    if(this.usuario == null){
      this.estatus = false;
    }

  
    console.log(this.usuario);
  }

  close() {
    this.menu.close();
   
  }

  logout(){
    localStorage.setItem('user', null);
   
    this.router.navigate(['/login']);
    this.close();
  }
}

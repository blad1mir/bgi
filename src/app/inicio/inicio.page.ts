import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionbdService } from '../servicio/conexionbd.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  especialidades;
  
  constructor(public router: Router) {

   // this.getEspecialidad();
 
   }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('user')) != null ){
      this.router.navigate(['/principal'])
    }
  }



  // call() {
  //   var number = "08001233445"; 
  //   this.callNumber.callNumber(number, true)
  //     .then(res => console.log('Launched dialer!', res))
  //     .catch(err => console.log('Error launching dialer', err));

  // }

}

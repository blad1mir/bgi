import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  condicion = false;
  constructor() { }

  ngOnInit() {
  }

  cambiar(){
  console.log(this.condicion)
  }


}

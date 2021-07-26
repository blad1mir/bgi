import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConexionbdService {
  //server: string = 'https://ez2order.000webhostapp.com/server_api/';
  //server: string = 'https://atiempoadmin.com/config/'
  server: string = 'http://atiempo.online/config/';

  //server: string = 'http://localhost/atiempo_conexion/';
  historial;


  
  constructor(public http: HttpClient) { }


  postData(body, file){
    //let type = 'application/json; charset=utf-8';
    

    return this.http.post(this.server + file, JSON.stringify(body));
  }

  
}

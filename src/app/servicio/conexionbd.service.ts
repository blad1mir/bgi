import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConexionbdService {
 // server: string = 'https://ez2order.000webhostapp.com/server_api/';
  //server pruebas 
 // server: string = 'https://atiempoadmin.com/config/'
 
 //server producción
  server: string = 'https://bestglobalinsurance.online/config/';

  //server: string = 'http://localhost/atiempo_conexion/';

 // server: string = 'http://192.168.181.57/atiempo_conexion/'
  historial;

//   private fileList: string[] = new Array<string>();
//  private fileList$: Subject<string[]> = new Subject<string[]>();
//  private displayLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false);


  
  constructor(public http: HttpClient) { }


  postData(body, file){
    //let type = 'application/json; charset=utf-8';
    

    return this.http.post(this.server + file, JSON.stringify(body));
  }

  // public isLoading(): Observable<boolean> {
  //   return this.displayLoader$;
  // }

  //  upload(data) {
  //   let uploadURL = `${this.server}upload.php`;
  //   console.log(uploadURL);

  //   return this.http.post(uploadURL, data);
  // }

  
}



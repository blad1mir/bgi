import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionbdService } from '../servicio/conexionbd.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage implements OnInit {

  especialidades;
  previo;
  constructor(public post: ConexionbdService, public route: ActivatedRoute,  public router: Router) {
    this.getEspecialidad();
   }

  ngOnInit() {
      this.previo = this.route.snapshot.paramMap.get('previo');
  }



  back(){
    this.router.navigate([this.previo]);
  
  }

    
  getEspecialidad() {
    console.log("ejecuto esto:");
    return new Promise(resolve => {
      let body = {
        aksi: 'getEspecialidad'
      };

      this.post.postData(body, 'file_aksi.php').subscribe(data => {
       
      
        console.log(data["result"]);
        this.especialidades = data["result"];
        resolve(true);
      });
    });
  }

}

import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonRefresher, MenuController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { CiudadespipePipe } from '../ciudadespipe.pipe';
import { CodigopaispipePipe } from '../codigopaispipe.pipe';
import { IdCiudadespipePipe } from '../id-ciudadespipe.pipe';
import { ConexionbdService } from '../servicio/conexionbd.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {
  usuario;
  paciente:any = {};

  pacienteAux = {id:"",nombre: "", apellido:"", telefono:"",
   email:"", id_pais:"", id_ciudades:"", direccion:"", fecha_nac:"", sexo:"", tipo_sangre:"", grupo_sangre:"",
  peso:0, estatura:0};
  mostrar = [];
  editar = [];
  evento;
  
  contacto = {nombre:"", parentesco:"", telefono:"",email:""};
  lengContacto = 0;
  peso;
  tipo_sangre;
  estatura;
  year= parseInt(moment().format('YYYY'));
  startyear= this.year - 120; 
  refernceyear = moment().subtract(30, 'years').format('YYYY-MM-DD');
  


  datosfisicos = new FormGroup({
   
  });
  paises = ["VENEZUELA"];
  ciudades = ["DISTRITO CAPITAL",
  "AMAZONAS",
  "ANZOATEGUI",
  "APURE",
  "ARAGUA",
  "BARINAS",
  "MIRANDA",
  "CARABOBO",
  "COJEDES",
  "DELTA AMACURO",
  "FALCON",
  "GUARICO",
  "LARA",
  "MERIDA",
  "BOLIVAR",
  "MONAGAS",
  "NUEVA ESPARTA",
  "PORTUGUESA",
  "SUCRE",
  "TACHIRA",
  "TRUJILLO",
  "YARACUY",
  "ZULIA",
  "VARGAS",
  ];

  

  pais:any = {nombre:""};
  ciudad:any = {nombre:""};

  alergias = [];
  AlergiaActual = {id:"", descripcion:"", fecha_inicio:""};
  lengAlergias = 0;

  vacunas = [];
  VacunaActual = {id:"", descripcion:"", fecha:""};
  lengVacunas = 0;

  enfermedades = [];
  enfermedadActual= {id:"", descripcion:"", fecha_inicio:""};
  lengEnfermedades = 0;

  cirugias = [];
  cirugiaActual= {id:"", motivo:"", fecha_inicio:"", fecha_fin:""};
  lengCirugias = 0;

  medicamentos = [];
  medicamentoActual= {id:"", nombre:"", unidad:"", fecha_inicio:"", fecha_fin:""};
  lengMedicamentos = 0;

  estudios = [];
  estudioActual= {id:"", nombre:"", fecha:"", archivo:""};
  lengEstudios = 0;

  archivo;
  fileName;

  uploadResponse;

  form: FormGroup;



  
 


  // paciente: Paciente;
  constructor(public filtrarPais: CodigopaispipePipe, public filtrar:IdCiudadespipePipe,
    public filtrarCiudadesCod: CiudadespipePipe, public router: Router, public post: ConexionbdService,  private menu: MenuController,
     public toastController: ToastController) { 
      //  this.imageUpload();
   
    this.usuario =  JSON.parse(localStorage.getItem('user'));
    console.log(this.usuario);
     
    
    this.getPaciente();
   // this.getCiudades();
    //this.getPaises();
    
    //console.log(this.ciudades);
    

    setTimeout(() => {
   // this.getCiudades();
    //console.log(this.ciudades);
    // console.log(this.paciente.pais);
    // console.log(this.filtrarCiudadesCod.transform(this.ciudades, this.pacienteAux.pais))
    //   this.ciudad = this.obtenerCiudad();
    //   console.log(this.ciudad);
    //   this.pais = this.obtenerPais();
    //   console.log(this.pais);

      console.log(this.paciente)
      this.getContacto();
      this.getAlergias();
      this.getVacunas();
      this.getEnfermedades();
      this.getCirugias();
      this.getMedicamentos();
    }, 5000);

  

  
  }


 

  

  ngOnInit() {

    // this.form = this.formBuilder.group({
    //   avatar: ['']
    // });
  }

  openmenu(){
    this.menu.open('first');
  }

   onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.archivo = reader.result;

        console.log(this.fileName +" "+ this.archivo)
      };
    }

   
  }


  


  // imageUpload() {
  //   let path = 'C:/Users/Usuario/Documents/1627316742179.jpg';
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   let options: FileUploadOptions = {
  //       fileKey: 'image',
  //       fileName: '.png',
  //       chunkedMode: false,
  //       //mimeType: "image/jpeg",
  //     }

      


  
  
  //     fileTransfer.upload(path, 'http://192.168.181.57/atiempo_conexion/', options)
  //       .then((data) => {
  //       console.log(data+" Uploaded Successfully");
  //       console.log(JSON.parse(data.response));
  //       let res = JSON.parse(data.response);
  //       if (res.success == true) {
  //           // do whats ever you want to do
  //       }
  
  
  //     }, (err) => {
  //       console.log(err);
  
  //     });
  // }


  doRefresh(event) {
  
    console.log(event);
    this.evento = event;
    console.log(typeof(event))
    console.log('Begin async operation');
    

    setTimeout(() => {
     
      console.log('Async operation has ended');
      event.target.complete();
      this.getPaciente();
    }, 2000);
  }

  updateDatosfisicos(){
    console.log("Here")
    console.log(this.peso)
    console.log(this.pacienteAux)

  }



  getPaciente() {
    console.log("ejecuto esto:", this.usuario[0].email);
     return new Promise(resolve => {
       let body = {
         aksi: 'getPaciente',
         email: this.usuario[0].email
         
 
       };
 
       this.post.postData(body, 'file_aksi.php').subscribe(data => {
        console.log("Paciente"); 
        console.log(data["result"]);
         this.paciente = data["result"][0];
         this.paciente.fecha_nac = moment(this.paciente.fecha_nac, "DD-MM-YYYY").format('YYYY-MM-DD');
         this.pacienteAux = this.paciente;
        //  this.paciente.fecha_nac =  moment(this.paciente.fecha_nac, "YYY-MM-DD").format('DD/MM/YYYY')
       
         resolve(true);
       });
     });
     
   }

   getContacto() {
    console.log("ejecuto esto:", this.pacienteAux.id);
     return new Promise(resolve => {
       let body = {
         aksi: 'getContactos',
         id:parseInt(this.pacienteAux.id)
         
 
       };
 
       this.post.postData(body, 'file_aksi.php').subscribe(data => {
         this.lengContacto = data["result"].length;
           console.log(this.lengContacto);
           if(data["result"].length>0){
         console.log("Contacto")
         console.log(data["result"][0]);
         this.contacto = data["result"][0]; 
         }

        
       
        //  this.paciente.fecha_nac =  moment(this.paciente.fecha_nac, "YYY-MM-DD").format('DD/MM/YYYY')
       
         resolve(true);
       });
     });
     
   }


   //getPaises() {
    
    //  return new Promise(resolve => {
    //    let body = {
    //      aksi: 'getPaises'
    //    };
    //    this.post.postData(body, 'file_aksi.php').subscribe(data => {
    //      console.log(data["result"]);
    //      this.paises = data["result"];
    //      resolve(true);
    //    });
    //  });
   //}

   //getCiudades() {
    
    // return new Promise(resolve => {
    //   let body = {
    //     aksi: 'getLocalidad'
    //   };
    //   this.post.postData(body, 'file_aksi.php').subscribe(data => {
    //    this.ciudades = data["result"];
    //    console.log(data["result"]);
    //     resolve(true);
    //   });
    // });
  //}

  getAlergias() {
    
    return new Promise(resolve => {
      let body = {
        aksi: 'getAlergias',
        id: this.pacienteAux.id
      };

      this.post.postData(body, 'file_aksi.php').subscribe(data => {
        console.log("Alergias");
        console.log(data["result"]);
        
        this.alergias = data["result"];
        this.lengAlergias =  data["result"].length;
    
       //  this.paciente.fecha_nac =  moment(this.paciente.fecha_nac, "YYY-MM-DD").format('DD/MM/YYYY')
        
        resolve(true);
      });
    });
  }

  getVacunas() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getVacunas',
        id: this.pacienteAux.id
      };

      this.post.postData(body, 'file_aksi.php').subscribe(data => {
        console.log("Vacunas");
        console.log(data["result"]);
        
        this.vacunas = data["result"];
        this.lengVacunas =  data["result"].length;
    
       //  this.paciente.fecha_nac =  moment(this.paciente.fecha_nac, "YYY-MM-DD").format('DD/MM/YYYY')
        
        resolve(true);
      });
    });
  }

  getEnfermedades() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getEnfermedades',
        id: this.pacienteAux.id
      };

      this.post.postData(body, 'file_aksi.php').subscribe(data => {
        console.log("Enfermedades");
        console.log(data["result"]);
        
        this.enfermedades = data["result"];
        this.lengEnfermedades =  data["result"].length;
    
       //  this.paciente.fecha_nac =  moment(this.paciente.fecha_nac, "YYY-MM-DD").format('DD/MM/YYYY')
        
        resolve(true);
      });
    });
  }

  getCirugias() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getCirugias',
        id: this.pacienteAux.id
      };

      this.post.postData(body, 'file_aksi.php').subscribe(data => {
        console.log("Cirugias");
        console.log(data["result"]);
        
        this.cirugias = data["result"];
        this.lengCirugias =  data["result"].length;
    
       //  this.paciente.fecha_nac =  moment(this.paciente.fecha_nac, "YYY-MM-DD").format('DD/MM/YYYY')
        
        resolve(true);
      });
    });
  }

  getMedicamentos(){
    return new Promise(resolve => {
      let body = {
        aksi: 'getMedicamentos',
        id: this.pacienteAux.id
      };

      this.post.postData(body, 'file_aksi.php').subscribe(data => {
        console.log("Medicamentos");
        console.log(data["result"]);
        
        this.medicamentos = data["result"];
        this.lengMedicamentos =  data["result"].length;
    
       //  this.paciente.fecha_nac =  moment(this.paciente.fecha_nac, "YYY-MM-DD").format('DD/MM/YYYY')
        
        resolve(true);
      });
    });

  }



   mostrarDatos(indice){
    if(this.mostrar[indice] == null){
      this.mostrar[indice] = 0;
    }

    if(this.mostrar[indice]==0){
      this.mostrar[indice] = 1;
    }else{
      this.mostrar[indice] = 0;
    }

    console.log(this.mostrar[indice])
   }

   editarDatos(indice){
    if(this.editar[indice] == null){
      this.editar[indice] = 0;
    }

    if(this.editar[indice]==0){
      this.editar[indice] = 1;
    }else{
      this.editar[indice] = 0;
    }

    console.log(this.editar[indice])
   }

   enviarDatosFisicos(){
   
     console.log('Here 1');
    //  console.error("err")
     
    
     console.log(this.pacienteAux);

     let body = {
      aksi: 'updateDatosFisicos',
      tipo_sangre: this.pacienteAux.tipo_sangre,
      grupo_sangre: this.pacienteAux.grupo_sangre,
      estatura:this.pacienteAux.estatura,
      peso:this.pacienteAux.peso,
      email:this.usuario[0].email

    };

    this.post.postData(body, 'file_aksi.php').subscribe(async data => {
      const toast = await this.toastController.create({
        message: 'Los cambios se realizaron con éxito',
        duration: 2000
      });

      var alertpesan = data.toString();
      if(data){
        const toast = await this.toastController.create({
          message: 'Los cambios se realizaron con éxito',
          duration: 2000
        });
      }else{
        const toast = await this.toastController.create({
          message: alertpesan,
          duration: 2000
        });
      }
      toast.present();
    });

    // this.doRefresh();
    // window.location.assign('/documentos');
   // this.cd.detectChanges();
//    setTimeout(() => {
//     this.getPaciente();
//  }, 2000);
   
   
   
   

   // this.router.navigate(['/documentos'])
   }

   BorrarAlergiaActual(id){
     console.log(id);
     

     let body = {
      aksi: 'deleteAlergia',
      id: parseInt(id)

    };

    this.post.postData(body, 'file_aksi.php').subscribe(async data => {

      const toast = await this.toastController.create({
        message: 'Los cambios se realizaron con éxito',
        duration: 2000
      });

      var alertpesan = data.toString();
      if(data){
        const toast = await this.toastController.create({
          message: 'Los cambios se realizaron con éxito',
          duration: 2000
        });
      }else{
        const toast = await this.toastController.create({
          message: alertpesan,
          duration: 2000
        });
      }
      this.getAlergias();
      toast.present();
    });

   }

   BorrarVacunaActual(id){
    console.log(id);
    

    let body = {
     aksi: 'deleteVacuna',
     id: parseInt(id)

   };

   this.post.postData(body, 'file_aksi.php').subscribe(async data => {

     const toast = await this.toastController.create({
       message: 'Los cambios se realizaron con éxito',
       duration: 2000
     });

     var alertpesan = data.toString();
     if(data){
       const toast = await this.toastController.create({
         message: 'Los cambios se realizaron con éxito',
         duration: 2000
       });
     }else{
       const toast = await this.toastController.create({
         message: alertpesan,
         duration: 2000
       });
     }
     this.getVacunas();
     toast.present();
   });

  }

  BorrarEnfermedadActual(id){
    console.log(id);
    

    let body = {
     aksi: 'deleteEnfermedad',
     id: parseInt(id)

   };

   this.post.postData(body, 'file_aksi.php').subscribe(async data => {

     const toast = await this.toastController.create({
       message: 'Los cambios se realizaron con éxito',
       duration: 2000
     });

     var alertpesan = data.toString();
     if(data){
       const toast = await this.toastController.create({
         message: 'Los cambios se realizaron con éxito',
         duration: 2000
       });
     }else{
       const toast = await this.toastController.create({
         message: alertpesan,
         duration: 2000
       });
     }
     this.getEnfermedades();
     toast.present();
   });

  }

  BorrarCirugiaActual(id){
    console.log(id);
    

    let body = {
     aksi: 'deleteCirugia',
     id: parseInt(id)

   };

   this.post.postData(body, 'file_aksi.php').subscribe(async data => {

     const toast = await this.toastController.create({
       message: 'Los cambios se realizaron con éxito',
       duration: 2000
     });

     var alertpesan = data.toString();
     if(data){
       const toast = await this.toastController.create({
         message: 'Los cambios se realizaron con éxito',
         duration: 2000
       });
     }else{
       const toast = await this.toastController.create({
         message: alertpesan,
         duration: 2000
       });
     }
     this.getCirugias();
     toast.present();
   });

  }

  BorrarMedicamentoActual(id){
    console.log(id);
    

    let body = {
     aksi: 'deleteMedicamento',
     id: parseInt(id)

   };

   this.post.postData(body, 'file_aksi.php').subscribe(async data => {

     const toast = await this.toastController.create({
       message: 'Los cambios se realizaron con éxito',
       duration: 2000
     });

     var alertpesan = data.toString();
     if(data){
       const toast = await this.toastController.create({
         message: 'Los cambios se realizaron con éxito',
         duration: 2000
       });
     }else{
       const toast = await this.toastController.create({
         message: alertpesan,
         duration: 2000
       });
     }
     this.getMedicamentos();
     toast.present();
   });
  }

   AgregarAlergia(){
     console.log(this.AlergiaActual);
  
     let body = {
      aksi: 'add_alergia',
      id_paciente: this.pacienteAux.id,
      descripcion: this.AlergiaActual.descripcion,
      fecha_inicio:this.AlergiaActual.fecha_inicio

    };

    this.post.postData(body, 'file_aksi.php').subscribe(async data => {

      const toast = await this.toastController.create({
        message: 'Los cambios se realizaron con éxito',
        duration: 2000
      });

      var alertpesan = data.toString();
      if(data){
        const toast = await this.toastController.create({
          message: 'Los cambios se realizaron con éxito',
          duration: 2000
        });
      }else{
        const toast = await this.toastController.create({
          message: alertpesan,
          duration: 2000
        });
      }
      this.getAlergias();
      toast.present();
    });

   }

   AgregarVacuna(){
    console.log(this.VacunaActual);
    console.log(this.pacienteAux.id);
 
    let body = {
     aksi: 'add_vacuna',
     id_paciente: this.pacienteAux.id,
     descripcion: this.VacunaActual.descripcion,
     fecha:this.VacunaActual.fecha

   };

   this.post.postData(body, 'file_aksi.php').subscribe(async data => {

     const toast = await this.toastController.create({
       message: 'Los cambios se realizaron con éxito',
       duration: 2000
     });

     var alertpesan = data.toString();
     if(data){
       const toast = await this.toastController.create({
         message: 'Los cambios se realizaron con éxito',
         duration: 2000
       });
     }else{
       const toast = await this.toastController.create({
         message: alertpesan,
         duration: 2000
       });
     }
     this.getVacunas();
     toast.present();
   });

  }

  AgregarEnfermedad(){
    console.log(this.enfermedadActual);
    console.log(this.pacienteAux.id);
 
    let body = {
     aksi: 'add_enfermedad',
     id_paciente: this.pacienteAux.id,
     descripcion: this.enfermedadActual.descripcion,
     fecha_inicio:this.enfermedadActual.fecha_inicio

   };

   this.post.postData(body, 'file_aksi.php').subscribe(async data => {

     const toast = await this.toastController.create({
       message: 'Los cambios se realizaron con éxito',
       duration: 2000
     });

     var alertpesan = data.toString();
     if(data){
       const toast = await this.toastController.create({
         message: 'Los cambios se realizaron con éxito',
         duration: 2000
       });
     }else{
       const toast = await this.toastController.create({
         message: alertpesan,
         duration: 2000
       });
     }
     this.getEnfermedades();
     toast.present();
   });

  }

  AgregarCirugia(){
    console.log(this.cirugiaActual);
    console.log(this.pacienteAux.id);
 
    let body = {
     aksi: 'add_cirugia',
     id_paciente: parseInt(this.pacienteAux.id),
     motivo: this.cirugiaActual.motivo,
     fecha_inicio:this.cirugiaActual.fecha_inicio,
     fecha_fin:this.cirugiaActual.fecha_fin

   };

   this.post.postData(body, 'file_aksi.php').subscribe(async data => {

     const toast = await this.toastController.create({
       message: 'Los cambios se realizaron con éxito',
       duration: 2000
     });

     var alertpesan = data.toString();
     if(data){
       const toast = await this.toastController.create({
         message: 'Los cambios se realizaron con éxito',
         duration: 2000
       });
     }else{
       const toast = await this.toastController.create({
         message: alertpesan,
         duration: 2000
       });
     }
     this.getCirugias();
     toast.present();
   });

  }

  AgregarMedicamento(){
    console.log(this.medicamentoActual);
    console.log(this.pacienteAux.id);
 
    let body = {
     aksi: 'add_medicamento',
     id_paciente: parseInt(this.pacienteAux.id),
     nombre: this.medicamentoActual.nombre,
     unidad: this.medicamentoActual.unidad,
     fecha_inicio:this.medicamentoActual.fecha_inicio,
     fecha_fin:this.medicamentoActual.fecha_fin

   };

   this.post.postData(body, 'file_aksi.php').subscribe(async data => {

     const toast = await this.toastController.create({
       message: 'Los cambios se realizaron con éxito',
       duration: 2000
     });

     var alertpesan = data.toString();
     if(data){
       const toast = await this.toastController.create({
         message: 'Los cambios se realizaron con éxito',
         duration: 2000
       });
     }else{
       const toast = await this.toastController.create({
         message: alertpesan,
         duration: 2000
       });
     }
     this.getMedicamentos();
     toast.present();
   });
  }

  // AgregarEstudio(){
  //   console.log(this.estudioActual);
  //   console.log(this.archivo);
  //   const formData = new FormData();
  //   formData.append('avatar', this.form.get('avatar').value);
  //   this.post.upload(formData).subscribe(
  //     (res) => {
  //       this.uploadResponse = res;
  //         console.log(res);
  //     },
  //     (err) => {  
  //       console.log(err);
  //     }
  //   );

  //   console.log(formData)
  
  // }

   obtenerCiudad(){

   // var listanueva = this.filtrar.transform(this.ciudades, this.pacienteAux.ciudad);
    //console.log(listanueva[0]);

    //return listanueva[0];
   }

   obtenerPais(){

    //var listanueva2 = this.filtrarPais.transform(this.paises, this.pacienteAux.pais);
    //console.log(listanueva[0]);

    //return listanueva2[0];
   }






   enviarDatosPersonales(){
     console.log(this.pacienteAux);
     console.log("here");
    //  var tempais = this.filtrarPais.transform(this.paises, this.pacienteAux.pais);
    //  var PaisTemporal = this.pacienteAux.pais;
    //  this.pacienteAux.pais = tempais[0].id;

     console.log(this.pacienteAux);
    //  console.log(parseInt(this.pacienteAux.pais));
    //  console.log(parseInt(this.pacienteAux.ciudad));
    //  var tempPaisActual = parseInt(this.pacienteAux.pais);
    //  var temCiudadActual = parseInt(this.pacienteAux.ciudad);
      
   
     
    let body = {
     aksi: 'updateDatosPersonales',
     telefono: this.pacienteAux.telefono,
     pais:this.pacienteAux.id_pais,
     ciudad:this.pacienteAux.id_ciudades,
     direccion:this.pacienteAux.direccion,
     fecha_nac:this.pacienteAux.fecha_nac,
     sexo: this.pacienteAux.sexo,
     email:this.usuario[0].email

   };

   this.post.postData(body, 'file_aksi.php').subscribe(async data => {
    this.getPaciente();
   // this.pacienteAux.pais= PaisTemporal;

     const toast = await this.toastController.create({
       message: 'Los cambios se realizaron con éxito',
       duration: 2000
     });

     var alertpesan = data.toString();
     if(data){
       const toast = await this.toastController.create({
         message: 'Los cambios se realizaron con éxito',
         duration: 2000
       });
     }else{
       const toast = await this.toastController.create({
         message: alertpesan,
         duration: 2000
       });
     }
     
     toast.present();
   });
    
   



   }

   enviarDatosContacto(){
    console.log(this.contacto);
    console.log(this.pacienteAux.id);
    console.log("here");

   let body = {
    aksi: 'UpdateContacto',
    nombre: this.contacto.nombre,
    parentesco:this.contacto.parentesco,
    telefono:this.contacto.telefono,
    email:this.contacto.email,
    id:this.pacienteAux.id
  };

  this.post.postData(body, 'file_aksi.php').subscribe(async data => {
    const toast = await this.toastController.create({
      message: 'Los cambios se realizaron con éxito',
      duration: 2000
    });

    var alertpesan = data.toString();
    if(data){
      const toast = await this.toastController.create({
        message: 'Los cambios se realizaron con éxito',
        duration: 2000
      });
    }else{
      const toast = await this.toastController.create({
        message: alertpesan,
        duration: 2000
      });
    }
    
    toast.present();
  });

   }

   addContacto(){
    let body = {
      aksi: 'add_contacto',
      nombre: this.contacto.nombre,
      parentesco:this.contacto.parentesco,
      telefono:this.contacto.telefono,
      email:this.contacto.email,
      id:this.pacienteAux.id
    };

    this.post.postData(body, 'file_aksi.php').subscribe(async data => {
      const toast = await this.toastController.create({
        message: 'Los cambios se realizaron con éxito',
        duration: 2000
      });
      var alertpesan = data.toString();
      if(data){
        const toast = await this.toastController.create({
          message: 'Los cambios se realizaron con éxito',
          duration: 2000
        });
      }else{
        const toast = await this.toastController.create({
          message: alertpesan,
          duration: 2000
        });
      }
      
      toast.present();
     this.getContacto();
    
    });
  
  }
 


}

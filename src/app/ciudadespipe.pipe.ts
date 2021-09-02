import { Pipe, PipeTransform } from '@angular/core';
import { Ciudades } from './interface/ciudades';

@Pipe({
  name: 'ciudadespipe'
})
export class CiudadespipePipe implements PipeTransform {

  transform(historial: Ciudades [], searchTerm: string): any {
    
    return historial.filter(rest => rest.codigo.indexOf(searchTerm) >   -1);
  }

}

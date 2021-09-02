import { Pipe, PipeTransform } from '@angular/core';
import { Ciudades } from './interface/ciudades';

@Pipe({
  name: 'idCiudadespipe'
})
export class IdCiudadespipePipe implements PipeTransform {

  transform(historial: Ciudades [], searchTerm: string): any {
    return historial.filter(rest => rest.id == searchTerm);
  }

}

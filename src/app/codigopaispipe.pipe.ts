import { Pipe, PipeTransform } from '@angular/core';
import { Ciudades } from './interface/ciudades';

@Pipe({
  name: 'codigopaispipe'
})
export class CodigopaispipePipe implements PipeTransform {

  transform(historial: Ciudades [], searchTerm: string): any {
    return historial.filter(rest => rest.codigo == searchTerm);
  }

}

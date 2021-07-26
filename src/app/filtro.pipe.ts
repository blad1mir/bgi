import { Pipe, PipeTransform } from '@angular/core';
import { Historial } from './interface/historial';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(historial: Historial [], searchTerm: string): any {
    return historial.filter(rest => rest.servicio.indexOf(searchTerm.toUpperCase()) !== -1);
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Historial } from './interface/historial';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(historial: Historial [], searchTerm: string): any {
    
    return historial.filter(rest => rest.fecha.indexOf(searchTerm) >   -1);
  }

}

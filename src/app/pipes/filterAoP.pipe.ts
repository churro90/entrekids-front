import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterAoP',
  pure: false
})
export class FilterAoPPipe implements PipeTransform {
  transform(items: any[], term): any {   
    
      return term 
          ? items.filter(item =>( (item.nombre).toLowerCase().indexOf(term.toLowerCase()) !== -1  || (item.proveedor.nombre).toLowerCase().indexOf(term.toLowerCase()) !== -1 ))
          : items;
  }
}

/* || item.proveedor.nombre.indexOf(term) !== -1) */
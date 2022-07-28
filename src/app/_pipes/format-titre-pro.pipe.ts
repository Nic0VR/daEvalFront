import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTitrePro'
})
export class FormatTitreProPipe implements PipeTransform {

  transform(value: string): string {
    return value.split('(')[0].split('Titre professionnel')[1];
  }

}

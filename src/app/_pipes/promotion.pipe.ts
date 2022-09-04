import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'promotion'
})
export class PromotionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

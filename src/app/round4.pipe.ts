import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round4'
})
export class Round4Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== '--' && value !== '' && value !== '-') {
      return (Math.round(parseFloat(value) * 100) / 100).toFixed(2);
    } else {
      return value;
    }
  }

}

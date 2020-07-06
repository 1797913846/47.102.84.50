import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== '--' && value !== '' && value !== '-') {
      return (Math.round(parseFloat(value) * 100) / 100).toFixed(2);
    } else {
      return value;
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})

export class ValuesPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(function (key) {
      let pair: any = {};
      let k = 'key';
      let v = 'value';


      pair[k] = key;
      pair[v] = value[key];

      return pair;
    });
  }
}

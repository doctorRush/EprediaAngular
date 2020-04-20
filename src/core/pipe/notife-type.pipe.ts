import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notifeType'
})
export class NotifeTypePipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {

    if(value.length < 1) {
      return []
    }
    return value.filter(e => e.count == args[0]);
  }

}

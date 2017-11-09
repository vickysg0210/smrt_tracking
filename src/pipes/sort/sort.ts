import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
   transform(value: any, args?: any): any {
     var key: string = args[0];
     var order: string = args[1];
     value.sort((a, b) => {
       if(order) {
         if(a[key] < b[key]) {
           return 1;
         } else if(a[key] > b[key]) {
           return -1;
         } else {
           return 0;
         }
       } else {
         if(a[key] > b[key]) {
           return 1;
         } else if(a[key] < b[key]) {
           return -1;
         } else {
           return 0;
         }
       }
     });
     return value;
   }
}
